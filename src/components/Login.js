import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
//import { useContext } from 'react-router-dom';

//importing the authprovider use for only for this component otherwise set it globally
//import { useRef, useState, useEffect } from 'react';
//import AuthContext from "./context/AuthProvider"; importing the authprovider
import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    // initalize the  authcontext and pass on the authcontext in usecontext and set on the setauth
    //const { setAuth } = useContext(AuthContext); 
    
    
    const { setAuth } = useAuth(); //inherit authcontext from hooks/useauth.js

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault(); // use that event to prevent default behaviour of the from which we reload the page

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data)); // the json response will store in data property and shows only data property in console
            console.log(JSON.stringify(response));// this will shows everything of the reponse 
            const accessToken = response?.data?.accessToken; // this will store only the accesstoken from the data property by response
            const roles = response?.data?.roles; //this will store the roles of the user 
            setAuth({ user, pwd, roles, accessToken }); // store the user, password, roles, accesstoken globally in authcontext
            setUser(''); // after submit the user this will clear the user input of the user state
            setPwd(''); // after submit the password this will clear the user input of the user state
               
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login
