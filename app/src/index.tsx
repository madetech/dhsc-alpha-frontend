import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/homePage/HomePage';
import AboutPage from './pages/aboutPage/AboutPage';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about-page" element={<AboutPage />} />
            </Routes>
        </Router>
    </React.StrictMode>
);
