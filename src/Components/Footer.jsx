import React from 'react';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer>
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
