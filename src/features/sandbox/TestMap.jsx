import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function TestMap({mapProps}) {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCSF4L1mc_Q61VkBlT4HRNGK9O8sOHIhU0' }}
          center={mapProps.center}
          zoom={mapProps.zoom}
        >
          <AnyReactComponent
            lat={mapProps.center.lat}
            lng={mapProps.center.lng}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}
