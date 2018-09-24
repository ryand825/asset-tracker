import * as React from "react";
import * as moment from "moment";

import "./notes.css";

export interface NotesProps {
  notes: [{ content: string }];
  onClick: ({}) => void;
  variables: {};
}

export default class Notes extends React.Component<NotesProps, any> {
  state = {
    newPostContent: "",
    submitDisabled: true
  };

  componentDidMount() {
    setTimeout(() => this.scrollToBottom(), 10);
  }

  componentDidUpdate(prevProps: NotesProps) {
    if (prevProps.notes.length < this.props.notes.length) {
      this.setState({ newPostContent: "" });
    }
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const noteContainer = document.getElementById("note-container");
    if (noteContainer) {
      noteContainer.scrollTo(0, noteContainer.scrollHeight);
    }
  };

  handleInput = (e: { target: { value: String } }) => {
    const submitDisabled = e.target.value.length > 0 ? false : true;

    this.setState({
      newPostContent: e.target.value,
      submitDisabled
    });
  };

  submitNote = () => {
    const variables = {
      ...this.props.variables,
      content: this.state.newPostContent
    };
    this.props.onClick({ variables });
    this.setState({ submitDisabled: true });
  };

  public render() {
    const { notes } = this.props;
    const currentTime = new Date();

    const noteList = notes.map((note: any) => {
      const { updatedAt, createdBy, content, id } = note;
      const noteTime = new Date(updatedAt);
      const momentAt = moment(noteTime.setSeconds(noteTime.getSeconds() - 15));
      const daysAgo = moment(currentTime).diff(momentAt, "days");
      let timeStamp = "";
      if (daysAgo > 365) {
        timeStamp = momentAt.format("MMM D, YYYY, H:mm A");
      } else if (daysAgo > 0) {
        timeStamp = momentAt.format("MMM D, H:mm A");
      } else {
        timeStamp = momentAt.fromNow();
      }

      return (
        <div className="note-box" key={id}>
          <div className="note-content">
            <p>{content}</p>
          </div>
          <small className="note-footer">
            {createdBy.name + " - " + timeStamp}
          </small>
        </div>
      );
    });

    if (this.props.notes.length < 1) {
      return <div>No Notes</div>;
    } else {
      return (
        <>
          <div className="note-container" id="note-container">
            <div>{noteList}</div>
          </div>
          <div className="note-create">
            <textarea
              placeholder="Add a new message..."
              className="note-input"
              name="note-input"
              id="note-input"
              rows={4}
              value={this.state.newPostContent}
              onChange={this.handleInput}
            />

            <button
              disabled={this.state.submitDisabled}
              onClick={this.submitNote}
              className="note-submit"
            >
              Submit
            </button>
          </div>
        </>
      );
    }
  }
}
