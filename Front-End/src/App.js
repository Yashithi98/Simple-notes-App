import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddNote from "./components/add-note.component";
import Note from "./components/note.component";
import NotesList from "./components/notes-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/notes"} className="navbar-brand">
            My Notes App
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/notes"} className="nav-link">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/notes"]} component={NotesList} />
            <Route exact path="/add" component={AddNote} />
            <Route path="/notes/:id" component={Note} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;