import React from "react";
import LinkList from "./components/LinkList/LinkList";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import AddLink from "./components/AddLink/AddLink";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { connect } from "react-redux";
import { loadLinks, postLink } from "./redux/actions/linkActions";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

export class PureApp extends React.Component {
  constructor(props) {
    super(props);

    let links = [];

    this.state = {
      favourite: 0,
      links,
      value: "",
      input: {
        name: "",
        url: "",
        tags: [{ name: "" }],
      },
    };
  }

  componentDidMount = async () => {
    await this.props.loadLinksDispatch();
    this.setState({
      links: this.props.linkStore,
    });
  };

  // Sets the state of the value to the search bar input
  handleSearch = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // Sets the state of the modal
  redirect = () => {
    this.props.history.push("/");
  };

  // Updates the state of the form
  handleForm = (event) => {
    let input;

    if (event.target.name === "name")
      input = { ...this.state.input, name: event.target.value };
    else if (event.target.name === "url")
      input = { ...this.state.input, url: event.target.value };
    else if (event.target.name === "tag") {
      let tags = [...this.state.input.tags];
      let index = event.target.parentNode.id.split("-").splice(-1)[0];

      tags[index] = { name: event.target.value };
      input = { ...this.state.input, tags };
    }
    this.setState({
      input,
    });
  };

  // Add tag
  addTag = () => {
    let newTag = { name: "" };
    let tags = this.state.input.tags.concat(newTag);

    let input = { ...this.state.input, tags };
    this.setState({
      input,
    });
  };

  // Adds the new link to the list
  submitForm = async (event) => {
    event.preventDefault();
    let links = this.state.links.concat(this.state.input);
    await this.props.postLinkDispatch(this.state.input);

    this.setState({
      links,
      input: {
        name: "",
        url: "",
        tags: [{ name: "" }],
      },
      modal: !this.state.modal,
    });

    this.props.history.push("/");
  };

  render() {
    // Filter the links based on the search bar input
    let lowerValue = this.state.value.toLowerCase();
    let filterLinks = this.state.links.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowerValue) ||
        item.tags.filter((tag) => tag.name.toLowerCase().includes(lowerValue))
          .length
      );
    });

    return (
      <div className="App container-fluid">
        <div className="row height-100">
          <div className="col-md-2 col-sm-3 bg-dark-grey">
            <Profile
              favourite={this.state.favourite}
              shared={this.state.links.length}
            />
          </div>
          <div className="col-md-10 col-sm-9 bg-dark-grey">
            <Search onChange={this.handleSearch} value={this.state.value} />

            <Route
              exact
              path="/"
              component={() => <LinkList links={filterLinks} />}
            />
            <Route
              path="/addLink"
              render={() => (
                <AddLink
                  submitForm={this.submitForm}
                  handleForm={this.handleForm}
                  addTag={this.addTag}
                  input={this.state.input}
                  redirect={this.redirect}
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

// This function can be called whatever we want
const mapStateToProps = (state) => {
  return {
    linkStore: state.linkReducer.linkStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLinksDispatch: () => dispatch(loadLinks()),
    postLinkDispatch: (link) => dispatch(postLink(link)),
  };
};

let App = connect(mapStateToProps, mapDispatchToProps)(PureApp);
export default withRouter(App);
