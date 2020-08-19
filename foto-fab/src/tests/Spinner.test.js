import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import Spinner from "../components/Spinner";
configure({ adapter: new Adapter() });
it("renders without crashing", () => {
  shallow(<Spinner />);
});
