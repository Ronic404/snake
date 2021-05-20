import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { IPlacePoint } from '../interfaces';
import randomPlace from '../tools/randomPlace';

const DivCanvas = styled.div`
  text-align: center;
`;

const FieldCanvas = styled.canvas`
  /* border: 5px solid brown; */
`;

type CustomCanvasType = CanvasRenderingContext2D | null | undefined;

const Canvas: FC = () => {
  const refField = useRef<HTMLCanvasElement | null>(null);
  const [fieldSize] = useState<number>(400);
  const [cellSize] = useState<number>(20);
  const [applePosition, setApplePosition] = useState<IPlacePoint>(randomPlace(fieldSize, cellSize));
  const [snake, setSnake] = useState<IPlacePoint[]>([
    {x: 40, y: fieldSize / 2},
    {x: 20, y: fieldSize / 2},
    {x: 0, y: fieldSize / 2},
  ]);
  const [direction, setDirection] = useState<string>('right');

  console.log('render');
  
  // ==============================================
  const draw = useCallback((ctx: CustomCanvasType): void => {
    if (!ctx) throw new Error("Where's my 2d context?!");
    ctx.clearRect(0, 0, fieldSize, fieldSize);
    // draw grid // 1
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
    // draw snake // 2
    for (let i = snake.length - 1; i >= 0; i--) {
      ctx.fillStyle = (i === 0) ? '#085750' : '#08aa50';
      ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }
    // draw apple in random place // 3
    ctx.fillStyle = '#c43434';
    ctx.font = '24px Arial';
    ctx.textBaseline = 'top';
    ctx.fillText('', applePosition.x, applePosition.y);
  }, [applePosition, cellSize, fieldSize, snake])
  // ==============================================

  const eating = useCallback((ctx: CustomCanvasType): void => {
    if (!ctx) throw new Error("Where's my 2d context?!");
    if (snake[0].x === applePosition.x && snake[0].y === applePosition.y) {
      setApplePosition(randomPlace(fieldSize, cellSize));
      setSnake([...snake, { x: snake[snake.length - 1].x, y: snake[snake.length - 1].y } ]);
    }
  }, [applePosition.x, applePosition.y, cellSize, fieldSize, snake])
  
  useEffect(() => {
    const ctx: CustomCanvasType = refField.current?.getContext('2d');
    draw(ctx);
    eating(ctx);
  }, [draw, eating])

  const moveDirection = useCallback((e: globalThis.KeyboardEvent) => {
    const newSnake = snake.slice(0);
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp': 
          if (direction === 'down') return;
          if (snake[0].y === 0) {
            newSnake.unshift({ x: newSnake[0].x, y: fieldSize - cellSize });
          } else {
            newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - cellSize });
          }
          newSnake.pop();
          setSnake(newSnake);
          setDirection('up');
          break;
        case 'KeyA':
        case 'ArrowLeft': 
          if (direction === 'right') return;
          if (snake[0].x === 0) {
            newSnake.unshift({ x: fieldSize - cellSize, y: newSnake[0].y });
          } else {
            newSnake.unshift({ x: newSnake[0].x - cellSize, y: newSnake[0].y });
          }
          newSnake.pop();
          setSnake(newSnake);
          setDirection('left');
          break;
        case 'KeyS':
        case 'ArrowDown': 
          if (direction === 'up') return;
          if (snake[0].y === fieldSize - cellSize) {
            newSnake.unshift({ x: newSnake[0].x, y: 0 });
          } else {
            newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + cellSize });
          }
          newSnake.pop();
          setSnake(newSnake);
          setDirection('down');
          break;
        case 'KeyD':
        case 'ArrowRight': 
        if (direction === 'left') return;
        if (snake[0].x === fieldSize - cellSize) {
          newSnake.unshift({ x: 0, y: newSnake[0].y });
        } else {
          newSnake.unshift({ x: newSnake[0].x + cellSize, y: newSnake[0].y });
        }
        newSnake.pop();
        setSnake(newSnake);
        setDirection('right');
          break;
        default: 
          return;
      }
  }, [cellSize, direction, fieldSize, snake]);

  useEffect(() => {
    window.addEventListener('keydown', moveDirection);
    return () => { window.removeEventListener('keydown', moveDirection) }
  }, [cellSize, direction, moveDirection, snake])

  return (
    <DivCanvas>
      <FieldCanvas ref={refField} width={fieldSize} height={fieldSize} />
    </DivCanvas>
  );
}

export default Canvas;


























// grid
  // ctx.beginPath();
  // ctx.lineWidth = 1;
  // for (let i = 0; i <= fieldSize; i += cellSize) {
  //   ctx.moveTo(0, i);
  //   ctx.lineTo(fieldSize, i);
  // }
  // for (let i = 0; i <= fieldSize; i += cellSize) {
  //   ctx.moveTo(i, 0);
  //   ctx.lineTo(i, fieldSize);
  // }
  // ctx.stroke();