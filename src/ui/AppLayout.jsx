import { Outlet } from "react-router-dom"

function AppLayout() {
    return (
        <div>
        App
            <Outlet/>
        </div>
    )
}

export default AppLayout
