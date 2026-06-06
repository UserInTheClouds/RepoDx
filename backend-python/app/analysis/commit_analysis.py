import pandas as pd
# pyrefly: ignore [missing-import]
import numpy as np
# pyrefly: ignore [missing-import]
from scipy.stats import zscore

def calculate_commit_momentum(commits_data: list) -> dict:
    if not commits_data:
        return {"max_zscore": 0.0, "weekly_data": []}
    
    df = pd.DataFrame(commits_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'], utc=True, errors='coerce')
    df = df.dropna(subset=['timestamp'])
    
    if df.empty:
        return {"max_zscore": 0.0, "weekly_data": []}
        
    df.set_index('timestamp', inplace=True)
    weekly_commits = df.resample('D').size()
    
    if len(weekly_commits) < 2 or weekly_commits.std() == 0:
        fallback_data = [
            {
                "week": date.strftime('%Y-%m-%d'),
                "commit_count": int(count),
            }
            for date, count in zip(weekly_commits.index, weekly_commits.values)
        ]
        return {"max_zscore": 0.0, "weekly_data": fallback_data}

        
    z_scores = zscore(weekly_commits)
    
    weekly_data = []
    for date, count, z in zip(weekly_commits.index, weekly_commits.values, z_scores):
        weekly_data.append({
            "week": date.strftime('%Y-%m-%d'),
            "commit_count": int(count),
        })
    
    return {
        "max_zscore": float(np.max(np.abs(z_scores))),
        "weekly_data": weekly_data
    }
