import Image from 'next/image'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <p>Trabalho de Conclusão de Curso</p>
        <p>Payam Kaffashi</p>
        <p>payamkaffashi@hotmail.com</p>
      </div>
      <a href="https://www.ufmt.br/" target="_blank" rel="noopener noreferrer">
        <span className={styles.logo}>
          <Image
            src="/assets/ufmt.jpg"
            alt="Ufmt Logo"
            width={84}
            height={98}
          />
        </span>
      </a>
    </footer>
  );
};

export default Footer;
