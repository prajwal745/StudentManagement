import Head from "next/head";
import styles from "../styles/Home.module.css";
import { routes } from "../helper/routes";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Result Management System!</h1>
      <div className={styles.grid}>
        {routes?.map((route) => (
          <a key={route?.route} href={route?.route} className={styles.card}>
            <h3>{route?.label} &rarr;</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
