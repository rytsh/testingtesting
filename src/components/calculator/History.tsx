import React from "react";
import { connect } from "react-redux";

interface Props {
  history: Array<any>,
  dispatch: Function
}

function History({ history, dispatch }:Props) {
  return (
    <ul id="history" className="history">
      {history.map((data, index) => (
        <li key={index} onClick={()=>deleteHistory(dispatch, index)}>{data.calc}</li>
      ))}
    </ul>
  );
}

function deleteHistory(dispatch:Function, index:number) {
  return dispatch({
    app: "CALCULATOR",
    type: "DEL",
    index: index
  })
}

function mapStateToProps(state: any) {
  return {
    history: state.calculator.history as Array<any>,
    dispatch: state.dispatch as Function
  }
}

export default connect(mapStateToProps)(History);
