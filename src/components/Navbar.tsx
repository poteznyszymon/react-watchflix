import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { auth } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { logOut } from "../auth/firebaseLogin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import AvatarIcon from "./AvatarIcon";

const Navbar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user] = useAuthState(auth);

  const handleDrawerClick = () => {
    setOpenDrawer((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center h-24 max-w-6xl mx-auto text-slate-200">
      <Link to="/">
        <h1 className="text-red-600 uppercase text-4xl font-bold hover:text-red-500 font-bebas tracking-widest">
          watchflix
        </h1>
      </Link>
      <div className="hidden md:flex items-center">
        <Link to="/">
          <p className="p-4 hover:text-white">Home</p>
        </Link>
        <Link to="/movies">
          <p className="p-4 hover:text-white">Movies</p>
        </Link>
        <Link to="/shows">
          <p className="p-4 hover:text-white">Shows</p>
        </Link>
        <Link to="/search">
          <p className="p-4 hover:text-white">Search</p>
        </Link>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AvatarIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-mono">
                Watchlist
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logOut} className="font-mono">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AvatarIcon />
        )}
      </div>
      <div className="block md:hidden" onClick={handleDrawerClick}>
        {!openDrawer ? (
          <AiOutlineMenu size={20} />
        ) : (
          <AiOutlineClose size={20} />
        )}
      </div>
      <div
        className={
          openDrawer
            ? `fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-10`
            : `fixed left-[-100%] top-0 h-full ease-in-out duration-500 z-10`
        }
      >
        <h1 className="text-red-600 uppercase text-3xl font-bold p-7">
          watchflix
        </h1>
        <Link to="/" onClick={handleDrawerClick}>
          <p className="py-4 px-7 cursor-pointer font-semibold">Home</p>
        </Link>
        <Link to="/movies" onClick={handleDrawerClick}>
          <p className="py-4 px-7 cursor-pointer font-semibold">Movies</p>
        </Link>
        <Link to="/shows" onClick={handleDrawerClick}>
          <p className="py-4 px-7 cursor-pointer font-semibold">Shows</p>
        </Link>
        <Link to="/search" onClick={handleDrawerClick}>
          <p className="py-4 px-7 cursor-pointer font-semibold">Search</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
