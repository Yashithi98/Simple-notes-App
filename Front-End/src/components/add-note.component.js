import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import "./note.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.newNote = this.newNote.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      completed: false,

      submitted: false
    };
  }
  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveNote() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    NoteDataService.create(data)
    .then(response => {
      this.setState({
        id: response.data.id,
        title: response.data.title,
        description: response.data.description,
        completed: response.data.completed,

        submitted: true
      });
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

newNote() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newNote}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title"
                  />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      required
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                    />
                  </div>
      
                  <button onClick={this.saveTutorial} className="btn btn-success">
                    Submit
                  </button>
                </div>
              )}
            </div>
          );
        }
      }
  
