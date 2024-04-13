import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { techs } from "./PostTechs";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface TechsAutocompleteProps {
    value: string[],
    handleChange: (newValue: string[]) => void 
}

export function TechsAutocomplete({ value, handleChange }: TechsAutocompleteProps) {
    return (
        <Autocomplete
            multiple
            value={value}
            onChange={(event, newValue) => {
                handleChange(newValue)
            }}
            options={techs}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
                <TextField
                {...params}
                label="Стек"
                />
            )}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
            disableCloseOnSelect
            sx={{width: 400}}
        />
    );
}