import React, { useState, useEffect } from "react";
import "./Deleteemployee.css"; // Import CSS for styling

const DeleteEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

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

    // ✅ Handle checkbox selection
    const handleCheckboxChange = (employeeID) => {
        setSelectedEmployees((prevSelected) =>
            prevSelected.includes(employeeID)
                ? prevSelected.filter((id) => id !== employeeID)
                : [...prevSelected, employeeID]
        );
    };

    // ✅ Delete selected employees
    const handleDeleteSelected = async () => {
        if (selectedEmployees.length === 0) {
            alert("No employees selected for deletion!");
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedEmployees.length} employees?`);
        if (!confirmDelete) return;

        try {
            for (const employeeID of selectedEmployees) {
                await fetch(`https://localhost:7051/api/Employees/${employeeID}`, { method: "DELETE" });
            }
            alert("Employees deleted successfully!");
            setSelectedEmployees([]); // ✅ Clear selection
            fetchEmployees(); // ✅ Refresh table
        } catch (error) {
            console.error("Error deleting employees:", error);
        }
    };

    return (
        <div className="container">
            <h2>Delete Employees</h2>

            <table className="employee-table">
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Job Title</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeID}>
                            <td>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={selectedEmployees.includes(employee.employeeID)}
                                    onChange={() => handleCheckboxChange(employee.employeeID)}
                                />
                            </td>
                            <td>{employee.employeeID}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phoneNumber}</td>
                            <td>{employee.departmentID}</td>
                            <td>{employee.hireDate}</td>
                            <td>{employee.jobTitle}</td>
                            <td>${employee.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="delete-btn" onClick={handleDeleteSelected}>
                Delete 
            </button>
        </div>
    );
};

export default DeleteEmployee;
