const actual = jest.requireActual('react-router-dom');
const mockNavigate = jest.fn();

module.exports = {
  __esModule: true,
  ...actual,
  useNavigate: () => mockNavigate,
};
