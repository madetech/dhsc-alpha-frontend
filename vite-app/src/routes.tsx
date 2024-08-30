import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/register-page/RegisterPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterPage />,
  },
]);

export default router;
