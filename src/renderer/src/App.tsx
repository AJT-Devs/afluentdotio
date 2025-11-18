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
],
  {
    future:{
      v7_viewTransition: false
    }
  }
);

function App(): React.JSX.Element {
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // ================================================================
    // ===== ADICIONE ESTE NOVO useEffect PARA CORRIGIR O BUG =====
    // ================================================================
    useEffect(() => {
      console.log('App.tsx: Iniciando "MutationObserver" contra view-transition-name...');
      
      const htmlElement = document.documentElement; // O <html>

      // Crie um "observador" que reage a mudanças
      const observer = new MutationObserver((mutationsList) => {
        // Itere sobre todas as mudanças que aconteceram
        for (const mutation of mutationsList) {
          // Nós só nos importamos com mudanças de "style" (atributos)
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            
            // Verifique se a "prisão" foi adicionada
            if (htmlElement.style.viewTransitionName === 'root') {
              
              // Remova-a IMEDIATAMENTE.
              htmlElement.style.viewTransitionName = 'none';
              console.warn('App.tsx (MutationObserver): "view-transition-name" foi removido à FORÇA!');
            }
          }
        }
      });

      // Diga ao observador para assistir o <html>
      // e só se importar com mudanças de "attributes" (estilos inline)
      observer.observe(htmlElement, { attributes: true });

      // Limpe o observador quando o app for fechado
      return () => observer.disconnect();

    }, []); // O array vazio [] garante que isso rode apenas uma vez.
    // ================================================================

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