import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import './App.css';
import axios from 'axios'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            room: "developers",
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
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }

    componentDidMount() {
        this.eventSource.addEventListener('message', message => {
                this.addMessage(JSON.parse(message.data))
            }
        );
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeRoom(e) {
        this.setState({
            room: e.target.value
        });
    }

    handleSendMessage(event) {
        const message = {
            text: this.state.text,
            room: this.state.room
        }

        console.log(message)
        axios.post('http://localhost:8080/messages', message, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(function (response) {
                console.log(response);
                //Perform action based on response
            })
            .catch(function (error) {
                console.log(error);
                //Perform action based on error
            });
    }

    addMessage(newMassage) {
        this.setState({data: [].concat(this.state.data, [newMassage])});
    }

    render() {
        return (
            <div className="App">
                {this.state.data.map((user) => console.log(user))}
                <ReactTable data={this.state.data} columns={this.columns}/>
                <form onSubmit={this.handleSendMessage}>
                    <label>
                        Message:
                        <input type="text" name="Message" onChange={this.onChangeText} value={this.state.text}/>
                    </label>
                    <label>
                        Room:
                        <input type="text" name="Room" onChange={this.onChangeRoom} value={this.state.room}/>
                    </label>
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}

export default App;
