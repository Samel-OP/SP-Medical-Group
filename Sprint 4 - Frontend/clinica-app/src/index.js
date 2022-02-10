import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch,
} from 'react-router-dom';

import './index.css';

import App from './pages/home/App';
import Login from './pages/login/login.jsx'
import NotFound from './pages/notFound/notFound';
import cadastroConsulta from './pages/cadastroConsultas/cadastroConsulta';
import consultaPaciente from './pages/consultaPacientes/consultaPaciente';
import consultaMedico from './pages/consultaMedicos/consultaMedico';
import descricaoPaciente from './pages/descricaoPacientes/descricaoPaciente';
import descricaoMedico from './pages/descricaoMedicos/descricaoMedico';
import descricaoAdm from './pages/descricaoAdm/descricaoAdm';

import { parseJwt, usuarioAutenticado } from '../src/services/auth';

import reportWebVitals from './reportWebVitals';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoMedico = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoPaciente = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJwt().role === '3' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={cadastroConsulta} />  
        <Route path="/notFound" component={NotFound} />
        <PermissaoAdm path="/cadastroConsulta" component={cadastroConsulta} />
        <PermissaoPaciente path="/consultaPaciente" component={consultaPaciente} />
        <PermissaoMedico path="/consultaMedico" component={consultaMedico} />
        <PermissaoAdm path="/descricaoAdm" component={descricaoAdm} />
        <PermissaoPaciente path="/descricaoPaciente" component={descricaoPaciente} />
        <PermissaoMedico path="/descricaoMedico" component={descricaoMedico} />
        <Redirect to ="/notFound" />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
