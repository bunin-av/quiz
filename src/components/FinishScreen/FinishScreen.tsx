import styles from "./FinishScreen.module.css";
import {Button} from "../Button/Button";
import {Results} from "./Results/Results";
import React from "react";
import {ScreensPropsType} from "../App";
import {showResults} from "../../reducer";


export function FinishScreen({state, dispatch}: ScreensPropsType) {
    const toShowResults = () => dispatch(showResults())

    return (
      <div className={styles.congratulations}>
          <div>Congratulations!</div>
          <div>You have finished the Quiz</div>
          <Button title={'Look for results'} callback={toShowResults} disabled={state.showResults}/>
          {state.showResults && <Results answers={state.answers}/>}
      </div>
    )
}