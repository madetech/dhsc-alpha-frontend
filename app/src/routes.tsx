import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import { getCapacityTrackerData } from "./api/api";
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
    loader: async () => {
      const capacityTrackerTotalHoursAgencyWorkedByRegionData =
        await getCapacityTrackerData("region");
      return { capacityTrackerTotalHoursAgencyWorkedByRegionData };
    },
  },
]);

export default router;
