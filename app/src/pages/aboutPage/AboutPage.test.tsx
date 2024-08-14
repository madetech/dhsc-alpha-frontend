import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <AboutPage />
            </MemoryRouter>
        );
    });

    test('renders the page header', () => {
        expect(screen.getAllByText(/About Us/i)[0]).toBeInTheDocument();
    });
});
