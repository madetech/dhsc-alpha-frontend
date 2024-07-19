import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import '@testing-library/jest-dom/extend-expect';

describe('HomePage', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    test('renders the page header', () => {
        expect(
            screen.getByText(/Welcome to the dhsc-alpha-frontend application./i)
        ).toBeInTheDocument();
    });

    test('renders the paragraph text', () => {
        expect(
            screen.getByText(/Welcome to the Example App/i)
        ).toBeInTheDocument();
    });

    test('renders the About us link', () => {
        const linkElement = screen.getByRole('link', { name: /About us/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/about');
    });
});
