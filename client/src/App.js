import logo from "./logo.svg";
import "./App.css";
import Up from "./Up";
import Main from "./Main";
import { UserContext } from "./UserContext";
import { useState } from "react";

function App() {
  const [openLoginForm, loginForm] = useState({
    formStage: false,
    isLoginOk: false,
    userName: "",
  });
  const [openRecipeForm, recipeForm] = useState(false);
  const [recipeData, setRecipeData] = useState({});

  return (
    <UserContext.Provider
      value={{
        openLoginForm,
        loginForm,
        openRecipeForm,
        recipeForm,
        recipeData,
        setRecipeData,
      }}
    >
      <div className="App">
        <Up />
        <Main />
      </div>
    </UserContext.Provider>
  );
}

export default App;
