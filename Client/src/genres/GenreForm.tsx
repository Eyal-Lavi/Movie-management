import { Form, Formik, FormikHelpers } from "formik"
import TextField from "../forms/TextField"
import Button from "../utils/Button"
import { Link } from "react-router-dom"
import * as Yup from 'yup' // חבילה לבדיקת תקינות
import { genreCreationDTO } from "./genres.model"

export default function GenreForm(props: genreFormProps){
    return(
        <>
              <Formik initialValues={props.model}
                onSubmit={props.onSubmit}
                enableReinitialize={props.enableReinitialize}
                validationSchema={Yup.object({
                    name: Yup.string().required('This field is required').max(50 , 'Max length is 50 characters').firstLetterUppercase(),
                })}
            >
                {(formikProps) => (
                    <Form>
                        <TextField field="name" displayName="Name" />
                        <Button disabled={formikProps.isSubmitting}
                         type="submit" 
                         >Save Changes</Button>
                        <Link className="btn btn-secondary" to="/genres">Cancel</Link>
                    </Form>
                )}

            </Formik>
        </>
    )
}

interface genreFormProps{
    enableReinitialize?:boolean;
    model:genreCreationDTO;
    onSubmit(values: genreCreationDTO , action: FormikHelpers<genreCreationDTO>): void ;
}

