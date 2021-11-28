import axios from "axios";
import { Component } from "react";
import { parseJwt, usuarioAutenticado } from '../../services/auth';
import { Link } from "react-router-dom";

import '../../assets/css/style.css';

import Header from "../../components/header";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false,
    };
  }

  efetuaLogin = (event) => {
    event.preventDefault();

    this.setState({ erroMensagem: '', isLoading: true });

    axios.post('http://localhost:5000/api/login', {
      email: this.state.email,
      senha: this.state.senha,
    })
      .then((resposta) => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token);
          this.setState({ isLoading: false });
          let base64 = localStorage.getItem('usuario-login').split('.')[1];
          console.log(base64);

          console.log(parseJwt().role)
          if (parseJwt().role === '1') {
            this.props.history.push('/cadastroConsulta');
          }
          else if (parseJwt().role === '2') {
            this.props.history.push('/consultaMedico');
          }
          else if (parseJwt().role === '3') {
            this.props.history.push('/consultaPaciente')
          }
          else {
            console.log("Não está cadastrado no sistema!")
          }
        }
      })

      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail e/ou senha inválidos!',
          isLoading: false,
        });
      });
  };

  atualizaStateCampo = (campo) => {
    this.setState({ [campo.target.name]: campo.target.value });
  };

  render() {
    return (
      <div>
        <main>
          <Header />
          <section className="banner_login">
            <div className="container_form">
              <form onSubmit={this.efetuaLogin}>
                <h1 className="titulo_login">Login</h1>

                <label for="Email"></label>
                <input className="login_campo"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.atualizaStateCampo}
                  placeholder="Email" required />

                <label for="Senha"></label>
                <input className="login_campo"
                  type="password"
                  name="senha"
                  value={this.state.senha}
                  onChange={this.atualizaStateCampo}
                  placeholder="Senha" required />

                <p style={{ color: 'red' }}>{this.state.erroMensagem}</p>

                {
                  this.state.isLoading === true && (
                    <button
                      className="btn_login"
                      type="submit"
                      disabled>
                      Loading...
                    </button>
                  )
                }

                {
                  this.state.isLoading === false && (
                    <button
                      className="btn_login"
                      type="submit"
                      disabled={
                        //verifica se o email ou a senha está vazio
                        this.state.email === '' || this.state.senha === ''
                          //se for verdadeiro desabilita o botão 
                          ? 'none'
                          //se for falso não desbilita o botão
                          : ''
                      }
                    >
                      Entrar
                    </button>
                  )
                }
                <span className="cadastre_se">Não tem uma conta? Cadastre-se</span>
              </form>
            </div>
          </section>
        </main>
        <footer>
          <nav>
            <Link to="/" class="links_footer">Ajuda</Link>
            <Link to="/" class="links_footer">Sobre</Link>
            <Link to="/" class="links_footer">Fale Conosco</Link>
            <Link to="/" class="links_footer">Central de Atendimento</Link>
            <Link to="/" class="links_footer">Privacidade</Link>
            <Link to="/" class="links_footer">Termos de uso</Link>
            <Link to="/" class="links_footer">Acessibilidade</Link>
            <Link to="/" class="links_footer">© 2021</Link>
          </nav>
        </footer>
      </div>
    );
  }
}