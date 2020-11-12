import React from 'react'
import './map.css'
import { Map as Leaflet, TileLayer } from 'react-leaflet';
import { showData } from './helper';

const Map = ({ center, zoom, countries, casesType }) => {
    return (
        <div className="map" >
            {/* {console.log("map")} */}
            <Leaflet center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {console.log("hello")}
                {showData(countries, casesType)}
            </Leaflet>
        </div>
    )
}

export default Map
