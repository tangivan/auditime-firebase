import React from "react";
import ToggleableTimerForm from "../ToggleableTimerForm";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

jest.mock('../../../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({})),
    },
}));

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
    }),
}))

describe('<ToggleableTimerForm />', () => {
    it('renders the initial <ToggleableTimerForm />', () => {
        const { getByRole } = render(
            <ToggleableTimerForm />
        );
        fireEvent.click(getByRole("button"));
    });
});