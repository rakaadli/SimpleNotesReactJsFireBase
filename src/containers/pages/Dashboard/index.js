import React, { Component, Fragment } from "react";
import "./Dashboard.scss";
import {
  addDataToAPI,
  getDataFromAPI,
  updateDataAPI,
  deleteDataAPI,
} from "../../../config/redux/action";
import { connect } from "react-redux";

class Dashboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    textButton: "Simpan",
    NoteId: "",
  };

  componentDidMount() {
    // const userData = localStorage.getItem("userData2");
    // console.log("Dashboard", JSON.parse(userData));
    const userData = JSON.parse(localStorage.getItem("userData2"));
    this.props.getNotes(userData.uid);
  }
  handleSaveNotes = () => {
    const { title, content, textButton, NoteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData2"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid,
    };

    if (textButton === "Simpan") {
      saveNotes(data);
    } else {
      data.NoteId = NoteId;
      updateNotes(data);
    }

    // console.log(data);
  };

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  updateNotes = (note) => {
    console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      textButton: "Update",
      NoteId: note.id,
    });
  };

  cancelUpdate = () => {
    this.setState({
      title: "",
      content: "",
      textButton: "Simpan",
    });
  };
  deleteNote = (e, note) => {
    e.stopPropagation();
    const { deleteNote } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData2"));
    const data = {
      userId: userData.uid,
      NoteId: note.id,
    };
    deleteNote(data);
  };
  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props;
    const { updateNotes, cancelUpdate, deleteNote } = this;
    console.log("notes", notes);
    return (
      <Fragment>
        <div>
          <p>Dashboard page</p>
          <div className='container'>
            <div className='input-form'>
              <input
                className='input-name'
                placeholder='title'
                value={title}
                onChange={(e) => this.onInputChange(e, "title")}
              />
              <textarea
                className='input-content'
                placeholder='content'
                value={content}
                onChange={(e) => this.onInputChange(e, "content")}
              />
              <div className='action-wrapper'>
                {textButton === "Update" ? (
                  <button
                    className='save-btn cancel'
                    onClick={this.cancelUpdate}
                  >
                    Cancel
                  </button>
                ) : (
                  <div />
                )}
                <button className='save-btn' onClick={this.handleSaveNotes}>
                  {textButton}
                </button>
              </div>
            </div>
            <hr />
            {notes.length > 0 ? (
              <Fragment>
                {notes.map((note) => {
                  return (
                    <div
                      className='card'
                      key={note.id}
                      onClick={() => updateNotes(note)}
                    >
                      <p className='title'> {note.data.title}</p>
                      <p className='date'>{note.data.date}</p>
                      <p className='content'>{note.data.content}</p>
                      <div
                        className='delete-btn'
                        onClick={(e) => deleteNote(e, note)}
                      >
                        x
                      </div>
                    </div>
                  );
                })}
              </Fragment>
            ) : null}
          </div>
        </div>
        <button>Go to Register</button>
        <button>Go to Dashboard</button>
      </Fragment>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
  deleteNote: (data) => dispatch(deleteDataAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Dashboard);
