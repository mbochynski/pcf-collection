import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ListSubheader } from "@mui/material";

export interface ItemType {
  key: string;
  text: string;
  itemType?: string;
}

export interface IDropdownProps {
  uuid: string;
  label?: string;
  items: ItemType[];
  value: string;
  onChange: (value: string | undefined) => void;
}

export const HelloWorld = ({
  uuid,
  label,
  items,
  value,
  onChange,
}: IDropdownProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  const labelid = `dropdown-label-${uuid}`;

  const menuItems = items.map(({ key, text, itemType }) => {
    if (itemType === "normal" || !itemType) {
      return (
        <MenuItem key={key} value={text}>
          {text}
        </MenuItem>
      );
    }

    if (itemType === "header") {
      return <ListSubheader key={key}>{text}</ListSubheader>;
    }
  });

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={labelid}>{label}</InputLabel>
        <Select
          labelId={labelid}
          value={value}
          label={label}
          onChange={handleChange}
          sx={{
            borderRadius: "16px",
          }}
        >
          {menuItems}
        </Select>
      </FormControl>
    </Box>
  );
};
