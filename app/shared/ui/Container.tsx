import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  addClass?: string;
}

const Container = ({ children, addClass }: ContainerProps) => {
  return (
    <div className={`max-w-400 px-6 sm:px-10 lg:px-28 mx-auto ${addClass}`}>
      {children}
    </div>
  );
};

export default Container;
