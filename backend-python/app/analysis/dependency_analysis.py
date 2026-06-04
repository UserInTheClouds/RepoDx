# pyrefly: ignore [missing-import]
import httpx
import asyncio
import re

def parse_major_version(version_str: str) -> int:
    cleaned = re.sub(r'^[^0-9]+', '', str(version_str))
    try:
        return int(cleaned.split('.')[0])
    except (ValueError, IndexError):
        return 0

def calculate_version_penalty(declared_version: str, latest_version: str) -> int:
    diff = parse_major_version(latest_version) - parse_major_version(declared_version)
    if diff <= 1: return 0
    elif diff == 2: return 2
    else: return 5

async def fetch_latest_version(client: httpx.AsyncClient, package: str, ecosystem: str) -> str:
    try:
        if ecosystem == "node":
            resp = await client.get(f"https://registry.npmjs.org/{package}/latest", timeout=3.0)
            if resp.status_code == 200: return resp.json().get("version", "0.0.0")
        elif ecosystem == "python":
            resp = await client.get(f"https://pypi.org/pypi/{package}/json", timeout=3.0)
            if resp.status_code == 200: return resp.json().get("info", {}).get("version", "0.0.0")
    except Exception:
        pass
    
    return "timeout"

async def evaluate_dependencies(dependency_files: list) -> int:
    deps_to_check = []
    
    for df in dependency_files:
        if df['type'] == 'package.json' and isinstance(df['content'], dict):
            deps = df['content'].get('dependencies', {})
            for name, ver in deps.items():
                deps_to_check.append({"name": name, "version": ver, "ecosystem": "node"})
        elif df['type'] == 'requirements.txt' and isinstance(df['content'], str):
            for line in df['content'].split('\n'):
                line = line.strip()
                if line and not line.startswith('#') and '==' in line:
                    name, ver = line.split('==', 1)
                    deps_to_check.append({"name": name.strip(), "version": ver.strip(), "ecosystem": "python"})

    if not deps_to_check: return 0

    total_penalty = 0
    
    async with httpx.AsyncClient() as client:
        tasks = [fetch_latest_version(client, dep['name'], dep['ecosystem']) for dep in deps_to_check]
        latest_versions = await asyncio.gather(*tasks, return_exceptions=True)
        
        for dep, latest in zip(deps_to_check, latest_versions):
            if latest != "timeout" and not isinstance(latest, Exception):
                total_penalty += calculate_version_penalty(dep['version'], latest)
            
    return min(total_penalty, 20)
