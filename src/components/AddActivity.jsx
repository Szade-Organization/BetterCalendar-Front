import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
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
    // Add your form submission logic here
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, reoccuring: !formData.reoccuring });
  }

  return (
    <div className="container mt-5">
      <div className="add-activity">
        <div className="header d-flex align-items-center">
          <h1 className="m-3 text-sm">New activity</h1>
          <button className="close-button btn btn-danger">X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Category:</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Time:</label>
            <button className="button-common form-button btn btn-secondary">Choose time</button>
          </div>

          <div className="mb-3">
            <label className="form-label">Location:</label>
            <button className="button-common form-button btn btn-secondary">Choose location</button>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="reoccuringCheckbox"
              checked={formData.reoccuring}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="reoccuringCheckbox">Reoccuring</label>
          </div>

          <div className="mb-3">
            <label className="form-label">Description:</label>
            <textarea
              className="form-control description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <button className="button-common form-button submit-button btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddActivity;
