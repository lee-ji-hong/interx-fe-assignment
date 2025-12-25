import { useEffect } from "react";
import { initUsers } from "@/util";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useEffect(() => {
    initUsers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      <main className="relative mx-auto w-full">
        <div className="w-full mx-auto flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
