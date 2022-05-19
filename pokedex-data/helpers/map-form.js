import { mapTypes } from "./map-type.js";

export const mapForm = ({ types, ...form }) => {
  return {
    ...form,
    types: mapTypes(types),
  };
};
