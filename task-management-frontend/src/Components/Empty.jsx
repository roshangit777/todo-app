import React from "react";

const Empty = ({ addFilter }) => {
  let filterItem = addFilter;
  switch (filterItem) {
    case "high":
      filterItem = "High Priority task";
      break;
    case "medium":
      filterItem = "Medium Priority task";
      break;
    case "low":
      filterItem = "Low Priority task";
      break;
    case "completed":
      filterItem = "Completed task";
      break;
    case "pending":
      filterItem = "Pending task";
      break;
    default:
      filterItem = "task";
      break;
  }

  return (
    <center>
      <h2 className="text-success fs-4 mt-5">No {filterItem} are here!</h2>
    </center>
  );
};

export default Empty;
