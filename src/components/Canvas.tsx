import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { IPlacePoint, CustomCanvasType } from '../interfaces';
import randomPlace from '../tools/randomPlace';

import { IState } from '../redux/reducer';
import { changeDirection, changeSnake } from '../redux/actions';

import head_up from '../assets/img/head-up.png';
import head_right from '../assets/img/head-right.png';
import head_down from '../assets/img/head-down.png';
import head_left from '../assets/img/head-left.png';

const DivCanvas = styled.div`
  text-align: center;
`;

const FieldCanvas = styled.canvas`
  /* border: 5px solid brown; */
`;

const Canvas: FC = () => {
  const { fieldSize, cellSize, initialSnake, snake, direction } = useSelector((state: IState) => state);
  const [applePosition, setApplePosition] = useState<IPlacePoint>(randomPlace(fieldSize, cellSize));
  const refField = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch();

  console.log('render');
  
  const draw = useCallback((ctx: CustomCanvasType): void => {
    if (!ctx) throw new Error("Where's my 2d context?!");
    ctx.clearRect(0, 0, fieldSize, fieldSize);
    // draw grid //
    for (let i = 0; i < fieldSize / cellSize; i++) {
      for (let j = 0; j < fieldSize / cellSize; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillStyle = '#a6c229';
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        } else {
          ctx.fillStyle = '#c0d65d';
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
    // draw snake //
    const img: CanvasImageSource = new Image();
    switch (direction) {
      case 'up':
        img.src = head_up;
        break;
      case 'right':
        img.src = head_right;
        break;
      case 'down':
        img.src = head_down;
        break;
      case 'left':
        img.src = head_left;
        break;
    }
    img.onload = () => {
      ctx.drawImage(img, snake[0].x, snake[0].y, cellSize, cellSize);
    }
    for (let i = snake.length - 1; i >= 0; i--) {
      ctx.fillStyle = (i === 0) ? 'transparent' : '#08aa50';
      ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }
    // draw apple in random place //
    ctx.fillStyle = '#c43434';
    ctx.font = '24px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText('', applePosition.x, applePosition.y);
  }, [applePosition.x, applePosition.y, cellSize, direction, fieldSize, snake])

  const eating = useCallback((ctx: CustomCanvasType): void => {
    if (!ctx) throw new Error("Where's my 2d context?!");
    if (snake[0].x === applePosition.x && snake[0].y === applePosition.y) {
      setApplePosition(randomPlace(fieldSize, cellSize));
      dispatch(changeSnake([...snake, { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y } ]))
    }
  }, [applePosition.x, applePosition.y, cellSize, dispatch, fieldSize, snake])

  const moving = useCallback((): void => {
    const newSnake = snake.slice(0);
    switch (direction) {
      case 'up':
        if (snake[0].y === 0) {
          newSnake.unshift({ x: newSnake[0].x, y: fieldSize - cellSize });
        } else {
          newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - cellSize });
        }
        break;
      case 'left':
        if (snake[0].x === 0) {
          newSnake.unshift({ x: fieldSize - cellSize, y: newSnake[0].y });
        } else {
          newSnake.unshift({ x: newSnake[0].x - cellSize, y: newSnake[0].y });
        }
        break;
      case 'down':
        if (snake[0].y === fieldSize - cellSize) {
          newSnake.unshift({ x: newSnake[0].x, y: 0 });
        } else {
          newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + cellSize });
        }
        break;
      case 'right':
        if (snake[0].x === fieldSize - cellSize) {
          newSnake.unshift({ x: 0, y: newSnake[0].y });
        } else {
          newSnake.unshift({ x: newSnake[0].x + cellSize, y: newSnake[0].y });
        }
        break;
      default: 
        return;
    }
    newSnake.pop();
    dispatch(changeSnake(newSnake));
  }, [cellSize, direction, dispatch, fieldSize, snake]);

  const gameOver = useCallback(() => {
    for (let i = 2; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        dispatch(changeDirection(null));
        dispatch(changeSnake(initialSnake));
      }
    }
  }, [dispatch, initialSnake, snake]);

  const moveDirection = useCallback((e: globalThis.KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp': 
          if (direction === 'down' || direction === 'up') return;
          dispatch(changeDirection('up'));
          break;
        case 'KeyA':
        case 'ArrowLeft': 
          if (direction === 'right' || direction === 'left') return;
          dispatch(changeDirection('left'));
          break;
        case 'KeyS':
        case 'ArrowDown': 
          if (direction === 'up' || direction === 'down') return;
          dispatch(changeDirection('down'));
          break;
        case 'KeyD':
        case 'ArrowRight': 
          if (direction === 'left' || direction === 'right') return;
          dispatch(changeDirection('right'));
          break;
        default: 
          return;
      }
      moving();
  }, [direction, dispatch, moving]);

  useEffect(() => {
    const ctx: CustomCanvasType = refField.current?.getContext('2d');
    draw(ctx);
    eating(ctx);
    gameOver();
    const speed = setInterval(moving, 200);
    return () => { clearInterval(speed) }
  }, [draw, eating, gameOver, moving]);

  useEffect(() => {
    window.addEventListener('keydown', moveDirection);
    return () => { window.removeEventListener('keydown', moveDirection) }
  }, [cellSize, direction, moveDirection, snake]);

  return (
    <DivCanvas>
      <FieldCanvas ref={refField} width={fieldSize} height={fieldSize} />
    </DivCanvas>
  );
}

export default Canvas;