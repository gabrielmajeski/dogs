import React from 'react';
import styles from './LoginForm.module.css';
import stylesBtn from '../Form/Button.module.css';

import { Link } from 'react-router-dom';
import Button from '../Form/Button';
import Input from '../Form/Input';
import useForm from '../../Hooks/useForm';
import { TOKEN_POST, USER_GET } from '../../api';
import { UserContext } from '../../UserContext';
import Error from '../Helper/Error';
import Head from '../Helper/Head';

async function getUser(token) {
  const { url, options } = USER_GET(token);
  const response = await fetch(url, options);
  const json = await response.json();
}

const LoginForm = () => {
  const { userLogin, error, loading } = React.useContext(UserContext);

  const username = useForm('');
  const password = useForm('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  return (
    <main className={'animeLeft'}>
      <Head title="Login" />

      <section>
        <form onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>
          <Input label="Usuário" type="text" name="username" {...username} />
          <Input label="Senha" type="password" name="password" {...password} />
          {loading ? (
            <Button disabled>Carregando...</Button>
          ) : (
            <Button>Entrar</Button>
          )}
          <Error error={error && 'Dados incorretos.'} />
        </form>
        <Link className={styles.lost} to="/login/perdeu">
          Perdeu a Senha?
        </Link>
        <div className={styles.register}>
          <h2 className={styles.subtitle}>Cadastre-se</h2>
          <p>Ainda não possui conta? Cadastre-se no site.</p>
          <Link className={stylesBtn.button} to="/login/criar">
            Cadastro
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
