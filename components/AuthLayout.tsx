import React from "react";

interface AuthLayoutProps {
  reverse?: boolean;
  text: React.ReactNode;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ reverse = false, text, children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* text/info column */}
      <div
        className={`md:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-200 ${
          reverse ? "md:order-2" : ""
        }`}
      >
        {text}
      </div>

      {/* form column */}
      <div
        className={`md:w-1/2 flex items-center justify-center p-8 ${
          reverse ? "md:order-1" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;