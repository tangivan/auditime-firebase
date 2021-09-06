import React from "react"
import ForgotPassword from "../ForgotPassword"
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

const firebase = {
    auth: jest.fn(() => ({
        signInWithEmailAndPassword: jest.fn(() => Promise.resolve('Successfully signed in!')),
    }))
}

const mockResetPassword = jest.fn(() => {
    Promise.resolve('Password reset email sent!')
});

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        // resetPassword: mockResetPassword,
    }),
}))

let getByLabelText;
let getByTestId;
let getByRole;

beforeEach(() => {
    const component = render(
        <Router>
            <AuthContext.Provider value={{ firebase }}>
                <ForgotPassword />
            </AuthContext.Provider>
        </Router>
    );
    getByLabelText = component.getByLabelText;
    getByTestId = component.getByTestId;
    getByRole = component.getByRole;
})

describe('<Forgotpassword />', () => {
    test('Form value changes and submit button works', async () => {
        await act(async () => {
            await fireEvent.change(getByLabelText("Email"), { target: { value: '' }, });
            expect(getByLabelText("Email").value).toBe('');
            fireEvent.click(getByRole("button", { name: /Submit/i }))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to reset password.");

            await fireEvent.change(getByLabelText("Email"), { target: { value: 'ivanxintang@gmail.com' }, });
            expect(getByLabelText("Email").value).toBe('ivanxintang@gmail.com');
        });
    });
});
