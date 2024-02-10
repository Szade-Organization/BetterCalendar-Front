import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Buttons/Button';
import Checkbox from '../Inputs/Checkbox';
import Input from '../Inputs/Input';
import Select from '../Inputs/Select';
import TextArea from '../Inputs/TextArea';
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from 'react-icons/fa';

const ActivityForm = ({ onClose, title, values, handleAddEvent, handleEditEvent, isEditing }) => {
    const initialValues = {
        name: values?.name || '',
        category: values?.category || '',
        date_start: values?.date_start || '',
        date_end: values?.date_end || '',
        description: values?.description || '',
        importance_level: values?.importance_level || '',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            category: Yup.number(),
            date_start: Yup.date().required('Required'),
            date_end: Yup.date().required('Required'),
            description: Yup.string(),
            importance_level: Yup.string(),
        }),
        onSubmit: (formValues) => {
            const eventToSave = {
                name: formValues.name,
                description: formValues.description,
                date_start: formValues.date_start.toISOString(),
                date_end: formValues.date_end.toISOString(),
                importance_level: formValues.importance_level,
                category: formValues.category,
            };

            if (isEditing && values?.id) {
                handleEditEvent(values.id, eventToSave);
            } else {
                handleAddEvent(eventToSave);
            }
            onClose();
        },
    });


    return (
        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
            <form onSubmit={formik.handleSubmit} method="post">

                <div className="flex items-center flex-row space-x-4 mb-4">
                    <label htmlFor="name">Name:</label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="text-red-500 text-s">{formik.errors.name}</div>
                    )}
                </div>


                <div className="flex items-center flex-row space-x-4 mb-4">
                    <label htmlFor="category">Category:</label>
                    <Select
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >

                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </Select>
                    {formik.touched.category && formik.errors.category && (
                        <div className="text-red-500 text-s">{formik.errors.category}</div>
                    )}
                </div>


                <div className="flex items-center flex-row space-x-4 mb-4">
                    <label htmlFor="date_start">Start Time:</label>
                    <FaRegCalendarAlt className="text-lg text-gray-400" />
                    <DatePicker
                        id="date_start"
                        placeholderText="Start Date"
                        selected={formik.values.date_start ? new Date(formik.values.date_start) : null}
                        onChange={(date) => formik.setFieldValue("date_start", date)}
                        className="pl-8 pr-2 py-2"
                    />
                </div>


                <div className="flex items-center flex-row space-x-4 mb-4">
                    <label htmlFor="date_end">End Time:</label>
                    <FaRegCalendarAlt className="text-lg text-gray-400" />
                    <DatePicker
                        id="date_end"
                        placeholderText="End Date"
                        selected={formik.values.date_end ? new Date(formik.values.date_end) : null}
                        onChange={(date) => formik.setFieldValue("date_end", date)}
                        className="pl-8 pr-2 py-2"
                    />
                </div>


                <div className="flex items-center flex-row space-x-4 mb-4">
                    <label htmlFor="importance_level">Importance Level:</label>
                    <Input
                        id="importance_level"
                        type="text"
                        name="importance_level"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.importance_level}
                    />
                    {formik.touched.importance_level && formik.errors.importance_level && (
                        <div className="text-red-500 text-s">{formik.errors.importance_level}</div>
                    )}
                </div>


                <div className="flex items-start flex-col space-y-2 mb-4">
                    <label htmlFor="description">Description:</label>
                    <TextArea
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                        className='w-full sm:w-1/2'
                    />
                </div>


                <div className="flex justify-end space-x-3">
                    <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700">Cancel</Button>
                    <Button type="submit" className="bg-green-500 hover:bg-green-700">Save</Button>
                </div>
            </form>
        </div>
    );
};

export default ActivityForm;