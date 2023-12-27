// source where to look for examples on using this component
// https://react-select.com/creatable
// https://react-select.com/home#creatable

import React from "react";
import AsyncSelect from "react-select/async";

const fetchData = async (inputValue) => {
  try {
    // Replace "#" with your actual API endpoint
    const response = await fetch(`#?search=${inputValue}`);
    const data = await response.json();

    // Assuming your data has a structure similar to colourOptions
    return data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const CustomAsyncSelect = () => (
  <AsyncSelect cacheOptions defaultOptions loadOptions={fetchData} />
);

export default CustomAsyncSelect;
