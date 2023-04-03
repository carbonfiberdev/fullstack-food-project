import React from "react";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import "./FoodCard.css";

export default function FoodCard(props) {
  const { openRecipeForm, recipeForm } = useContext(UserContext);
  const { recipeData, setRecipeData } = useContext(UserContext);

  const OpenRecipePage = () => {
    setRecipeData(props.body);
    recipeForm(true);
  };

  return (
    <div className="food-card" onClick={OpenRecipePage}>
      <div className="head-bg">
        <img className="pp" src={props.pp_url} />
      </div>
      <img src={props.url} className="food-img" />
      <h3>{props.name}</h3>
    </div>
  );
}
