import React from "react"
import Navbar from "../Navbar"
import { AuthContext } from '../../../context/AuthContext';
import { render, fireEvent, screen, cleanup } from "@testing-library/react"
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils'
import "@testing-library/jest-dom/extend-expect"

afterEach(cleanup)

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

const mockCurrentUser = {
    providerData: [{ displayName: "ivan t", email: "ivant@ivant.com", providerId: "floogle" }],
    isAnonymous: true,
}

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        currentUser: mockCurrentUser
    }),
}))

let getByLabelText;
let getByTestId;
let getByRole;
let getByText;
let queryByText;
let queryByTestId;
beforeEach(() => {
    const component = render(
        <MemoryRouter initialEntries={['/']}>
            <AuthContext.Provider value={{ firebase }}>
                <Navbar />
            </AuthContext.Provider>
        </MemoryRouter>
    );
    getByLabelText = component.getByLabelText;
    getByTestId = component.getByTestId;
    getByRole = component.getByRole;
    getByText = component.getByText;
    queryByText = component.queryByText;
    queryByTestId = component.queryByTestId;
})

describe('<Navbar />', () => {
    test('Form value changes and submit button works', () => {
        const timersBtnEl = getByText("Timers");
        const analyticsBtnEl = getByText("Analytics");
        const dropdownEl = getByTestId("dropdown");
        expect(timersBtnEl.className).toBe("full-height nav-item  nav-item-active row center align-center margin-r-sm");
        expect(analyticsBtnEl.className).toBe("full-height nav-item  nav-item-inactive row center align-center margin-r-sm");
        fireEvent.click(analyticsBtnEl);
        fireEvent.click(timersBtnEl);
        expect(queryByText("Guest")).toBeFalsy();
        fireEvent.click(dropdownEl);
        expect(queryByText("Guest")).toBeTruthy();
    });
});