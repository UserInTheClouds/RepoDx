import { Octokit } from 'octokit'
import prisma from '../utilities/db.js'
import { runPythonAnalysis } from './python.controller.js';

export const getRepoData = async (req, res) => {
    try {
        if (!req.user || !req.user.github_id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const octokit = new Octokit({
            auth: req.user.access_token
        });

        const repoUrl = req.body.github_url;

        if (!repoUrl || typeof repoUrl !== 'string') {
            return res.status(400).json({ error: "Repository URL is required" });
        }

        let parsedUrl;
        try {
            parsedUrl = new URL(repoUrl.trim());
        } catch (err) {
            return res.status(400).json({ error: "Invalid URL format" });
        }

        if (parsedUrl.hostname !== "github.com" && parsedUrl.hostname !== "www.github.com") {
            return res.status(400).json({ error: "URL must be a valid github repository" });
        }

        const urlParts = new URL(repoUrl).pathname.split('/').filter(Boolean);
        const owner = urlParts[urlParts.length - 2];
        const repo = urlParts[urlParts.length - 1].replace('.git', '');

        const [commitPages, prPages] = await Promise.all([
            Promise.all([1, 2, 3].map(page => octokit.rest.repos.listCommits({ owner, repo, per_page: 100, page }))),
            Promise.all([1, 2, 3].map(page => octokit.rest.pulls.list({ owner, repo, state: 'closed', per_page: 100, page })))
        ]);

        const rawCommits = commitPages.flatMap(response => response.data);
        const rawPRs = prPages.flatMap(response => response.data);

        const commits = rawCommits.map(c => ({
            author: c.commit.author.name,
            timestamp: c.commit.author.date,
            message: c.commit.message
        }));

        const closedPRs = rawPRs
            .filter(pr => pr.merged_at !== null)
            .filter(pr => pr.user && pr.user.type !== 'Bot' && !pr.user.login.toLowerCase().includes('bot'))
            .map(pr => ({
                created_at: pr.created_at,
                closed_at: pr.closed_at,
                merged_at: pr.merged_at
            }));

        let rawStats = [];
        for (let i = 0; i < 4; i++) {
            const response = await octokit.rest.repos.getContributorsStats({ owner, repo });
            if (response.status === 200) {
                rawStats = response.data;
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1500));
        }

        const contributors = Array.isArray(rawStats) ? rawStats.map(stat => ({
            handle: stat.author.login,
            total_commits: stat.total
        })) : [];

        let dependencies = [];
        let repoData;

        try {
            const response = await octokit.rest.repos.get({ owner, repo });
            repoData = response.data;
            const defaultBranch = repoData.default_branch;

            const { data: treeData } = await octokit.rest.git.getTree({
                owner,
                repo,
                tree_sha: defaultBranch,
                recursive: "true"
            });

            let manifestFiles = treeData.tree.filter(item =>
                item.type === 'blob' &&
                !item.path.includes('node_modules/') &&
                (item.path.endsWith('package.json') || item.path.endsWith('requirements.txt'))
            );

            manifestFiles.sort((a, b) => {
                const depthA = a.path.split('/').length;
                const depthB = b.path.split('/').length;
                return depthA - depthB;
            });

            const filesToFetch = manifestFiles.slice(0, 5);

            for (const file of filesToFetch) {
                try {
                    const { data: blobData } = await octokit.rest.git.getBlob({
                        owner,
                        repo,
                        file_sha: file.sha
                    });

                    const decodedContent = Buffer.from(blobData.content, 'base64').toString('utf-8');
                    let parsedContent = decodedContent;

                    if (file.path.endsWith('package.json')) {
                        try { parsedContent = JSON.parse(decodedContent); }
                        catch (e) { parsedContent = decodedContent; }
                    }

                    dependencies.push({
                        path: file.path,
                        type: file.path.split('/').pop(),
                        content: parsedContent
                    });
                } catch (e) {
                    console.error(`Failed to fetch blob for ${file.path}`);
                }
            }

        } catch (err) {
            console.error("Failed to fetch recursive dependency tree:", err.message);
        }


        const pythonPayload = {
            repository: { owner, repo, archived: repoData.archived, fork: repoData.fork },
            commits,
            pull_requests: closedPRs,
            contributors,
            dependencies
        };

        const finalScores = await runPythonAnalysis(
            pythonPayload,
            req.user.github_id,
            repoData.id
        );

        return res.status(200).json({
            message: "Analysis complete",
            data: finalScores
        });

    } catch (error) {
        console.error("Octokit Error:", error);
        return res.status(500).json({ error: "Failed to fetch from GitHub" });
    }
};