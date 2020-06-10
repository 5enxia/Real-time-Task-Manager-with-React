import React from "react";
import firebase from '../firebase';

// Components
import { Button }  from "@material-ui/core";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


export default class WaitingList extends React.Component{
    constructor(){
        super();
        this.db = firebase.firestore().collection('tasks');
        this.unsubscribe = null;
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }

    // Update task
    updateTask(){
        this.unsubscribe = this.db.doc(this.props.id).update({
            tasa: this.props.email,
            waiting: false,
          }).then((docRef) => {
            console.log("success update data!");
          })
          .catch((error) => {
            console.error("Error update document: ", error);
          }); 
    }

    // Delete Task
    deleteTask(){
        this.unsubscribe = this.db.doc(this.props.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    render(){
        return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell>{this.props.student}</TableCell>
                <TableCell><Button variant="contained" color="primary" onClick={this.updateTask}>対応</Button></TableCell>
                <TableCell><Button variant="contained" color="secondary" onClick={this.deleteTask}>取消</Button></TableCell>
            </TableRow>
        );
    }
}