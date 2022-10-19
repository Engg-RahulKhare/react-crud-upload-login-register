
import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            {/* outlet represents all the childern of the layout component  */}
            <Outlet /> 
        </main>
    )
}

export default Layout
