import DatePicker from "react-datepicker";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = React.forwardRef((props, ref) => {
  const classNames = `border border-gray-300 focus:border-blue-500 focus:ring-blue-200 focus:ring-2 focus:outline-none rounded-md shadow-sm p-2 ${
    props.className || ""
  }`;

  return <DatePicker ref={ref} {...props} className={classNames} />;
});

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
