import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AdminLayout() {
    return (
        <div>
            <Header/>
            <Sidebar/>
            <Outlet/>
        </div>
    )
}

export default AdminLayout
