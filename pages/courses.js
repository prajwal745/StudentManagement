import React from "react";
import { COURSE_COLUMNS } from "../constants/tableColumns";
import DataListing from "../containers/Listing";

const Courses = () => {
  return (
    <DataListing type={'course'} inputColumns={COURSE_COLUMNS} />
  );
};

export default Courses;
