import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
    });

    test('renders the top links', () => {
        expect(
            screen.getByText(/DHSC Data Access Tool Alpha/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/ASCOF Data Charts/i)).toBeInTheDocument();
        expect(screen.getByText(/About Us/i)).toBeInTheDocument();
        expect(screen.getByText(/Chart Placeholders/i)).toBeInTheDocument();
    });

    test('renders home link with correct href', () => {
        const link = screen.getByText(
            /DHSC Data Access Tool Alpha/i
        ) as HTMLAnchorElement;
        expect(link.href).toContain('/');
    });

    test('renders about us link with correct href', () => {
        const link = screen.getByText(/About Us/i) as HTMLAnchorElement;
        expect(link.href).toContain('/about');
    });

    test('renders chart placeholders link with correct href', () => {
        const link = screen.getByText(
            /Chart Placeholders/i
        ) as HTMLAnchorElement;
        expect(link.href).toContain('/chart-placeholders');
    });
});
