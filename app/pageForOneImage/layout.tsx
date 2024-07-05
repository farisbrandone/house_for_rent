import Header from "@/components/Header";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-full bg-[linear-gradient(40deg,#006ce4,#003b95)] flex items-center justify-center mt-0">
        <Header searchOrNot={false} headerForSign={false} />
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
};

export default AppLayout;
