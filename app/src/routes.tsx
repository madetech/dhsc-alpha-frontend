import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AboutPage from './pages/aboutPage/AboutPage';
import CensusExample from './pages/censusExamplePage/CensusExample';
import AscofPage from './pages/ascofPage/AscofPage';

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
        path: 'census_example',
        element:    <CensusExample />,
    },
    {
        path: 'ascof',
        element:    <AscofPage />,
    }
]);

export default router;
