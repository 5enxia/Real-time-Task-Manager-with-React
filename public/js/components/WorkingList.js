import React from "react";
import firebase from "../firebase";

// Components
import { Button }  from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class WorkingList extends React.Component {
    constructor(props){
        super();
        this.db = firebase.firestore().collection('tasks');
        this.unsubscribe = null;
        this.completeTask = this.completeTask.bind(this);
        this.copyAddress = this.copyAddress.bind(this);
        this.state = {
            email: props.tasa
        }
    }

    // Complete taks
     completeTask(){
        this.unsubscribe = this.db.doc(this.props.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    // Copy TA/SA email
    copyAddress(){
        navigator.clipboard.writeText(this.state.email);
    }

    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.student}</TableCell>
                <TableCell>
                    <a href={this.props.ipynb} target='blank'><Button variant="contained" color="primary">開く</Button></a>
                </TableCell>
                <TableCell>{this.props.tasa}</TableCell>
                <TableCell><Button variant="contained" color="primary" onClick={this.copyAddress}>コピー</Button></TableCell>
                <TableCell><Button variant="contained" color="secondary" onClick={this.completeTask}>完了</Button></TableCell>
            </TableRow>
        );
    }
}

export default WorkingList;