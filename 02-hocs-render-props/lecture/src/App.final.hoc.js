import React from "react";
import LoadingDots from "./lib/LoadingDots";
import Map from "./lib/Map";

let withGeo = Comp =>
  class GeoPosition extends React.Component {
    state = {
      coords: null,
      error: null
    };

    componentDidMount() {
      this.geoId = navigator.geolocation.watchPosition(
        position => {
          this.setState({
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        },
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.geoId);
    }

    render() {
      return <Comp {...this.props} {...this.state} />;
    }
  };

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {this.props.error ? (
          <div>Error: {this.props.error.message}</div>
        ) : this.props.coords ? (
          <Map
            lat={this.props.coords.lat}
            lng={this.props.coords.lng}
            info="You are here"
          />
        ) : (
          <LoadingDots />
        )}
      </div>
    );
  }
}

export default withGeo(App);
