import React, { useState, useEffect } from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import StartPage from './pages/StartPage'
import IntroducePage from "./pages/IntroducePage";
import PreviewPage from "./pages/PreviewPage";
import DevelopPage from "./pages/DevelopPage";
import NotFoundPage from "./pages/NotFoundPage";
import Spinner from "./components/loadSpinner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <StartPage/>
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
    path: "/develop",
    element: <DevelopPage/>
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
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
      return <Spinner />;
    }

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App