"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("/api/users/register", {
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
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <input
          className="register-input"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register-input"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="register-button">Register</button>
        <p className="register-error">{error}</p>
      </form>
    </div>
  );
}
