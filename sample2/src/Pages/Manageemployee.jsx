import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        EmployeeID: "",
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        DepartmentID: ""
    });

    // Fetch employees from API
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch("https://localhost:7051/api/Employees");
            const data = await response.json();
            console.log("Employee API Response:", data); // ✅ Debugging
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    
    

    // Handle input changes for new employee
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Add new employee
    const addEmployee = async () => {
        if (!newEmployee.FirstName || !newEmployee.Email) {
            alert("First Name and Email are required!");
            return;
        }

        try {
            await axios.post("https://localhost:7051/api/Employees", newEmployee);
            fetchEmployees();  // Refresh list
            setNewEmployee(prevState => ({
                EmployeeID: prevState.EmployeeID + 1,
                FirstName: "",
                LastName: "",
                Email: "",
                PhoneNumber: "",
                DepartmentID: ""
            }));
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    // Handle edit
    const editEmployee = (id) => {
        console.log("Edit Employee ID:", id);
        // Implement edit functionality here
    };

    // Handle delete
    const deleteEmployees = async () => {
        const selectedIDs = employees.filter(emp => emp.isSelected).map(emp => emp.EmployeeID);
        if (selectedIDs.length === 0) {
            alert("Select at least one employee to delete!");
            return;
        }

        try {
            await axios.post("https://localhost:7051/api/Employees/delete", { ids: selectedIDs });
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employees:", error);
        }
    };

    // Handle checkbox selection
    const toggleSelectEmployee = (id) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.EmployeeID === id ? { ...emp, isSelected: !emp.isSelected } : emp
            )
        );
    };

    return (
        <div>
            <h2>Manage Employees</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
    <tr>
        <th>Select</th>
        <th>Employee ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Department ID</th>
        <th>Hire Date</th>    {/* ✅ New */}
        <th>Job Title</th>     {/* ✅ New */}
        <th>Salary</th>        {/* ✅ New */}
        <th>Actions</th>
    </tr>
</thead>

                <tbody>
    {employees.map(emp => (
        <tr key={emp.EmployeeID}>
            <td>
                <input
                    type="checkbox"
                    checked={!!emp.isSelected}
                    onChange={() => toggleSelectEmployee(emp.EmployeeID)}
                />
            </td>
            <td>{emp.EmployeeID}</td>
            <td>{emp.FirstName}</td>
            <td>{emp.LastName}</td>
            <td>{emp.Email}</td>
            <td>{emp.PhoneNumber}</td>
            <td>{emp.DepartmentID}</td>
            <td>{emp.HireDate && emp.HireDate !== "0001-01-01"
                ? new Date(emp.HireDate).toLocaleDateString()
                : "No Date"}
            </td>  {/* ✅ Fix Hire Date Display */}
            <td>{emp.JobTitle || "Not Assigned"}</td>  {/* ✅ Fix Job Title Display */}
            <td>{emp.Salary ? `$${emp.Salary.toLocaleString()}` : "No Salary"}</td>  {/* ✅ Fix Salary Display */}
            <td>
                <button onClick={() => editEmployee(emp.EmployeeID)}>✏️</button>
            </td>
        </tr>
    ))}
</tbody>

            </table>
            <button onClick={deleteEmployees}>Delete Selected</button>
        </div>
    );
};

export default ManageEmployees;
