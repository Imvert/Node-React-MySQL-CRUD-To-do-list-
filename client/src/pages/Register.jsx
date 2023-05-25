//react imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//personal imports
import "../css/login.css";
import { register } from "../api/register.api";
import confetti from "canvas-confetti";

export default function Register() {
  const [name, setName] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [messages, setMessages] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, lastname, username, password });

      if (response == undefined) {
        setErrorMessage("error al enviar los datos, intentelo de nuevo");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } else {
        confetti();
        setMessages("Registro exitoso");
        setName("");
        setUsername("");
        setlastname("");
        setPassword("");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      className="form-container"
      style={{ marginLeft: "130px", marginTop: "40px" }}
    >
      <div className="login-container ">
        <h2>Registrarse</h2>
        <p>Crea tu usuario 👤</p>

        <form onSubmit={handleSubmit}>
          <p>
            <label>Nombres</label>
            <input
              required
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
              className="input flex-initial"
              name="nombre"
              id="nombre"
            />
          </p>

          <p>
            <label>Apellidos</label>
            <input
              required
              type="text"
              value={lastname}
              onChange={({ target }) => setlastname(target.value)}
              className="input flex-initial"
              name="lastname"
              id="lastname"
            />
          </p>
          <div className="flex flex-row space-x-[90px]">
            <p>
              <label>Nombre Usuario</label>
              <input
                required
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="input flex-initial"
                name="username"
                id="username"
              />
            </p>

            <p>
              <label>Contraseña</label>
              <input
                required
                type="password"
                className="input"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                name="password"
                id="password"
              />
            </p>
          </div>
          <p>
            <input
              type="submit"
              style={{ marginBottom: "20px", marginTop: "20px" }}
              className="btn btn-login-register hover:bg-blue-600"
              value="Registrarse"
              onClick={handleSubmit}
            />
          </p>
        </form>
        <p>
          <input
            type="submit"
            style={{ marginBottom: "20px", marginTop: "20px" }}
            className="btn btn-login"
            value="Pagina Inicio"
            onClick={() => navigate("/")}
          />
        </p>
        <p style={{ color: "green", fontSize: "20px" }}>{messages}</p>
        <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
      </div>
    </div>
  );
}
