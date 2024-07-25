import { createBrowserRouter } from "react-router-dom";
// pages
import App from "./App";
import Home from "./layouts/Home";
import Error from "./layouts/Error";
import Accordion from "./components/accordion/Accordion";
import RandomColor from "./components/random-color/RandomColor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/accordion",
        element: <Accordion />,
      },
      {
        path: "/random-color",
        element: <RandomColor />,
      },
    ],
  },
]);
