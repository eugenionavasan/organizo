import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../layout';
import { Sidebar } from '../sidebar';

jest.mock('../sidebar', () => ({
  Sidebar: () => <div>Mocked Sidebar</div>,
}));

describe('Layout', () => {
  it('renders the Sidebar component and children', () => {
    render(
      <Layout>
        <div>Test Child</div>
      </Layout>
    );

    // Check if the Sidebar component is rendered
    expect(screen.getByText('Mocked Sidebar')).toBeInTheDocument();

    // Check if the children are rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
