import React, { useState, useEffect } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import StartPage from './pages/StartPage'
import IntroducePage from "./pages/IntroducePage";
import PreviewPage from "./pages/PreviewPage";
import BrainstormingPage from "./pages/BrainstormingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Spinner from "./components/loadSpinner";
import { ThemeProvider } from "./contexts/ThemeContext";
import TitleBar from "./layout/TitleBar";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>
  },
  {
    path: "/introduction",
    element: <IntroducePage/>
  },
  {
    path: "/preview",
    element: <PreviewPage/>
  },
  {
    path: "/brainstorming",
    element: <BrainstormingPage/>
  },
  {
    path: "*",
    element: <NotFoundPage/>
  }
]
);

function App(): React.JSX.Element {
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return (
        <ThemeProvider>
          <TitleBar />
          <Spinner /> 
        </ThemeProvider>
      );
    }

  return (
    <ThemeProvider>
      <TitleBar />
      <RouterProvider router={router}/>
      {/* <BrainstormingPage/> */}
    </ThemeProvider>            
  )
}

export default App