
import ReactQuill from "react-quill";


export default function Editor({ value, onChange }) {
  // Configuration for the toolbar modules in the editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };

  // JSX for rendering the editor using ReactQuill
  return (
    <div className="content">
      <ReactQuill
        value={value}
        theme={'snow'}
        onChange={onChange}
        modules={modules}
      />
    </div>
  );
}
