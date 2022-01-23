import { ServerGameModel } from '../../../shared/game-resource/server-game.model';

export type GameUiInputModel = Pick<ServerGameModel, 'boardState' | 'evaluations'>;
