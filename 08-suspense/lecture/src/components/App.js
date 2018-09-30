import React, { Placeholder, PureComponent, Fragment } from "react";
import { unstable_deferredUpdates } from "react-dom";
import { createResource } from "simple-cache-provider";
import { cache } from "../cache";
import Spinner from "./Spinner";
import ContributorListPage from "./ContributorListPage";
import { Router, Link, Location } from "@reach/router";
import ManageScroll from "./ManageScroll";

const UserPageResource = createResource(() => import("./UserPage"));

function UserPageLoader(props) {
  const UserPage = UserPageResource.read(cache).default;
  return <UserPage {...props} />;
}

class App extends PureComponent {
  state = {
    loadingId: null
  };

  handleUserClick = id => {
    this.setState({ loadingId: id });
  };

  render() {
    const { loadingId } = this.state;
    return (
      <Placeholder delayMs={1500} fallback={<Spinner size="large" />}>
        <ContributorListPage
          loadingId={loadingId}
          onUserClick={this.handleUserClick}
        />
      </Placeholder>
    );
  }
}

class Detail extends PureComponent {
  render() {
    const { id } = this.props;
    return (
      <div>
        <Link
          to="/"
          onClick={this.handleBackClick}
          style={{
            display: "block",
            padding: "1rem 0"
          }}
        >
          Return to list
        </Link>
        <Placeholder delayMs={2000} fallback={<Spinner size="large" />}>
          <UserPageLoader id={id} />
        </Placeholder>
      </div>
    );
  }
}

export default () => (
  <Fragment>
    <ManageScroll />
    <Router>
      <App path="/" />
      <Detail path="/:id" />
    </Router>
  </Fragment>
);
