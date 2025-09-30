"use client"
import { Button } from "@/components/ui/button"
import useAuthStore from "@/modules/Authentication/Stores/store";

export default function Home() {
  const authStore = useAuthStore();
  authStore.setUser({first_name: "John", last_name: "Doe"});
  console.log(authStore);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        dasdasd{ authStore.first_name }
        <div>
          <Button>Click me</Button>
        </div>
    </div>
  );
}
