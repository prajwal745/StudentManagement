import React from "react";
import { STUDENT_COLUMNS } from "../constants/tableColumns";
import DataListing from "../containers/Listing";

const Students = () => {
  return <DataListing type={"student"} inputColumns={STUDENT_COLUMNS} />;
};

export default Students;
