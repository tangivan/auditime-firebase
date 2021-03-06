import React from "react";
import Analytics from "../Analytics";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import firebase from '../../../firebase';

jest.mock('../../../firebase', () => ({
    firebase: {
        firestore: jest.fn(() => ({})),
    },
}));

jest.mock('../../../context/AuthContext', () => ({
    ...jest.requireActual('../../../context/AuthContext'),
    useAuth: () => ({
        getUuid: jest.fn()
    }),
}))

jest.mock('react-chartjs-2', () => ({
    Bar: () => null,
    defaults: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
}));


describe('<Analytics />', () => {
    beforeEach(() => {
        firebase.firestore = jest.fn(() => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    collection: jest.fn(() => ({
                        onSnapshot: jest.fn()
                    }))
                }))
            }))
        }))
    })
    test('Renders Analytics Successfully', async () => {
        const { getByText } = render(
            <Analytics />
        );
    });
});