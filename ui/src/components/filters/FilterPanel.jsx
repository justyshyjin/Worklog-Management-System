import Button from "@mui/material/Button";

import FilterField from "./FilterField";

import "../../styles/filter.css";


const FilterPanel = ({
    filters,
    setFilters,
    fields,
    options,
    onReset,
    onFilterChange
}) => {



    const handleChange = (key, value) => {

        if (onFilterChange) {
            onFilterChange(key, value);
            return;
        }

        setFilters((prev) => ({
            ...prev,
            [key]: value
        }));
    };


    return (

        <div className="task-filter-panel">

            <div className="filter-left">
                {Array.isArray(fields) &&
                    fields.map((field, index) => (
                        <FilterField
                            key={`${field.key}-${index}`}
                            field={field}
                            value={filters?.[field.key] || ""}
                            filters={filters}
                            options={options}   // 🔥 MUST BE FULL OBJECT
                            onChange={handleChange}
                        />
                    ))}

                <Button

                    variant="outlined"

                    onClick={
                        onReset
                    }

                >

                    Reset

                </Button>

            </div>

        </div>

    );

};



export default FilterPanel;