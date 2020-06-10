import React from 'react';
import firebase from '../firebase';

// Compoenent
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class MyDialog extends React.Component {
    constructor(){
        super();
        this.state = {
            student: 'c011729632@edu.teu.ac.jp',
            ipynb: ''
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
     
    // Add Task
    addTask(){
        this.unsubscribe = this.db.add({
            student: this.state.student,
            tasa: '',
            ipynb: this.state.ipynb,
            waiting: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then((docRef) => {
            console.log("success add data!");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
    }

   

    render(){
        return (
            <div>
               
            </div>
        );
    }
}