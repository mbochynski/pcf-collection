import * as React from "react";
import styled from "styled-components";

export interface IFeatureButtonProps {
  height: number;
  width: number;
  text: string;
  image: string;
  onClick: () => void;
}

const Button = styled.button<{ height: number; width: number }>`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  min-width: "64px";
  min-height: "64px";
  background: "blue";
  position: relative;
  cursor: pointer;
  -webkit-clip-path: url(#regular-shape);
  clip-path: url(#regular-shape);
  border: none;

  &:hover {
    -webkit-clip-path: url(#hover-shape);
    clip-path: url(#hover-shape);
  }

  &:active {
    top: 1px;
  }
`;

const ZeroSVG = styled.svg`
  position: absolute;
  height: 0;
  width: 0;
`;

const Icon = styled.img<{ width: number; height: number }>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  position: absolute;
  top: 10%;
  left: 15%;
`;

const Label = styled.span`
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  font-size: 1.4em;
`;

export const FeatureButton: React.FC<IFeatureButtonProps> = ({
  height,
  width,
  text,
  image,
  onClick,
}) => {
  return (
    <>
      <ZeroSVG>
        <clipPath id="regular-shape" clipPathUnits="objectBoundingBox">
          <path d="M0.213,0.915 C0.069,0.803,0.001,0.655,0,0.502 C0.002,0.332,0.087,0.167,0.206,0.07 C0.314,-0.014,0.414,-0.022,0.541,0.044 c0.194,0.126,0.394,0.341,0.449,0.531 c0.034,0.115,-0.026,0.221,-0.1,0.29 c-0.21,0.153,-0.47,0.184,-0.678,0.05"></path>
        </clipPath>
      </ZeroSVG>
      <ZeroSVG>
        <clipPath id="hover-shape" clipPathUnits="objectBoundingBox">
          <path d="M0.215,0.913 C0.071,0.801,0.012,0.706,0,0.5 C-0.006,0.33,0.059,0.168,0.208,0.068 C0.324,-0.006,0.419,-0.027,0.546,0.042 c0.22,0.15,0.436,0.306,0.453,0.531 c0.007,0.147,-0.019,0.229,-0.101,0.29 c-0.214,0.16,-0.474,0.184,-0.683,0.05"></path>
        </clipPath>
      </ZeroSVG>
      <Button height={height} width={width} onClick={onClick}>
        {image && <Icon height={height / 2} width={width / 2} src={image} />}
        <Label>{text}</Label>
      </Button>
    </>
  );
};
