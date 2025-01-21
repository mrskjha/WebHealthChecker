import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home/Home";
import Login from "../components/Login/LoginForm";
import Dashboard from "../components/Dashboard/Dashboard";
import Contact from "../components/Contact/Contact";
import Layout from "../Layout";
import SignUp from "../components/SignUp/SignUp";
import UserDataForm from "../components/userDataForm/UserDataForm";

const routes = [
  {
    path: "/",
    element: <Layout />, // Wrap the layout for consistent header/footer handling
    children: [
      {
        path: "",
        element: <Home />, // Home page will show header, hero, and footer
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "userdataform",
        element: (
          <ProtectedRoute>
            <UserDataForm/>
          </ProtectedRoute>
        ),
      }
    ],
  },
  {
    path: "/login",
    element: <Login />, // Login page without header or footer
  },
  {
    path:"/signup",
    element: <SignUp />, // SignUp page without header or footer
  }
];


export default routes;
