import React from "react";
import { useSelector } from "react-redux";
import { Button, Container, Logo } from "../index.js";
import { Link, useLocation } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

function Header({ isLoggedIn = false }) {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();

  const navItems = [
    {
      title: "Home",
      slug: "/",
    },
    {
      title: "About",
      slug: "/about",
    },
    {
      title: "Services",
      slug: "/services",
    },
    {
      title: "Contact",
      slug: "/contact",
    },
  ];

  return (
    <>
      <header className="w-full bg-primary shadow">
        <Container>
          <div className="flex items-center justify-between sm:py-4">
            <div className="flex items-center ">
              <Logo width="50px" height="50px" />
            </div>
            {isLoggedIn && (
              <nav className="hidden md:block">
                <ul className="flex space-x-4">
                  {navItems.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={item.slug}
                        className="text-text inline-block px-4 relative z-10 transition-transform transform hover:scale-105 hover:text-[#cbd5e1]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            {isLoggedIn && (
              <div className="flex items-center space-x-4 ">
                <form action="/#" className="hidden lg:block">
                  <input
                    type="search"
                    placeholder="Search"
                    className="bg-[#f1f1f1] text-text w-36 md:w-auto px-3 py-1 rounded-md"
                  />
                </form>
                <Menu
                  as="div"
                  className="relative hidden md:inline-block text-left"
                >
                  <div>
                    <MenuButton className="flex items-center rounded-full shadow-xs ring-2 hover:ring-4">
                      {/* <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 size-5 text-gray-400"
                      /> */}
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <div className="p-1">
                      <MenuItem>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                        >
                          Profile
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/settings"
                          className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                        >
                          Settings
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                        >
                          Logout
                        </Link>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            )}
            {isLoggedIn && (
              <div className="md:hidden justify-end">
                <Button className="w-full" variant="transparent">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="flex items-center p-1 rounded-md ring-0 hover:ring-1 shadow-xs hover:ring-gray-400">
                        <svg
                          className="w-9 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                          ></path>
                        </svg>
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                    >
                      <div className="p-1">
                        <MenuItem>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                          >
                            Profile
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/settings"
                            className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                          >
                            Settings
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-primary hover:bg-slate-300 hover:rounded-md"
                          >
                            Logout
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                </Button>
              </div>
            )}
            {!isLoggedIn && (
              <div className="hidden md:block">
                <Button type="button" variant="none">
                  <Link to="/login" className="text-slate-200 rounded-lg py-2 px-3 hover:text-black hover:bg-slate-300
                  transition delay-150 duration-300 ease-in">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
