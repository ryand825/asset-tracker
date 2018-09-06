import * as React from "react";
import "./App.css";

// import { Query } from "react-apollo";
// import gql from "graphql-tag";

import NavBar from "./components/Navigation/NavBar";
import Customers from "./components/Customers/Customers";

class App extends React.Component {
  public render() {
    return (
      <>
        <NavBar groups={[{ id: "hello", name: "hello" }]} />
        <Customers />
      </>
    );
  }
}

export default App;

// const GET_USER = gql`
//   query {
//     getCurrentUser {
//       id
//       name
//       groups {
//         id
//         name
//       }
//     }
//   }
// `;

{
  /* <Query query={GET_USER}>
          {({ loading, data }) => {
            const user = data.getCurrentUser;
            if (loading) {
              return "loading...";
            } else {
              return (
                <>
                  <NavBar groups={user.groups} />
                  <Customers />
                  {user.name}
                </>
              );
            }
          }}
        </Query> */
}
