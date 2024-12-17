import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const Generate = () => {
const [formData, setFormData] = useState({
location: "",
firstName: "",
lastName: "",
email: "",
phone: "",
address: "",
});
const [firstClick, setFirstClick] = useState(true);

const locations = ["Chennai", "Erode", "Madurai", "Coimbatore", "Salem"];

const handleChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleButtonClick = async () => {
if (firstClick) {
await axios.post("http://localhost:5000/save", formData);
setFirstClick(false);
}

const response = await axios.get("http://localhost:5000/download", { responseType: "blob" });
const file = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
const fileURL = URL.createObjectURL(file);
const link = document.createElement("a");
link.href = fileURL;
link.download = "data.xlsx";
link.click();
};

return (
<div className="container mt-4">
<h2>Form</h2>
<form>
<div className="mb-3">
<label>Location</label>
<select name="location" className="form-control" onChange={handleChange}>
<option value="">Select</option>
{locations.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
</select>
</div>
<div className="mb-3">
<label>First Name</label>
<input type="text" name="firstName" className="form-control" onChange={handleChange} />
</div>
<div className="mb-3">
<label>Last Name</label>
<input type="text" name="lastName" className="form-control" onChange={handleChange} />
</div>
<div className="mb-3">
<label>Email</label>
<input type="email" name="email" className="form-control" onChange={handleChange} />
</div>
<div className="mb-3">
<label>Phone</label>
<input type="text" name="phone" className="form-control" onChange={handleChange} />
</div>
<div className="mb-3">
<label>Address</label>
<textarea name="address" className="form-control" onChange={handleChange}></textarea>
</div>
<button type="button" onClick={handleButtonClick} className="btn btn-primary">Submit</button>
</form>
</div>
);
};

export default Generate;