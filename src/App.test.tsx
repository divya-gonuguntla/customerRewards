import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('Render App Properly', () => {
  test('Test Rendering', () => {
    // const { getTestById } = render(<App />)
    // expect(getTestById('content').toBeInTheDocument())
  })
})
