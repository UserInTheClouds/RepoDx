# pyrefly: ignore [missing-import]
from fastapi import FastAPI
from app.models import AnalyzeRepoRequest

from app.analysis.commit_analysis import calculate_commit_momentum
from app.analysis.pr_analysis import calculate_pr_velocity
from app.analysis.bfactor_analysis import calculate_bus_factor
from app.analysis.dependency_analysis import evaluate_dependencies
from app.analysis.score_analysis import calculate_final_score

app = FastAPI(title="RepoDx-backend-python")

@app.post("/analyze")
async def analyze_repo(payload: AnalyzeRepoRequest):
    commits_list = [c.model_dump() for c in payload.commits]
    prs_list = [pr.model_dump() for pr in payload.pull_requests]
    deps_list = [dep.model_dump() for dep in payload.dependencies]
    
    contributors_list = [{"author": c.handle, "commit_count": c.total_commits} for c in payload.contributors]
    
    commit_momentum = calculate_commit_momentum(commits_list)
    pr_velocity = calculate_pr_velocity(prs_list)
    bus_factor = calculate_bus_factor(contributors_list)
    dependency_results = await evaluate_dependencies(deps_list)
    dependency_penalty = dependency_results["penalty_score"]
    
    final_results = calculate_final_score(commit_momentum, pr_velocity, bus_factor, dependency_penalty)
    final_results["is_archived"] = payload.repository.archived
    final_results["is_fork"] = payload.repository.fork
    
    final_results["commit_history"] = [
        {"week": w["week"], "volume": w["commit_count"]} 
        for w in commit_momentum.get("weekly_data", [])
    ]
    
    final_results["dependencies"] = dependency_results["dependencies_list"]
    final_results["owner"] = payload.repository.owner
    final_results["repo"] = payload.repository.repo
    
    return final_results

