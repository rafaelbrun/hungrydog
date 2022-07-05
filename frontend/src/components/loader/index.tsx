import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.gooey}>
    <span className={styles.dot}></span>
    <div className={styles.dots}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  )
}

export default Loader;