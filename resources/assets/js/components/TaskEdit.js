import React, { Component } from 'react';
import { Link } from "react-router-dom";

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            task: []
        };
        // bind
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        });
        // console.log(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('/tasks', {
                name: this.state.name
            }).then(response => {
            // console.log('from handle submit', response);
            this.setState({
                tasks: [response.data, ...this.state.tasks],
                name: ''
            });
        });
    }

    getTasks() {
        axios.get(`/tasks/${this.props.match.params.id}/edit`).then(response =>
            this.setState({
                task: response.data.task,
                name: response.data.task.name
            })
        );
    }

    componentWillMount() {
        this.getTasks();
    }

    render() {
        console.log(this.props.match.params.id);

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">React Component</div>

                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <textarea
                                            onChange={this.handleChange}
                                            value={this.state.name}
                                            className="form-control"
                                            rows="5"
                                            maxLength="255"
                                            placeholder="Create a new task"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Task
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEdit;
