import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./Pages/Error";
import LogIn from "./Pages/LogIn";
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import JournalLandingPage from "./Pages/Journal";
import Meny from "./Pages/menu";
import LoggedOut from "./Pages/LoggedOut";
import CompilationJournal from "./Pages/CompilationJournal";
import AllJournals from "./Pages/AllJournals";
import UserAccount from "./Pages/UserAccount";
import Form from "./Pages/Form";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn />,
    },
    {
      path: "/LoggedOut",
      element: <LoggedOut />,
    },
    {
      element: <ProtectedRoutes />,
      children: [
        {
          path: "/Journal",
          element: <JournalLandingPage />,
        },
        {
          path: "/Meny",
          element: <Meny />,
        },
        {
          path: "/Form",
          element: <Form />,
        },
        {
          path: "/CompilationJournal",
          element: <CompilationJournal />,
        },
        {
          path: "/AllJournals",
          element: <AllJournals />,
        },
        {
          path: "/UserAccount",
          element: <UserAccount />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
