import { useState } from "react";
import "./register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      console.log("Respuesta del backend:", data);
      alert("Usuario registrado correctamente!");

    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo registrar");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Crear Cuenta</h2>

        <input
          type="text"
          placeholder="Nombre completo"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Registrarse</button>

        <p className="login-text">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
