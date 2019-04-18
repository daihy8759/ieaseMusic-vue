import { ISong } from "./ISong";
export interface IPlaylist {
  id: string;
  type: number;
  name: string;
  played: number;
  cover: string;
  link: string;
  songs: ISong[];
}
