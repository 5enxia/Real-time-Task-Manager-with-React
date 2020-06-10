import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./firebase";

// Components
import Layout from "./components/Layout";
import Waiting from "./pages/Waiting";
import Working from "./pages/Working";
import MyPage from "./pages/MyPage";

const app = document.getElementById('app');
ReactDOM.render(
    <Router>
        <Layout>
            <Route exact path="/" component={MyPage}></Route>
            <Route exact path="/waiting" component={Waiting}></Route>
            <Route exact path="/working" component={Working}></Route>
        </Layout>
    </Router>
,app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
