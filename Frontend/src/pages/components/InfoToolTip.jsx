export default function InfoTooltip({ content }) {
    return (
        <div className="relative group ml-2 inline-block">
            <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </button>
            <div className="z-25 absolute right-0 bottom-full mb-2 hidden group-hover:block w-72 p-4 bg-slate-800 text-white text-sm rounded-xl shadow-xl z-50">
                <p className="whitespace-pre-wrap">{content}</p>
                <div className="absolute right-2 -bottom-1 w-3 h-3 bg-slate-800 transform rotate-45"></div>
            </div>
        </div>
    );
}
