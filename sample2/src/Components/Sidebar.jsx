import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
    const [isManageOpen, setIsManageOpen] = useState(false);
    const userRole = localStorage.getItem("userRole"); 

    if (!isOpen) return null; 

    return (
        <div style={styles.sidebar}>
            <Link to="/" style={styles.menuItem}>🏠 Home</Link>
            <Link to="/search" style={styles.menuItem}>🔍 Search</Link>
            
           
            {userRole === "Administrator" && (
                <>
                    <div style={styles.menuItem} onClick={() => setIsManageOpen(!isManageOpen)}>
                        📂 Manage Employees {isManageOpen ? "▲" : "▼"}
                    </div>

                    {isManageOpen && (
                        <div style={styles.submenu}>
                            <Link to="/manage-employee/add" style={styles.submenuItem}>➕ Add Employee</Link>
                            <Link to="/manage-employee/edit" style={styles.submenuItem}>✏️ Edit Employee</Link>
                            <Link to="/manage-employee/delete" style={styles.submenuItem}>🗑️ Delete Employee</Link>
                        </div>
                    )}
                </>
            )}

            <Link to="/contact" style={styles.menuItem}>📞 Contact</Link>
        </div>
    );
};

// Styles
const styles = {
    sidebar: {
        position: "absolute",
        left: 0,
        top: 25,
        width: "250px",
        background: "#161b22",
        padding: "20px",
        height: "100%",
        color: "#fff",
    },
    menuItem: {
        padding: "10px",
        cursor: "pointer",
        fontSize: "18px",
        borderBottom: "1px solid #333",
        textDecoration: "none",
        color: "white",
        display: "block",
    },
    submenu: {
        marginLeft: "20px",
        paddingTop: "10px",
    },
    submenuItem: {
        padding: "8px",
        cursor: "pointer",
        fontSize: "16px",
        textDecoration: "none",
        color: "white",
        display: "block",
    },
};

export default Sidebar;
