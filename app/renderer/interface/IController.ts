import { IPlaylist } from "./IPlaylist";

export interface IControllerState {
  playlist: IPlaylist;
  playing: boolean;
  song: object;
  currentTime: number;
}
