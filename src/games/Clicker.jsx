import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, Card, Statistic, Row, Col, Progress } from 'antd';
import { Target, Zap, RotateCcw, Play } from 'lucide-react';

const { Title, Text } = Typography;

const Clicker = () => {
  const [score, setScore] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });
  const [timeLeft, setTimeLeft] = useState(30); // Игра на 30 секунд
  const timerRef = useRef(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsActive(true);
    moveTarget();
  };

  const moveTarget = () => {
    const top = Math.floor(Math.random() * 80 + 10) + '%';
    const left = Math.floor(Math.random() * 80 + 10) + '%';
    setTargetPos({ top, left });
  };

  const handleTargetClick = () => {
    if (!isActive) return;
    setScore(prev => prev + 1);
    moveTarget();
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Title level={2}>Поймай цель!</Title>
      
      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
        <Col span={12}>
          <Statistic title="Очки" value={score} prefix={<Zap size={18} color="#faad14" />} />
        </Col>
        <Col span={12}>
          <Statistic title="Время" value={timeLeft} suffix="сек" />
        </Col>
      </Row>

      <Progress 
        percent={(timeLeft / 30) * 100} 
        showInfo={false} 
        strokeColor={timeLeft < 10 ? '#ff4d4f' : '#1890ff'}
        style={{ marginBottom: 20 }}
      />

      <Card 
        style={{ 
          height: '300px', 
          background: '#f0f2f5', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {!isActive ? (
          <Button type="primary" size="large" icon={<Play size={18} />} onClick={startGame}>
            {timeLeft === 0 ? 'Играть снова' : 'Начать игру'}
          </Button>
        ) : (
          <div
            onClick={handleTargetClick}
            style={{
              position: 'absolute',
              top: targetPos.top,
              left: targetPos.left,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              transition: 'all 0.1s ease',
              background: '#fff',
              padding: '10px',
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              color: '#ff4d4f'
            }}
          >
            <Target size={40} />
          </div>
        )}
      </Card>
      
      {timeLeft === 0 && (
        <div style={{ marginTop: 20 }}>
          <Text strong style={{ fontSize: '18px' }}>Финальный результат: {score}</Text>
        </div>
      )}
    </div>
  );
};

export default Clicker;
