import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Editemployee.css"; // Import CSS for styling

const EditEmployee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    // ✅ Fetch all employees
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

    // ✅ Enable editing mode for a specific employee
    const handleEditClick = (employee) => {
        setEditingEmployee({ ...employee });
    };

    // ✅ Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingEmployee((prev) => ({
            ...prev,
            [name]: name === "departmentID" || name === "salary" ? parseInt(value) || "" : value
        }));
    };

    // ✅ Update employee
    const handleUpdateEmployee = async () => {
        if (!editingEmployee.firstName || !editingEmployee.email || !editingEmployee.departmentID || !editingEmployee.hireDate || !editingEmployee.jobTitle || !editingEmployee.salary) {
            alert("All fields are required!");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7051/api/Employees/${editingEmployee.employeeID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editingEmployee),
            });

            if (!response.ok) throw new Error("Failed to update employee");

            alert("Employee updated successfully!");
            setEditingEmployee(null); // ✅ Exit edit mode
            fetchEmployees(); // ✅ Refresh table
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Employees</h2>

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeID}>
                            <td>{employee.employeeID}</td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="text" name="firstName" value={editingEmployee.firstName} onChange={handleInputChange} />
                                ) : (
                                    employee.firstName
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="text" name="lastName" value={editingEmployee.lastName} onChange={handleInputChange} />
                                ) : (
                                    employee.lastName
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="email" name="email" value={editingEmployee.email} onChange={handleInputChange} />
                                ) : (
                                    employee.email
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="text" name="phoneNumber" value={editingEmployee.phoneNumber} onChange={handleInputChange} />
                                ) : (
                                    employee.phoneNumber
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="number" name="departmentID" value={editingEmployee.departmentID} onChange={handleInputChange} />
                                ) : (
                                    employee.departmentID
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="date" name="hireDate" value={editingEmployee.hireDate} onChange={handleInputChange} />
                                ) : (
                                    employee.hireDate
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="text" name="jobTitle" value={editingEmployee.jobTitle} onChange={handleInputChange} />
                                ) : (
                                    employee.jobTitle
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <input type="number" name="salary" value={editingEmployee.salary} onChange={handleInputChange} />
                                ) : (
                                    `$${employee.salary}`
                                )}
                            </td>

                            <td>
                                {editingEmployee?.employeeID === employee.employeeID ? (
                                    <button className="save-btn" onClick={handleUpdateEmployee}>Save</button>
                                ) : (
                                    <button className="edit-btn" onClick={() => handleEditClick(employee)}>Edit</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditEmployee;
