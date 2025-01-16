import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
// import Home from './components/Home/Home';
import { Header } from './components/Header/Header';

function Layout(){
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;