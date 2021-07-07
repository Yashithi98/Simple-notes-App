import React, { Component } from "react";
import NoteDataService from "../services/note.service";
import "./notes.css";

export default class Note extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getNote = this.getNote.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      currentNote: {
        id: null,
        title: "",
        description: "",
        completed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getNote(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentNote: {
          ...prevState.currentNote,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentNote,
        description: description
      }
    }));
  }

  getNote(id) {
    NoteDataService.get(id)
      .then(response => {
        this.setState({
          currentNote: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCompleted(status) {
    var data = {
      id: this.state.currentNote.id,
      title: this.state.currentNote.title,
      description: this.state.currentNotes.description,
      completed: status
    };

    NoteDataService.update(this.state.currentNote.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentNote: {
            ...prevState.currentNote,
            completed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateNote() {
    NoteDataService.update(
      this.state.currentNote.id,
      this.state.currentNote
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Note was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteNote() {    
    NoteDataService.delete(this.state.currentNote.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/notes')
      })
      .catch(e => {
        console.log(e);
      });
  }

 render(){
  const { currentNote } = this.state;

  return (
    <div>
      {currentNote ? (
        <div className="edit-form">
          <h4>Note</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentNote.title}
                onChange={this.onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentNote.description}
                onChange={this.onChangeDescription}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentNote.completed ? "Completed" : "Pending"}
            </div>
          </form>

          {currentNote.completed ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => this.updateCompleted(false)}
            >
              Incomplete
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => this.updateCompleted(true)}
            >
              Completed
            </button>
          )}

          <button
            className="badge badge-danger mr-2"
            onClick={this.deleteNote}
          >
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={this.updateNote}
          >
            Update
          </button>
          <p>{this.state.message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Note...</p>
        </div>
      )}
    </div>
  );
}
}