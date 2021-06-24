import React, {Dispatch, useReducer} from 'react';
import {ActionsType, initialState, reducer, RootStateType} from "../reducer";
import {StartupScreen} from "./StartupScreen/StartupScreen";
import {FinishScreen} from "./FinishScreen/FinishScreen";

export type ScreensPropsType = {
    state: RootStateType
    dispatch: Dispatch<ActionsType>
}
function App() {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
      state.currentQuestion < 10
        ? <StartupScreen state={state} dispatch={dispatch}/>
        : <FinishScreen state={state} dispatch={dispatch}/>
    )
}

export default App;



