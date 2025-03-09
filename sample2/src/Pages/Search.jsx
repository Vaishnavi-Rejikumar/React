import React, { useState } from "react";

const Search = () => {
    const [searchId, setSearchId] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchDept, setSearchDept] = useState("");
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState("");

    const handleSearchById = async () => {
        if (!searchId) {
            setError("Please enter an Employee ID.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7051/api/Employees/${searchId}`);
            if (!response.ok) throw new Error("Employee not found!");

            const data = await response.json();
            setEmployees([data]);
            setError("");
        } catch (error) {
            setEmployees([]);
            setError("Employee not found or API error.");
        }
    };

    const handleSearchByName = async () => {
        if (!searchName) {
            setError("Please enter an Employee Name.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7051/api/Employees/firstname?firstname=${encodeURIComponent(searchName)}`);
            if (!response.ok) throw new Error("Employee not found!");

            const data = await response.json();
            setEmployees([data]);
            setError("");
        } catch (error) {
            setEmployees([]);
            setError("Employee not found or API error.");
        }
    };

    const handleSearchByDepartment = async () => {
        if (!searchDept) {
            setError("Please enter a Department ID.");
            return;
        }

        try {
            const response = await fetch(`https://localhost:7051/api/Employees/department?departmentId=${searchDept}`);
            if (!response.ok) throw new Error("No employees found in this department.");

            const data = await response.json();
            setEmployees(data);
            setError("");
        } catch (error) {
            setEmployees([]);
            setError("No employees found or API error.");
        }
    };

    return (
        <div style={styles.container}>
            {/* 🔹 Search Section */}
            <h2 style={styles.heading}>Search Employees</h2>
            <div style={styles.searchRow}>
                {/* 🔹 Search by ID */}
                <div style={styles.searchBox}>
                    <h3 style={styles.subHeading}>Search by ID</h3>
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Employee ID"
                        style={styles.input}
                    />
                    <button onClick={handleSearchById} style={styles.button}>Search</button>
                </div>

                {/* 🔹 Search by Name */}
                <div style={styles.searchBox}>
                    <h3 style={styles.subHeading}>Search by Name</h3>
                    <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Enter Employee Name"
                        style={styles.input}
                    />
                    <button onClick={handleSearchByName} style={styles.button}>Search</button>
                </div>

                {/* 🔹 Search by Department */}
                <div style={styles.searchBox}>
                    <h3 style={styles.subHeading}>Search by Department</h3>
                    <input
                        type="text"
                        value={searchDept}
                        onChange={(e) => setSearchDept(e.target.value)}
                        placeholder="Enter Department ID"
                        style={styles.input}
                    />
                    <button onClick={handleSearchByDepartment} style={styles.button}>Search</button>
                </div>
            </div>

            {/* 🔹 Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* 🔹 Display Employee(s) Details */}
            {employees.length > 0 && (
                <div style={styles.resultBox}>
                    <h3>Employee Details</h3>
                    {employees.map((emp) => (
                        <div key={emp.employeeID} style={styles.employeeCard}>
                            <p><strong>ID:</strong> {emp.employeeID}</p>
                            <p><strong>Name:</strong> {emp.firstName} {emp.lastName}</p>
                            <p><strong>Email:</strong> {emp.email}</p>
                            <p><strong>Phone:</strong> {emp.phoneNumber}</p>
                            <p><strong>Job Title:</strong> {emp.jobTitle}</p>
                            <p><strong>Department ID:</strong> {emp.departmentID}</p>
                            <p><strong>Salary:</strong> {emp.salary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// 🔹 Updated CSS Styling
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
    },
    heading: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#fff",
    },
    searchRow: {
        display: "flex",
        justifyContent: "center",
        gap: "20px", // Space between inputs
        marginBottom: "20px",
    },
    searchBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#161b22",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
    },
    subHeading: {
        fontSize: "18px",
        marginBottom: "10px",
        color: "#fff",
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        outline: "none",
        marginBottom: "10px",
    },
    button: {
        padding: "10px 15px",
        background: "#2ea043",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    resultBox: {
        marginTop: "20px",
        background: "#0d1117",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
    },
    employeeCard: {
        marginBottom: "10px",
        padding: "10px",
        borderBottom: "1px solid #fff",
    }
};

export default Search;
