"use client";


import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { AppButton } from "./Components/app-button";

export default function Home() {
  const router = useRouter();
  const user = useSelector((rootState) => rootState.user);

  const goToStudentsPage = () => {
    router.push('/Students');
  };
  const signIn = () => {
    router.push('/sign-in');
  };
  const register = () => {
    router.push('/register');
  };
  const signOutUser = () => {
    const auth = getAuth();
    signOut(auth);
  };  
  return (
    <main className="bg-blue-700 min-h-screen">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold">Students manager</h1>
        
          {!user.id && (
            <>
              <AppButton className="mt-20 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={signIn}>
                Sign in
              </AppButton>
              <AppButton className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={register}>
                Register
              </AppButton>         
            </>
          )}
          {!!user.id && (
            <>
              <div>Hello, {user.displayName}</div>
              <AppButton className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={signOutUser}>
                Sign out
              </AppButton>  
            </>         
          )}          
          <AppButton className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " onClick={goToStudentsPage}>
            Go to Students
          </AppButton>                  
      
      </div>
    </main>
  );
}
