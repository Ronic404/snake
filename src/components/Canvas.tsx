import { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const DivCanvas = styled.div`
  text-align: center;
`;

const FieldCanvas = styled.canvas`
  /* border: 5px solid brown; */
`;

type CustomCanvasType = CanvasRenderingContext2D | null | undefined;

const Canvas: FC = () => {
  // TOOLS //
  const randomPlace = (): number => {
    return Math.floor(Math.random() * fieldSize / cellSize) * cellSize;
  }
  
  // Constants //
  const refField = useRef<HTMLCanvasElement | null>(null);
  const [fieldSize] = useState<number>(400);
  const [cellSize] = useState<number>(20);
  const [applePosition] = useState<number[]>([randomPlace(), randomPlace()]);
  const [snake, setSnake] = useState<{x: number, y: number}[]>([
    {x: 0, y: fieldSize / 2},
    {x: 20, y: fieldSize / 2},
    {x: 40, y: fieldSize / 2},
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
    for (let i = 0; i < snake.length; i++) {
      ctx.fillStyle = (i === snake.length - 1) ? '#085750' : '#08aa50';
      ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }
    // draw apple in random place // 3
    ctx.fillStyle = '#c43434';
    // ctx.fillRect(applePosition[0], applePosition[1], cellSize, cellSize);
    ctx.font = '24px Arial';
    ctx.fillText('', applePosition[0], applePosition[1]);
  }, [applePosition, cellSize, fieldSize, snake])
  // ==============================================
  
  useEffect(() => {
    const ctx: CustomCanvasType = refField.current?.getContext('2d');
    draw(ctx);
    // console.log('bbbb');
    // moving
    // const changePosition = () => {
    //   if (currentPosition[0] > fieldSize) {
    //     setCurrentPosition([-cellSize, fieldSize / 2, cellSize * 3, cellSize]);
    //   } else {
    //     setCurrentPosition(startPosition);
    //     setStartPosition([currentPosition[0] + cellSize, currentPosition[1], currentPosition[2], currentPosition[3]])
    //   }
    // }
    // const updateSnakePosition = setTimeout(changePosition, 1000);
    // return () => clearTimeout(updateSnakePosition);
  }, [draw])

  const moveDirection = useCallback((e: globalThis.KeyboardEvent) => {
    const newSnake = snake.slice(0);
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp': 
          if (direction === 'down') return;
          newSnake.push({ x: newSnake[newSnake.length - 1].x, y: newSnake[newSnake.length -1].y - cellSize });
          newSnake.shift();
          setSnake(newSnake);
          setDirection('up');
          break;
        case 'KeyA':
        case 'ArrowLeft': 
          if (direction === 'right') return;
          newSnake.push({ x: newSnake[newSnake.length - 1].x - cellSize, y: newSnake[newSnake.length -1].y });
          newSnake.shift();
          setSnake(newSnake);
          setDirection('left');
          break;
        case 'KeyS':
        case 'ArrowDown': 
          if (direction === 'up') return;
          newSnake.push({ x: newSnake[newSnake.length - 1].x, y: newSnake[newSnake.length -1].y + cellSize });
          newSnake.shift();
          setSnake(newSnake);
          setDirection('down');
          break;
        case 'KeyD':
        case 'ArrowRight': 
        if (direction === 'left') return;
        newSnake.push({ x: newSnake[newSnake.length - 1].x + cellSize, y: newSnake[newSnake.length -1].y });
        newSnake.shift();
        setSnake(newSnake);
        setDirection('right');
          break;
        default: 
          return;
      }
  }, [cellSize, direction, snake]);

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