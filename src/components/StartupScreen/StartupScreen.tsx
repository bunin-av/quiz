import {Preloader} from "./Preloader/Preloader";
import styles from "./StartupScreen.module.css";
import {Button} from "../Button/Button";
import {getData} from "../../reducer";
import {Questions} from "../Questions/Questions";
import React from "react";
import {ScreensPropsType} from "../App";


export function StartupScreen({state, dispatch}: ScreensPropsType) {
    return (
      <>
          {state.isFetching && <Preloader/>}
          {!state.questionsData.length
            ? <div className={styles.start}>
                <div>Hello! We offer to participate in our Quiz.
                    The topic is "Films". Try yourself to know how сinephile you are.
                </div>
                <Button title={'GET'} callback={() => getData(dispatch)} disabled={state.isFetching}/>
            </div>

            : <Questions state={state} dispatch={dispatch}/>
          }
      </>
    )
}