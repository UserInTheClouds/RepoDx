def calculate_final_score(commit_momentum: dict, pr_velocity: dict, bus_factor: dict, dependency_penalty: int) -> dict:
    # Task 3: Start with 100.0
    base_score = 100.0
    
    pr_days = pr_velocity["mean_hours"] / 24.0
    pr_penalty = 10 if pr_days > 3.0 else 0
    
    bus_risk = bus_factor["risk_level"]
    if bus_risk == "High": bus_penalty = 15
    elif bus_risk == "Medium": bus_penalty = 5
    else: bus_penalty = 0
        
    is_drift = commit_momentum["anomaly_detected"]
    momentum_status = "Unstable Drift" if is_drift else "Stable"
    momentum_penalty = 10 if is_drift else 0
    
    total_penalty = pr_penalty + bus_penalty + momentum_penalty + dependency_penalty
    final_health_score = int(base_score - total_penalty)
    
    final_health_score = max(10, min(100, final_health_score))
    
    return {
        "health_score": final_health_score,
        "bus_factor_risk": bus_risk,
        "pr_velocity_days": round(pr_days, 2),
        "momentum_drift_status": momentum_status,
        "dependency_penalty_score": dependency_penalty
    }
