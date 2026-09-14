import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders digital clock heading', () => {
  render(<App />);
  const footerText = screen.getByText(/Talha Rahman/i);
  expect(footerText).toBeInTheDocument();
});
