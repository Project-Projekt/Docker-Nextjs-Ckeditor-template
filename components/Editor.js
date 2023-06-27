import React, { useEffect, useRef } from "react"


export default function Editor({ onChange, editorLoaded, name, value }) {
    // ref for the editor (does not rerender on change, see https://react.dev/reference/react/useRef)
    const editorRef = useRef();

    const { CKEditor, ClassicEditor } = editorRef.current || {}

    // load the editor ONCE on load
    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require('./CKEditorCustomBuild/build/ckeditor')
        };
    }, []);

    return (
        <>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        onChange(data);
                    }}

                    config={{simpleUpload: {
                        uploadUrl: 'http://localhost:3000/api/upload'
                    }}}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </>
    )
}