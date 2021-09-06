import React from "react"
import Signup from "../Signup"
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

const mockSignup = jest.fn(() => {
    Promise.resolve('signed up!')
});


jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        signup: mockSignup,
    }),
}))

let getByLabelText;
let getByTestId;
let getByRole;
let getByText;

beforeEach(() => {
    const component = render(
        <Router>
            <AuthContext.Provider value={{ firebase }}>
                <Signup />
            </AuthContext.Provider>
        </Router>
    );
    getByLabelText = component.getByLabelText;
    getByTestId = component.getByTestId;
    getByRole = component.getByRole;
    getByText = component.getByText;
})

describe('<Signup />', () => {
    test('Form value changes and submit button works', async () => {
        await act(async () => {
            await fireEvent.change(getByLabelText("First Name"), { target: { value: 'ivan' }, });
            await fireEvent.change(getByLabelText("Last Name"), { target: { value: 'tang' }, });
            await fireEvent.change(getByLabelText("Email"), { target: { value: 'ivan@test.com' }, });
            await fireEvent.change(getByLabelText("Password"), { target: { value: 'tangers25' }, });
            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: 'tangers256' }, });

            fireEvent.click(getByRole("button", { name: /sign up/i }))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Passwords do not match");
            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: 'tangers25' }, });
            fireEvent.click(getByRole("button", { name: /sign up/i }))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to create an account");
        });
    });
});
