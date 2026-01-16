import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Login from './pages/Login';
import Home from './pages/Home';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Copilot from './pages/Copilot';
import Discover from './pages/Discover';
import Local from './pages/Local';
import LostAndFound from './pages/LostAndFound';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);

  const handleLoadingComplete = () => {
    setAppState(AppState.LOGIN);
  };

  if (appState === AppState.LOADING) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={appState === AppState.LOGIN ? <Navigate to="/login" /> : <Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/copilot" element={<Copilot />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/local" element={<Local />} />
        <Route path="/lost-found" element={<LostAndFound />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;