import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addNewTask, removeTask, changeTask } from "./actions/app";

import { throws } from "assert";
import EditModal from "./EditModal";

class Home extends Component {
  constructor(props) {
    super(props);

    this.addStuff = this.addStuff.bind(this);
    this.removeStuff = this.removeStuff.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.markAsDone = this.markAsDone.bind(this);
    this.renderCompletedTask = this.renderCompletedTask.bind(this);
    this.renderTask = this.renderTask.bind(this);
    this.toggleTaskEdit = this.toggleTaskEdit.bind(this);
    this.putEditedTask = this.toggleTaskEdit.bind(this);

    this.state = {
      tasks: [],
      new_task_text: ""
    };
  }

  componentDidMount() {}

  handleChange = e => {
    this.setState({
      new_task_text: e.target.value
    });
  };

  addStuff(e) {
    e.preventDefault();

    var task_info = {
      text: this.state.new_task_text,
      id: Math.random(),
      completed: false
    };

    this.props.addNewTask(task_info);

    this.setState({
      new_task_text: ""
    });
  }

  removeStuff(task_id) {
    this.props.removeTask(task_id);
  }

  markAsDone(task_id) {
    this.props.changeTask(task_id);
  }

  renderTask(task, id) {
    if (!task.completed) {
      return (
        <li className="stylingTasks" key={id}>
          {" "}
          {task.text}{" "}
          <button
            className="buttonStyle ml-2"
            onClick={() => this.removeStuff(task.id)}
          >
            {" "}
            Remove{" "}
          </button>
          <button
            className="buttonStyle mx-3"
            onClick={() => this.markAsDone(task.id)}
          >
            Done
          </button>
          <button
            className="buttonStyle mr-2"
            onClick={() => {
              this.toggleTaskEdit(task.id);
            }}
          >
            Edit
          </button>
        </li>
      );
    }
  }

  renderCompletedTask(task, id) {
    if (task.completed) {
      return (
        <li className="completedTask" key={id}>
          {task.text}
        </li>
      );
    }
  }

  toggleTaskEdit(id) {
    console.log("clicked");
    this.refs.edit_task_component.wrappedInstance.toggleTaskEditModal(id);
  }

  putEditedTask(edited_tasks) {
    this.setState({
      items: edited_tasks
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      {
        tasks: nextProps.tasks.list
      },
      () => console.log(this.state.tasks)
    );
  }

  render() {
    return (
      <div className="container ">
        <div className="row">
          <div className="col-6 mt-5">
            <h2 className="mainHeadings"> Tasks </h2>
          </div>

          <div className="col-6 mt-5">
            <h2 className="mainHeadings"> Completed Tasks</h2>
          </div>
        </div>
        <div style={{ overflowX: "auto" }} className="row tasksField">
          <div className="col-6 ">
            <ul>
              {this.state.tasks.map((element, id) => {
                return this.renderTask(element, id);
              })}
            </ul>
          </div>

          <div className="col-6">
            <ul>
              {this.state.tasks.map((element, id) => {
                return this.renderCompletedTask(element, id);
              })}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.addStuff}>
              <div className="form-group">
                <h3 className="enterLabel">Enter the task</h3>
                <input
                  className="inputField"
                  type="text"
                  value={this.state.new_task_text}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="What do you need to do?"
                  required
                />
              </div>
              <button type="submit" className="submitButton">
                Submit
              </button>
            </form>
          </div>
          <EditModal ref="edit_task_component" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

export default connect(
  mapStateToProps,
  { addNewTask, removeTask, changeTask }
)(Home);
