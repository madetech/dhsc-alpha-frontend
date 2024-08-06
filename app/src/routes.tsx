import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AboutPage from './pages/aboutPage/AboutPage';
import AscofPage from './pages/ascofPage/AscofPage';
import ChartPlaceholderPage from './pages/chartPlaceholderPage/ChartPlaceholderPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: 'ascof',
        element: <AscofPage />,
    },
    {
        path: 'chart-placeholders',
        element: <ChartPlaceholderPage />,
    },
]);

export default router;
