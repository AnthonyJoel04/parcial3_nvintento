import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("Procesando...");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(`Error al hacer proceso de login, error: ${data.message}`);
        return;
      }

      setMensaje(`Usuario logueado, el token generado es ${data.token}`);
    } catch (error) {
      setMensaje("Error de conexión con la API");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Ingresar
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
        )}

        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 font-semibold">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
