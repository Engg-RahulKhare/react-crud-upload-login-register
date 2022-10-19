import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth(); // just pull in the useauth to auth variable
    const location = useLocation(); //set the location 

    return (
        // or we can use this for the single role
        //auth?.roles? 
        auth?.roles?.find(role => allowedRoles?.includes(role)) // this will check the multiple roles for one user to which have the access 
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;