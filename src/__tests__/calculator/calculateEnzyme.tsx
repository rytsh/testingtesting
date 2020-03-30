import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import store from "store/one";

import Calculator from "components/calculator/View";

Enzyme.configure({ adapter: new Adapter});

function mWithStore(
  ui:any,
  storex:any = store
) {
  return {
    wrap: Enzyme.mount(<Provider store={storex}>{ui}</Provider>) as Enzyme.ReactWrapper,
    storex,
  }
}

function rWithStore(
  ui:any,
  storex:any = store
) {
  return {
    wrap: Enzyme.render(<Provider store={storex}>{ui}</Provider>) as Cheerio,
    storex,
  }
}


describe('Enzyme Calculator', () => {
  it('should render app', ()=> {
    const wrapper = Enzyme.shallow(<Calculator/>);
    // console.log(wrapper.debug());
    expect(wrapper.find('.title').exists()).toBe(true);
    expect(wrapper.find('p[data-testid="title"]').text()).toBe("Calculator with history");
    expect(wrapper.find('[data-testid="title"]').text()).toBe("Calculator with history");
    // enzyme-to-json toJson
    expect(wrapper).toMatchSnapshot();;

    // get probs values
    // wrapper.instance().props.address
    // set probs, probs should be valid
    // wrapper.setProps({hide: true});
    // expect(wrapper.props().hide).toBeTruthy();
  })

  // it('calls component did mount', ()=> {
    // jest.spyOn(Calculator.prototype, 'componentDidMount');
    // const wrapper:any = Enzyme.shallow(<Calculator/>);
    // expect(wrapper.prototype.componentDidMount.mock.calls.length).toBe(1);
  // })

  it('mount', ()=>{
    const wrapper = mWithStore(<Calculator/>);
    // console.log(wrapper.wrap.debug());
    wrapper.wrap.find('[value="9"]').simulate("click");
    // wrapper.storex
    // wrapper.wrap.update();
    // console.log(wrapper.wrap.debug());
  })

  // it('render', ()=>{
    // this is just a DOM check
    // const wrapper = rWithStore(<Calculator/>);
    // console.log(wrapper.wrap.debug());
    // wrapper.wrap.find('[value="9"]').simulate("click");
    // console.log(wrapper.wrap.debug());
  // })
})
