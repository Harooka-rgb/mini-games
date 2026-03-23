import React, { useState, useEffect } from 'react';
import { Button, Typography, Row, Col, Alert, Spin } from 'antd';
import { X, Circle, RotateCcw } from 'lucide-react';

const { Title } = Typography;

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // Игрок всегда X
  const [isBotThinking, setIsBotThinking] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  // Логика бота (срабатывает, когда ход переходит к 'O')
  useEffect(() => {
    if (!xIsNext && !winner && !isDraw) {
      setIsBotThinking(true);
      
      const timer = setTimeout(() => {
        makeBotMove();
        setIsBotThinking(false);
      }, 600); // Бот "думает" 0.6 секунды

      return () => clearTimeout(timer);
    }
  }, [xIsNext, winner, isDraw]);

  const makeBotMove = () => {
    const emptySquares = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptySquares.length > 0) {
      // Бот просто выбирает случайную пустую клетку
      const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const nextSquares = board.slice();
      nextSquares[randomIndex] = 'O';
      setBoard(nextSquares);
      setXIsNext(true);
    }
  };

  const handleClick = (i) => {
    // Игрок может нажать только если его ход, клетка пуста и игра не окончена
    if (winner || board[i] || !xIsNext || isBotThinking) return;

    const nextSquares = board.slice();
    nextSquares[i] = 'X';
    setBoard(nextSquares);
    setXIsNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsBotThinking(false);
  };

  const renderSquare = (i) => (
    <Button
      style={{ width: '100%', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={() => handleClick(i)}
      disabled={board[i] !== null || !!winner || isBotThinking}
    >
      {board[i] === 'X' && <X size={32} color="#ff4d4f" />}
      {board[i] === 'O' && <Circle size={32} color="#1890ff" />}
    </Button>
  );

  return (
    <div style={{ maxWidth: 320, margin: '0 auto', textAlign: 'center' }}>
      <Title level={2}>Крестики-Нолики</Title>
      
      <Alert 
        message={
          winner 
            ? (winner === 'X' ? "Вы победили! " : "Бот победил! ") 
            : isDraw ? "Ничья! " 
            : isBotThinking ? "Бот думает..." : "Ваш ход (X)"
        } 
        type={winner === 'X' ? "success" : winner === 'O' ? "error" : isDraw ? "warning" : "info"} 
        icon={isBotThinking && <Spin size="small" style={{ marginRight: 10 }} />}
        showIcon
        style={{ marginBottom: 20, fontWeight: 'bold' }}
      />

      <div style={{ background: '#f0f2f5', padding: 8, borderRadius: 12, position: 'relative' }}>
        <Row gutter={[8, 8]}>
          {[0, 1, 2].map(i => <Col span={8} key={i}>{renderSquare(i)}</Col>)}
          {[3, 4, 5].map(i => <Col span={8} key={i}>{renderSquare(i)}</Col>)}
          {[6, 7, 8].map(i => <Col span={8} key={i}>{renderSquare(i)}</Col>)}
        </Row>
      </div>

      {(winner || isDraw) && (
        <Button 
          type="primary" 
          icon={<RotateCcw size={16} />} 
          onClick={resetGame}
          style={{ marginTop: 20 }}
          block
        >
          Играть снова
        </Button>
      )}
    </div>
  );
};

export default TicTacToe;