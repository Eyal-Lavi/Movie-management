import { useFormikContext } from "formik";
import coordinatesDTO from "../utils/coordinates.model";
import Map from "../utils/Map";
export default function MapField(props: mapFieldProps){

    const {values} = useFormikContext<any>();

    function handleMapClick(coordinates: coordinatesDTO){
        values[props.latField] = coordinates.lat;
        values[props.lngField] = coordinates.lng;
    }

    return(<>
        <Map
            coordinates={props.coordinates}
            handleMapClick={handleMapClick}
        />
    </>);
}
interface mapFieldProps{
    coordinates: coordinatesDTO[];
    latField: string;
    lngField: string;
}

MapField.defaultProps = {
    coordinates: []
}