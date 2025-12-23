import { Outlet } from "react-router-dom";

const RootLayout = () => {
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
