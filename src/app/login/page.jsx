"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const info = await res.json();
    if (info.error) {
      return setError(info.error);
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="login-input"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Login</button>
        <p className="login-error">{error}</p>
      </form>
    </div>
  );
}
