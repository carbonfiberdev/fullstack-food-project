import React from "react";
import "./Up.css";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import RecipeEditor from "./RecipeEditor";

export default function Up() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState("Giris");
  const [userMenu, setUserMenu] = useState(false);
  const [recipePage, openRecipePage] = useState(false);
  const { openLoginForm, loginForm } = useContext(UserContext);
  const mainPage = () => {};
  const login = () => {
    loginForm({ formStage: true });
  };
  const user_menu = () => {
    setUserMenu(!userMenu);
  };

  const OpenMyRecipesPage = () => {
    openRecipePage(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/auth")
      .then((response) => setData(response.data));
  }, []);

  function UserName() {
    if (data !== "Giris") {
      return (
        <div className="up-item" onClick={user_menu}>
          <h2>{data}</h2>
        </div>
      );
    } else {
      return (
        <h2 className="up-item" onClick={login}>
          {data}
        </h2>
      );
    }
  }

  function UserMenu() {
    return (
      <div className="user-menu">
        <div className="item col-1 disable-select">
          <h4>Profil ayarları</h4>
        </div>
        <div className="item col-2 disable-select">
          <h4>Tariflerim</h4>
        </div>
        <div className="item col-1 disable-select" onClick={OpenMyRecipesPage}>
          <h4>Tarif ekle</h4>
        </div>
        <div className="item col-2 disable-select">
          <h4>Arkadaşlarım</h4>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="up">
        <h2 className="up-item" onClick={mainPage}>
          Ana sayfa
        </h2>
        <UserName />
      </div>
      {userMenu ? <UserMenu /> : null}
      {recipePage && <RecipeEditor />}
    </>
  );
}
