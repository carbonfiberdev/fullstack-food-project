import React from "react";
import LoginForm from "./LoginForm";
import "./Main.css";
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import FoodCard from "./FoodCard";
import RecipePage from "./RecipePage";
export default function Main() {
  const { openLoginForm, loginForm } = useContext(UserContext);
  const { openRecipeForm, recipeForm } = useContext(UserContext);
  const { recipeData, setRecipeData } = useContext(UserContext);
  const [data, setData] = useState([]);
  const cards = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/generate_food_cart")
      .then((response) => {
        setData(response.data);
        generateFoodCard(response.data);
      });
  }, []);

  const generateFoodCard = (_data) => {
    _data.forEach((item) => {
      item.yemekler.forEach((item2) => {
        cards.current = [
          ...cards.current,
          <FoodCard
            body={item2.yemek_icerigi}
            name={item2.yemek_adi}
            url={item2.yemek_url}
            pp_url={item.pp_url}
          />,
        ];
      });
    });
  };

  const MainPage = () => {
    return (
      <div className="main">
        {openLoginForm.formStage && <LoginForm />}
        {cards.current}
      </div>
    );
  };

  return (
    <>{openRecipeForm ? <RecipePage body={recipeData} /> : <MainPage />}</>
  );
}
