import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InfoTooltip from './InfoToolTip.jsx';

export default function CommitCount({ commit_history, momentum_drift_status }) {
    const show_warning = momentum_drift_status === "Declining" || momentum_drift_status === "Unstable";
    const tooltip_text = "Commit Momentum\n\nShows commit volume over time.\n\nNote: A declining graph triggers a warning, but for mature projects, low commit frequency is completely normal and doesn't affect the final health score.";

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative h-full flex flex-col">

            <div className="absolute top-4 right-4 z-10">
                <InfoTooltip content={tooltip_text} />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-4">Commit Momentum <span className='text-sm text-gray-400'>(Last 300 Commits)</span></h3>

            {show_warning && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm font-medium">
                    Commits are declining or showing structural anomalies.
                </div>
            )}
            <p className="text-xs text-slate-500 mb-6 italic">
                (Note: Commit frequency alone doesn't indicate health for mature or stable projects.)
            </p>

            {commit_history && commit_history.length > 0 ? (
                <div className="flex-1 w-full min-h-[16rem] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={commit_history}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                            <YAxis stroke="#94a3b8" fontSize={12} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Line type="monotone" dataKey="volume" stroke="#6366f1" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400 text-sm min-h-[16rem]">
                    Not enough historical commit data to generate a trend
                </div>
            )}

        </div>
    );
}
