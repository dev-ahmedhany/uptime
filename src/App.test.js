import { render, screen } from '@testing-library/react';
import App from './App';

test('renders uptime monitor', () => {
  render(<App />);
  const element = screen.getByText(/uptime monitor/i);
  expect(element).toBeInTheDocument();
});
