"use client";
import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useState } from "react";

const LoginForm = () => {
  const [err, setErr] = useState();
  const handleLogin = async (FormData) => {
    const data = await authenticate(FormData);
    data.error && setErr(data.error);
  };
  return (
    <div className={styles.form}>
      <form action={handleLogin} className={styles.form}>
        <h1>Login</h1>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button>Login</button>
        {err && err}
      </form>
    </div>
  );
};

export default LoginForm;
