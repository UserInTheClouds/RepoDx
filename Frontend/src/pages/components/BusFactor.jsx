import InfoTooltip from './InfoToolTip.jsx';

export default function BusFactor({ bus_factor_risk }) {
    let card_color = "bg-white border-slate-200";
    let text_color = "text-slate-900";
    let display_text = bus_factor_risk;
    let description = "";

    if (bus_factor_risk === "Solo Project") {
        card_color = "bg-slate-50 border-slate-200";
        text_color = "text-emerald-600";
        display_text = "NOT APPLICABLE";
        description = "This is a solo project. A single developer owns the vast majority of contributions.";
    } else if (bus_factor_risk === "High" || bus_factor_risk === "High Risk") {
        card_color = "bg-red-50 border-red-200";
        text_color = "text-red-700";
        display_text = "High Risk";
        description = "A single developer controls too much of the architecture (based on Eigenvector Centrality).";
    } else {
        card_color = "bg-emerald-50 border-emerald-200";
        text_color = "text-emerald-700";
        display_text = "Low Risk";
        description = "Architectural knowledge is distributed across the team.";
    }

    const tooltip_text = "Bus Factor\n\nLower risk is better.\nMeasures how much the project relies on a single developer (HHI index).\n\nImprove this by having having multiple developers commit.";

    return (
        <div className={`p-6 rounded-2xl shadow-sm border h-full flex flex-col justify-center relative ${card_color}`}>
            <div className="absolute top-4 right-4">
                <InfoTooltip content={tooltip_text} />
            </div>
            <h3 className="text-lg font-medium opacity-70 mb-2">Bus Factor</h3>
            <div className={`text-3xl font-bold mb-3 ${text_color}`}>
                {display_text}
            </div>
            <p className={`text-sm ${text_color} opacity-90`}>
                {description}
            </p>
        </div>
    );
}
