import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./LoginForm.css";
import { UserContext } from "./UserContext";
import { useContext } from "react";

export default function LoginForm() {
  axios.defaults.withCredentials = true;
  const [_openRegisterForm, openRegisterForm] = useState(false);
  const { openLoginForm, loginForm } = useContext(UserContext);
  const usernameRef = useRef();
  const lastnameRef = useRef();
  const mailRef = useRef();
  const passwordRef = useRef();
  const OpenRegisterForm = () => {
    openRegisterForm(true);
  };
  const OnLogin = async () => {
    if (!usernameRef.current.value || !passwordRef.current.value)
      return alert("Alanları lütfen boş bırakmayın");
    await axios
      .post("http://localhost:4000/user/login", {
        isim: usernameRef.current.value,
        sifre: passwordRef.current.value,
      })
      .then((response) => {
        loginForm({
          loginStage: false,
          isLoginOk: true,
          userName: usernameRef.current.value,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  const OnRegister = async () => {
    if (
      !usernameRef.current.value ||
      !lastnameRef.current.value ||
      !mailRef.current.value ||
      !passwordRef.current.value
    )
      return alert("Alanları lütfen boş bırakmayın");
    try {
      const response = await axios.post("http://localhost:4000/user", null, {
        params: {
          isim: usernameRef.current.value,
          soy_isim: lastnameRef.current.value,
          mail: mailRef.current.value,
          sifre: passwordRef.current.value,
        },
      });
      alert("Kullanici başarı ile olusturuldu");
      loginForm(false);
    } catch (err) {
      alert("Bu mail zaten kullanılmaktadır");
    }
  };

  const keyDownHandler = (event) => {
    if (event.key === "Escape") loginForm({ formStage: false });
  };

  document.addEventListener("keydown", keyDownHandler);

  return (
    <div>
      <div
        className="bg-fill"
        onClick={() => loginForm({ formStage: false })}
      />
      {!_openRegisterForm ? (
        <div className="login-form">
          <h2>Giriş Yap</h2>
          <div className="flex row">
            <input ref={usernameRef} placeholder="Kullanici Adi"></input>
          </div>
          <div className="flex row">
            <input
              ref={passwordRef}
              placeholder="Sifre"
              type="password"
            ></input>
          </div>
          <button className="login-button cursor" onClick={OnLogin}>
            Giriş yap
          </button>
          <button className="kayit-ol cursor" onClick={OpenRegisterForm}>
            Kayıt ol
          </button>
        </div>
      ) : (
        <div className="login-form">
          <div className="bg" />
          <h2>Kayıt Ol</h2>
          <div className="flex row">
            <input ref={usernameRef} placeholder="İsim" />
          </div>
          <div className="flex row">
            <input ref={lastnameRef} placeholder="Soy isim" />
          </div>
          <div className="flex row">
            <input ref={mailRef} placeholder="Mail" />
          </div>
          <div className="flex row">
            <input ref={passwordRef} placeholder="Sifre" type="password" />
          </div>

          <button className="kayit-ol cursor" onClick={OnRegister}>
            Kayıt ol
          </button>
        </div>
      )}
    </div>
  );
}
