import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './MarkdownField.css'
 
export default function MarkdownField(props: markdownFieldProps){
    const {values} = useFormikContext<any>();

    return(
        <div className="mb-3 form-markdown" >
            <div>
                <label>{props.dispalyName}</label>
                <div>
                    <Field name={props.field} as="textarea" className="form-textarea"></Field>
                </div>
            </div>
            <div>
                <label>{props.dispalyName}(preview):</label>
                <div className="markdown-container">
                    <ReactMarkdown>{values[props.field]}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

interface markdownFieldProps{
    dispalyName: string;
    field: string;
}