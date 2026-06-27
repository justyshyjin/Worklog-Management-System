import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


const FilterField = ({
    field,
    value,
    options,
    onChange
}) => {



    if(field.type === "text") {


        return (

            <TextField

                key={
                    field.name
                }


                size="small"


                label={
                    field.label
                }


                value={
                    value
                }


                onChange={(e)=>

                    onChange(
                        field.name,
                        e.target.value
                    )

                }

            />

        );


    }





    if(field.type === "select") {


        const values =
            options?.[
                field.optionsKey
            ] || [];



        return (

            <Select


                key={
                    field.name
                }


                size="small"


                value={
                    value
                }


                displayEmpty



                onChange={(e)=>

                    onChange(
                        field.name,
                        e.target.value
                    )

                }


            >


                <MenuItem value="">

                    All {field.label}

                </MenuItem>




                {
                    values.map(
                        (option)=>(


                            <MenuItem

                                key={
                                    option.id ??
                                    option
                                }


                                value={
                                    option.id ??
                                    option
                                }


                            >

                                {
                                    option.name ??
                                    option
                                }


                            </MenuItem>


                        )
                    )
                }



            </Select>

        );


    }




    return null;


};


export default FilterField;