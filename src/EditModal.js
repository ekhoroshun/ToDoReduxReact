import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { throws } from 'assert';
import { editTask } from './actions/app';
import Home from './Home';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class EditModal extends Component {
    constructor(props){
        super(props);

        this.toggleTaskEditModal = this.toggleTaskEditModal.bind(this);
        this.saveEditedTask = this.saveEditedTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.editTask = this.editTask.bind(this)
        this.closeEditTaskModal = this.closeEditTaskModal.bind(this);

    this.state = {
      show_edit_modal: false,
      text: "",
      id: "",
      
    };

    }

   
    
    componentWillReceiveProps(nextProps) {}

    toggleTaskEditModal(id) {
        
        for (var i in this.props.tasks.list){
            if(this.props.tasks.list[i]["id"] == id){
             this.setState({
                show_edit_modal: true,
                text: this.props.tasks.list[i]["text"],
                id: id
             });
        }
        }
        
    }
  
    closeEditTaskModal() {
      this.setState({
        show_edit_modal: false,
        text: ""
      });
    }
  
     saveEditedTask() {
        var item_to_send = {
          id: this.state.id,
          text: this.state.text
        }
        this.props.editTask(item_to_send);

        this.setState({
            show_edit_modal: false
        })
    }

    editTask () {

    }
  
    handleChange = e => {
        this.setState({
            text: e.target.value
        });
    };
  
    render() {
      return (
        <Modal
          isOpen={this.state.show_edit_modal}
          toggle={this.closeEditTaskModal}>
          <ModalHeader toggle={this.closeEditTaskModal}>Edit Task</ModalHeader>
          <ModalBody>
            <form onSubmit={this.editTask}>
              <div className="form-group">
                <label>Change Task</label>
  
                <input
                  type="text"
                  value={this.state.text}
                  onChange={this.handleChange}
                  className="form-control editModal"
                  required
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={this.saveEditedTask}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={this.closeEditTaskModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    }
}


function mapStateToProps(state) {

    return { 
        tasks: state.tasks
    };
    
}


export default connect(mapStateToProps, {editTask}, null, {withRef: true})(EditModal);

