import { fireEvent, render, screen } from "@testing-library/react";
import { SubscribeButton } from ".";
import { mocked } from "ts-jest/utils";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";

jest.mock("next-auth/client");
jest.mock("next/router");

describe("SubscribeButton component", () => {
    it("render correctly", () => {
        const userSessionMocked = mocked(useSession);
        userSessionMocked.mockReturnValueOnce([null, false]);
        render(<SubscribeButton />);
        expect(screen.getByText("Subscribe now")).toBeInTheDocument();
    });

    it("redirect user to signin when not authenticated", () => {
        const signInMocked = mocked(signIn);
        const userSessionMocked = mocked(useSession);
        userSessionMocked.mockReturnValueOnce([null, false]);
        render(<SubscribeButton />);
        const subscribeButton = screen.getByText("Subscribe now");
        fireEvent.click(subscribeButton);

        expect(signInMocked).toHaveBeenCalled();
    });
    it("redirect to post when user  already has a subscription", () => {
        const useRouterMocked = mocked(useRouter);
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([
            {
                user: { name: "John Doe", email: "johndoe@example.com.br" },
                activeSubscription: "true",
                expires: "fake-expire",
            },
            false,
        ]);
        const pushMock = jest.fn();
        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any);
        render(<SubscribeButton />);

        const subscribeButton = screen.getByText("Subscribe now");
        fireEvent.click(subscribeButton);

        expect(pushMock).toHaveBeenCalledWith("/posts");
    });
});
