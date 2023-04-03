import "./RecipePage.css";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecipePage(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/user/get_food_data", {
        user_id: props.user_id,
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return <div className="recipe-page">{props.body}</div>;
}
