import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../styles/AddActivity.css';
import '../styles/Buttons.css';

function AddActivity() {
    const formik = useFormik({
        initialValues: {
            name: '',
            category: '',
            time: '',
            location: '',
            reoccuring: false,
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            category: Yup.string().required('Required'),
            time: Yup.string().required('Required'),
            location: Yup.string(),
            description: Yup.string()
           
        }),
        onSubmit: () => {
            
        },
    });

    return (
        <div className="add-activity">
            <div className="header">
                <h1>New activity</h1>
                <button className="close-button">x</button>
            </div>

            <form onSubmit={formik.handleSubmit}>

            
                <div className="row-container">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </div>

            
                <div className="row-container">
                    <label>Category:</label>
                    <select
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                    >
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                        <div>{formik.errors.category}</div>
                    ) : null}
                </div>

             
                <div className="row-container">
                    <label>Time:</label>
                    <input
                        type="text"
                        name="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                    />
                    {formik.touched.time && formik.errors.time ? (
                        <div>{formik.errors.time}</div>
                    ) : null}
                </div>

             
                <div className="row-container">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.location}
                    />
                    {formik.touched.location && formik.errors.location ? (
                        <div>{formik.errors.location}</div>
                    ) : null}
                </div>

           
                <div className="row-container">
                    <label>Reoccurring:</label>
                    <input
                        type="checkbox"
                        name="reoccuring"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.reoccuring}
                    />
                </div>

           
                <div className="column-container">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                </div>

                <button className="button-common form-button submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddActivity;
