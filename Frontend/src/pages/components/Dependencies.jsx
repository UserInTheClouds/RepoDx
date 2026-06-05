import InfoTooltip from './InfoToolTip';

export default function Dependencies({ dependencies, dependency_penalty_score }) {
    const get_lag_color = (lag) => {
        if (lag >= 3) return "text-red-600 font-semibold";
        if (lag === 2) return "text-amber-600 font-medium";
        return "text-slate-700";
    };

    const tooltip_text = "Dependency Penalty \n\nLower penalty is better.\nChecks how many major versions behind your dependencies are compared to the latest releases.\n\nImprove this by regularly updating packages.";

    const regularDeps = dependencies ? dependencies.filter(d => !d.is_dev) : [];
    const devDeps = dependencies ? dependencies.filter(d => d.is_dev) : [];

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative">
            <div className="absolute top-4 right-4">
                <InfoTooltip content={tooltip_text} />
            </div>
            <div className="flex justify-between items-center mb-6 pr-8">
                <h3 className="text-lg font-medium text-slate-600">Dependencies</h3>
                <span className="text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    Penalty: -{dependency_penalty_score}
                </span>
            </div>

            {dependencies && dependencies.length > 0 ? (
                <div className="max-h-64 overflow-y-auto pr-2 space-y-6">

                    {regularDeps.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">Dependencies</h4>
                            <ul className="space-y-2">
                                {regularDeps.map((dep, index) => (
                                    <li key={`reg-${index}`} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <span className="font-mono text-sm text-slate-800">{dep.name}</span>
                                        <span className={`text-sm ${get_lag_color(dep.lag)}`}>
                                            {dep.lag > 0 ? `${dep.lag} major versions behind` : "Up to date"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {devDeps.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-1">Dev Dependencies</h4>
                            <ul className="space-y-2">
                                {devDeps.map((dep, index) => (
                                    <li key={`dev-${index}`} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                                        <span className="font-mono text-sm text-slate-800">{dep.name}</span>
                                        <span className={`text-sm ${get_lag_color(dep.lag)}`}>
                                            {dep.lag > 0 ? `${dep.lag} major versions behind` : "Up to date"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>

            ) : (
                <div className="text-slate-500 text-sm italic py-8 text-center bg-slate-50 rounded-lg">
                    No supported package manifests (package.json or requirements.txt) found.
                </div>
            )}
        </div>
    );
}
