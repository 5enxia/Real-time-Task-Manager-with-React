import React from "react";
import firebase from '../firebase';

// Components
import ListItem from "../components/WorkingList";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';

export default class Working extends React.Component {
    constructor(){
        super();
        this.db = firebase.firestore().collection('tasks');
        this.query = this.db.orderBy('timestamp', 'asc').limit(50);
        this.unsubscribe = null;
        this.state = {workings: []};
    }

    // Get Tasks
    componentDidMount() {
      this.unsubscribe = this.query.onSnapshot((snapshot) => {
        const workings = [];
        snapshot.forEach((doc) => {
          var working = doc.data();
          if(!working.waiting){
            workings.push({
                key: doc.id,
                id: doc.id,
                student: working.student,
                tasa: working.tasa,
                ipynb: working.ipynb,
                waiting: working.waiting,
                timestamp: working.timestamp
            });
          }
        });
        this.setState({workings});
      });
    }

    render() {
        const WorkingComponents = this.state.workings.map((working) => {
            return <ListItem key={working.id} {...working}/>;
        });

        return (
            <div>
            <h2>対応中一覧<Chip label={this.state.workings.length}/></h2>
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
            </div>
        );
    }
}
