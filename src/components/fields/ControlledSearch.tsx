import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./Fields.scss";

interface IControlledSearchProps {
  placeholder: string;
  searchWord: string;
  cbHandleChangeSearch: (word: string) => void;
}

const ControlledSearch = ({ placeholder, searchWord, cbHandleChangeSearch }: IControlledSearchProps) => {
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    cbHandleChangeSearch(e.currentTarget.value);
  };

  return (
    <Box className="searchFieldBox">
      <TextField
        placeholder={placeholder}
        value={searchWord}
        onChange={handleChangeSearch}
        className="searchField"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default ControlledSearch;
