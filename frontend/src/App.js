import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.columns = [
            {
                Header: "User",
                accessor: "user"
            },
            {
                Header: "Message",
                accessor: "text"
            },

            {
                Header: "Timestamp",
                accessor: "timestamp"
            }
        ];
        this.eventSource = new EventSource("http://localhost:8080/messages?room=developers");
    }

    componentDidMount() {
        this.eventSource.addEventListener('message', message => {
                this.addMessage(JSON.parse(message.data))
            }
        );
    }

    addMessage(newMassage) {
        this.setState({data: [].concat(this.state.data, [newMassage])});
    }

    render() {
        return (
            <div className="App">
                {this.state.data.map((user) => console.log(user))}
                <ReactTable data={this.state.data} columns={this.columns}/>
            </div>
        );
    }
}

export default App;
