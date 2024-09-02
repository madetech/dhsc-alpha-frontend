import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register-page/RegisterPage";
import LoginPage from "./pages/login-page/LoginPage";
import AscofPage from "./pages/ascof-page/AscofPage";
import GetAscofData from "./api/api";

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
    path: "/ascof",
    element: <AscofPage />,
    loader: async () => {
      const ascofData = await GetAscofData();
      return { ascofData };
    },
  },
]);

export default router;
