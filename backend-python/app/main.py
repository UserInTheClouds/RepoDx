# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from pydantic import BaseModel

from app.models import CommitAnalyzeRequest, PRAnalyzeRequest, ContributorAnalyzeRequest

from app.analysis.commit_analysis import calculate_commit_momentum
from app.analysis.pr_analysis import calculate_pr_velocity
from app.analysis.bfactor_analysis import calculate_bus_factor

app = FastAPI(title="RepoDx-backend-python")

class AnalyzeRepoRequest(BaseModel):
    commits_data: CommitAnalyzeRequest
    pr_data: PRAnalyzeRequest
    contributors_data: ContributorAnalyzeRequest

@app.post("/analyze_repo")
async def analyze_repo(payload: AnalyzeRepoRequest):
    commits_list = [c.model_dump() for c in payload.commits_data.commits]
    prs_list = [pr.model_dump() for pr in payload.pr_data.prs]
    contributors_list = [contrib.model_dump() for contrib in payload.contributors_data.contributors]
    
    commit_momentum = calculate_commit_momentum(commits_list)
    pr_velocity = calculate_pr_velocity(prs_list)
    bus_factor = calculate_bus_factor(contributors_list)
    
    return {
        "metrics": {
            "commit_momentum": commit_momentum,
            "pr_velocity": pr_velocity,
            "bus_factor": bus_factor
        }
    }
