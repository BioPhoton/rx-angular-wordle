import { ServerGameModel } from '../server-game.model';
import { GameGetDto } from './game.dto';

export function gameDtoToModel({ restoringFromLocalStorage, ...rest }: GameGetDto): ServerGameModel {
  const clientModel: ServerGameModel = {
    ...rest as any as ServerGameModel,
    hardMode: !!rest.hardMode
  };
  return clientModel;
}
