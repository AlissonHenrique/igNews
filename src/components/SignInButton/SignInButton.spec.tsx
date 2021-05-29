import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { mocked } from "ts-jest/utils";
import { useSession } from "next-auth/client";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
    it("render correctly when user is not authenticated", () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);

        render(<SignInButton />);
        expect(screen.getByText("Sing in with GitHub")).toBeInTheDocument();
    });
    it("render correctly when user is authenticated", () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([
            {
                user: { name: "John Doe", email: "johndoe@example.com.br" },
                expires: "fake-expire",
            },
            false,
        ]);
        render(<SignInButton />);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
});
