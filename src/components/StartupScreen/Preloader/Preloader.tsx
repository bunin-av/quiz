import React from "react";
import styles from './Preloader.module.css'

export const Preloader = () => {
    return (
      <div className={styles.wrapper}>
          <div className={styles.lds_roller}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
          </div>
      </div>

    )
}
