import React from "react";
import { Outlet } from "react-router-dom";
import {useState,useEffect} from 'react';
import { Navigate } from "react-router-dom";
function Layout(){

    return (
           <Outlet/>
    )
}

export default Layout;