import { useState } from "react";
import { useUser, useSetUser } from "../../UserContext";
import { Link, Navigate } from "react-router-dom";
import "./Inicio.css";

function InicioSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const user = useUser();
  const setUser = useSetUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:3000/usuarios/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (data.status === "error") {
      setStatus("error");
      setMessage(data.message);
    } else {
      setUser(data);
      setStatus("ok");
      setMessage(data.message);
    }
    // if (!res.ok) {
    //   setError(error.message);
    // } else {
    //   setUser(data);
    // }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <section className="seccion_inicio">
      <h2>Inicio sesión</h2>
      <form className="form_inicio" onSubmit={handleSubmit}>
        <label>
          <span>Correo electrónico</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Contraseña</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Inicia sesión</button>
        <p>
          Si no recuerdas tu contraseña...
          <Link to="/nuevaContraseña" className="inicioRegistro">
            Nueva contraseña
          </Link>
        </p>
        <p>
          Si aún no tienes cuenta...{" "}
          <Link to="/registro" className="inicioRegistro">
            Regístrate
          </Link>
        </p>
        {/* {error ? <p>{error.message}</p> : null} */}
        {status === "error" && <p className="api">{message}</p>}
      </form>
    </section>
  );
}

export default InicioSesion;
