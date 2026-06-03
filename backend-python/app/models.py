
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Commit(BaseModel):
    author: str
    timestamp: str
    message: str

class CommitAnalyzeRequest(BaseModel):
    commits: List[Commit]

class PullRequest(BaseModel):
    created_at: str
    closed_at: Optional[str] = None

class PRAnalyzeRequest(BaseModel):
    prs: List[PullRequest]

class Contributor(BaseModel):
    author: str
    commit_count: int

class ContributorAnalyzeRequest(BaseModel):
    contributors: List[Contributor]


