import { getHTTP } from '../injector/get-http-client';
import { Observable } from 'rxjs';
import { GameStateModel } from './game.model';
import { environment } from '../../../environments/environment';

const URL_GAME = [environment.baseUrlApi, 'game'].join('/');

export type GameResponse = GameStateModel;
export const getGame = (): Observable<GameResponse> => getHTTP().get<GameResponse>(URL_GAME);
