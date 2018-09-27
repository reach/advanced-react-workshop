import React from "react";
import LoadingDots from "./lib/LoadingDots";
import Map from "./lib/Map";
import getAddressFromCoords from "./lib/getAddressFromCoords";

class App extends React.Component {
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
    return (
      <div className="app">
        {this.state.error ? (
          <div>Error: {this.state.error.message}</div>
        ) : this.state.coords ? (
          <Map
            lat={this.state.coords.lat}
            lng={this.state.coords.lng}
            info={"You are here"}
          />
        ) : (
          <LoadingDots />
        )}
      </div>
    );
  }
}

export default App;
