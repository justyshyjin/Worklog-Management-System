import Button from "@mui/material/Button";

import FilterField from "./FilterField";


const FilterPanel = ({
    filters,
    setFilters,
    fields,
    options,
    onReset
}) => {



    const handleChange = (
        key,
        value
    ) => {


        setFilters({

            ...filters,

            [key]: value

        });


    };




    return (

        <div className="common-filter-panel">


            {
                Array.isArray(fields) &&
                fields.map((field) => (

                    <FilterField

                        key={
                            field.name
                        }


                        field={
                            field
                        }


                        value={
                            filters?.[field.name] || ""
                        }


                        options={
                            options
                        }


                        onChange={
                            handleChange
                        }

                    />

                )
                )
            }





            <Button

                variant="outlined"

                onClick={
                    onReset
                }

            >

                Reset

            </Button>



        </div>

    );

};



export default FilterPanel;