
# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import List, Optional,Any
from datetime import datetime


class RepositoryInfo(BaseModel):
    owner:str
    repo:str
    archived:Optional[bool] = False
    fork:Optional[bool] = False

class Commit(BaseModel):
    author: str
    timestamp: str
    message: str

class PullRequest(BaseModel):
    created_at: str
    closed_at: Optional[str] = None
    merged_at: Optional[str] = None

class Contributor(BaseModel):
    handle: str
    total_commits: int

class DependencyFile(BaseModel):
    path:str
    type:str
    content:Any

class AnalyzeRepoRequest(BaseModel):
    repository:RepositoryInfo
    commits:List[Commit]
    pull_requests:List[PullRequest]
    contributors:List[Contributor]
    dependencies:List[DependencyFile]


