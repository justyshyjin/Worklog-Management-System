import {
  useEffect,
  useState
} from "react";

import {
  Button
} from "@mui/material";

import filterService from "../../api/filterService";

const SavedFilters = ({
  onSelect
}) => {

  const [filters,setFilters] =
    useState([]);

  useEffect(() => {

    loadFilters();

  },[]);

  const loadFilters =
  async () => {

    const response =
      await filterService
      .getSavedFilters();

    setFilters(
      response.data.items
    );
  };

  return (
    <div
      className="saved-filters"
    >

      <h3>
        Saved Filters
      </h3>

      {
        filters.map(
          (filter)=>(
            <Button
              key={filter.id}
              variant="outlined"
              onClick={() =>
                onSelect(
                  filter
                )
              }
            >
              {filter.name}
            </Button>
          )
        )
      }

    </div>
  );
};

export default SavedFilters;