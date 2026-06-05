import InfoTooltip from './InfoToolTip.jsx';

export default function PRVelocity({ pr_velocity_days }) {
    let card_color = "bg-white border-slate-200";
    let text_color = "text-slate-900";
    let display_text = "";
    let description = "";

    if (pr_velocity_days === "N/A" || pr_velocity_days === undefined) {
        card_color = "bg-slate-50 border-slate-200";
        text_color = "text-emerald-600";
        display_text = "NOT APPLICABLE";
        description = "No closed pull requests found. This is perfectly normal for solo projects or direct-commit workflows.";
    } else if (pr_velocity_days > 3.0) {
        card_color = "bg-red-50 border-red-200";
        text_color = "text-red-700";
        display_text = `${pr_velocity_days} Days`;
        description = "PRs are taking over 3 days to merge. This creates merge conflicts and bottlenecks.";
    } else {
        card_color = "bg-emerald-50 border-emerald-200";
        text_color = "text-emerald-700";
        display_text = `${pr_velocity_days} Days`;
        description = "Excellent turnaround time! The team reviews and merges code efficiently.";
    }

    const tooltip_text = "PR Velocity\n\nLower is better.\nMeasures the average time it takes to close or merge a Pull Request.";

    return (
        <div className={`p-6 rounded-2xl shadow-sm border h-full flex flex-col justify-center relative ${card_color}`}>
            <div className="absolute top-4 right-4">
                <InfoTooltip content={tooltip_text} />
            </div>
            <h3 className="text-lg font-medium opacity-70 mb-2">PR Velocity <span className='text-sm text-gray-500'>(Last 300 PRs)</span></h3>
            <div className={`text-3xl font-bold mb-3 ${text_color}`}>
                {display_text}
            </div>
            <p className={`text-sm ${text_color} opacity-90`}>
                {description}
            </p>
        </div>
    );
}
