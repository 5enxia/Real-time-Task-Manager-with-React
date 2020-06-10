import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import firebase from '../firebase';
import {signIn, signOut, isUserSignedIn, getUserEmail} from '../firebase';

// Component
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Header extends React.Component {
    constructor(){
        super();
        this.state = {
            user: '',
            signedin: false
        };
        this.logInOut = this.logInOut.bind(this);
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) { // User is signed in!
                this.setState({user:getUserEmail(), signedin: true});
              } else { // User is signed out!
                this.setState({user:'', signedin: false});
              }
            });
    }

    // login logout Event callback
    logInOut(){
        if(this.state.signedin){
            signOut();
        }else{
            signIn();
        }
    }


    render(){
        return (
            <div>
            <AppBar position="static">
                <Toolbar>
                <Button color="inherit" onClick={this.logInOut}>{this.state.signedin ? "ログアウト":"ログイン"}</Button>
                {this.state.user} 
                </Toolbar>
                <Tabs aria-label="simple tabs example" value={this.props.history.location.pathname} >
                    <Tab label="マイページ" value="/" component={Link} to="/"/>
                    <Tab label="対応待ち一覧" value="/waiting" component={Link} to="/waiting"/>
                    <Tab label="対応中一覧" value="/working" component={Link} to="/working"/>
                </Tabs>
            </AppBar>
            </div>
        );
    }
}

export default withRouter(Header); 