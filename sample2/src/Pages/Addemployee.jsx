import React, { useState, useEffect } from "react";
import "./Addemployee.css";
 // Import CSS for styling

const AddEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        departmentID: "",
        hireDate: "",
        jobTitle: "",
        salary: ""
    });

    useEffect(() => {
        fetchEmployees();
    }, []);

    // ✅ Fetch employees from API
    const fetchEmployees = async () => {
        try {
            const response = await fetch("https://localhost:7051/api/Employees");
            if (!response.ok) throw new Error("Failed to fetch employees");
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // ✅ Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: name === "departmentID" || name === "salary" ? parseInt(value) || "" : value
        }));
    };

    // ✅ Add new employee
    const handleAddEmployee = async () => {
        if (!newEmployee.firstName || !newEmployee.email || !newEmployee.departmentID || !newEmployee.hireDate || !newEmployee.jobTitle || !newEmployee.salary) {
            alert("All fields are required!");
            return;
        }

        const employeeData = {
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            phoneNumber: newEmployee.phoneNumber,
            departmentID: parseInt(newEmployee.departmentID),
            hireDate: newEmployee.hireDate, // Ensure date is in correct format
            jobTitle: newEmployee.jobTitle,
            salary: parseFloat(newEmployee.salary)
        };

        try {
            const response = await fetch("https://localhost:7051/api/Employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeData),
            });

            // Log the response for better debugging
            const responseText = await response.text(); // Get raw response text
            console.log("API Response:", responseText);  // Log the raw response

            if (!response.ok) {
                throw new Error(`Failed to add employee. Status: ${response.status}, Message: ${responseText}`);
            }

            alert("Employee added successfully!");
            fetchEmployees(); // Refresh the employee list
            setNewEmployee({ firstName: "", lastName: "", email: "", phoneNumber: "", departmentID: "", hireDate: "", jobTitle: "", salary: "" });
        } catch (error) {
            console.error("Error adding employee:", error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <h2>Add Employees</h2>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display existing employees */}
                    {employees.map(employee => (
                        <tr key={employee.employeeID}>
                            <td>{employee.employeeID}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.departmentID}</td>
                            <td>{employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : "N/A"}</td>
                            <td>{employee.jobTitle || "N/A"}</td>
                            <td>{employee.salary ? `$${employee.salary}` : "N/A"}</td>
                            <td></td>
                        </tr>
                    ))}

                    {/* New Employee Row */}
                    <tr>
                        <td>--</td>
                        <td><input type="text" name="firstName" value={newEmployee.firstName} onChange={handleInputChange} /></td>
                        <td><input type="text" name="lastName" value={newEmployee.lastName} onChange={handleInputChange} /></td>
                        <td><input type="email" name="email" value={newEmployee.email} onChange={handleInputChange} /></td>
                        <td><input type="text" name="phoneNumber" value={newEmployee.phoneNumber} onChange={handleInputChange} /></td>
                        <td><input type="number" name="departmentID" value={newEmployee.departmentID} onChange={handleInputChange} /></td>
                        <td><input type="date" name="hireDate" value={newEmployee.hireDate} onChange={handleInputChange} /></td>
                        <td><input type="text" name="jobTitle" value={newEmployee.jobTitle} onChange={handleInputChange} /></td>
                        <td><input type="number" name="salary" value={newEmployee.salary} onChange={handleInputChange} /></td>
                        <td><button onClick={handleAddEmployee}>Add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AddEmployee;
