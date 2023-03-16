import * as React from "react";
import { BaseButton, Label } from "@fluentui/react";

export interface IHelloWorldProps {
  name?: string;
  onClick: () => void;
}

export class HelloWorld extends React.Component<IHelloWorldProps> {
  public render(): React.ReactNode {
    return (
      <BaseButton onClick={this.props.onClick}>{this.props.name}</BaseButton>
    );
  }
}
