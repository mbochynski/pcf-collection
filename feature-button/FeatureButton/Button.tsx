import * as React from "react";

export interface IButtonProps {
  height: number;
  width: number;
  text: string;
  image: string;
  onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({
  height,
  width,
  text,
  image,
  onClick,
}) => {
  return (
    <div
      style={{
        height: `${height}px`,
        width: `${width}px`,
        minWidth: "64px",
        minHeight: "64px",
        background: "blue",
      }}
    >
      <button onClick={onClick}>{text}</button>
      <img src={image} />
    </div>
  );
};
