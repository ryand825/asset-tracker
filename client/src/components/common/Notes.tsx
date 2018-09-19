import * as React from "react";
// import { Query, Mutation } from "react-apollo";
// import gql from "graphql-tag";
import * as moment from "moment";

import "./notes.css";

export interface NotesProps {
  notes: [{}];
  onClick: ({}) => void;
  variables: {};
}

export default class Notes extends React.Component<NotesProps, any> {
  state = {
    newPostContent: ""
  };

  componentDidMount() {
    setTimeout(() => this.scrollToBottom(), 10);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const noteContainer = document.getElementById("note-container");
    if (noteContainer) {
      noteContainer.scrollTo(0, noteContainer.scrollHeight);
    }
  };

  handleInput = (e: { target: { value: String } }) => {
    this.setState({
      newPostContent: e.target.value
    });
  };

  submitNote = () => {
    if (this.state.newPostContent) {
      const variables = {
        ...this.props.variables,
        content: this.state.newPostContent
      };
      this.props.onClick({ variables });
    }
  };

  public render() {
    const { notes } = this.props;
    const currentTime = new Date();
    // currentTime.setSeconds(currentTime.getSeconds() + 180);

    console.log(notes);
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
          <p className="note-content">{content}</p>
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

            <button onClick={this.submitNote} className="note-submit">
              Submit
            </button>
          </div>
        </>
      );
    }
  }
}

// const _MUTATION = gql`
//   mutation createLocationNote(
//     $locationId: ID!
//     $groupId: ID!
//     $content: String!
//   ) {
//     createLocationNote(
//       locationId: $locationId
//       groupId: $groupId
//       content: $content
//     ) {
//       id
//       name
//       notes {
//         id
//         content
//       }
//     }
//   }
// `;

// const GET_GROUP_ID = gql`
//   query {
//     defaultGroupId @client
//   }
// `;
