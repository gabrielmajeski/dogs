import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} ${styles.menu} container`}>
        <Link to="/" aria-label="Dogs - Home" className={styles.logo}>
          <Dogs />
        </Link>
        {data ? (
          <Link to="conta" className={styles.login}>
            {data.nome}
          </Link>
        ) : (
          <Link to="login" className={styles.login}>
            Login | Criar
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;
