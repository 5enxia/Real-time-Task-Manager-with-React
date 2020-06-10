import React from 'react';

// Components
import Header from "./Header";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

export default class Layout extends React.Component {
    render(){
        return (
            <div>
                <Header/>
                <CssBaseline />
                <Container maxWidth="lg">
                    {this.props.children}
                </Container>
            </div>
        );
    }
}