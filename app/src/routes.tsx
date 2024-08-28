import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import AboutPage from './pages/aboutPage/AboutPage';
import AscofPage from './pages/ascofPage/AscofPage';
import ChartPlaceholderPage from './pages/chartPlaceholderPage/ChartPlaceholderPage';
import HomePage from './pages/homePage/HomePage';
import LoginPage from './pages/loginPage/LoginPage';
import AccountConformationPage from './pages/registrationFlow/accountConformationPage/AccountConformationPage';
import CreatePasswordPage from './pages/registrationFlow/createPasswordPage/CreatePasswordPage';
import EmailAddressPage from './pages/registrationFlow/emailAddressPage/EmailAddressPage';
import EmailVerificationPage from './pages/registrationFlow/emailVerificationPage/EmailVerificationPage';
import FirstNameAndLastNamePage from './pages/registrationFlow/firstNameAndLastNamePage/FirstNameAndLastNamePage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/registration',
        children: [
            {
                path: 'first-name-last-name',
                element: <FirstNameAndLastNamePage />,
            },
            {
                path: 'email',
                element: <EmailAddressPage />,
            },
            {
                path: 'email-verification',
                element: <EmailVerificationPage />,
            },
            {
                path: 'create-password',
                element: <CreatePasswordPage />,
            },
            {
                path: 'account-conformation',
                element: <AccountConformationPage />,
            },
        ],
    },
    {
        path: '/about',
        element: <AboutPage />,
    },
    {
        path: 'ascof',
        element: <ProtectedRoute element={<AscofPage />} />,
    },
    {
        path: 'chart-placeholders',
        element: <ChartPlaceholderPage />,
    },
]);

export default router;
