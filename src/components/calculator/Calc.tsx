import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { calculateInfix, pkeys } from "components/calculator/calculate";


interface Props {
  screen: string,
  history: Array<any>,
  dec: boolean,
  changen: boolean,
  dispatch: Function
}

class CalcView extends React.Component<Props> {
  _handleKeys = (event:any) => {
    let x = {
      target: {
        nodeName: 'BUTTON',
        className: '',
        value: ''
      },
      pass: true
    };

    // console.log(event.key);
    if (/^[0123456789]/.test(event.key))
      x.target.className = "number";
    else if (event.key === '.')
      x.target.className = "decimal";
    else if (event.key === '=' || event.key === 'Enter') {
      event.preventDefault();
      x.target.className = "equal-sign" }
    else if (event.key === 'c')
      x.target.className = "all-clear"
    else if (RegExp(`^[${pkeys}]`).test(event.key))
      x.target.className = "operator"
    else if (event.key === 'd') {
      this.props.dispatch({
        app: "CALCULATOR",
        type: "DEL-LAST"
      })}
    else
      return

    x.target.value = event.key;

    this._handleButtons(x);
  }

  _handleButtons = (event:any) => {
    // console.log(event.target.value);
    if (event.pass !== true)
      event.stopPropagation()

    if (event.target.nodeName === "BUTTON") {
      switch (event.target.className) {
        case "number":
          return this.props.dispatch({
            app: "CALCULATOR",
            type: "HOLD",
            value: (this.props.screen === "0"? "": this.props.screen) + event.target.value,
            changen: this.props.dec? false: true,
            dec: this.props.dec
          })
        case "decimal":
          // console.log("text", event.target.value);
          if (this.props.screen[this.props.screen.length-1] !== event.target.value) {
            if (this.props.changen === true && this.props.dec === false ) {
              return this.props.dispatch({
                app: "CALCULATOR",
                type: "HOLD",
                value: this.props.screen + event.target.value,
                dec: true,
                changen: false
              })
            }
          }
          break;
        case "operator":
          // console.log("operator", event.target.value);
          if (Number(Number.isNaN(Number(this.props.screen[this.props.screen.length-1])))) {
            return this.props.dispatch({
              app: "CALCULATOR",
              type: "HOLD",
              value: this.props.screen.slice(0,this.props.screen.length-1) + event.target.value,
              dec: false,
              changen: this.props.changen
            })
          }
          return this.props.dispatch({
            app: "CALCULATOR",
            type: "HOLD",
            value: this.props.screen + event.target.value,
            dec: false,
            changen: this.props.changen
          })
        case "all-clear":
          return this.props.dispatch({
            app: "CALCULATOR",
            type: "HOLD",
            value: "0",
            dec: false,
            changen: true
          })
          // console.log("all clear");
        case "equal-sign":
          let calcVal = RegExp(`[${pkeys}]`).test(this.props.screen[this.props.screen.length-1])? this.props.screen.slice(0, -1): this.props.screen;
          const rest = calculateInfix(calcVal);
          return this.props.dispatch({
            app: "CALCULATOR",
            type: "EQUAL",
            value: rest,
            history: `${calcVal} = ${rest}`,
            dec: rest.search('[.]') === -1? false: true,
            changen: rest.search('[.]') === -1? true: false
          })
          // console.log("equal sign");
        default:
          break
      }
    }
  }

  componentDidMount() {
    // add genereal event listener
    const node = ReactDOM.findDOMNode(this) as Element;
    node.addEventListener("click", this._handleButtons);
    window.addEventListener("keydown", this._handleKeys);
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this) as Element;
    node.removeEventListener("click", this._handleButtons);
    window.removeEventListener("keydown", this._handleKeys);
  }

  render() {
    return (
    <div className="calcView">
      <input type="text" id="calcScreen" className="calculatorScreen" value={this.props.screen} disabled />
      <div className="calculatorKeys">
        <button type="button" className="operator" value="+">+</button>
        <button type="button" className="operator" value="-">-</button>
        <button type="button" className="operator" value="x">&times;</button>
        <button type="button" className="operator" value="/">&divide;</button>

        <button type="button" className="number" value="7">7</button>
        <button type="button" className="number" value="8">8</button>
        <button type="button" className="number" value="9">9</button>

        <button type="button" className="number" value="4">4</button>
        <button type="button" className="number" value="5">5</button>
        <button type="button" className="number" value="6">6</button>

        <button type="button" className="number" value="1">1</button>
        <button type="button" className="number" value="2">2</button>
        <button type="button" className="number" value="3">3</button>

        <button type="button" className="number" value="0">0</button>
        <button type="button" className="decimal" value=".">.</button>
        <button type="button" className="all-clear" value="all-clear">AC</button>

        <button type="button" className="equal-sign" value="=">=</button>
      </div>
    </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    screen: state.calculator.screen,
    history: state.calculator.history,
    dec: state.calculator.dec,
    changen: state.calculator.changen,
    dispatch: state.dispatch
  }
}

export default connect(mapStateToProps)(CalcView);
export {CalcView};
