import { IPlacePoint } from '../interfaces';

export enum actionTypes {
  CHANGE_DIRECTION = 'CHANGE_DIRECTION',
  CHANGE_SNAKE = 'CHANGE_SNAKE',
}

interface ICD {
  type: actionTypes.CHANGE_DIRECTION;
  payload: string | null;
}

interface ICS {
  type: actionTypes.CHANGE_SNAKE;
  payload: IPlacePoint[];
}

export type IAction = ICD | ICS; 

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