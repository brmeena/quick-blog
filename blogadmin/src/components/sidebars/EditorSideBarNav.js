import React from "react";
import EditorNavigation from "./_editor_nav" 
import { AppSidebarNav } from "../AppSidebarNav";
const EditorSideBarNav =()=> {
    return (
        <>
        <AppSidebarNav items={EditorNavigation} />
        </>
    )
}
export default EditorSideBarNav