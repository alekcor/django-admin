import React from 'react';
import { render, screen } from '@testing-library/react';
import {App} from './App';

test.skip('Page title', () => {
  render(<App />);
  const linkElement = screen.getByText("Django");
  expect(linkElement).toBeInTheDocument();
});
