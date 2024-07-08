"use client";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) => {
  const onClick = () => {
    console.log("LOGIN BUTTON CLICKED");
  };
  return (
    <div>
      <span className="cursor-pointer" onClick={onClick}>
        {children}
      </span>
    </div>
  );
};
