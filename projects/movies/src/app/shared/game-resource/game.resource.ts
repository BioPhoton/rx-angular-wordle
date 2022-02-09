import { map, Observable, of, tap } from 'rxjs';
import { ServerGameModel } from './server-game.model';
import { environment } from '../../../environments/environment';
import { gameDtoToModel } from './internal/game.mapper';
import { GameGetDto } from './internal/game.dto';

const URL_GAME = [environment.baseUrlApi, 'game'].join('/');
const serverRespones: GameGetDto = {
  gameStatus: 'PENDING',
  boardState: ['dream', 'trace'],
  evaluations: [['absent', 'correct', 'absent', 'present', 'absent'], ['absent', 'correct', 'absent', 'absent', 'present']],
  rowIndex: 3,
  lastCompletedTs: 0,
  lastPlayedTs: 0,
  restoringFromLocalStorage: 0,
  solution: 'dream',
  hardMode: 0
};

export const getGame = (): Observable<ServerGameModel> => {
  URL_GAME;// getHTTP().get<GameResponse>(URL_GAME);
  return of(serverRespones).pipe(tap(sanityCheck), map(gameDtoToModel));
};


function sanityCheck(respones: GameGetDto): boolean {
  if (respones.boardState.length - respones.rowIndex !== 1) {
    console.error('rowIndex and boardState are out of sync');
    return false;
  }
  return true;
}
