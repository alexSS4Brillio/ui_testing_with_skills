import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AlbumsPage from '../pages/AlbumsPage';

const mockAlbums = [
  { userId: 2, id: 5, title: 'Second User Album' },
  { userId: 1, id: 3, title: 'First User Album' },
];

describe('AlbumsPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAlbums),
      })
    );
  });

  afterEach(() => {
    delete global.fetch;
  });

  test('mocks fetch and renders album information on the page', async () => {
    render(
      <MemoryRouter>
        <AlbumsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading albums/i)).toBeInTheDocument();
    expect(await screen.findByText('Album Collections')).toBeInTheDocument();
    expect(await screen.findByTitle('First User Album')).toBeInTheDocument();
    expect(await screen.findByTitle('Second User Album')).toBeInTheDocument();
  });

  test('renders title and subtitle', async () => {
    render(
      <MemoryRouter>
        <AlbumsPage />
      </MemoryRouter>
    );

    expect(await screen.findByRole('heading', { level: 2, name: /Album Collections/i })).toBeInTheDocument();
    expect(await screen.findByText(/Albums are grouped by user\. Click any album bubble to view that user's details\./i)).toBeInTheDocument();
  });

  test('renders album label fields for fetched content', async () => {
    render(
      <MemoryRouter>
        <AlbumsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText('User 1')).toBeInTheDocument();
    expect(screen.getByText('User 2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('shows albums grouped by user ID in ascending user order', async () => {
    const { container } = render(
      <MemoryRouter>
        <AlbumsPage />
      </MemoryRouter>
    );

    await screen.findByTitle('First User Album');

    const userBubbles = Array.from(container.querySelectorAll('.user-bubble-title'));
    expect(userBubbles.length).toBeGreaterThanOrEqual(2);
    expect(userBubbles[0]).toHaveTextContent('User 1');
    expect(userBubbles[1]).toHaveTextContent('User 2');
  });

  test('shows an error state when fetch fails', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    render(
      <MemoryRouter>
        <AlbumsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Failed to fetch albums/i)).toBeInTheDocument();
  });
});
