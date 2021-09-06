import React from "react"
import Login from "../Login"
import { AuthContext } from '../../../contexts/AuthContext';
import { render, fireEvent, screen } from "@testing-library/react"
import { BrowserRouter as Router } from "react-router-dom";
import { act } from 'react-dom/test-utils'
import "@testing-library/jest-dom/extend-expect"

jest.mock('../../../firebase', () => {
    return {
        auth: {
            onAuthStateChanged: jest.fn()
        }
    }
})

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}))

const firebase = {
    auth: jest.fn(() => ({
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve('Successfully signed in!')),
    }))
}

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}))

const mockAnonLogin = jest.fn(() => {
    Promise.resolve('Anonymously logged in!')
});
jest.mock('../../../contexts/AuthContext', () => ({
    ...jest.requireActual('../../../contexts/AuthContext'),
    useAuth: () => ({
        anonLogin: mockAnonLogin,
    }),
}))


describe('<Login />', () => {
    it('renders the sign in page with a form submission', async () => {
        const { getByLabelText, getByTestId, getByRole, queryByTestId, queryByLabelText } = render(
            <Router>
                <AuthContext.Provider value={{ firebase }}>
                    <Login />
                </AuthContext.Provider>
            </Router>
        );
        await act(async () => {
            await fireEvent.change(getByLabelText("Email"), {
                target: { value: 'ivan@gmail.com' },
            });
            await fireEvent.change(getByLabelText("Password"), {
                target: { value: 'password' },
            });
            expect(getByLabelText("Email").value).toBe('ivan@gmail.com');
            expect(getByLabelText("Password").value).toBe('password');
            fireEvent.click(getByTestId("login"))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to log in");
            expect(getByLabelText("Email").value).toBe('ivan@gmail.com');
            expect(getByLabelText("Password").value).toBe('password');

            await fireEvent.change(getByLabelText("Email"), {
                target: { value: 'testivant@testing1.com' },
            });
            await fireEvent.change(getByLabelText("Password"), {
                target: { value: 'pringles123' },
            });
            fireEvent.click(getByRole('button', { name: 'Sign In' }));
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to log in");

            fireEvent.click(getByRole('button', { name: 'Continue as Guest' }));
            expect(getByTestId('loader')).toBeInTheDocument();
        });
    });
});
