import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ErrorMessage, Field } from "formik";
import FormikError from "./FormikError";

const API_URL = "http://127.0.0.1:8000/api/upload";
export default function MyEditor({className, label, name, placeholder}) {
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            fetch(`${API_URL}`, {
              method: "post",
              body: body
              // mode: "no-cors"
            })
              .then((res) => res.json())
              .then((res) => {
                // resolve({
                //   default: `${API_URL}` 
                // });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }
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
                config={{
                    extraPlugins: [uploadPlugin]
                }}
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