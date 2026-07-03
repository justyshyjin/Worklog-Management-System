import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";


const FilterField = ({
    field,
    filters,
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

    // DATE FIELD
    if (field.type === "date") {

        // const today = new Date()
        //     .toISOString()
        //     .split("T")[0];

        const today = new Date().toLocaleDateString("en-CA");

        const minDate = field.dependsOn
            ? filters?.[field.dependsOn]
            : undefined;

        return (
            <TextField

                size="small"

                type="date"

                label={field.label}

                value={value ?? ""}

                inputProps={{
                    min: minDate,
                    max: today
                }}

                InputLabelProps={{
                    shrink: true
                }}

                onChange={(e) =>
                    onChange(
                        field.key,
                        e.target.value
                    )
                }

            />
        );
    }

    // HOURS RANGE FIELD
    if (field.type === "hours") {

        return (
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center"
                }}
            >

                <TextField

                    size="small"

                    type="number"

                    label="Min Hours"

                    value={
                        value?.min ?? ""
                    }

                    onChange={(e) =>
                        onChange(
                            field.key,
                            {
                                ...value,
                                min: e.target.value
                            }
                        )
                    }

                />


                <TextField

                    size="small"

                    type="number"

                    label="Max Hours"

                    value={
                        value?.max ?? ""
                    }

                    onChange={(e) =>
                        onChange(
                            field.key,
                            {
                                ...value,
                                max: e.target.value
                            }
                        )
                    }

                />

            </div>
        );
    }


    // HOURS RANGE SLIDER
    if (field.type === "range") {

        const rangeValue =
            Array.isArray(value)
                ? value
                : [0, 100];


        return (

            <div
                style={{
                    width: "250px",
                    padding: "0 10px"
                }}
            >

                <Typography
                    variant="caption"
                    color={field.disabled ? "#bdbdbd73" : "#dee7da"}
                >
                    {field.label}: {" "}
                    {rangeValue[0]}h{" - "}{rangeValue[1]}h
                    {field.disabled && (
                        <> (Available only when all displayed tasks are finished)</>
                    )}
                </Typography>

                <Slider
                    value={rangeValue}
                    min={0}
                    max={100}
                    step={0.1}
                    valueLabelDisplay="auto"
                    disabled={field.disabled ?? false}
                    onChange={
                        (event, newValue) => {
                            onChange(
                                field.key,
                                newValue
                            );
                        }
                    }

                />

            </div>

        );
    }

    return null;

};


export default FilterField;