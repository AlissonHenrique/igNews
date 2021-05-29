import { render, screen } from "@testing-library/react";
import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";
import { mocked } from "ts-jest/utils";
jest.mock("next/router");
jest.mock("next-auth/client", () => {
    return {
        useSession: () => [null, false],
    };
});
jest.mock("../../services/stripe");

describe("Home page", () => {
    it("renders correctly", () => {
        render(
            <Home product={{ priceId: "fake-price", amount: "fake-amount" }} />
        );
        expect(screen.getByText(/fake-amount/i)).toBeInTheDocument();
    });

    it("load initial data", async () => {
        const retrieveStripeMocked = mocked(stripe.prices.retrieve);
        retrieveStripeMocked.mockResolvedValueOnce({
            id: "fake-id",
            unit_amount: 1000,
        } as any);
        const response = await getStaticProps({});

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    product: {
                        priceId: "fake-id",
                        amount: "$10.00",
                    },
                },
            })
        );
    });
});
