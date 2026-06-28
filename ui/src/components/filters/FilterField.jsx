import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const FilterField = ({
    field,
    value,
    options,
    onChange
}) => {

    const normalizedValue = field.multiple
        ? (Array.isArray(value) ? value : [])
        : (value ?? "");

    // TEXT FIELD
    if (field.type === "text") {

        return (
            <TextField

                size="small"

                label={field.label}

                value={value ?? ""}

                onChange={(e) =>
                    onChange(
                        field.key,
                        e.target.value
                    )
                }

            />
        );
    }


    // SELECT FIELD
    if (field.type === "select") {


        const values =
            options?.[field.optionsKey] || [];


        return (
            <Select
                size="small"
                multiple={field.multiple}
                value={normalizedValue ?? ""}
                displayEmpty
                renderValue={(selected) => {

                    if (field.multiple && selected.length === 0) {
                        return `All ${field.label}`;
                    }

                    if (field.multiple) {
                        return selected
                            .map(id => {
                                const item = values.find(
                                    option => option.id === id
                                );

                                return item?.name;
                            })
                            .join(", ");
                    }

                    return selected;
                }}

                onChange={(e) => {

                    let newValue = e.target.value;

                    if (
                        newValue.includes("__all__")
                    ) {
                        newValue = [];
                    }

                    onChange(
                        field.key,
                        newValue
                    );

                }}
            >
                {
                    field.multiple && (
                        <MenuItem value="__all__" >
                            All {field.label}
                        </MenuItem>
                    )
                }
                {
                    values.map((option) => (
                        <MenuItem key={option.id} value={option.id} >
                            {option.name}
                        </MenuItem>
                    ))
                }
            </Select>
        );
    }


    return null;

};


export default FilterField;