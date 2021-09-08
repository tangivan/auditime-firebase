import React from "react";
import TimerController from "../TimerController";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import firebase from '../../../firebase';

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

const mockTimerHistory = [
    {
        duration: 0,
        events: "created",
        timeStamp: 892489329843
    },
    {
        duration: 0,
        events: "started",
        timeStamp: 84935934893
    }
]
const mockTimer = {
    id: "2klwkfld",
    name: "Test Timer",
    timeRunTotal: 0,
    timeShown: 0,
    timerHistory: mockTimerHistory
}
describe('<TimeController />', () => {
    beforeEach(() => {
        firebase.firestore = jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    collection: jest.fn(() => ({
                        doc: jest.fn(() => ({
                            update: jest.fn(() => Promise.resolve('data')),
                            delete: jest.fn(() => Promise.resolve('data')),
                        }))
                    }))
                }))
            }))
        }))
    })

    it('renders TimeController with correct Timer', async () => {
        const { getByText } = render(
            <TimerController timer={mockTimer} />
        );
        expect(getByText("Test Timer")).toBeTruthy();
    });

    test('click start button and click pause button shows correct output', async () => {
        const { getByTestId, queryByText } = render(
            <TimerController timer={mockTimer} />
        );

        expect(getByTestId("start")).toBeTruthy();
        expect(queryByText("pause")).toBeFalsy();
        fireEvent.click(getByTestId("start"));
        expect(queryByText("start")).toBeFalsy();
        expect(getByTestId("pause")).toBeTruthy();
    });

    test('click on edit and remove buttons', async () => {
        const { getByTestId } = render(
            <TimerController timer={mockTimer} />
        );

        expect(getByTestId("edit")).toBeTruthy();
        fireEvent.click(getByTestId("edit"));
        expect(getByTestId("remove")).toBeTruthy();
        fireEvent.click(getByTestId("remove"));
    });
});