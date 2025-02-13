import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home/Home";
import Login from "../components/Login/LoginForm";
import Dashboard from "../components/Dashboard/Dashboard";
import Contact from "../components/Contact/Contact";
import Layout from "../Layout";
import SignUp from "../components/SignUp/SignUp";
import UserDataForm from "../components/userDataForm/UserDataForm";

const ProtectedLayout = () => (
  <ProtectedRoute>
    <Layout />
  </ProtectedRoute>
);

const routes = [
  {
    path: "/",
    element: <Layout />, // Public layout
    children: [
      { path: "", element: <Home /> },
      { path: "contact", element: <Contact /> }, // Contact is public
    ],
  },
  {
    path: "/app", // Protected routes under "/app"
    element: <ProtectedLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> }, // Dashboard is protected
      {path: "adduser", element: <UserDataForm /> }, // Add user is protected
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];

export default routes;
