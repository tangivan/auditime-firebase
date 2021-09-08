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
        const { getByRole, getByLabelText, getByTestId } = render(
            <Timer time={mockTime1} />
        );
        expect(getByTestId("time").textContent).toBe("0 : 0 : 0");
    });

    test('renders Timer with "01:02:03"', async () => {
        const { getByRole, getByLabelText, getByTestId } = render(
            <Timer time={mockTime2} />
        );
        expect(getByTestId("time").textContent).toBe("01 : 02 : 03");
    });
});