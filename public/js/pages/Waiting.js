import React from 'react';
import firebase from '../firebase';
import {signIn, signOut, isUserSignedIn, getUserEmail} from '../firebase';

// Component
import ListItem from "../components/WaitingList";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

export default class Waiting extends React.Component {
    constructor(){
        super();
        this.db = firebase.firestore().collection('tasks');
        this.query = this.db.orderBy('timestamp', 'asc').limit(50);
        this.unsubscribe = null;
        this.state = {
            waitings: [],
            email: '',
            signedin: false
        };
    }

    // Get Tasks
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) { // User is signed in!
                this.setState({email:getUserEmail(), signedin: true});
            }
        });
        this.unsubscribe = this.query.onSnapshot((snapshot) => {
            const waitings = [];
            snapshot.forEach((doc) => {
                var waiting = doc.data();
                if(waiting.waiting){
                    waitings.push({
                        key: doc.id,
                        id: doc.id,
                        student: waiting.student,
                        tasa: waiting.tasa,
                        ipynb: waiting.ipynb,
                        waiting: waiting.waiting,
                        timestamp: waiting.timestamp
                    });
                }
            });
            this.setState({waitings});
        });
    }


    render(){
        const WaitingComponents = this.state.waitings.map((waiting) => {
            return <ListItem email={this.state.email} {...waiting}></ListItem>
        });

        return (
            <div>
                <h2>対応待ち一覧<Chip label={this.state.waitings.length}/></h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>学生</TableCell>
                            <TableCell>対応する</TableCell>
                            <TableCell>取り消す</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {WaitingComponents}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}