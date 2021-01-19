import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './VenueMarkers';
import {useSelector} from "react-redux";

const MapView = () => {

    const tourItems = useSelector(state => state.tourItemsReducer.tourItems);
    const data = tourItems.map(item => ({
        geometry: [item.lat, item.lon],
        name: item.label
    }))
    const bounds = data.map(item => item.geometry)

    const {currentLocation, zoom} = {
        currentLocation: {lat: 48.9303	, lng: 9.0311},
        zoom: 12,
    };

    return (
        <Map bounds={bounds.length > 0? bounds : [currentLocation]}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            <Markers venues={data}/>
        </Map>
    );

}

export default MapView;