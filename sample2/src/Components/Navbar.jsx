import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");

       
        navigate("/login");
        window.location.reload(); 
    };

    return (
        <>
            
            <div style={styles.navbar}>
                <span style={styles.hamburger} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</span>
                <h2 style={styles.title}>Employee Manager</h2>

                
                <button onClick={handleLogout} style={{
    background: "#ff4d4d", 
    color: "#ffffff",
    border: "none",
    padding: "5px 10px",
    fontSize: "12px",
    cursor: "pointer",
    borderRadius: "4px",
    position: "absolute",
    right: "20px",
    top: "5px",
    width: "80px",  // ✅ Reduce width
    height: "30px"  // ✅ Reduce height
}}>
   
                    Logout
                </button>
            </div>

            
            <Sidebar isOpen={isSidebarOpen} />
        </>
    );
};

// Styles
const styles = {
    navbar: {
        position: "fixed",  // ✅ Fix: Stick to the top
        top: 0,             // ✅ Fix: Ensure it starts at the top
        left: 0,
        width: "100%",      // ✅ Full width
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "60px",
        background: "#161b22",
        color: "#fff",
        padding: "5px 20px",
        zIndex: 1000,       // ✅ Ensure it stays above other elements
    },
    
    hamburger: {
        fontSize: "24px",
        cursor: "pointer",
        marginTop:"30px",
        marginLeft:"-10px",
    },
    title: {
        fontSize: "22px",
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    logoutButton: {
        background: "#",
        color: "#ffffff",
        border: "none",
        padding: "3px 8px",  
        fontSize: "10px",     
        cursor: "pointer",
        borderRadius: "4px",
        position: "absolute",
        right: "10px",        
        top: "5px",           
        width: "60px",        
        height: "25px"        
    }
    
    
};

export default Navbar;
