import React from "react";
import { render, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import WorksList from "./WorksList";
import WorkItem from "./WorkItem";
import WorkItemEmpty from "./WorkItemEmpty";
import { getWorks } from "../../utils/mocks/getWorksMock";

const works = getWorks;

it("renders without crashing", () => {
  let filterText = "";
  render(<WorksList loading="false" works={works} filterText={filterText} />);
});

it("should displays WorkItemEmpty", () => {
  let filterText = "";

  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={true} works={[]} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(WorkItemEmpty)).toBeTruthy();
  wrapper.unmount();
});

it("should displays WorkItem", () => {
  let filterText = "";
  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={false} works={works} filterText={filterText} />
    </MemoryRouter>
  );
  expect(wrapper.find(WorkItem)).toBeTruthy();
  wrapper.unmount();
});

it("should filter works", () => {
  let filterText = "aka";
  const wrapper = mount(
    <MemoryRouter>
      <WorksList loading={false} works={works} filterText={filterText} />
    </MemoryRouter>
  );
  wrapper.setProps({ filterText: "aka" });
  expect(wrapper.find(WorkItem)).toBeTruthy();
  wrapper.unmount();
});


