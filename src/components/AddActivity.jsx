import { useState, useEffect } from "react";
import '../styles/AddActivity.css';
import '../styles/Buttons.css';

function AddActivity() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        time: '',
        location: '',
        reoccuring: false,
        description: ''
    });

    useEffect(() => {
        const currentDate = new Date();
        const currentDayOfWeek = currentDate.getDay();
        const currentHour = currentDate.getHours();

        const currentTimeString = `${currentDayOfWeek} ${currentHour}:00`;

        setFormData(prevFormData => ({
            ...prevFormData,
            time: currentTimeString
        }));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();


    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, reoccuring: !formData.reoccuring });
    }

    return (
        <div className="add-activity">
            <div className="header">
                <h1>New activity</h1>
                <button className="close-button">X</button>
            </div>

            <form onSubmit={handleSubmit}>

                <label>
                    Name:
                    <input type="text" name="username" value={formData.username}
                        onChange={handleInputChange} />
                </label>

                <label>
                    Category:
                    <select name="category" value={formData.category}
                        onChange={handleInputChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </label>

                <label>
                    Time:
                    <button className="button-common form-button">Choose time</button>
                </label>

                <label>
                    Location:
                    <button className="button-common form-button">Choose location</button>
                </label>

                <label>
                    Reoccuring:
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={formData.reoccuring}
                        onChange={handleCheckboxChange}
                    />
                </label>

                <label>
                    Description:
                </label>
                <textarea className="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange} />
                <button className="button-common form-button submit-button" type="submit">Submit</button>

            </form>



        </div >
    );
};

export default AddActivity;
