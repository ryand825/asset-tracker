import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import * as moment from "moment";

import "./notes.css";

export interface NotesProps {
  notes: [{}];
}

export default class Notes extends React.Component<NotesProps, any> {
  public render() {
    const { notes } = this.props;
    const currentTime = Date.now();
    console.log(notes);
    const noteList = notes.map((note: any) => {
      const { updatedAt, createdBy, content, id } = note;
      const momentAt = moment(updatedAt);
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
        <Query query={GET_GROUP_ID}>
          {({ loading, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            } else {
              const groupId = data.defaultGroupId;
              console.log(groupId);
              return (
                <>
                  <div className="note-container">
                    <div>{noteList}</div>
                  </div>
                  <div className="note-create">
                    <textarea
                      placeholder="Add a new message..."
                      className="note-input"
                      name="note-input"
                      id="note-input"
                      rows={4}
                    />
                    <button className="note-submit">Submit</button>
                  </div>
                </>
              );
            }
          }}
        </Query>
      );
    }
  }
}

const GET_GROUP_ID = gql`
  query {
    defaultGroupId @client
  }
`;
