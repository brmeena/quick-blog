import React from "react";
import AdminNavigation from "./_admin_nav" 
import { AppSidebarNav } from "../AppSidebarNav";
const AdminSideBarNav =()=> {
    return (
        <>
        <AppSidebarNav items={AdminNavigation} />
        </>
    )
}
export default AdminSideBarNav;