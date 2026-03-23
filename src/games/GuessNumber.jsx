import React, { useState, useEffect } from 'react';
import { Button, InputNumber, Typography, Space, Card, Alert, Statistic, Row, Col } from 'antd';
// Используем компоненты Ant Design
import { Typography as AntTypography, InputNumber as AntInput, Button as AntButton, Space as AntSpace, Card as AntCard, Statistic as AntStatistic } from 'antd';
import { Target, RefreshCw, Trophy } from 'lucide-react';

const { Title, Text } = AntTypography;

const GuessNumber = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState(null);
  const [message, setMessage] = useState('Я загадал число от 1 до 100. Попробуй угадать!');
  const [attempts, setAttempts] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  // Генерируем число при старте
  const startNewGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setGuess(null);
    setMessage('Я загадал число от 1 до 100. Попробуй угадать!');
    setAttempts(0);
    setIsGameOver(false);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleGuess = () => {
    if (guess === null) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guess === targetNumber) {
      setMessage(`Ура! Это было число ${targetNumber}.`);
      setIsGameOver(true);
    } else if (guess < targetNumber) {
      setMessage('Мало! Мое число больше.');
    } else {
      setMessage('Много! Мое число меньше.');
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>
        <Target size={28} style={{ marginRight: 10, verticalAlign: 'middle' }} />
        Угадай число
      </Title>

      <AntCard style={{ background: '#f9f9f9', borderRadius: 16 }}>
        <Row gutter={16} style={{ marginBottom: 20 }}>
          <Col span={24}>
            <AntStatistic title="Попыток использовано" value={attempts} prefix={<RefreshCw size={16} />} />
          </Col>
        </Row>

        <div style={{ marginBottom: 20 }}>
          <Text strong style={{ fontSize: 16 }}>{message}</Text>
        </div>

        {!isGameOver ? (
          <AntSpace direction="vertical" style={{ width: '100%' }}>
            <AntInput
              min={1}
              max={100}
              size="large"
              value={guess}
              onChange={(value) => setGuess(value)}
              onPressEnter={handleGuess}
              style={{ width: '100%', textAlign: 'center' }}
              placeholder="Введи число"
            />
            <AntButton type="primary" size="large" onClick={handleGuess} block>
              Проверить
            </AntButton>
          </AntSpace>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#faad14', marginBottom: 15 }}>
              <Trophy size={64} />
            </div>
            <AntButton type="primary" size="large" onClick={startNewGame} block>
              Играть снова
            </AntButton>
          </div>
        )}
      </AntCard>
    </div>
  );
};

export default GuessNumber;