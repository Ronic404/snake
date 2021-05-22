import { IPlacePoint } from '../interfaces';
import { IAction, actionTypes } from './actions';

export interface IState {
  fieldSize: number;
  cellSize: number;
  direction: string | null;
  initialSnake: IPlacePoint[];
  snake: IPlacePoint[];
}

const initialState: IState = {
  fieldSize: 400,
  cellSize: 20,
  direction: 'right',
  get initialSnake() {
    return [
      {x: (this.fieldSize / this.cellSize) * 2, y: this.fieldSize / 2},
      {x: (this.fieldSize / this.cellSize) * 1, y: this.fieldSize / 2},
      {x: 0, y: this.fieldSize / 2},
    ]
  },
  get snake() {
    return this.initialSnake;
  },
}

export default function reducer(state: IState = initialState, action: IAction): IState {
  switch (action.type) {
    case actionTypes.CHANGE_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      }
    case actionTypes.CHANGE_SNAKE:
      return {
        ...state,
        snake: action.payload,
      }
    default:
      return state;
  }
}