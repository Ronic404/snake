import { IPlacePoint } from '../interfaces';

export enum actionTypes {
  CHANGE_DIRECTION = 'CHANGE_DIRECTION',
  CHANGE_SNAKE = 'CHANGE_SNAKE',
  CHANGE_FIELD_SIZE = 'CHANGE_FIELD_SIZE',
  CHANGE_CELL_SIZE = 'CHANGE_CELL_SIZE',
  CHANGE_CHECK = 'CHANGE_CHECK',
  RESET_CHECK = 'RESET_CHECK',
}

interface ICD {
  type: actionTypes.CHANGE_DIRECTION;
  payload: string | null;
}

interface ICS {
  type: actionTypes.CHANGE_SNAKE;
  payload: IPlacePoint[];
}
interface ICF {
  type: actionTypes.CHANGE_FIELD_SIZE;
  payload: number;
}

interface ICC {
  type: actionTypes.CHANGE_CELL_SIZE;
  payload: number;
}

interface ICCh {
  type: actionTypes.CHANGE_CHECK;
}

interface IRCh {
  type: actionTypes.RESET_CHECK;
}

export type IAction = ICD | ICS | ICF | ICC | ICCh | IRCh; 

export function changeDirection(direction: string | null): ICD {
  return {
    type: actionTypes.CHANGE_DIRECTION,
    payload: direction,
  }
}

export function changeSnake(snake: IPlacePoint[]): ICS {
  return {
    type: actionTypes.CHANGE_SNAKE,
    payload: snake,
  }
}

export function changeFieldSize(size: number): ICF {
  return {
    type: actionTypes.CHANGE_FIELD_SIZE,
    payload: size,
  }
}

export function changeCellSize(size: number): ICC {
  return {
    type: actionTypes.CHANGE_CELL_SIZE,
    payload: size,
  }
}

export function changeCheck(): ICCh {
  return {
    type: actionTypes.CHANGE_CHECK,
  }
}

export function resetCheck(): IRCh {
  return {
    type: actionTypes.RESET_CHECK,
  }
}