import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "store/one";

import Calculator from "components/calculator/View";
import { CalcView } from "components/calculator/Calc";

Enzyme.configure({ adapter: new Adapter});

// function mWithStore(
//   ui:any,
//   storex:any = store
// ) {
//   return {
//     wrap: Enzyme.mount(<Provider store={storex}>{ui}</Provider>) as Enzyme.ReactWrapper,
//     storex,
//   }
// }

// function rWithStore(
//   ui:any,
//   storex:any = store
// ) {
//   return {
//     wrap: Enzyme.render(<Provider store={storex}>{ui}</Provider>) as Cheerio,
//     storex,
//   }
// }


describe('Enzyme Calculator', () => {
  it('should render app', ()=> {
    const wrapper = Enzyme.shallow(<Calculator/>);
    // console.log(wrapper.debug());
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('p[data-testid="title"]').text()).toBe("Calculator with history");
    expect(wrapper.find('[data-testid="title"]').text()).toBe("Calculator with history");
    // enzyme-to-json toJson
    expect(wrapper).toMatchSnapshot();;
  })

  it('calls component did mount', ()=> {
    jest.spyOn(CalcView.prototype, 'componentDidMount');
    const mount = Enzyme.mount(<CalcView />);
    expect(CalcView.prototype.componentDidMount.mock.calls.length).toBe(1);
    mount.unmount();
  });

  it('props changes', ()=>{
    const componentDidMock = jest.fn();
    const componentDidUMock = jest.fn();
    CalcView.prototype.componentDidMount = componentDidMock;
    CalcView.prototype.componentWillUnmount = componentDidUMock;

    const calcview = Enzyme.shallow(<CalcView />);
    expect(componentDidMock.mock.calls.length).toBe(1);

    // Check screen prob
    calcview.setProps({screen: 100});
    expect(calcview.find('#calcScreen').props().value).toBe(100);

    // const dispatchMock = jest.fn((obj)=> {console.log(obj)});
    // calcview.setProps({dispatch: dispatchMock});

    // console.log(calcview.debug());
    calcview.unmount();
    expect(componentDidUMock.mock.calls.length).toBe(1);
  })

  // it('mount', ()=>{
  //   // jest.spyOn(CalcView.prototype, 'componentDidMount');
  //   const wrapper = mWithStore(<Calculator/>);
  //   // console.log(wrapper.wrap.debug());
  //   // expect(CalcView.prototype.componentDidMount.mock.calls.length).toBe(1);
  //   wrapper.wrap.find('[value="9"]').simulate("click");
  //   // wrapper.storex
  //   wrapper.wrap.update();
  //   console.log(wrapper.wrap.debug());
  //   // it was nice try but did not changed
  //   wrapper.wrap.unmount();
  // });

  // it('render', ()=>{
    // this is just a DOM check
    // const wrapper = rWithStore(<Calculator/>);
    // console.log(wrapper.wrap.debug());
    // wrapper.wrap.find('[value="9"]').simulate("click");
    // console.log(wrapper.wrap.debug());
  // })
})
