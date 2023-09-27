'use client';


import { router ,useRouter } from "next/navigation";
import { AppButton } from "./Components/app-button";

export default function Home() {
  const router = useRouter();
  const goToStudentsPage = () => {
    router.push('/Students');
  };

  return (
    <div className=" bg-blue-800 min-h-screen flex justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-white">Student Manager</h1>
        <div className="mt-8">
          <AppButton className=" mr-4  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={goToStudentsPage}>
            Go to Students
          </AppButton>
          <AppButton className=" mr-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded" onClick={goToStudentsPage}>
            Demo
          </AppButton>
        </div>
      </div>
    </div>
  );
}