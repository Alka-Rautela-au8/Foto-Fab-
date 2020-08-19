import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import SearchForm from "../components/SearchForm";
configure({ adapter: new Adapter() });
it('check the type of value', () => {  
    const props = {
            value: 'cat'
        },
        InputComponent = mount(<SearchForm {...props} />);
    expect(InputComponent.prop('value')).toEqual('cat');
});
