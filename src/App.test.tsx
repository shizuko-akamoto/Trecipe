import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Trecipe header', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('Trecipe');
  expect(linkElement).toBeInTheDocument();
});
