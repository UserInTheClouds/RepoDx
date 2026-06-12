import { useNavigate, Link } from 'react-router-dom';

export default function Input({
    health_data, setHealthData,
    is_loading, setIsLoading,
    error_message, setErrorMessage,
    target_url, setTargetUrl
}) {
    const navigate = useNavigate();

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!target_url) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/github/analyze-url`, {  //CHANGE LATER
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ github_url: target_url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to analyze repository');
            }

            setHealthData(data.data);
            navigate('/result');
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-amber-50/15 flex items-center justify-center p-4 relative">
            <header className="absolute top-0 left-0 w-full z-50">
                <div className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-normal tracking-tight text-slate-900 hover:text-slate-600 transition-colors">
                        RepoDx
                    </Link>
                    <button
                        onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-400 border border-slate-300 rounded-lg hover:bg-red-500 transition-colors cursor-pointer"
                    >
                        Log Out
                    </button>
                </div>
            </header>


            <div className="w-full max-w-2xl p-10 rounded-2xl">

                {is_loading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-6">
                        <div className="w-16 h-16 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-600 text-lg font-medium">
                            Analyzing Repository <br /> Please wait...
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-8 text-center text-slate-700">Enter a public GitHub repository URL <br /><span className='text-gray-400 font-medium text-lg'>(For example: https://github.com/openai/plugins)</span></h2>
                        <form onSubmit={handleAnalyze} className="space-y-6">
                            <div>
                                <input
                                    type="url"
                                    value={target_url}
                                    onChange={(e) => setTargetUrl(e.target.value)}
                                    placeholder="https://github.com/owner/repo"
                                    className="w-full px-6 py-4 bg-stone-100 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-400 focus:border-transparent outline-none transition-all text-lg placeholder-slate-400 text-slate-900 shadow-sm"
                                    required
                                />
                            </div>

                            {error_message && (
                                <div className="rounded-lg text-red-500 text-center font-medium">
                                    {error_message}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-black/75 hover:bg-black/70 hover:cursor-pointer text-white font-semibold rounded-xl transition-all duration-100 text-lg"
                            >
                                Analyze
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
