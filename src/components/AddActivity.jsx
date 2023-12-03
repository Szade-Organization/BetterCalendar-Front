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
                <button className="close-button">x</button>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="row-container">
                    <label>
                        Name:
                    </label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="row-container">
                    <label>
                        Category:
                    </label>
                    <select name="category" value={formData.category} onChange={handleInputChange}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                </div>

                <div className="row-container">
                    <label>
                        Time:
                    </label>
                    <button className="button-common form-button">Choose time</button>
                </div>

                <div className="row-container">
                    <label>
                        Location:
                    </label>
                    <button className="button-common form-button">Choose location</button>
                </div>

                <div className="row-container">
                    <label>
                        Reoccuring:
                    </label>
                    <input type="checkbox" className="checkbox" checked={formData.reoccuring} onChange={handleCheckboxChange} />
                </div>

                <div className="column-container">
                    <label>
                        Description:
                    </label>                  
                    <textarea className="description" name="description" value={formData.description} onChange={handleInputChange} />
                </div>

                <button className="button-common form-button submit-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddActivity;
