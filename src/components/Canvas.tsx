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
  const [fieldSize] = useState<number>(400);
  const [cellSize] = useState<number>(20);
  const [startPosition, setStartPosition] = useState<number[]>([0, 200, 60, 20]);
  const [currentPosition, setCurrentPosition] = useState<number[]>([]);
  const refField = useRef<HTMLCanvasElement | null>(null);

  // ==============================================
  const draw = useCallback((ctx: CustomCanvasType): void => {
    if (!ctx) throw new Error("Where's my 2d context?!");
    // draw grid
    ctx.beginPath();
    ctx.lineWidth = 1;
    for (let i = 0; i <= fieldSize; i += cellSize) {
      ctx.moveTo(0, i);
      ctx.lineTo(fieldSize, i);
    }
    for (let i = 0; i <= fieldSize; i += cellSize) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, fieldSize);
    }
    ctx.closePath();
    ctx.stroke();
    // draw snake
    ctx.fillRect(startPosition[0], startPosition[1], startPosition[2], startPosition[3]);
    // draw apple in random place
    const randomX = Math.floor(Math.random() * fieldSize / cellSize) * cellSize;
    const randomY = Math.floor(Math.random() * fieldSize / cellSize) * cellSize;
    ctx.fillStyle = 'green';
    ctx.fillRect(randomX, randomY, cellSize, cellSize);
    // moving
    setInterval(() => {
      setCurrentPosition(startPosition);

    }, 500)
  }, [cellSize, fieldSize, startPosition])
  // ==============================================
  
  useEffect(() => {
    const ctx: CustomCanvasType = refField.current?.getContext('2d');
    // if (!ctx) throw new Error("Where's my 2d context?!");
    // ctx.clearRect(0, 0, fieldSize, fieldSize);
    draw(ctx);
  }, [draw, fieldSize])


  return (
    <DivCanvas>
      <FieldCanvas ref={refField} width={fieldSize} height={fieldSize} />
    </DivCanvas>
  );
}

export default Canvas;