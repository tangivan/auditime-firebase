import React from "react";
import TimerList from "../TimerList";
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

describe('<TimerList />', () => {
    it('renders the initial <TimerList />', () => {
        const { queryByTestId } = render(
            <TimerList />
        );
    });
});