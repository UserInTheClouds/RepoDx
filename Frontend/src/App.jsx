import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Input from './pages/Input';
import Result from './pages/Result';
import './App.css';

function App() {
  const [health_data, setHealthData] = useState(null);
  const [is_loading, setIsLoading] = useState(false);
  const [error_message, setErrorMessage] = useState(null);
  const [target_url, setTargetUrl] = useState('');

  return (
    <div className="min-h-screen bg-amber-50/15 text-slate-900 font-sans selection:bg-indigo-200 selection:text-slate-900">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/input"
            element={
              <Input
                health_data={health_data} setHealthData={setHealthData}
                is_loading={is_loading} setIsLoading={setIsLoading}
                error_message={error_message} setErrorMessage={setErrorMessage}
                target_url={target_url} setTargetUrl={setTargetUrl}
              />
            }
          />
          <Route path="/result" element={<Result health_data={health_data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
