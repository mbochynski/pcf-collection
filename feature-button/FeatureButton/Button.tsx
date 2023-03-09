import * as React from "react";
import { Label } from "@fluentui/react";

export interface IButtonProps {
  name?: string;
  height: number;
  width: number;
}

// TODO
// [] add min width and min heigh?

export const Button: React.FC<IButtonProps> = ({ height, width }) => {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        background: "blue",
      }}
    ></div>
  );
};
