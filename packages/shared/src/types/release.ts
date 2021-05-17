import { Work } from "./work";

export interface Release {
  id: number;
  language: number;
  language_name: "es";
  volume: number;
  uniqid: string;
  chapter: number;
  description: string;
  name: string;
  stub: string;
  thumbnail: string;
  thumbnail_path: string;
  download_href: string;
  subchapter: number;
  releaseDate: string;
  read_path: string;
  createdAt: string;
  updatedAt: string;
  work: Partial<Work>;
}
