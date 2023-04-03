import React from "react";
import "./RecipeEditor.css";
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export default function RecipeEditor() {
  const SendFormData = () => {
    axios
      .post("http://localhost:4000/user/recipe_form", {
        food_name: food_input_name.current,
        form_data: value,
      })
      .then((response) => {});
  };
  const [editStage, setEditStage] = useState(false);
  const food_input_name = useRef();
  const [value, setValue] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };
  const FoodTitle = () => {
    return (
      <div className="food-title">
        <input
          type="text"
          onChange={(e) => (food_input_name.current = e.target.value)}
        />
        <button onClick={() => setEditStage(true)}>Send</button>
      </div>
    );
  };

  return (
    <div className="recipe-editor">
      {editStage ? (
        <>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="react-editor"
            modules={modules}
          />
          <button
            className="recipe-editor-button"
            type="button"
            onClick={SendFormData}
          >
            Send
          </button>
        </>
      ) : (
        <FoodTitle />
      )}
    </div>
  );
}
