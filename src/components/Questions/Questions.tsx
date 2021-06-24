import React from "react";
import {ActionsType, RootStateType} from "../../reducer";
import styles from './Questions.module.css'
import {AnswerElements} from "../AnswerElements/AnswerElements";


export function Questions(props: { state: RootStateType, dispatch:(a:ActionsType)=>void }) {
    const {currentQuestion, questionsData} = {...props.state}
    const classSetter = () => {
        let value = questionsData[currentQuestion].difficulty
        if (value === 'easy') {
            return styles.easy
        }
        if (value === 'medium') {
            return styles.medium
        }
        if (value === 'hard') {
            return styles.hard
        }
    }
    const currentQuestionData = questionsData.filter((el, i) => i === currentQuestion)


    return (
      <div>
          <h2>Question #{currentQuestion + 1}</h2>
          <div className={styles.difficulty}>
              <span>Difficulty: </span>
              <span className={`${styles.difficulty_font} ${classSetter()}`}>
              {questionsData[currentQuestion].difficulty}
          </span>
          </div>
          {
              currentQuestionData.map((el, i) => {
                  return (
                    <div key={i}>
                        <div className={styles.question}>{el.question}</div>
                        <AnswerElements
                                correct_answer={el.correct_answer}
                                incorrect_answers={el.incorrect_answers}
                                dispatch={props.dispatch}
                                type={el.type}
                                currentQuestion={props.state.currentQuestion}
                              />
                    </div>
                  )
              })
          }
      </div>
    )
}