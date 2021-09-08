import React from "react";
import ToggleableTimeData from "../ToggleableTimeData";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock('../../../firebase', () => ({
    __esModule: true,
    default: () => ({
        firebase: jest.fn()
    }),
}));

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
    name: "This is my timer",
    timeRunTotal: 0,
    timeShown: 0,
    timerHistory: mockTimerHistory
}

describe('<ToggleableTimeData />', () => {
    test('renders ToggleableTimeData with the correct mock data', async () => {
        const { getByRole, getByText } = render(
            <ToggleableTimeData timer={mockTimer} />
        );
        expect(getByRole("rowgroup")).toBeTruthy();
        expect(getByText("This is my timer")).toBeTruthy();
    });
});