import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('renders the ooWaa.ai title', () => {
    render(<App />);
    expect(screen.getByText('🤖 ooWaa.ai')).toBeTruthy();
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(screen.getByText('The AI reformer')).toBeTruthy();
  });

  it('renders the description', () => {
    render(<App />);
    expect(screen.getByText(/Knows what it doesn't/)).toBeTruthy();
  });


  it('has correct styling', () => {
    const { getByText } = render(<App />);
    const title = getByText('🤖 ooWaa.ai');
    expect(title.props.style).toMatchObject({
      fontSize: 48,
      fontWeight: 'bold',
    });
  });

  it('calls backend and shows response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ type: 'testReceived' }),
    });

    render(<App apiBase="http://localhost:3000" />);
    fireEvent.press(screen.getByText('Send Test Message'));

    await waitFor(() => {
      expect(screen.getByText('Response: testReceived')).toBeTruthy();
    });
  });
});
