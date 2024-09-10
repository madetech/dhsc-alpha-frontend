import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import AscofPage from "./pages/ascof-page/AscofPage";
import { getCapacityTrackerData, GetAscofData } from "./api/api";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import HomePage from "./pages/home-page/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <ProtectedRoute element={<HomePage />} />,
  },
  {
    path: "/ascof",
    element: <ProtectedRoute element={<AscofPage />} />,
    loader: async () => {
      const [ascofData, capacityTrackerData] = await Promise.all([
        GetAscofData(),
        getCapacityTrackerData("region"),
      ]);

      return { ascofData, capacityTrackerData };
    },
  },
]);

export default router;
