import * as React from "react";
import { Label } from "@fluentui/react";

export interface IButtonProps {
  name?: string;
}

export class Button extends React.Component<IButtonProps> {
  public render(): React.ReactNode {
    return <Label>{this.props.name}</Label>;
  }
}
