import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import * as Yup from 'yup'
import MapField from "../forms/MapField";
import coordinatesDTO from "../utils/coordinates.model";

export default function MovieTheaterForm(props: movieTheaterForm){

    function transformCoordinates(): coordinatesDTO[] | undefined {
        if(props.model.latitude && props.model.longitude){
            const response: coordinatesDTO = {lat: props.model.latitude,
                lng: props.model.longitude}
                return [response];
        }
        return undefined;
    }

    return(
        <Formik 
            initialValues={props.model} 
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required").firstLetterUppercase()
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField  displayName="Name" field="name"/>

                    <div style={{marginBottom:'1rem'}}>
                        <MapField latField="latitude" lngField="longitude" 
                         coordinates={transformCoordinates()}
                        />
                    </div>
                    <Button type="submit" disabled={formikProps.isSubmitting}>
                        Save Changes
                    </Button>
                    <Link className="btn btn-secondary" to="/movietheaters">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}
interface movieTheaterForm{
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO , actions: FormikHelpers<movieTheaterCreationDTO>) : void;
}