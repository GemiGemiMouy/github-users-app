import React from "react";
import { TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  sx?: object;
}

const CHAR_OK = /^[A-Za-z\s]$/;
const STR_SANITIZE = /[^A-Za-z\s]/g;

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder, sx }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(STR_SANITIZE, "");
    onChange(cleaned);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length === 1 && !CHAR_OK.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    const cleaned = pasted.replace(STR_SANITIZE, "");
    if (cleaned !== pasted) {
      e.preventDefault();
      const input = e.currentTarget;
      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const next = input.value.slice(0, start) + cleaned + input.value.slice(end);
      onChange(next);
    }
  };

  return (
    <TextField
      fullWidth
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      placeholder={placeholder || "Search..."}
      variant="standard"
      InputProps={{ disableUnderline: true }}
      sx={sx}
    />
  );
};

export default SearchBar;
