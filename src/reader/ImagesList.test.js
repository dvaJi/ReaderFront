import React from "react";
import { shallow } from "enzyme";
import ImagesList from "./ImagesList";

function handleChapterChange(chapter) {
  //
}

it("should render while loading and cascade mode without throwing an error", () => {
  const wrapper = shallow(
    <ImagesList
      loading={true}
      cascade={true}
      pageSelected={1}
      onPageSelected={2}
      onChapterChange={handleChapterChange}
      pages={[1, 2, 3, 4, 5, 6]}
    />
  );
});

it("should render loaded with cascade mode without throwing an error", () => {
  const wrapper = shallow(
    <ImagesList
      loading={false}
      cascade={true}
      pageSelected={1}
      onPageSelected={2}
      onChapterChange={handleChapterChange}
      pages={[1, 2, 3, 4, 5, 6]}
    />
  );
});

it("should render loaded without cascade mode without throwing an error", () => {
    const wrapper = shallow(
      <ImagesList
        loading={false}
        cascade={false}
        pageSelected={1}
        onPageSelected={2}
        onChapterChange={handleChapterChange}
        pages={[1, 2, 3, 4, 5, 6]}
      />
    );
  });
  