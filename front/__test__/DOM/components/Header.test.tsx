import { render } from "@testing-library/react";
import Header from "../../../src/components/Header/Header";
import { screen } from '@testing-library/react';
import { renderWithRouter } from "../../helpers/renderWithRouter";
import userEvent from '@testing-library/user-event';

describe('Header Component', () => {

    beforeEach(()=>{
        renderWithRouter(<Header />);
    })

    it('renders header', () => {
        expect(screen.getByTestId('header-layout')).toBeInTheDocument();
    })
    it('renders linck home', () => {
        const homeLink = screen.getByTestId('home-link');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    })
    it('renders linck saport', () => {
        const saportLink = screen.getByTestId('saport-link');
        expect(saportLink).toBeInTheDocument();
        expect(saportLink).toHaveAttribute('href', '/saport');
    })
    it('renders linck login', () => {
        const loginLink = screen.getByTestId('login-link');
        expect(loginLink).toBeInTheDocument();
        expect(loginLink).toHaveAttribute('href', '/login');
    })
});