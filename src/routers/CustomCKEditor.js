import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomCKEditor = ({ data, onChange }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: {
                    items: [
                        'heading', '|', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', '|', 'undo', 'redo'
                    ]
                },
                ckeditor5: {
                    // Definicja stylów
                    customConfig: {
                        editor: {
                            viewportTopOffset: 30,
                            height: '600px'
                        }
                    }
                }
            }}
            data={data}
            onChange={(event, editor) => {
                const newData = editor.getData();
                if (newData !== data) {
                    onChange(newData);
                }
            }}
        />
    );
};
export default CustomCKEditor;