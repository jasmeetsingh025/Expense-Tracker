import { useState, useEffect } from 'react';
import { Navbar, LeftSideBar, MainSection } from './components/index.js';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
    if (isLoggedIn) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className="wrapper isolate">
      <Navbar />
      <div className="hero lg:pt-14.25 grid min-h-dvh grid-cols-1 grid-rows-[1fr_1px_auto_1px_auto] pt-[56px] lg:grid-cols-[18rem_2.5rem_minmax(0,1fr)_2.5rem] xl:grid-cols-[18rem_2.5rem_minmax(0,1fr)_2.5rem]">
        <LeftSideBar />
        <div className="[--mixed-border:var(--color-white)]/10 col-start-2 row-span-5 row-start-1 border-x border-x-[var(--mixed-border)] bg-[image:repeating-linear-gradient(315deg,_var(--mixed-border)_0,_var(--mixed-border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden"></div>
        <MainSection />
        <div className="[--mixed-border:var(--color-white)]/10 col-start-4 row-span-5 row-start-1 border-x border-x-[var(--mixed-border)] bg-[image:repeating-linear-gradient(315deg,_var(--mixed-border)_0,_var(--mixed-border)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed max-lg:hidden"></div>
      </div>
    </div>
  );
}

export default App;

//#d8d8d8
