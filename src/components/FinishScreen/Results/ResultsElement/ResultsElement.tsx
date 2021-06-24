import styles from "../Results.module.css";

type ResultsElementPropsType = {
    correctAnswers: JSX.Element[]
    wrongAnswers: JSX.Element[]
}
export function ResultsElement(props: ResultsElementPropsType) {
    return (
      <div className={styles.block_item}>
          <div>
              Correct:
              {props.correctAnswers}
          </div>
          <div>
              Wrong:
              {props.wrongAnswers}
          </div>
      </div>
    )
}
