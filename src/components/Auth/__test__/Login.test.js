import React from "react"
import Login from "../Login"
import { AuthContext } from '../../../context/AuthContext';
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

const mockLoginWithGoogle = jest.fn(() => {
    Promise.resolve('google popup');
})

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        anonLogin: mockAnonLogin,
        loginWithGoogle: mockLoginWithGoogle
    }),
}))

let getByLabelText;
let getByTestId;
let getByRole;

beforeEach(() => {
    const component = render(
        <Router>
            <AuthContext.Provider value={{ firebase }}>
                <Login />
            </AuthContext.Provider>
        </Router>
    );
    getByLabelText = component.getByLabelText;
    getByTestId = component.getByTestId;
    getByRole = component.getByRole;
})

describe('<Login />', () => {
    test('Form value changes and submit button works', async () => {
        await act(async () => {
            await fireEvent.change(getByLabelText("Email"), { target: { value: 'ivan@gmail.com' }, });
            await fireEvent.change(getByLabelText("Password"), { target: { value: 'password' }, });
            expect(getByLabelText("Email").value).toBe('ivan@gmail.com');
            expect(getByLabelText("Password").value).toBe('password');
            fireEvent.click(getByTestId("login"))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to log in");
        });
    });

    test('Google Signin Button calls function', async () => {
        fireEvent.click(getByRole('button', { name: 'Sign in with Google' }));
        expect(getByRole('heading', { level: 1 }).textContent).toBe("You may now sign in from the Google Sign-in Popup.");
    });

    test('Guest Signin Button calls function and shows loader spinner', async () => {
        fireEvent.click(getByRole('button', { name: 'Continue as Guest' }));
        expect(getByTestId('loader')).toBeInTheDocument();
    })
});
