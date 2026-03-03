import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProvider from "./context/userContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import GeneratorPage from "./pages/GeneratorPage";
import { PromptContextProvider } from "./context/PromptReducer";
import TestPage from "./pages/TestPage";
import { TestContextProvider } from "./context/testContext";
import ResultPage from "./pages/ResultPage";
import { ResultContextProvider } from "./context/resultContext";
import HistoryPage from "./pages/HistoryPage";
import PageNotFound from "./pages/PageNotFound";

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
        <ResultPage />
      ),
      path: "/result",
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
        {
          path: "/history",
          element: <HistoryPage />
        }
      ],
    },
    {
      path:"*",
      element:<PageNotFound/>
    }
  ]);

  return (
    <UserProvider>
      <TestContextProvider>
        <ResultContextProvider>
          <RouterProvider router={Router} />
        </ResultContextProvider>
      </TestContextProvider>
    </UserProvider>
  );
}

export default App;
