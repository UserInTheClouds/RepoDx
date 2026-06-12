import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Input from './pages/Input';
import Result from './pages/Result';
import ReactGA from "react-ga4";
import Analytics from './pages/components/Analytics';
import './App.css';

ReactGA.initialize("G-335WXCHD62");

function App() {
  const [is_checking_auth, setIsCheckingAuth] = useState(true);
  const [authenticated, setIsAuthenticated] = useState(false);
  const [health_data, setHealthData] = useState(null);
  const [is_loading, setIsLoading] = useState(false);
  const [error_message, setErrorMessage] = useState(null);
  const [target_url, setTargetUrl] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const check = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile`, {
          method: "GET",
          credentials: "include"
        });
        check.ok ? setIsAuthenticated(true) : setIsAuthenticated(false);
      }
      catch (error) {
        setIsAuthenticated(false);
      }
      finally {
        setIsCheckingAuth(false);
      }
    }
    checkAuth();
  }, [])

  if (is_checking_auth) {
    return <div className="min-h-screen bg-amber-50/15 flex items-center justify-center"></div>;
  }
  return (
    <div className="min-h-screen bg-amber-50/15 text-slate-900 font-sans selection:bg-indigo-200 selection:text-slate-900">
      <BrowserRouter>
        <Analytics />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/input"
            element={
              authenticated === true ?
                <Input
                  health_data={health_data} setHealthData={setHealthData}
                  is_loading={is_loading} setIsLoading={setIsLoading}
                  error_message={error_message} setErrorMessage={setErrorMessage}
                  target_url={target_url} setTargetUrl={setTargetUrl}
                />
                : <Navigate to="/" />
            }
          />
          <Route path="/result" element={(authenticated === true) ? <Result health_data={health_data} /> : <Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
