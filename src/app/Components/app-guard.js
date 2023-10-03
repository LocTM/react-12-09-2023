"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppButton } from "./app-button";
import { Labrada } from "next/font/google";

export const AppGuard = ({ children }) => {
    const router = useRouter();
    const user = useSelector((rootState) => rootState.user);
    const signIn = () => {
        router.push('/sign-in');
    };
    if (!user.id) {
        return (
            <>
              <div className= "min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
                 <div className="pt-10 text-red-800 text-center">
                    
                Authentication required. Please sign in!
                  
                </div>
                <div className="flex items-center justify-center"  >
                <AppButton className="mt-4 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={signIn}>
                    Sign in
                </AppButton>    
                </div> 
              </div>   
            </>
        );
    }
    return <>{children}</>
};