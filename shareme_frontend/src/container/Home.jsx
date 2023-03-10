import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, User } from "../components";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { client } from "../client";
import logo from "../assets/logo.png";
import jwtDecode from "jwt-decode";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const token =
    localStorage.getItem("token") !== "undefined"
      ? JSON.parse(localStorage.getItem("token"))
      : localStorage.clear();
  const userinfo = jwtDecode(token);

  useEffect(() => {
    const query = userQuery(userinfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-tow flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md-flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(true)}
        />
        <Link to={`user-profile/${user?._id}`}>
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logo" className="w-28" />
        </Link>
      </div>
      {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(false)}
            />
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default Home;
