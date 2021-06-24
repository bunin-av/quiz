import styles from "./Button.module.css";
import React from "react";

type ButtonPropsType = {
    title: string
    callback: () => void
    disabled: boolean
}

export function Button({callback, title, disabled}: ButtonPropsType) {
    return (
      <button
        onClick={callback}
        disabled={disabled}
        className={styles.button}
      >{title}</button>
    )
}