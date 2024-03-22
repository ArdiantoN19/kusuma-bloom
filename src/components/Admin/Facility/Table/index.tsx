import React, { FunctionComponent } from "react";
import FacilityTableWrapper from "./FacilityTableWrapper";
import { getFacilitiesAction } from "@/lib/actions/facilityAction";
import { columns } from "./Columns";

const FacilityTable: FunctionComponent = async () => {
  const response = await getFacilitiesAction();
  return <FacilityTableWrapper data={response.data} columns={columns} />;
};

export default FacilityTable;
