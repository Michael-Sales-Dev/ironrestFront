import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import login from "../../assets/images/login.jpeg";
import "../../assets/styles/loginVitima.css";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  function handleclick(event) {
    if (event.target.name === "user") {
      return setState({ role: "USER" });
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

        async function handleSubmit(event) {
        event.preventDefault();

        try {
        const response = await api.post(
          "http://localhost:4000/api/login-Vitma",
          state
        );
        console.log(response);

        authContext.setLoggedInUser({ ...response.data });
        localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
        );
        setErrors({ password: "", email: "" });
        navigate("/home ");
        } catch (err) {
        console.error(err.response);
        setErrors({ ...err.response.data.errors });
        }
        }

      return (


      <div className="container-fluid  d-block justify-content-start">
            <div className="row">
                 <div className="col-6">
            
            
            <form onSubmit={handleSubmit}>
           
            <div className="logo mt-3 ">
                  <img src="https://www.beauty-duesseldorf.com/cache/pica/2/0/5/3/5/269031478697200/icon_kontakt_portalfarbe_4-3.png" alt="logo" />
            </div>
                <h1>Entrar</h1>
            <div className="email mt-3">
            <label htmlFor="signupFormEmail" className="ml-3">E-mail:</label>
            <input
              type="email"
              name="email"
              id="signupFormEmail"
              value={state.email}
              error={errors.email}
              onChange={handleChange}
            />
          </div>

          <div className="senha mt-3">
            <label htmlFor="signupFormPassword" className="ml-3">
              Senha:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="signupFormPassword"
              value={state.password}
              error={errors.password}
              onChange={handleChange}
            />
          </div>

          <button
            name="user"
            onClick={handleclick}
            className="btn btn-light mt-3"
          >
            <Link to="/signup">
              Não tem uma conta? Clique aqui para cadastrar!
            </Link>
          </button>
        </div>
      </form>
      
    </div>
  );
}

export default login;
