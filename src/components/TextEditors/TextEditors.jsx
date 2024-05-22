import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditors.css";
function TextEditors() {
  const [editorContent, setEditorContent] = useState("");
  return (
    <div className="TextEditors">
      <div className="TextEditors-inner">
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
          ]}
          style={{ height: "400px", marginBottom: "50px" }}
        />
      </div>
    </div>
  );
}

export default TextEditors;
