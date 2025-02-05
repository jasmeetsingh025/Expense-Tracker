import { useState } from "react";
import { Header } from "./components/index.js";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-primary text-white">
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

//#d8d8d8
