import { Link, Navigate } from 'react-router-dom';

export default function Result({ health_data }) {
    if (!health_data) {
        return <Navigate to="/input" />;
    }

    const { is_archived, is_fork } = health_data;

    return (
        <div className="min-h-screen relative">

            <header className="absolute top-0 left-0 w-full z-50">
                <div className="w-full max-w-7xl mx-auto p-6">
                    <Link to="/" className="text-3xl font-normal tracking-tight text-slate-900 hover:text-slate-600 transition-colors">
                        RepoDx
                    </Link>
                </div>
            </header>
            <div className="max-w-4xl mx-auto p-8 pt-28">

                {is_archived && (
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl font-medium shadow-sm">
                        This repository is archived. The score reflects its historical state, but it is no longer actively maintained.
                    </div>
                )}
                {is_fork && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl font-medium shadow-sm">
                        This is a fork. Commits and PRs include upstream data, which may artificially inflate these scores.
                    </div>
                )}

                <h2 className="text-3xl font-normal text-slate-900 tracking-tight mb-4">
                    Analysis Complete
                </h2>
                <Link to="/input" className="text-cyan-500 hover:text-slate-900 font-medium transition-colors">
                    Analyze Another Repository
                </Link>
            </div>

            <div className="max-w-4xl mx-auto px-8 pb-8">
                <div className="bg-gray-100 border-2 border-slate-200 rounded-2xl p-8 shadow-lg">
                    <pre className="text-slate-700 overflow-x-auto whitespace-pre-wrap font-mono text-sm bg-slate-50 p-6 rounded-xl border border-slate-100">
                        {JSON.stringify(health_data, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    );

}
