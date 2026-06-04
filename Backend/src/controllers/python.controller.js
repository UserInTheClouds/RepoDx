import prisma from '../utilities/db.js';

export const runPythonAnalysis = async (pythonPayload, githubId, githubRepoId) => {
    const pythonServiceUrl = process.env.PYTHON_BACKEND_URL || 'http://localhost:8000/analyze';

    const pythonResponse = await fetch(pythonServiceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pythonPayload)
    });

    if (!pythonResponse.ok) {
        throw new Error(`Python engine returned status ${pythonResponse.status}`);
    }

    const analysisResults = await pythonResponse.json();

    const user = await prisma.user_account.findUnique({
        where: { github_id: githubId }
    });

    const repo = await prisma.repo_data.create({
        data: {
            user_id: user.id,
            github_repo_id: githubRepoId,
            name: pythonPayload.repository.repo,
            owner: pythonPayload.repository.owner
        }
    });

    await prisma.analysis_run.create({
        data: {
            repo_id: repo.id,
            status: "COMPLETED",
            health_score: {
                create: {
                    total_score: analysisResults.health_score,
                    commit_score: analysisResults.momentum_drift_status === "Unstable Drift" ? 90.0 : 100.0,
                    pr_velocity_score: analysisResults.pr_velocity_days > 3.0 ? 90.0 : 100.0,
                    bus_factor_score: analysisResults.bus_factor_risk === "High" ? 85.0 : 100.0,
                    dependency_score: 100.0 - analysisResults.dependency_penalty_score
                }
            }
        }
    });

    return analysisResults;
};
