import { mapTypes } from "./map-type.js";

export const mapRegionalForm = ({ types, ...regionalForm }) => {
  return {
    ...regionalForm,
    types: mapTypes(types),
  };
};
