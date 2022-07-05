import { FormEventHandler } from 'react';
import styles from './Authenticate.module.css';

interface IProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const Authenticate: React.FC<IProps> = ({ onSubmit }): JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <label htmlFor="name">Informe a chave de validação</label>
      <div className={styles.inputDiv}>
        <input id="name" type="password" required />
        <button className={`${styles.btn} ${styles.effect01}`} type="submit">
          <span>validar</span>
        </button>
      </div>
    </form>
  );
};

export default Authenticate;
