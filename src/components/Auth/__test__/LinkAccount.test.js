import React from "react"
import LinkAccount from "../LinkAccount"
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

const mockLinkEmailandPassword = jest.fn(() => {
    Promise.resolve('Anonymously logged in!')
});

const mockLinkWithGoogle = jest.fn(() => {
    Promise.resolve('google popup');
})

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        linkEmailandPassword: mockLinkEmailandPassword,
        linkWithGoogle: mockLinkWithGoogle,
        currentUser: { isAnonymous: true }
    }),
}))

let getByLabelText;
let getByTestId;
let getByRole;

beforeEach(() => {
    const component = render(
        <Router>
            <AuthContext.Provider value={{ firebase }}>
                <LinkAccount />
            </AuthContext.Provider>
        </Router>
    );
    getByLabelText = component.getByLabelText;
    getByTestId = component.getByTestId;
    getByRole = component.getByRole;
})

describe('<Login />', () => {
    test('Render link account form and submit mismatching passwords', async () => {
        await act(async () => {
            await fireEvent.change(getByLabelText("Username"), { target: { value: 'ivan ta' }, });
            await fireEvent.change(getByLabelText("Email"), { target: { value: 'ivan@gmail.com' }, });
            await fireEvent.change(getByLabelText("Password"), { target: { value: 'password' }, });
            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: 'passwordsss' }, });
            expect(getByLabelText("Username").value).toBe('ivan ta');
            expect(getByLabelText("Email").value).toBe('ivan@gmail.com');
            expect(getByLabelText("Password").value).toBe('password');
            expect(getByLabelText("Password Confirmation").value).toBe('passwordsss');
            fireEvent.click(getByRole("button", { name: /Submit/i }))
            expect(getByRole('heading', { level: 1 }).textContent).toBe("Passwords do not match");

            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: 'password' }, });
            expect(getByLabelText("Password Confirmation").value).toBe('password');
            fireEvent.click(getByRole("button", { name: /Submit/i }))
            expect(getByLabelText("Email").value).toBe('');

            fireEvent.click(getByRole("button", { name: /Link Google Account/i }))
            // fireEvent.click(getByTestId("login"))
            // expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to log in");
        });
    });

    test('Render link account form and submit matching passwords', async () => {
        await act(async () => {
            await fireEvent.change(getByLabelText("Username"), { target: { value: 'ivan ta' }, });
            await fireEvent.change(getByLabelText("Email"), { target: { value: 'ivan@gmail.com' }, });
            await fireEvent.change(getByLabelText("Password"), { target: { value: 'password' }, });
            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: 'password' }, });
            expect(getByLabelText("Username").value).toBe('ivan ta');
            expect(getByLabelText("Email").value).toBe('ivan@gmail.com');
            expect(getByLabelText("Password").value).toBe('password');
            expect(getByLabelText("Password Confirmation").value).toBe('password');

            fireEvent.click(getByRole("button", { name: /Submit/i }))
            await fireEvent.change(getByLabelText("Username"), { target: { value: '' }, });
            await fireEvent.change(getByLabelText("Email"), { target: { value: '' }, });
            await fireEvent.change(getByLabelText("Password"), { target: { value: '' }, });
            await fireEvent.change(getByLabelText("Password Confirmation"), { target: { value: '' }, });
            expect(getByTestId("message").textContent).toBe("Successfully Linked.");

            fireEvent.click(getByRole("button", { name: /Link Google Account/i }))
            expect(getByTestId("message").textContent).toBe("You may now link your google account from the pop-up.");
            // fireEvent.click(getByTestId("login"))
            // expect(getByRole('heading', { level: 1 }).textContent).toBe("Failed to log in");
        });
    });

});
