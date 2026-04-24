import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react';
import AlbumDetailPage from '../pages/AlbumDetailPage';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

const mockAlbum = {
  id: 1,
  title: 'Test Album',
  userId: 5,
};

// Helper function to render component with router context
const renderWithRouter = (initialPath = '/album/1') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/album/:id" element={<AlbumDetailPage />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('AlbumDetailPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockAlbum),
      })
    );
  });

  afterEach(() => {
    delete global.fetch;
  });

  test('mocks fetch and renders album information on the page', async () => {
    renderWithRouter();

    expect(screen.getByText(/Loading album/i)).toBeInTheDocument();
    expect(await screen.findByText('Test Album')).toBeInTheDocument();
    expect(await screen.findByRole('heading', { level: 1, name: 'Test Album' })).toBeInTheDocument();
  });

  test('renders album details with all required labels', async () => {
    renderWithRouter();

    expect(await screen.findByText('ALBUM')).toBeInTheDocument();
    expect(await screen.findByText(/Album ID:/)).toBeInTheDocument();
    expect(await screen.findByText(/Artist \(User\):/)).toBeInTheDocument();
  });

  test('renders title and album meta information', async () => {
    renderWithRouter();

    expect(await screen.findByRole('heading', { level: 1, name: 'Test Album' })).toBeInTheDocument();
    expect(await screen.findByText('ALBUM')).toBeInTheDocument();
    expect(await screen.findByText('Test Album')).toBeInTheDocument();
  });

  test('renders back link to albums list', async () => {
    renderWithRouter();

    const backLink = await screen.findByRole('link', { name: /Back to Albums/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/albums');
  });

  test('renders user link with album userId', async () => {
    renderWithRouter();

    const userLink = await screen.findByRole('link', { name: /User 5/i });
    expect(userLink).toBeInTheDocument();
    expect(userLink).toHaveAttribute('href', '/user/5');
  });

  test('renders action buttons (Play and Like)', async () => {
    renderWithRouter();

    const playButton = await screen.findByRole('button', { name: /Play/i });
    const likeButton = await screen.findByRole('button', { name: /Like/i });

    expect(playButton).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
  });

  test('displays loading state while fetching', () => {
    global.fetch = jest.fn(() => new Promise(() => {})); // Never resolves

    renderWithRouter();

    expect(screen.getByText(/Loading album/i)).toBeInTheDocument();
  });

  test('handles fetch errors gracefully', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/Album Error: Network error/i)).toBeInTheDocument();
    });
  });

  test('handles HTTP error responses', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      })
    );

    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText(/Album Error:/i)).toBeInTheDocument();
    });
  });

  test('displays album ID in the cover placeholder', async () => {
    renderWithRouter();

    const albumIdElement = await screen.findByTestId('album-id');
    expect(albumIdElement).toBeInTheDocument();
    expect(albumIdElement).toHaveClass('album-id');
  });
});
