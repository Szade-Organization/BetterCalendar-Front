import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../Buttons/Button";
import Input from "../Inputs/Input";
import Select from "../Inputs/Select";
import TextArea from "../Inputs/TextArea";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useUserContext } from "../../../context/AuthContext";
import { useRef, useState } from "react";
import CustomDatePicker from "../Inputs/CustomDatePicker";
import Modal from "../Modals/Modal";
import CategoryForm from "./CategoryForm";

const ActivityForm = ({
  onClose,
  title,
  values,
  handleAddEvent,
  handleEditEvent,
  isEditing,
  handleDeleteEvent,
  categories,
}) => {
  const { user } = useUserContext();
  const startDatePickerRef = useRef(null);
  const endDatePickerRef = useRef(null);
  const [showManageCategories, setShowManageCategories] = useState(false);

  const openStartDatePicker = () => {
    if (startDatePickerRef.current && startDatePickerRef.current.setOpen) {
      startDatePickerRef.current.setOpen(true);
    }
  };

  const openEndDatePicker = () => {
    if (endDatePickerRef.current && endDatePickerRef.current.setOpen) {
      endDatePickerRef.current.setOpen(true);
    }
  };

  const getInitialValues = () => {
    const initialValues = {
      name: "",
      category: "",
      date_start: "",
      date_end: "",
      start_time: "",
      end_time: "",
      description: "",
      importance_level: "M",
    };

    if (values) {
      const startDate = new Date(values.date_start);
      const endDate = new Date(values.date_end);
      initialValues.date_start = startDate;
      initialValues.date_end = endDate;
      initialValues.start_time = `${startDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${startDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
      initialValues.end_time = `${endDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${endDate.getMinutes().toString().padStart(2, "0")}`;
      initialValues.name = values.name;
      initialValues.category = values.category?.id;
      initialValues.description = values.description;
      initialValues.importance_level = values.importance_level;
    }

    return initialValues;
  };

  return (
    <>
      {showManageCategories && (
        <Modal
          content={
            <CategoryForm
              onClose={() => setShowManageCategories(false)}                      
            />
          }
          className="w-[90%] lg:w-3/4"
        />
      )}
      <Formik
        initialValues={getInitialValues()}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          category: Yup.number(),
          date_start: Yup.date().required("Required"),
          date_end: Yup.date().required("Required"),
          start_time: Yup.string().required("Required"),
          end_time: Yup.string().required("Required"),
          description: Yup.string(),
          importance_level: Yup.string()
            .oneOf(["M", "S", "C", "W", "N", "n"])
            .required("Required"),
        })}
        onSubmit={(formValues) => {
          const startDate = new Date(formValues.date_start);
          const startTime = formValues.start_time.split(":");
          startDate.setHours(parseInt(startTime[0]), parseInt(startTime[1]));

          const endDate = new Date(formValues.date_end);
          const endTime = formValues.end_time.split(":");
          endDate.setHours(parseInt(endTime[0]), parseInt(endTime[1]));

          const eventToSave = {
            name: formValues.name,
            description: formValues.description,
            date_start: startDate.toISOString(),
            date_end: endDate.toISOString(),
            importance_level: formValues.importance_level,
            category: formValues.category,
            user: user.id,
          };

          if (isEditing && values?.id) {
            handleEditEvent(values.id, eventToSave);
          } else {
            handleAddEvent(eventToSave);
          }
          onClose();
        }}
      >
        {(formik) => (
          <Form>
            <div className="p-4 space-y-4">
              <div>
                <h1 className="text-3xl font-semibold">{title}</h1>
              </div>
              <div className="flex items-center flex-row gap-x-4">
                <label htmlFor="name">Name:</label>
                <Input id="name" name="name" />
              </div>
              <div className="flex items-center flex-row gap-x-4">
                <label htmlFor="category">Category:</label>
                <Select name="category">
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Select>
                <Button
                  type="button"
                  className="bg-teal-500 hover:bg-teal-700 ml-2"
                  onClick={() => setShowManageCategories(true)}
                >
                  Manage Categories
                </Button>
              </div>
              <div className="flex items-center flex-row gap-x-4">
                <label htmlFor="date_start">Start Time:</label>
                <FaRegCalendarAlt
                  className="text-lg text-gray-400 cursor-pointer"
                  onClick={openStartDatePicker}
                />
                <CustomDatePicker
                  ref={startDatePickerRef}
                  name="date_start"
                  selected={
                    formik.values.date_start
                      ? new Date(formik.values.date_start)
                      : null
                  }
                  onChange={(date) => formik.setFieldValue("date_start", date)}
                  onClickOutside={() =>
                    startDatePickerRef.current.setOpen(false)
                  }
                  dateFormat="d MMMM, yyyy"
                />
                <Input type="time" name="start_time" />
              </div>
              <div className="flex items-center flex-row gap-x-4">
                <label htmlFor="date_end">End Time:</label>
                <FaRegCalendarAlt
                  className="text-lg text-gray-400 cursor-pointer"
                  onClick={openEndDatePicker}
                />
                <CustomDatePicker
                  ref={endDatePickerRef}
                  name="date_end"
                  selected={
                    formik.values.date_end
                      ? new Date(formik.values.date_end)
                      : null
                  }
                  onChange={(date) => formik.setFieldValue("date_end", date)}
                  onClickOutside={() => endDatePickerRef.current.setOpen(false)}
                  dateFormat="d MMMM, yyyy"
                />
                <Input type="time" name="end_time" />
              </div>
              <div className="flex items-center flex-row gap-x-4">
                <label htmlFor="importance_level">Importance Level:</label>
                <Select name="importance_level">
                  <option value="M">M</option>
                  <option value="S">S</option>
                  <option value="C">C</option>
                  <option value="W">W</option>
                  <option value="N">N</option>
                  <option value="n">n</option>
                </Select>
              </div>
              <div className="flex items-start flex-col space-y-2">
                <label htmlFor="description">Description:</label>
                <TextArea className="w-full" name="description" />
              </div>
              <div className="flex justify-between ">
                <div>
                  {isEditing && (
                    <Button
                      onClick={handleDeleteEvent}
                      type="button"
                      className="bg-red-500 hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    onClick={onClose}
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ActivityForm;
