

import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {
        title: "Home",
        path: "/home",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        
    },
    {
        title: "Search",
        path: "/search",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        },
            {
                title: "Manage Employees",  
                path: "#",  
                icon: <FaIcons.FaUsersCog />, 
                iconClosed: <RiIcons.RiArrowDownSFill />,
                iconOpened: <RiIcons.RiArrowUpSFill />,
                subNav: [
                    {
                        title: "Add Employee",
                        path: "/manage-employee/add",
                        icon: <IoIcons.IoIosPersonAdd />,
                    },
                    {
                        title: "Edit Employee",
                        path: "/manage-employee/edit",
                        icon: <FaIcons.FaUserEdit />,
                    },
                    {
                        title: "Delete Employee",
                        path: "/manage-employee/delete",
                        icon: <FaIcons.FaUserTimes />,
                    },
                ]
            },
        
    
    {
        title: "Contact",
        path: "/contact",
        icon: <FaIcons.FaPhone />,
    },
];
