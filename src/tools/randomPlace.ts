import { IPlacePoint } from '../interfaces';

const randomPlace = (fieldSize: number, cellSize: number): IPlacePoint => {
  return {
    x: Math.floor(Math.random() * fieldSize / cellSize) * cellSize,
    y: Math.floor(Math.random() * fieldSize / cellSize) * cellSize,
  }
}

export default randomPlace;