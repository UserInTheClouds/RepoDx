import pandas as pd

def calculate_pr_velocity(pr_data: list) -> dict:
    if not pr_data:
        return {"mean_hours": -1.0, "median_hours": -1.0, "p90_hours": -1.0, "p95_hours": -1.0}
        
    df = pd.DataFrame(pr_data)
    df = df.dropna(subset=['closed_at'])
    if df.empty:
        return {"mean_hours": -1.0, "median_hours": -1.0, "p90_hours": -1.0, "p95_hours": -1.0}
        
    df['created_at'] = pd.to_datetime(df['created_at'], utc=True, errors='coerce')
    df['closed_at'] = pd.to_datetime(df['closed_at'], utc=True, errors='coerce')
    df = df.dropna(subset=['created_at', 'closed_at'])
    
    if df.empty:
         return {"mean_hours": -1.0, "median_hours": -1.0, "p90_hours": -1.0, "p95_hours": -1.0}
    
    df['turnaround_hours'] = (df['closed_at'] - df['created_at']).dt.total_seconds() / 3600.0
    
    return {
        "mean_hours": float(df['turnaround_hours'].mean()),
        "median_hours": float(df['turnaround_hours'].median()),
        "p90_hours": float(df['turnaround_hours'].quantile(0.90)),
        "p95_hours": float(df['turnaround_hours'].quantile(0.95))
    }
