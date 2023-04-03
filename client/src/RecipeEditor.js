import React from "react";
import "./RecipeEditor.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RecipeEditor() {
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      [("bold", "italic", "underline", "strike", "blockquote")],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };
  return (
    <div className="recipe-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="react-editor"
        modules={modules}
      />
    </div>
  );
}