import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./context/userContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import GeneratorPage from "./pages/GeneratorPage";
import { PromptContextProvider } from "./context/PromptReducer";
import TestPage from "./pages/TestPage";
import { TestContextProvider } from "./context/testContext";

function App() {
  const Router = createBrowserRouter([
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: (
        <TestPage />
      ),
      path: "/test",
    },
    {
      element: (
        <PromptContextProvider>
          <GeneratorPage />
        </PromptContextProvider>
      ),
      path: "/generator",
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
      <TestContextProvider>
        <RouterProvider router={Router} />
      </TestContextProvider>
    </UserProvider>
  );
}

export default App;
