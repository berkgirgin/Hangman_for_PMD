import { Outlet } from "react-router-dom";

import { StartPage } from "./pages/StartPage";
import { GamePage } from "./pages/GamePage";

function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
