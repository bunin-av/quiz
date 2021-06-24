import {convertData} from "./assets/dataConverter";
import {Dispatch} from "react";

//consts
const LOAD_QUESTIONNAIRE = 'LOAD_QUESTIONNAIRE'
const GIVE_ANSWER = 'GIVE_ANSWER'
const SHOW_RESULTS = 'SHOW_RESULTS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

//types
type GetResponseType = {
    response_code: number
    results: QuestionsDataType[]
}
export type DifficultyType = 'easy' | 'medium' | 'hard'
export type QuestionsDataType = {
    category: string
    type: 'multiple' | 'boolean'
    difficulty: DifficultyType
    question: string
    correct_answer: string
    incorrect_answers: string[]
}
export type RootStateType = {
    questionsData: QuestionsDataType[]
    answers: AnswerType[]
    currentQuestion: number
    showResults: boolean
    isFetching: boolean
}
export type AnswerType = {
    answer: string
    correct: boolean
    difficulty: DifficultyType
    questionNumber: number
}

export type ActionsType = ReturnType<typeof startQuestionnaire>
  | ReturnType<typeof giveAnswer>
  | ReturnType<typeof showResults>
  | ReturnType<typeof toggleIsFetching>


export const initialState: RootStateType = {
    questionsData: [],
    answers: [],
    currentQuestion: 0,
    showResults: false,
    isFetching: false,
}


export const reducer = (state = initialState, action: ActionsType): RootStateType => {
    let currentAnswer = state.questionsData[state.currentQuestion]

    switch (action.type) {
        case LOAD_QUESTIONNAIRE:
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_RESULTS: {
            return {
                ...state,
                showResults: true
            }
        }
        case GIVE_ANSWER:
            return {
                ...state,
                answers: [
                    ...state.answers,
                    {
                        answer: action.payload.answer,
                        difficulty: currentAnswer.difficulty,
                        correct: currentAnswer.correct_answer === action.payload.answer,
                        questionNumber: action.payload.question
                    }
                ],
                currentQuestion:
                  state.currentQuestion < 10
                    ? state.currentQuestion + 1
                    : state.currentQuestion,
            }
        default:
            return state
    }
}

//AC
export const startQuestionnaire = (questionsData: QuestionsDataType[]) => ({
    type: LOAD_QUESTIONNAIRE,
    payload: {questionsData} as RootStateType
}) as const

export const showResults = () => ({
    type: SHOW_RESULTS
}) as const

export const giveAnswer = (answer: string, question: number) => ({
    type: GIVE_ANSWER,
    payload: {answer, question}
}) as const

export const toggleIsFetching = (isFetching: boolean) => ({
    type: TOGGLE_IS_FETCHING,
    payload: {isFetching} as RootStateType
}) as const


export async function getData(dispatch: Dispatch<ActionsType>) {
    try {
        dispatch(toggleIsFetching(true))
        let response = await fetch(`https://opentdb.com/api.php?amount=10&category=11`);
        if (response.ok) {
            let data: GetResponseType = await response.json()
            dispatch(toggleIsFetching(false))
            let convertedData: QuestionsDataType[] = data.results.map((el: QuestionsDataType) => {
                return {
                    ...el,
                    question: convertData(el.question),
                    correct_answer: convertData(el.correct_answer),
                    incorrect_answers: el.incorrect_answers.map(a => convertData(a))
                }
            })
            dispatch(startQuestionnaire(convertedData))
        }
    } catch (err) {
        console.log(err)
        alert("We're having some trouble right now. Please try again later")
    }
    return
}





