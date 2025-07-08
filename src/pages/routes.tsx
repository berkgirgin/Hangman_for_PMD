import { Navigate } from "react-router-dom";
import App from "../App";
import { Layout } from "../components/Layout";
import { NotFoundPage } from "./NotFoundPage.tsx";
import { StartPage } from "./StartPage.tsx";
import { GamePage } from "./GamePage.tsx";
import { EndPage } from "./EndPage.tsx";

import { HangmanProvider } from "../context/HangmanProvider.tsx";

export const routes = [
  {
    element: (
      <HangmanProvider>
        <Layout />
      </HangmanProvider>
    ),

    children: [
      {
        index: true,
        element: <Navigate to="/start_page" />,
      },
      {
        path: "/start_page",
        element: <StartPage />,
      },
      {
        path: "/game_page",
        element: <GamePage />,
      },
      {
        path: "/end_page/win",
        element: <EndPage isWon={true} />,
      },
      {
        path: "/end_page/lose",
        element: <EndPage isWon={false} />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
