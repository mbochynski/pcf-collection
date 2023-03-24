import * as React from "react";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { ThemeProvider } from "@fluentui/react";
import { useTheme } from "./useTheme";

export interface IFluentDropdownProps {
  placeholder: string;
  label: string;
  options: IFluentDropdownOption[];
  themeJSON?: string;
  onChange: (selectedValue: IDropdownOption | undefined) => void;
}

export interface IFluentDropdownOption {
  key: string;
  text: string;
  itemType: DropdownMenuItemType;
  data: any;
}

export const FluentDropdown: React.FC<IFluentDropdownProps> = ({
  label,
  placeholder,
  options,
  themeJSON,
  onChange,
}) => {
  const changeHandler = (
    event: React.FormEvent<HTMLDivElement>,
    selectedItem: IDropdownOption | undefined
  ): void => {
    onChange(selectedItem);
  };

  const theme = useTheme(themeJSON);

  return (
    <ThemeProvider theme={theme}>
      <Dropdown
        placeholder={placeholder}
        label={label}
        options={options}
        onChange={changeHandler}
      />
    </ThemeProvider>
  );
};
