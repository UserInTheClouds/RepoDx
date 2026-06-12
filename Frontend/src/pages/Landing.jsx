import { Link } from 'react-router-dom';
import mockDashboard from '../assets/ssfor.png';

export default function Landing() {
    const loginWithGithub = () => {
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/github`;
    };

    return (
        <div className="min-h-screen flex flex-col relative bg-amber-50/15 text-slate-900 overflow-x-hidden">
            <header className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center relative z-30">
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

            <main className="flex-1 flex flex-col items-center p-8 max-w-7xl mx-auto w-full relative gap-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full mt-8 lg:mt-12">

                    <div className="space-y-8 z-10 relative -translate-y-13 translate-x-2">
                        <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 leading-tight">
                            Analyze your <br /> Repositories
                        </h1>
                        <p className="text-xl text-slate-700 leading-relaxed max-w-lg">
                            Analyze the health, commit momentum, bus factor risk, PR velocity and dependencies of any GitHub repository.
                            Log in with your GitHub account to begin.
                        </p>

                        <button
                            onClick={loginWithGithub}
                            className="hover:cursor-pointer px-6 py-3.5 bg-stone-800 hover:bg-black/75 text-white font-medium rounded-lg shadow-md flex items-center gap-3 transition-all duration-100 w-max">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5 invert" />
                            Login with GitHub
                        </button>
                    </div>

                    <div className="w-full relative lg:w-[95%] ml-auto z-20 -translate-y-6 lg:-translate-y-12">
                        <div className="bg-white/40 backdrop-blur-xl p-3 sm:p-4 rounded-[2rem] shadow-2xl border border-white/60">
                            <img
                                src={mockDashboard}
                                alt="RepoDx Dashboard Preview"
                                className="w-full h-auto rounded-xl shadow-sm border border-slate-200 object-cover"
                            />
                        </div>
                    </div>

                </div>

                <div className="w-full pb-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">What each factor means</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Commit Momentum</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Commit volume over time. <br />Note: A declining graph triggers a warning, but for mature projects, low commit frequency is completely normal and doesn't affect the final score.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">PR Velocity</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Measures the average time it takes to close or merge a Pull Request. So, lower is better.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Bus Factor Risk</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Measures how much the project relies on a single developer (HHI index). Improve this by having having multiple developers commit.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-bold text-slate-800 mb-2">Dependency Decay</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Checks your package dependencies to see how many major versions behind they are compared to the latest releases.
                            </p>
                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
}
