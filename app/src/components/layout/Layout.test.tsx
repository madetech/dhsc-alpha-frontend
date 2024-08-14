import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Layout>
                    <div>Test Children Content</div>
                </Layout>
            </MemoryRouter>
        );
    });

    describe('Skip Link', () => {
        test('renders the skip link', () => {
            expect(
                screen.getByText(/Skip to main content/i)
            ).toBeInTheDocument();
        });

        test('skip link focuses main content', () => {
            const skipLink = screen.getByText(/Skip to main content/i);

            fireEvent.click(skipLink);

            const mainContentContainer = screen
                .getByText(/Test Children Content/i)
                .closest('div[tabindex="-1"]');

            expect(mainContentContainer).toHaveFocus();
        });
    });

    describe('Content', () => {
        test('renders the phase banner', () => {
            expect(
                screen.getByText(/This part of GOV.UK is being built/i)
            ).toBeInTheDocument();
        });

        test('renders the main content', () => {
            expect(
                screen.getByText(/Test Children Content/i)
            ).toBeInTheDocument();
        });
    });
});
