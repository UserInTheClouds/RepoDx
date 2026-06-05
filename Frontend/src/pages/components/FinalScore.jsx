import InfoTooltip from './InfoToolTip.jsx';

export default function FinalScore({ health_score }) {
    const get_color = (score) => {
        if (score >= 80) return "text-emerald-500";
        if (score >= 50) return "text-amber-500";
        return "text-red-500";
    };

    const tooltip_text = "Overall Score\n\nHigher is better (0-100).\nCalculated by subtracting penalties (PR delays, Bus Factor risks, and dependency decay) from a base score of 100.\n\nImprove this by merging PRs faster, distributing commits, and keeping dependencies updated.";

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center h-full flex flex-col justify-center relative">
            <div className="absolute top-4 right-4">
                <InfoTooltip content={tooltip_text} />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-2">Final Score</h3>
            <div className={`text-7xl font-black ${get_color(health_score)}`}>
                {health_score}<span className="text-3xl text-slate-300 font-bold ml-1">/100</span>
            </div>
        </div>
    );
}
