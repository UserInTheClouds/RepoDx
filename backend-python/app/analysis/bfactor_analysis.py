import pandas as pd
# pyrefly: ignore [missing-import]
import numpy as np

def calculate_bus_factor(contributors_data: list) -> dict:
    if not contributors_data:
        return {"hhi": 0.0, "risk_level": "High", "distribution": []}
        
    df = pd.DataFrame(contributors_data)
    total_commits = df['commit_count'].sum()
    if total_commits == 0:
         return {"hhi": 0.0, "risk_level": "High", "distribution": []}
         
    shares = (df['commit_count'] / total_commits) * 100
    hhi = float(np.sum(shares ** 2))
    
    df['share_percentage'] = shares
    distribution = df.to_dict('records')
    
    if hhi < 1500:
        risk = "Low"
    elif hhi <= 2500:
        risk = "Medium"
    else:
        risk = "High"
        
    return {
        "hhi": hhi,
        "risk_level": risk,
        "distribution": distribution
    }
