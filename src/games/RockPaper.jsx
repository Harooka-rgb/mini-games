import React, { useState } from 'react';
import { Button, Typography, Space, Card, Row, Col, Statistic, Result } from 'antd';

import { Stone, Scissors, FileText, RotateCcw } from 'lucide-react';

const { Title, Text } = Typography;

const options = [
  { id: 'Stone', name: 'Камень', icon: <Stone size={32} />, color: '#ff4d4f' },
  { id: 'Paper', name: 'Бумага', icon: <FileText size={32} />, color: '#1890ff' },
  { id: 'Scissors', name: 'Ножницы', icon: <Scissors size={32} />, color: '#52c41a' },
];

const RockPaper = () => {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null); // 'win', 'lose', 'draw'
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const playGame = (choice) => {
    const computerIndex = Math.floor(Math.random() * 3);
    const computer = options[computerIndex];
    
    setUserChoice(choice);
    setComputerChoice(computer);

    if (choice.id === computer.id) {
      setResult('draw');
    } else if (
      (choice.id === 'rock' && computer.id === 'scissors') ||
      (choice.id === 'paper' && computer.id === 'rock') ||
      (choice.id === 'scissors' && computer.id === 'paper')
    ) {
      setResult('win');
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('lose');
      setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <Title level={2}>Камень, Ножницы, Бумага</Title>
      
      <Row gutter={16} justify="center" style={{ marginBottom: 30 }}>
        <Col span={12}>
          <Statistic title="Вы" value={score.player} />
        </Col>
        <Col span={12}>
          <Statistic title="Робот" value={score.computer} />
        </Col>
      </Row>

      {!result ? (
        <Space size="large">
          {options.map((option) => (
            <Button
              key={option.id}
              type="default"
              style={{ height: 'auto', padding: '20px', borderRadius: '15px' }}
              onClick={() => playGame(option)}
            >
              <div style={{ color: option.color }}>{option.icon}</div>
              <div>{option.name}</div>
            </Button>
          ))}
        </Space>
      ) : (
        <Card bordered={false} style={{ background: '#fafafa' }}>
          <Row gutter={24} align="middle" justify="center">
            <Col>
              <Text strong>Ваш выбор:</Text>
              <div style={{ fontSize: '40px', color: userChoice.color }}>{userChoice.icon}</div>
            </Col>
            <Col>
              <Title level={4}>VS</Title>
            </Col>
            <Col>
              <Text strong>Выбор бота:</Text>
              <div style={{ fontSize: '40px', color: computerChoice.color }}>{computerChoice.icon}</div>
            </Col>
          </Row>
          
          <div style={{ marginTop: 20 }}>
            {result === 'win' && <Text type="success" style={{ fontSize: 24, fontWeight: 'bold' }}>Вы победили! </Text>}
            {result === 'lose' && <Text type="danger" style={{ fontSize: 24, fontWeight: 'bold' }}>Бот выиграл! </Text>}
            {result === 'draw' && <Text type="warning" style={{ fontSize: 24, fontWeight: 'bold' }}>Ничья! </Text>}
          </div>

          <Button 
            type="primary" 
            icon={<RotateCcw size={16} />} 
            style={{ marginTop: 20 }}
            onClick={resetGame}
          >
            Играть еще раз
          </Button>
        </Card>
      )}
    </div>
  );
};

export default RockPaper;