import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Button, ConfigProvider } from 'antd';
import { CircleDot, Scissors, Hash, ArrowLeft, Target, BrickWall } from 'lucide-react';
import RockPaper from './games/RockPaper';
import GuessNumber from './games/GuessNumber';
import TicTacToe from './games/TicTacToe';
import Clicker from './games/Clicker';
import Breakout from './games/Breakout';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const games = [
  {
    id: 'tictactoe',
    title: 'Крестики-Нолики',
    description: 'Классическая битва на поле 3х3',
    icon: <CircleDot size={40} />,
    color: '#1890ff'
  },
  {
    id: 'rps',
    title: 'Камень-Ножницы-Бумага',
    description: 'Победи компьютер в честном поединке',
    icon: <Scissors size={40} />,
    color: '#52c41a'
  },
  {
    id: 'guess',
    title: 'Угадай число',
    description: 'Сможешь найти число от 1 до 100?',
    icon: <Hash size={40} />,
    color: '#722ed1'
  },
  {
  id: 'clicker',
  title: 'Поймай цель',
  description: 'Проверь свою реакцию за 30 секунд',
  icon: <Target size={40} />,
  color: '#eb2f96'
},
{
  id: 'breakout',
  title: 'Арканоид',
  description: 'Разбей все кирпичи мячом',
  icon: <BrickWall size={40} />, // Или любая подходящая иконка
  color: '#fa8c16'
}
];

export default function App() {
  const [activeGame, setActiveGame] = useState(null);

  // Рендер выбранной игры
  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe': return <TicTacToe />;
      case 'rps': return <RockPaper />;
      case 'guess': return <GuessNumber />;
      case 'clicker': return <Clicker />
      case 'breakout': return <Breakout />;
      default: return null;
    }
  };

  return (
    <ConfigProvider theme={{ token: { borderRadius: 12 } }}>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
        <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={3} style={{ margin: 0 }}>MiniGame Hub</Title>
          {activeGame && (
            <Button icon={<ArrowLeft size={16} />} onClick={() => setActiveGame(null)}>
              В меню
            </Button>
          )}
        </Header>

        <Content style={{ padding: '40px 20px' }}>
          {!activeGame ? (
            <Row gutter={[24, 24]} justify="center">
              {games.map((game) => (
                <Col xs={24} sm={12} md={8} key={game.id}>
                  <Card
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    cover={
                      <div style={{ background: game.color, padding: '30px', color: '#fff', display: 'flex', justifyContent: 'center' }}>
                        {game.icon}
                      </div>
                    }
                    onClick={() => setActiveGame(game.id)}
                  >
                    <Card.Meta 
                      title={game.title} 
                      description={<Text type="secondary">{game.description}</Text>} 
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px' }}>
              {renderGame()}
            </div>
          )}
        </Content>
      </Layout>
    </ConfigProvider>
  );
}