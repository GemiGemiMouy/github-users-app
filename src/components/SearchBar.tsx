import React from "react";
import { TextField, Box } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder }) => {
  return (
    <Box sx={{ my: 2 }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        variant="outlined"
      />
    </Box>
  );
};

export default SearchBar;
