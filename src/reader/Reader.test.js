import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import Reader from "./Reader";
import ReaderBar from "./ReaderBar";

it("renders without crashing", () => {
  let props = {
    params: {
      stub: "infection"
    }
  };
  mount(
    <MemoryRouter initialEntries={["/read/infection/es/6/40.0"]}>
      <Reader match={props} />
    </MemoryRouter>
  );
});

it("renders without crashing", async () => {
  let props = {
    params: {
      stub: "infection"
    }
  };
  const wrapper = shallow(<Reader match={props} />);
  wrapper.setState({ chapter: mockChapter });
  wrapper.setState({ isLoading: false });
  await wrapper.update();
  expect(wrapper.find(ReaderBar)).toBeTruthy();
});

let mockChapter = {
  id: 53,
  comic_id: "23",
  team_id: "0",
  joint_id: "1",
  chapter: "1",
  subchapter: "0",
  volume: "1",
  language: "es",
  name: "Pacifico Amanecer",
  stub: "1_0_pacifico_amanecer",
  uniqid: "5727c0f3b5e00",
  hidden: "0",
  description: "",
  thumbnail: "",
  created: "2016-05-02 21:04:51",
  lastseen: "0000-00-00 00:00:00",
  updated: "0000-00-00 00:00:00",
  creator: "2",
  editor: "2",
  href:
    "http://localhost:3000/read/rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero/es/1/1/",
  title: "Vol.1 Chapter 1: Pacifico Amanecer",
  download_href:
    "http://localhost:3000/download/rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero/es/1/1/",
  comic: {
    id: 23,
    name: "Re:Zero kara Hajimeru Isekai Seikatsu - Daisanshou - Truth of Zero",
    stub: "rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero",
    uniqid: "5727c03e72935",
    hidden: "0",
    author: "Nagatsuki Tappei",
    artist: "Matsue Daichi",
    description:
      'Secuela de Re:Zero Kara Hajimeru Isekai Seikatsu - Dainishou - Yashiki no Isshuukan-Hen\n \n De repente, Subaru Natsuki un estudiante de secundaria fu\u00e9 convocado a otro mundo cuando regresaba de compras en una tienda. No hay se\u00f1ales de quien lo convoc\u00f3 pero las cosas empeoran cuando es atacado. Pero cuando es salvado por una misteriosa chica de cabello plateado con un gato hada, Subaru coopera con la chica para devolver el favor. Cuando por fin logran obtener una pista Subaru junto con la chica son atacados y asesinados por alguien. Subaru entonces despierta en el lugar que fue convocado y se da cuenta que gano una nueva habilidad "Regresar de la Muerte" un chico indefenso que s\u00f3lo tiene la capacidad de rebobinar el tiempo con la muerte.',
    thumbnail: "coverImage_2382713.jpg",
    customchapter: "",
    format: "0",
    adult: "0",
    created: "2016-05-02 21:01:50",
    lastseen: "0000-00-00 00:00:00",
    updated: "2017-07-22 20:25:10",
    creator: "2",
    editor: "2",
    thumb_url: "thumb_coverImage_2382713.jpg",
    fullsized_thumb_url: "coverImage_2382713.jpg",
    href: "rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero/"
  },
  pages: [
    {
      id: 1123,
      chapter_id: "53",
      filename: "ReZero_TruthOfZero_v1_000_cover.png",
      hidden: "0",
      created: "2016-05-02 21:24:32",
      lastseen: "0000-00-00 00:00:00",
      updated: "0000-00-00 00:00:00",
      creator: "2",
      editor: "2",
      height: "1300",
      width: "910",
      mime: "image/png",
      size: "1740176",
      url:
        "http://localhost:3000/content/comics/rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero_5727c03e72935/1_0_pacifico_amanecer_5727c0f3b5e00/ReZero_TruthOfZero_v1_000_cover.png",
      thumb_url:
        "http://localhost:3000/content/comics/rezero_kara_hajimeru_isekai_seikatsu__daisanshou__truth_of_zero_5727c03e72935/1_0_pacifico_amanecer_5727c0f3b5e00/ReZero_TruthOfZero_v1_000_cover.png"
    }
  ]
};
