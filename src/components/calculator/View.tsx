import React from "react";
import CalcView from "components/calculator/Calc";
import History from "components/calculator/History";

export default function View() {
  return (
    <div className="calculator">
      <div className="title">
        <p data-testid="title">Calculator with history</p>
      </div>
      <CalcView/>
      <History/>
    </div>
  )
}
