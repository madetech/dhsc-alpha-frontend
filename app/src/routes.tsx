import { createBrowserRouter, Outlet } from "react-router-dom";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import { getCapacityTrackerData } from "./api/api";
import ProtectedRoute from "./components/util-components/protected-route/ProtectedRoute";
import HomePage from "./pages/home-page/HomePage";
import CapacityTrackerTotalHoursWorkedByAgencyPage from "./pages/metric-pages/capacity-tracker-total-hours-worked-by-agency/CapacityTrackerTotalHoursWorkedByAgencyPage";

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
    path: "/metric",
    element: <Outlet />,
    children: [
      {
        path: "/metric/capacity-tracker-total-hours-by-agency",
        element: (
          <ProtectedRoute
            element={<CapacityTrackerTotalHoursWorkedByAgencyPage />}
          />
        ),
        loader: async () => {
          const capacityTrackerTotalHoursAgencyWorkedByRegionData =
            await getCapacityTrackerData("region");
          return { capacityTrackerTotalHoursAgencyWorkedByRegionData };
        },
      },
    ],
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
