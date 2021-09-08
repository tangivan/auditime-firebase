import React from "react";
import TimerData from "../TimerData";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../../hooks/useFetch", () => ({
    __esModule: true,
    default: () => ({
        error: "",
        loading: false,
        timerList: []
    }),
}));

jest.mock('../../../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({})),
    },
}));

describe('<TimerData />', () => {
    test('renders timer data with the correct table titles', async () => {
        const { getByText } = render(
            <TimerData />
        );
        expect(getByText("Timer Name")).toBeTruthy();
        expect(getByText("Events")).toBeTruthy();
        expect(getByText("Date Started")).toBeTruthy();
        expect(getByText("Time Started")).toBeTruthy();
        expect(getByText("Total Time")).toBeTruthy();
        expect(getByText("Session Time")).toBeTruthy();
        expect(getByText("Time Shown")).toBeTruthy();
    });
});