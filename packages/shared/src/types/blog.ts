import { User } from "./user";

export interface Post {
  id: number;
  uniqid: string;
  type: number;
  title: string;
  stub: string;
  content: string;
  user: User;
  category: number;
  category_name: string;
  status: number;
  status_name: string;
  sticky: boolean;
  language: number;
  language_name: string;
  thumbnail: string;
  thumbnail_path: string;
  createdAt: Date;
  updatedAt: Date;
}
