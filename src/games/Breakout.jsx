import React, { useRef, useEffect, useState } from 'react';
import { Button, Typography, Space, Card, Statistic, Row, Col } from 'antd';
import { Play, RotateCcw, Trophy } from 'lucide-react';

const { Title, Text } = Typography;

const Breakout = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'won', 'lost'
  const [score, setScore] = useState(0);

  // Параметры игры
  const paddleHeight = 10;
  const paddleWidth = 75;
  const ballRadius = 8;
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 70;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Состояние мяча и платформы
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 2;
    let dy = -2;
    let paddleX = (canvas.width - paddleWidth) / 2;
    let rightPressed = false;
    let leftPressed = false;

    // Инициализация кирпичей
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }

    // Управление
    const keyDownHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = true;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = true;
    };
    const keyUpHandler = (e) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') rightPressed = false;
      else if (e.key === 'Left' || e.key === 'ArrowLeft') leftPressed = false;
    };
    document.addEventListener('keydown', keyDownHandler);
    document.addEventListener('keyup', keyUpHandler);

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
              dy = -dy;
              b.status = 0;
              setScore(s => s + 1);
              if (bricks.flat().every(br => br.status === 0)) {
                setGameState('won');
              }
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Отрисовка кирпичей
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#1890ff';
            ctx.fill();
            ctx.closePath();
          }
        }
      }

      // Мяч
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#ff4d4f';
      ctx.fill();
      ctx.closePath();

      // Платформа
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = '#52c41a';
      ctx.fill();
      ctx.closePath();

      collisionDetection();

      // Физика границ
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;
      if (y + dy < ballRadius) dy = -dy;
      else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          setGameState('lost');
          return;
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
      else if (leftPressed && paddleX > 0) paddleX -= 7;

      x += dx;
      y += dy;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('keydown', keyDownHandler);
      document.removeEventListener('keyup', keyUpHandler);
    };
  }, [gameState]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={2}>Арканоид</Title>
      
      <Row justify="center" style={{ marginBottom: 20 }}>
        <Col>
          <Statistic title="Счет" value={score} />
        </Col>
      </Row>

      <div style={{ position: 'relative', display: 'inline-block', background: '#f0f2f5', borderRadius: 8, padding: 10 }}>
        <canvas 
          ref={canvasRef} 
          width={440} 
          height={320} 
          style={{ background: '#fff', display: 'block', borderRadius: 4 }}
        />

        {gameState !== 'playing' && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(255,255,255,0.85)', display: 'flex',
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 8
          }}>
            {gameState === 'won' && <Title level={3}><Trophy color="#faad14" /> Вы победили!</Title>}
            {gameState === 'lost' && <Title level={3}>Игра окончена</Title>}
            
            <Button 
              type="primary" 
              size="large" 
              icon={gameState === 'start' ? <Play size={18} /> : <RotateCcw size={18} />}
              onClick={() => { setGameState('playing'); setScore(0); }}
            >
              {gameState === 'start' ? 'Начать игру' : 'Попробовать снова'}
            </Button>
            <Text type="secondary" style={{ marginTop: 10 }}>Стрелки влево/вправо для управления</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breakout;