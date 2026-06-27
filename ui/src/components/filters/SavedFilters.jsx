import {
  useEffect,
  useState
} from "react";

import {
  Button
} from "@mui/material";

import filterService from "../../api/filterService";

const SavedFilters = ({
  module,
  onSelect
}) => {


  const [filters, setFilters] =
    useState([]);



  const [loading, setLoading] =
    useState(false);




  useEffect(() => {

    loadFilters();

  }, [module]);





  const loadFilters = async () => {


    try {


      setLoading(true);


    const response =
        await filterService.getSavedFilters(
          module
        );



    setFilters(
        response.data.items || []
      );


    }
    catch(error) {


      console.error(
        "Failed to load saved filters",
        error
      );


      setFilters([]);


    }
    finally {


      setLoading(false);


    }


  };





  return (
    <div
      className="saved-filters"
    >


      {
        loading && (

          <span>
            Loading filters...
          </span>

        )
      }



      {
        !loading &&
        filters.length > 0 && (

          <>

      {
        filters.map(
                (filter) => (

            <Button

                    key={
                      filter.id
                    }


              variant="outlined"
              onClick={() =>
                onSelect(
                  filter
                )
              }


                  >

                    {
                      filter.name
                    }


            </Button>

                )

          )
            }

          </>

        )
      }

    </div>
  );
};

export default SavedFilters;