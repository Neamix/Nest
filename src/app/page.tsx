"use client"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/modules/Authentication/Stores/store";
import { useEffect } from "react";

export default function Home() {
  const authStore = useAuthStore();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome, {authStore.first_name} {authStore.last_name}</h1>
        <div>
          <Button>Click me</Button>
        </div>
      </div>
    </div>
  );
}
