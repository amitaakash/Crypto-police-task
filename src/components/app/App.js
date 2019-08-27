import React from "react";
import Header from '../header/Header';
import Footer from "../footer/Footer";
import MainFormContainer from "../mainAppContainer/MainAppContainer";


const App = () => {
    return (
        <div className="app">
            <Header />
            <MainFormContainer/>
            <Footer />
        </div>
    );
};

export default App;