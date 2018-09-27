import React from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

const loadMaps = cb => {
  // google maps script loading garbage
  const KEY = "AIzaSyDFwu1MmuOatqW-283LSCbsxqHcp89ouiw";
  const URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=_mapsLoaded`;
  window._mapsLoaded = cb;
  const script = document.createElement("script");
  script.src = URL;
  document.body.appendChild(script);
};

const InnerMap = withGoogleMap(({ lat, lng, info }) => (
  <GoogleMap defaultZoom={5} center={{ lat, lng }}>
    <Marker position={{ lat, lng }} defaultAnimation="2">
      {info && (
        <InfoWindow>
          <div>{info}</div>
        </InfoWindow>
      )}
    </Marker>
  </GoogleMap>
));

class Map extends React.Component {
  componentWillMount() {
    if (!window.google) {
      loadMaps(() => {
        this.forceUpdate();
      });
    }
  }

  render() {
    const { lat, lng, info } = this.props;
    return window.google ? (
      <InnerMap
        containerElement={<div className="container" />}
        mapElement={<div className="map" />}
        lat={lat}
        lng={lng}
        info={info}
      />
    ) : null;
  }
}

export default Map;
