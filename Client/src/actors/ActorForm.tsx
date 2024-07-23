import { Form, Formik, FormikHelpers } from "formik";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { actorCreationDTO } from "./actors.model";
import * as Yup from 'yup';
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkdownField from "../forms/MarkdownField";

export default function ActorForm(props: actorFromProps){
    return(
        <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required').firstLetterUppercase(),
            dateOfBirt: Yup.date().nullable().required('This field is required')
        })}
        >
            {(formikProps) => (
                <Form placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <TextField displayName="Name" field="name"/>
                    <DateField displayName="Date of Birth" field="dateOfBirt"/>
                    <ImageField displayName="Picture" field="picture"
                    imageURL={props.model.pictureURL}/>
                    <MarkdownField dispalyName="Biography" field="biography"/>

                    <Button disabled={formikProps.isSubmitting}
                    type="submit"
                    >Save Changes</Button>
                    <Link to="/actors" className="btn btn-secondary">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}
interface actorFromProps{
    model: actorCreationDTO;
    onSubmit(values: actorCreationDTO, action: FormikHelpers<actorCreationDTO>): void;
}