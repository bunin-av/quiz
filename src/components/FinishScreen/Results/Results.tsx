import {AnswerType, DifficultyType} from "../../../reducer"
import styles from './Results.module.css'
import colors from '../../Questions/Questions.module.css'
import {ResultsElement} from "./ResultsElement/ResultsElement";

type ResultsPropsType = {
    answers: AnswerType[]
}

export function Results(props: ResultsPropsType) {
    const mapping = (difficulty: DifficultyType, correct: boolean) => {
        const arr = props.answers.filter(el => {
            return el.difficulty === difficulty && el.correct === correct
        })
        return arr.map((el, i) => {
            return <div key={i} className={styles.question_item}>Question #{el.questionNumber + 1}</div>
        })
    }

    const easyCorrect = mapping("easy", true)
    const mediumCorrect = mapping("medium", true)
    const hardCorrect = mapping("hard", true)

    const easyWrong = mapping("easy", false)
    const mediumWrong = mapping("medium", false)
    const hardWrong = mapping("hard", false)

    const cinephileLevel = (easyCorrect.length + mediumCorrect.length + hardCorrect.length) / 10 * 100

    const classSetter = `${styles.result} ${cinephileLevel <= 30 ? colors.easy
      : (cinephileLevel) <= 60 ? colors.medium
        : colors.hard}`


    return (
      <div className={styles.wrapper}>
          <div className={styles.cinephile}>
              You are cinephile on <span className={classSetter}>{cinephileLevel}%</span>
          </div>
          <div className={styles.headers}>
              <h3 className={colors.easy}>Easy</h3>
              <h3 className={colors.medium}>Medium</h3>
              <h3 className={colors.hard}>Hard</h3>
          </div>
          <div className={styles.block}>
              <ResultsElement
                correctAnswers={easyCorrect}
                wrongAnswers={easyWrong}/>
              <ResultsElement
                correctAnswers={mediumCorrect}
                wrongAnswers={mediumWrong}/>
              <ResultsElement
                correctAnswers={hardCorrect}
                wrongAnswers={hardWrong}/>
          </div>
      </div>
    )
}