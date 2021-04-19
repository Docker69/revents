import React from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

function Marker(){
    return (
        <Icon name='marker' size='big' color='red' />
    )
}
export default function EventDetailedMap({coord}) {
    const zoomLevel = 14;
    console.log("===> EventDetailedMap");
    console.log(coord);
    return (
        <Segment attached='bottom' style={{padding: 0}}>
            <div style={{height: 300, width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
                    center={{...coord}}
                    zoom={zoomLevel}
                >
                    <Marker lat={coord.lat} lng={coord.lng} />
                </GoogleMapReact>
            </div>
        </Segment>
    )
}