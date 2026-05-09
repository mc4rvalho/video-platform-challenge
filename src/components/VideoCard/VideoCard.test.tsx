import { render, screen, fireEvent } from '@testing-library/react';
import { VideoCard } from './index';
import { IVideo } from '../../types/video';

// MOCK: Aqui fingimos o comportamento do hook useFavorites para isolar o teste visual
jest.mock('../../hooks/useFavorites', () => ({
  useFavorites: () => ({
    // Finge que nenhum vídeo é favorito
    isFavorite: jest.fn().mockReturnValue(false), 
    toggleFavorite: jest.fn(),
  }),
}));

// MOCK: Um vídeo de mentira
const mockVideo: IVideo = {
  id: 'react-101',
  title: 'Aprenda Next.js em 10 Minutos',
  channel: 'Tech Channel',
  description: 'Uma breve introdução ao Next.js',
  thumbnailUrl: 'https://img.youtube.com/vi/react-101/hqdefault.jpg',
  videoUrl: 'https://www.youtube.com/embed/react-101',
};

describe('Component: VideoCard', () => {
  it('deve renderizar o título, canal e thumbnail corretamente', () => {
    // Cria uma função vazia só para espionar (spy) se ela é chamada
    const mockOnSelect = jest.fn(); 

    // Renderiza o componente de forma "virtual"
    render(<VideoCard video={mockVideo} onSelect={mockOnSelect} />);

    // 1. Verifica se os textos apareceram
    expect(screen.getByText('Aprenda Next.js em 10 Minutos')).toBeInTheDocument();
    expect(screen.getByText('Tech Channel')).toBeInTheDocument();

    // 2. Verifica se a imagem renderizou e tem o src correto
    const thumbnail = screen.getByAltText(`Capa do vídeo ${mockVideo.title}`);
    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute('src', mockVideo.thumbnailUrl);
  });

  it('deve disparar a função onSelect quando o usuário clicar no card', () => {
    const mockOnSelect = jest.fn();
    render(<VideoCard video={mockVideo} onSelect={mockOnSelect} />);

    // Procura o card através do "aria-label" que colocamos na etapa de Acessibilidade!
    const cardElement = screen.getByRole('button', { name: `Assistir vídeo: ${mockVideo.title}` });
    
    // Simula o clique do usuário
    fireEvent.click(cardElement);

    // Garante que a função foi chamada exatamente 1 vez
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});