import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { act } from 'react';
import UserPage from '../pages/UserPage';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

const mockUsers = [
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    address: { city: 'Wisokyburgh' },
    company: { name: 'Deckow-Crist' },
  },
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    address: { city: 'Gwenborough' },
    company: { name: 'Romaguera-Crona' },
  },
];

describe('UserPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockUsers),
      })
    );
  });

  afterEach(() => {
    delete global.fetch;
  });

  test('mocks fetch and renders user information on the page', async () => {
    render(<UserPage />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Sincere@april.biz')).toBeInTheDocument();
  });

  test('renders header with all columns', async () => {
    render(<UserPage />);

    const expectedColumnHeaders = [
      'ID',
      'Name',
      'Username',
      'Email',
      'Phone',
      'Website',
      'City',
      'Company',
    ];

    for (const headerText of expectedColumnHeaders) {
      expect(await screen.findByText(headerText)).toBeInTheDocument();
    }
  });

  test('renders title and subtitle', async () => {
    await act(async () => {
      render(<UserPage />);
    });

    expect(await screen.findByRole('heading', { level: 2, name: /Users Management/i })).toBeInTheDocument();
    expect(await screen.findByText(/Click on any row to view detailed user information/i)).toBeInTheDocument();
    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
  });

  test('orders list by ID column ascending and descending', async () => {
    const { container } = render(<UserPage />);
    await screen.findByText('Leanne Graham');

    const idHeaderLabel = container.querySelector('.ag-header-cell[col-id="id"] .ag-header-cell-label');
    expect(idHeaderLabel).toBeInTheDocument();

    fireEvent.click(idHeaderLabel);
    await waitFor(() => {
      const idHeaderCell = container.querySelector('.ag-header-cell[col-id="id"]');
      expect(idHeaderCell).toHaveAttribute('aria-sort', 'ascending');
    });

    fireEvent.click(idHeaderLabel);
    await waitFor(() => {
      const idHeaderCell = container.querySelector('.ag-header-cell[col-id="id"]');
      expect(idHeaderCell).toHaveAttribute('aria-sort', 'descending');
    });

    const cells = container.querySelectorAll('.ag-center-cols-container .ag-row .ag-cell[col-id="id"]');
    expect(cells.length).toBeGreaterThanOrEqual(2);
  });
});
