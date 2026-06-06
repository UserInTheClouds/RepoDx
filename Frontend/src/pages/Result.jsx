import { Link, Navigate } from 'react-router-dom';
import FinalScore from './components/FinalScore.jsx';
import CommitCount from './components/CommitCount.jsx';
import BusFactor from './components/BusFactor.jsx';
import Dependencies from './components/Dependencies.jsx';
import PRVelocity from './components/PRVelocity.jsx';


export default function Result({ health_data, is_loading }) {
    if (is_loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-amber-50/15">
                <p className="text-xl text-slate-500 animate-pulse font-medium">Rendering Dashboard</p>
            </div>
        );
    }

    if (!health_data) {
        return <Navigate to="/input" />;
    }

    const {
        health_score,
        bus_factor_risk,
        dependency_penalty_score,
        pr_velocity_days,
        commit_history,
        max_zscore,
        dependencies,
        is_archived,
        is_fork,
        owner,
        repo
    } = health_data;

    return (
        <div className="min-h-screen bg-amber-50/15 relative pb-12 font-sans">
            <header className="absolute top-0 left-0 w-full z-50">
                <div className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-normal tracking-tight text-slate-900 hover:text-slate-600 transition-colors">
                        RepoDx
                    </Link>
                    <button
                        onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                        Log Out
                    </button>
                </div>
            </header>


            <div className="max-w-7xl mx-auto p-6 pt-28">
                {is_archived && (
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-medium shadow-sm">
                        This repository is archived. The score reflects its historical state.
                    </div>
                )}
                {is_fork && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl font-medium shadow-sm">
                        This is a fork. Commits and PRs include upstream data.
                    </div>
                )}

                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h2 className="text-3xl font-medium text-slate-900 tracking-tight">
                            Analytics Dashboard
                        </h2>
                        {owner && repo && (
                            <p className="text-slate-950 mt-1 font-normal">
                                <span className="text-green-600 font-mono">{owner}/{repo}</span>
                            </p>
                        )}
                    </div>
                    <Link to="/input" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors shadow-sm">
                        Analyze Another
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <div className="md:col-span-1 flex flex-col gap-6">
                            <div className="flex-1">
                                <FinalScore health_score={health_score} />
                            </div>
                            <div className="flex-1">
                                <BusFactor bus_factor_risk={bus_factor_risk} />
                            </div>
                            <div className="flex-1">
                                <PRVelocity pr_velocity_days={pr_velocity_days} />
                            </div>
                        </div>


                    </div>

                    <div className="md:col-span-2">
                        <CommitCount
                            commit_history={commit_history}
                            max_zscore={max_zscore}
                        />
                    </div>

                    <div className="md:col-span-3">
                        <Dependencies
                            dependencies={dependencies}
                            dependency_penalty_score={dependency_penalty_score}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
