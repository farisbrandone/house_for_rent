import Header from "@/components/Header";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black">
      <div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center ">
        <Header searchOrNot={false} headerForSign={true} />
      </div>
      <div className="flex flex-col flex-1 items-center  min-h-screen ">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
