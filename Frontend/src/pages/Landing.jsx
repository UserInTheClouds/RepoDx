import { Link } from 'react-router-dom';


export default function Landing() {
    const loginWithGithub = () => {
        window.location.href = `/api/auth/github`;
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-amber-50/15 text-slate-900">
            <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative">
                <div className="text-3xl font-md tracking-tight text-slate-900">
                    RepoDx
                </div>
                <button
                    onClick={loginWithGithub}
                    className="hover:cursor-pointer px-5 py-2.5 bg-stone-900 hover:bg-black/75 text-white font-medium rounded-lg shadow flex items-center gap-2 transition-all duration-100">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5 invert" />
                    Login
                </button>
            </header>

            <main className="flex-1 flex items-center justify-center p-8 max-w-7xl mx-auto w-full relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

                    <div className="space-y-8">
                        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            Analyze your <br /> Repositories
                        </h1>
                        <p className="text-xl text-slate-700 leading-relaxed max-w-lg">
                            Instantly analyze the health, momentum, and dependencies of any GitHub repository.
                            Log in with your GitHub account to start analyzing.
                        </p>

                        <button
                            onClick={loginWithGithub}
                            className="hover:cursor-pointer px-6 py-3.5 bg-stone-800 hover:bg-black/75 text-white font-medium rounded-lg shadow-md flex items-center gap-3 transition-all duration-100 w-max">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5 invert" />
                            Login with GitHub
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden">

                        <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-6">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Repository Analysis</h3>
                                <p className="text-sm text-slate-500 mt-1">owner/sample-repo</p>
                            </div>
                            <div className="text-right">
                                <span className="block text-5xl font-black text-emerald-500">92<span className="text-2xl text-slate-300">/100</span></span>
                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mt-1 block">Excellent</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-medium">Commit Momentum</span>
                                    <span className="text-slate-900 font-bold">100</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-emerald-500 h-2.5 rounded-full"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-medium">PR Velocity</span>
                                    <span className="text-slate-900 font-bold">100</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-emerald-500 h-2.5 rounded-full"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-medium">Bus Factor</span>
                                    <span className="text-slate-900 font-bold">85</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-slate-600 font-medium">Dependency Score</span>
                                    <span className="text-slate-900 font-bold">90</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
