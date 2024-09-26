import { FC } from "react";
import { ImSpinner10 } from "react-icons/im";

interface SpinnerProps {
  className?: string;
  size?: number;
}

export const Spinner: FC<SpinnerProps> = ({ className = "", size = 25 }) => {
  return <ImSpinner10 className={`animate-spin ${className}`} size={size} />;
};
