import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./context/userContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const Router = createBrowserRouter([
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
      ],
    },
  ]);

  return (
    <UserProvider>
      <RouterProvider router={Router} />
    </UserProvider>
  );
}

export default App;
