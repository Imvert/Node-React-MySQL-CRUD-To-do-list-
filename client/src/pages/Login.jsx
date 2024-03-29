import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Loader from "../components/loader";

export default function Login() {
  const { loadUser } = useUser();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loadUser({
        username,
        password,
      });

      if (response == undefined) {
        setErrorMessage("wrong credentials");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      } else {
        setUsername("");
        setPassword("");
        setLoading(true);

        window.localStorage.setItem(
          "loggedNoteAppUser",
          JSON.stringify(response)
        );

        setTimeout(() => {
          navigate(`/tasks`);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container mx-auto h-[81vh] md:h-full">
      <div className="login-container">
        <h2>Welcome</h2>
        <p>Crea tus notas y nunca las olvides 📘</p>

        <form onSubmit={handleSubmit}>
          <p>
            <label>Username</label>
            <input
              required
              type="text"
              placeholder="mercedes25"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              className="input"
              name="username"
              id="username"
            />
          </p>
          {loading ? <Loader /> : ""}
          <p>
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="***********"
              className="input"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              name="password"
              id="password"
            />
          </p>

          <p>
            <input
              type="submit"
              style={{ marginBottom: "20px", marginTop: "20px" }}
              className="btn btn-login"
              value="Iniciar Sesion"
            />
          </p>
        </form>
        <p>
          <input
            type="submit"
            style={{ marginBottom: "20px", marginTop: "20px" }}
            className="btn btn-login-register hover:bg-blue-500"
            value="Registrarse"
            onClick={() => navigate(`/register`)}
          />
        </p>
        <p style={{ color: "red", fontSize: "20px" }}>{errorMessage}</p>
      </div>
    </div>
  );
}
