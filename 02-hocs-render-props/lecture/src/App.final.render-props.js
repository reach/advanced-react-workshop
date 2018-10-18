import React, { Component } from "react";
import LoadingDots from "./lib/LoadingDots";
import Map from "./lib/Map";
import getAddressFromCoords from "./lib/getAddressFromCoords";

class GeoPosition extends Component {
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
    return this.props.children(this.state);
  }
}

class Address extends Component {
  state = {
    address: null
  };

  async componentDidMount() {
    const { coords: { lat: latitude, lng: longitude } } = this.props;
    this.setState({
      address: await getAddressFromCoords(latitude, longitude)
    });
  }

  render() {
    return this.props.children(this.state.address);
  }
}

class App extends Component {
  render() {
    return (
      <GeoPosition>
        {state => (
          <div className="app">
            {state.error ? (
              <div>Error: {state.error.message}</div>
            ) : state.coords ? (
              <Address coords={state.coords}>
                {address => (
                  <Map
                    lat={state.coords.lat}
                    lng={state.coords.lng}
                    info={address || "You are here"}
                  />
                )}
              </Address>
            ) : (
              <LoadingDots />
            )}
          </div>
        )}
      </GeoPosition>
    );
  }
}

export default App;
