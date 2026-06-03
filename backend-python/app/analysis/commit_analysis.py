import pandas as pd
# pyrefly: ignore [missing-import]
import numpy as np
# pyrefly: ignore [missing-import]
from scipy.stats import zscore

def calculate_commit_momentum(commits_data: list) -> dict:
    if not commits_data:
        return {"anomaly_detected": False, "max_zscore": 0.0, "weekly_data": []}
    
    df = pd.DataFrame(commits_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'], utc=True, errors='coerce')
    df = df.dropna(subset=['timestamp'])
    
    if df.empty:
        return {"anomaly_detected": False, "max_zscore": 0.0, "weekly_data": []}
        
    df.set_index('timestamp', inplace=True)
    weekly_commits = df.resample('W').size()
    
    if len(weekly_commits) < 2 or weekly_commits.std() == 0:
        return {"anomaly_detected": False, "max_zscore": 0.0, "weekly_data": []}
        
    z_scores = zscore(weekly_commits)
    
    weekly_data = []
    for date, count, z in zip(weekly_commits.index, weekly_commits.values, z_scores):
        weekly_data.append({
            "week": date.strftime('%Y-%m-%d'),
            "commit_count": int(count),
            "z_score": float(z),
            "is_anomaly": abs(float(z)) > 2.0
        })

    max_z = float(np.max(np.abs(z_scores)))
    
    return {
        "anomaly_detected": max_z > 2.0,
        "max_zscore": max_z,
        "weekly_data": weekly_data
    }
