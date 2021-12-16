import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../../components/forms/FormField";
import api from "../../apis/api";
import "../../assets/styles/cadastroFamilia.css";

function CadastroVitma(props) {
  const [state, setState] = useState({
    name: "",
    nickName: "",
    idade: "",
    email: "",
    estado: "",
    cidade: "",
    telefone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: null,
    nickName: null,
    idade: null,
    email: null,
    estado: null,
    cidade: null,
    telefone: null,
    password: null,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(false);
      const response = await api.post(
        "http://localhost:4000/api/cadastra-vitma",
        state
      );
      console.log(response);

      setLoading(true);
      navigate("/login-vitma");
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        return setErrors({ ...err.response.data.errors });
      }

      console.error(err);
      setLoading(false);
    }
    setErrors("O campo senha e confima senha são diferentes");
  }

  return (
    <div>
      <div className="container">
        {/* cadastrando a vitma no sistema */}

        <h1>Cadastrar Vitima</h1>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nome:"
            type="text"
            name="name"
            required
            id="signupFormName"
            value={state.name}
            error={errors.name}
            onChange={handleChange}
            readOnly={loading}
          />

          <FormField
            label="Nickname:"
            type="text"
            name="nickName"
            required
            id="signupFormNickName"
            error={errors.nickName}
            onChange={handleChange}
            value={state.nickName}
            readOnly={loading}
          />

          <FormField
            label="Idade:"
            type="number"
            name="idade"
            required
            id="signupForIdade"
            value={state.idade}
            error={errors.idade}
            onChange={handleChange}
            readOnly={loading}
          />

          <FormField
            label="Email:"
            type="email"
            name="email"
            required
            id="signupFormEmail"
            value={state.email}
            error={errors.email}
            onChange={handleChange}
            readOnly={loading}
          />

          <FormField
            label="Estado:"
            type="text"
            name="estado"
            required
            id="signupFormEstado"
            error={errors.estado}
            onChange={handleChange}
            value={state.estado}
            readOnly={loading}
          />

          <FormField
            label="Cidade:"
            type="text"
            name="cidade"
            required
            id="signupFormCidade"
            error={errors.cidade}
            onChange={handleChange}
            value={state.cidade}
            readOnly={loading}
          />

          <FormField
            label="Telefone:"
            type="text"
            name="telefone"
            required
            id="signupFormTelefone"
            error={errors.telefone}
            onChange={handleChange}
            value={state.telefone}
            readOnly={loading}
          />

          <FormField
            label="Senha:"
            type="password"
            name="password"
            required
            id="signupFormPassword"
            error={errors.password}
            onChange={handleChange}
            value={state.password}
            readOnly={loading}
          />

          <button
            disabled={loading}
            className="btn btn-danger mt-3"
            type="submit"
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
            cadastrar
          </button>
          <button className="btn btn-link">
            <Link to="/login" className="">
              Já tem uma conta? Clique aqui para entrar.
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroVitma;