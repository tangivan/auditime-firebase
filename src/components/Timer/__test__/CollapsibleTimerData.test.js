import React from "react";
import CollapsibleTimerData from "../CollapsibleTimerData";
import { render } from "@testing-library/react";
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
    name: "SDfsd",
    timeRunTotal: 0,
    timeShown: 0,
    timerHistory: mockTimerHistory
}
describe('<CollapsibleTimerData />', () => {
    it('renders CollapsibleTimerData with a data table', async () => {
        const { getByRole, getByLabelText, getByTestId } = render(
            <CollapsibleTimerData timer={mockTimer} />
        );
        expect(getByTestId("collapse-data")).toBeInTheDocument();
    });
});