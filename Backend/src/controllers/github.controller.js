import {Octokit} from 'octokit'
import prisma from '../utilities/db.js'

export const getRepoData = async (req, res) => {
    try {
        if (!req.user ||!req.user.profile.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const tokenData = await prisma.user_account.findUnique({
            where: {
                github_id: req.user.profile.id
            },
            select: {
                access_token: true
            }
        });

        if (!tokenData) {
            return res.status(401).json({ error: "User not authenticated. Please log in." });
        }

        const octokit = new Octokit({
            auth: tokenData.access_token
        });

        const { repoUrl } = req.body;
        
        if (!repoUrl) {
            return res.status(400).json({ error: "Repository URL is required" });
        }

        const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        const owner = urlParts[urlParts.length - 2];
        const repo = urlParts[urlParts.length - 1].replace('.git', '');

    
        const { data: rawCommits } = await octokit.rest.repos.listCommits({ 
            owner, 
            repo,
            per_page: 100
        });

        const commits = rawCommits.map(c => ({
            author: c.commit.author.name,
            timestamp: c.commit.author.date,
            message: c.commit.message
        }));

        const { data: rawPRs } = await octokit.rest.pulls.list({ 
            owner, 
            repo,
            state: 'closed',
            per_page: 50
        });

        const closedPRs = rawPRs.map(pr => ({
            created_at: pr.created_at,
            closed_at: pr.closed_at,
            merged_at: pr.merged_at
        }));

        const { data: rawStats } = await octokit.rest.repos.getContributorsStats({
            owner,
            repo
        });

        const contributors = Array.isArray(rawStats) ? rawStats.map(stat => ({
            handle: stat.author.login,
            total_commits: stat.total
        })) : [];
    
        let dependencies = [];

        try {
            const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
            const defaultBranch = repoData.default_branch;

            const { data: treeData } = await octokit.rest.git.getTree({
                owner,
                repo,
                tree_sha: defaultBranch,
                recursive: "true" 
            });

            const manifestFiles = treeData.tree.filter(item => 
                item.type === 'blob' && 
                !item.path.includes('node_modules/') && 
                (item.path.endsWith('package.json') || item.path.endsWith('requirements.txt'))
            );

            for (const file of manifestFiles) {
                const { data: blobData } = await octokit.rest.git.getBlob({
                    owner,
                    repo,
                    file_sha: file.sha
                });

                const decodedContent = Buffer.from(blobData.content, 'base64').toString('utf-8');
                
                let parsedContent = decodedContent;
                if (file.path.endsWith('package.json')) {
                    try {
                        parsedContent = JSON.parse(decodedContent);
                    } catch (e) {
                        parsedContent = decodedContent;
                    }
                }

                dependencies.push({
                    path: file.path, 
                    type: file.path.split('/').pop(), 
                    content: parsedContent
                });
            }

        } catch (err) {
            console.error("Failed to fetch recursive dependency tree:", err.message);
        }

        const pythonPayload = {
            repository: { owner, repo },
            commits,
            pull_requests: closedPRs,
            contributors,
            dependencies
        };

        const pythonServiceUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000/analyze';
        
        fetch(pythonServiceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pythonPayload)
        }).catch(err => {
            console.error("Background Python trigger failed:", err.message);
        });
        
        return res.status(202).json({ 
            message: "Repository queued for analysis in the background.",
            status: "queued"
        });

    } catch (error) {
        console.error("Octokit Error:", error);
        return res.status(500).json({ error: "Failed to fetch from GitHub" });
    }
};