import React from "react";
import { RESULT_COLUMNS } from "../constants/tableColumns";
import DataListing from "../containers/Listing";

const Results = () => {
  return (
    <DataListing type={'results'} inputColumns={RESULT_COLUMNS} />
  );
};

export default Results;
