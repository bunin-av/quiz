import React, {Dispatch, useEffect, useMemo, useState} from "react";
import {ActionsType, giveAnswer} from "../../reducer";
import {randomize} from "../../assets/randomizer";
import {Button} from "../Button/Button";


export type AnswerElementsPropsType = {
    correct_answer: string
    incorrect_answers: string[]
    type: string
    currentQuestion: number
    dispatch: Dispatch<ActionsType>
}

export function AnswerElements(props: AnswerElementsPropsType) {
    const memoizedAnswers = useMemo(() => {
        const answers = [...props.incorrect_answers, props.correct_answer]
        return randomize(answers)
    }, [props.correct_answer, props.incorrect_answers])

    const [value, setValue] = useState<string>('')
    useEffect(() => {
        setValue(memoizedAnswers[0])
    }, [memoizedAnswers])

    const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setValue(e.target.id)
        }
    }

    const sendAnswer = () => {
        if (props.currentQuestion <= 10 && value) {
            props.dispatch(giveAnswer(value, props.currentQuestion))
            setValue('')
        }
    }

    return (
      <div>
          {memoizedAnswers.map((el, i) => {
              return (
                <div key={i}>
                    <input type='radio'
                           id={el}
                           name={el}
                           checked={el === value}
                           onChange={(e) => onChangeCheckbox(e)}
                    />
                    <label htmlFor={el}>{el}</label>
                </div>
              )
          })}
          <Button title={'Send'} callback={sendAnswer} disabled={false}/>
      </div>
    )
}
