import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../Buttons/Button';
import Checkbox from '../Inputs/Checkbox';
import Input from '../Inputs/Input';
import Select from '../Inputs/Select';
import TextArea from '../Inputs/TextArea';
import DatePicker from "react-datepicker";
import { FaRegCalendarAlt } from 'react-icons/fa';

const ActivityForm = ({ onClose, title, values, handleAddEvent }) => {
    const initialValues = {
        name: values?.title || '',
        category: '',
        startTime: values?.start || '',
        endTime: values?.end || '',
        location: '',
        reoccuring: false,
        description: '',
    };
    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            category: Yup.string(),
            startTime: Yup.date().required('Required'),
            endTime: Yup.date().required('Required'),
            location: Yup.string(),
            description: Yup.string()
        }),
        onSubmit: (formValues) => {

            const newEvent = {
                title: formValues.name,
                start: formValues.startTime,
                end: formValues.endTime
            }
            console.log(newEvent);
            handleAddEvent(newEvent);
            onClose();
        },
    });



    return (

        <div className="p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold">{title}</h1>
            </div>
            <form onSubmit={formik.handleSubmit} method="post">
                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>Name:</label>
                    <Input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-red-500 text-s">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>Category:</label>
                    <Select
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </Select>
                    {formik.touched.category && formik.errors.category ? (
                        <div className="text-red-500 text-s">{formik.errors.category}</div>
                    ) : null}
                </div>

                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>Start Time:</label>
                    <FaRegCalendarAlt className="text-lg text-gray-400" />
                    <DatePicker
                        placeholderText="Start Date"
                        selected={(formik.values.startTime && new Date(formik.values.startTime)) || null}
                        onChange={(date) => {
                            formik.setFieldValue("startTime", date);
                        }}
                        className="pl-8 pr-2 py-2"
                    />

                </div>

                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>End Time:</label>
                    <FaRegCalendarAlt className="text-lg text-gray-400" />
                    <DatePicker
                        placeholderText="End Date"
                        selected={(formik.values.endTime && new Date(formik.values.endTime)) || null}
                        onChange={(date) => {
                            formik.setFieldValue("endTime", date);
                        }}
                        className="pl-8 pr-2 py-2"
                    />
                </div>

                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>Location:</label>
                    <Button onClick={onClose} className="bg-blue-500 hover:bg-gray-700" >Choose</Button>
                    {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location}</div>
                    ) : null}
                </div>


                <div className="flex items-center flex-row space-x-4 mb-4 ">
                    <label>Reoccurring:</label>
                    <Checkbox
                        name="reoccuring"
                        checked={formik.values.reoccuring}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>


                <div className="flex items-start flex-col space-y-2 mb-4 ">
                    <label>Description:</label>
                    <TextArea
                        className='w-full sm:w-1/2'
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                </div>

                <div className="flex justify-end space-x-3">
                    <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700" >Cancel</Button>
                    <Button type="submit" className="bg-green-500 hover:bg-green-700" >Save</Button>
                </div>
            </form>


        </div>

    );
}

export default ActivityForm;
