import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

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
            screen.getByText(/Adult social care data access portal/i)
        ).toBeInTheDocument();
    });

    test('renders home link with correct href', () => {
        const link = screen.getByText(
            /Adult social care data access portal/i
        ) as HTMLAnchorElement;
        expect(link.href).toContain('/home');
    });
});
