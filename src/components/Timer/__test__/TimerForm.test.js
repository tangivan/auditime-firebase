import React from "react";
import TimerForm from "../TimerForm";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import firebase from '../../../firebase';
import { act } from 'react-dom/test-utils'

jest.mock('../../../firebase', () => ({
    __esModule: true,
    default: () => ({
        firebase: jest.fn()
    }),
}));

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        getUuid: jest.fn()
    }),
}))

const mockHandleToggleClick = jest.fn();


describe('<TimerForm />', () => {
    beforeEach(() => {
        firebase.firestore = jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    collection: jest.fn(() => ({
                        add: jest.fn(() => Promise.resolve('data')),
                    }))
                }))
            }))
        }))
    })
    it('renders the initial <TimerForm />', async () => {
        const { getByRole, getByLabelText } = render(
            <TimerForm handleToggleClick={mockHandleToggleClick} />
        );

        await act(async () => {
            await fireEvent.change(getByLabelText("Timer Name"), { target: { value: 'random timer' }, });
            expect(getByLabelText("Timer Name").value).toBe('random timer');
            fireEvent.click(getByRole("button"));
        });
    });
});