import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('renders the wedding invitation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Chela.*Josiah/i })).toBeInTheDocument();
});
