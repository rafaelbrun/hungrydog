import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { ler, darRacao, validar } from '../src/service/alimentar';
import Loader from '../src/components/loader';
import Footer from '../src/components/footer';
import Authenticate from '../src/components/authenticate';
import useLoading from '../src/components/utils/hooks/useLoading';

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();
  const [chave, setChave] = useState('');
  const [access, setAccess] = useState(false);
  const [porcoes, setPorcoes] = useState(0);
  const [ultimaPorcao, setUltimaPorcao] = useState('');
  const [selectedQuantidade, setSelectedQuantidade] = useState('200');

  const validarChave = async (event: any) => {
    setChave(event.target.name.value);
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await validar('Payam Hungry', event.target.name.value);
      if (resp.data.success) {
        setPorcoes(resp.data.totalPorcoes);
        setUltimaPorcao(resp.data.ultimaPorcao);
        setAccess(true);

        const leitura = await ler();
        setSelectedQuantidade(leitura.data.quantidade);
      } else {
        alert('Chave de validação incorreta.');
      }
    } catch (e) {
      alert(e);
    }
    setIsLoading(false);
  };

  const alimentar = async () => {
    setIsLoading(true);
    const leitura = await ler();
    if (leitura.data.status == 'PEDINDO') {
      alert('Aguarde, o Hungry Dog está em andamento!');
    } else {
      const respRacao = await darRacao(
        'Payam Hungry',
        chave,
        selectedQuantidade,
      );
      if (respRacao.data.success) {
        setPorcoes(respRacao.data.totalPorcoes);
        setUltimaPorcao(respRacao.data.ultimaPorcao);
        alert('A solicitação foi enviada!');
      } else {
        alert('A solicitação falhou.');
      }
    }
    setIsLoading(false);
  };

  function handleOptionChange(changeEvent: any) {
    setSelectedQuantidade(changeEvent.target.value.toString());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Hungry Dog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/dog.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <Image
          src="/assets/dog.png"
          alt="Picture of the author"
          width={150}
          height={150}
        />
        <h1 className={styles.title}>Hungry Dog</h1>
        {!isLoading ? (
          access ? (
            <div className={styles.buttonFeed}>
              <span>Selecione a quantidade da porção</span>
              <form className={styles.radioForm}>
                <div className={styles.radioDiv}>
                  <label>
                    <input
                      type="radio"
                      value="200"
                      checked={selectedQuantidade == '200'}
                      onChange={handleOptionChange}
                    />
                    200 g
                  </label>
                </div>
                <div className={styles.radioDiv}>
                  <label>
                    <input
                      type="radio"
                      value="350"
                      checked={selectedQuantidade == '350'}
                      onChange={handleOptionChange}
                    />
                    350 g
                  </label>
                </div>
                <div className={styles.radioDiv}>
                  <label>
                    <input
                      type="radio"
                      value="500"
                      checked={selectedQuantidade == '500'}
                      onChange={handleOptionChange}
                    />
                    500 g
                  </label>
                </div>
              </form>
              <button
                onClick={alimentar}
                className={`${styles.btn} ${styles.effect01}`}
              >
                <span>alimentar</span>
              </button>
              {porcoes != 1 ? (
                <span>{porcoes} Porções</span>
              ) : (
                <span>{porcoes} Porção</span>
              )}
              <span className={styles.spanLast}>
                Última porção {ultimaPorcao}
              </span>
            </div>
          ) : (
            <Authenticate onSubmit={validarChave} />
          )
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
    </div>
  );
}
