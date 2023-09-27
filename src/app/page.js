'use client';


import { router ,useRouter } from "next/navigation";
import { AppButton } from "./Components/app-button";

export default function Home() {
  const router = useRouter();
  const goToStudentsPage = () => {
    router.push('/Students');
  };

  return (
    <div className=" bg-blue-800 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold text-black">Student Manager</h1>
        <div className="mt-8">
          <AppButton className="mr-4" color="red" onClick={goToStudentsPage}>
            Go to Students
          </AppButton>
          <AppButton color="red" onClick={goToStudentsPage}>
            Demo
          </AppButton>
        </div>
      </div>
    </div>
  );
}