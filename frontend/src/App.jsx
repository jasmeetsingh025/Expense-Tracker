import { useState } from "react";
import { Header, Hero } from "./components/index.js";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-primary text-white">
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn && location.pathname === '/' && <Hero />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;

//#d8d8d8
