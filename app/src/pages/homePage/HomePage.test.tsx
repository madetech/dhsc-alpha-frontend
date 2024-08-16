import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

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
});
