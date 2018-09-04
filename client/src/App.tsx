import * as React from "react";
import "./App.css";

// import { Query } from "react-apollo";
// import gql from "graphql-tag";

import NavBar from "./components/Navigation/NavBar";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NavBar />
      </div>
    );
  }
}

export default App;
