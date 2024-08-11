import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet";
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinatesDTO from "./coordinates.model";
import { useState } from "react";

let defaultIcon = L.icon({
    iconUrl:icon,
    shadowUrl: iconShadow,
    iconAnchor: [16 , 37]
});

L.Marker.prototype.options.icon = defaultIcon;
 
export default function Map(props: mapProps){
    const [coordinates , setCoordinates] = useState<coordinatesDTO[]>(props.coordinates)
    //[32.100958963482896, 34.8268164766466]
    console.log(coordinates);
    
    return(
        <MapContainer
            center={coordinates[0] ? coordinates[0] : [32.100958963482896, 34.8268164766466]} zoom={16}
            style={{height: props.height}}
        >
            <TileLayer attribution="Movies" 
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
            />
            <MapClick setCoordinates={(coordinates) => {
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates)
            }}/>
            {coordinates.map((coordinate , index) => <Marker 
                key={index}
                position={[coordinate.lat, coordinate.lng]}/>)}
        </MapContainer>
    )
}

interface mapProps{
    height: string;
    coordinates: coordinatesDTO[];
    handleMapClick(coordinates: coordinatesDTO): void;
}

Map.defaultProps = {
    height: '500px'
}

function MapClick(props: mapClickProps){
    useMapEvent('click' , eventArgs => {
        props.setCoordinates({lat: eventArgs.latlng.lat , lng: eventArgs.latlng.lng})
    })
    return null;
}
interface mapClickProps{
    setCoordinates(coordinates: coordinatesDTO): void;
}
