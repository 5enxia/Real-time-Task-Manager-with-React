import React from "react";
import firebase from '../firebase';
import {getUserEmail} from "../firebase";

// Components
import WaitingItem from "../components/WaitingList";
import WorkingItem from "../components/WorkingList";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class MyPage extends React.Component {
    constructor(){
        super();
        this.db = firebase.firestore().collection('tasks');
        this.query = this.db.orderBy('timestamp', 'asc').limit(50);
        this.unsubscribe = null;
        this.state = {
            waitings: [],
            workings: [],
            student: "",
            ipynb: "",
            open: false,
            email: '',
            signedin: false
        };
        this.addTask = this.addTask.bind(this);
        this.handleIpynbUrl = this.handleIpynbUrl.bind(this);
    }

    // Get Tasks
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) =>{
            if (user) { // User is signed in!
                this.setState({email: getUserEmail(), signedin: true});
            }
        });
      this.unsubscribe = this.query.onSnapshot((snapshot) => {
        const workings = [];
        const waitings = [];
        snapshot.forEach((doc) => {
            var tmp = doc.data();
            if((tmp.student === this.state.email) || (tmp.tasa === this.state.email)){
                if(tmp.waiting){
                    waitings.push({
                        key: doc.id,
                        id: doc.id, 
                        student: tmp.student, 
                        tasa: tmp.tasa, 
                        ipynb: tmp.ipynb, 
                        waiting: tmp.waiting,
                        timestamp: tmp.timestamp
                    });
                }else{
                    workings.push({
                        key: doc.id,
                        id: doc.id, 
                        student: tmp.student, 
                        tasa: tmp.tasa, 
                        ipynb: tmp.ipynb, 
                        waiting: tmp.waiting,
                        timestamp: tmp.timestamp
                    });
                }
            }
        });
        this.setState({workings:workings, waitings:waitings});
      });
    }

     // Add Task
     addTask(){
        this.unsubscribe = this.db.add({
            student: this.state.email,
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

    // Watch input ipynb url 
    handleIpynbUrl(e){
        this.setState({ipynb: e.target.value});
    }

    render() {
        const WaitingComponents = this.state.waitings.map((waiting) => {
          return <WaitingItem email={this.state.email} {...waiting}/>;
        });
        const WorkingComponents = this.state.workings.map((working) => {
          return <WorkingItem key={working.id} {...working}/>;
        });
        const fabStyle = { position: "fixed", bottom: "20px", right: "30px"};

        return (
            <div>
                <h2>未対応</h2>
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
                
                <h2>対応中</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>学生</TableCell>
                                <TableCell>Google Colab</TableCell>
                                <TableCell>TA/SA</TableCell>
                                <TableCell>アドレスをコピー</TableCell>
                                <TableCell>完了</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {WorkingComponents}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Fab color="primary" aria-label="add" style={fabStyle} onClick={()=>this.setState({open:true})}>+</Fab>
                        <Dialog open={this.state.open} onClose={()=>this.setState({open:false})} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">課題確認申請</DialogTitle>
                            <DialogContent>
                                <DialogContentText>大学メールアドレスとGoogle ColaboratoryのURLを入力してください</DialogContentText>
                                <TextField value={this.state.email} autoFocus　margin="dense"　id="name"　label="メールアドレス"　type="email"　fullWidth required/>
                                <TextField value={this.state.ipynb} onChange={this.handleIpynbUrl} 
                                    autoFocus　margin="dense"　id="name"　label="Google Colab URL"　type="text"　fullWidth required/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={()=>this.setState({open:false})} color="primary">キャンセル</Button>
                                <Button onClick={()=>{
                                    this.setState({open:false});
                                    this.addTask();
                                    }} color="primary">送信</Button>
                            </DialogActions>
                        </Dialog>
                </div>
            </div>
        );
    }
}
