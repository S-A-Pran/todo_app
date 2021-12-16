import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import TopBar from '../../shared/TopBar/TopBar';
import Packages from '../Packages/Packages';

const Home = () => {
    return (
        <div>
            <NavBar></NavBar>
            <TopBar></TopBar>
            <Packages></Packages>
        </div>
    );
};

export default Home;