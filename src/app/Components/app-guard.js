"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppButton } from "./app-button";

export const AppGuard = ({ children }) => {
    const router = useRouter();
    const user = useSelector((rootState) => rootState.user);
    const signIn = () => {
        router.push('/sign-in');
    };
    if (!user.id) {
        return (
            <>
                <div>
                    Authentication required. Please sign in
                </div>
                <AppButton className="mt-20 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={signIn}>
                    Sign in
                </AppButton>            
            </>
        );
    }
    return <>{children}</>
};