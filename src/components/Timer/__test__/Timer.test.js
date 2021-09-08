import React from "react";
import Timer from "../Timer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock('../../../firebase', () => ({
    __esModule: true,
    default: () => ({
        firebase: jest.fn()
    }),
}));

const mockTime1 = {
    centiseconds: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
}

const mockTime2 = {
    centiseconds: 0,
    hours: "01",
    minutes: "02",
    seconds: "03"
}

describe('<Timer />', () => {
    test('renders Timer with a correct formatted timer', async () => {
        const { getByText } = render(
            <Timer time={mockTime1} />
        );
        expect(getByText("0 : 0 : 0")).toBeTruthy();
    });

    test('renders Timer with "01:02:03"', async () => {
        const { getByText } = render(
            <Timer time={mockTime2} />
        );
        expect(getByText("01 : 02 : 03")).toBeTruthy();
    });
});