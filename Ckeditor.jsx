import React, { useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import FormikError from './FormikError';

const Ckeditor = ({className, label, name, placeholder}) => {
    return (
        <>
            <Field>
                {formik=>{
                    console.log(formik);
                    return (
                    <div className={`mb-2 ${className}`}>
                        <CKEditor
                        editor={ClassicEditor}
                        data={`<p>${label} : ${placeholder}</p>`}
                        config={
                            {
                                ckfinder:{
                                    uploadUrl: "http://127.0.0.1:8000/api/upload"
                                }
                            }
                        }
                        onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                        const data = editor.getData();
                        formik.form.setFieldValue(name, data)
                        console.log({ event, editor, data });
                        }}
                        onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                        formik.form.setFieldTouched(name)
                        }}
                        onFocus={(event, editor) => {
                        console.log("Focus.", editor.getData() == `<p>${label} : ${placeholder}</p>` ? editor.setData('') : null);
                        }}
                        />
                        <div className='mt-2'>
                            <ErrorMessage name={name} component={FormikError}/>
                        </div>
                    </div>
                    );
                }}
            </Field>
        </>

    );
}

export default Ckeditor;
