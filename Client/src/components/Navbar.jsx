import {Outlet, NavLink} from "react-router-dom"
import {useCookies} from 'react-cookie'
import "./Navbar.css"

export default function Navbar(){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
	const logoutHandle = () => removeCookie('login');
	
  return (
    <>
    <header>
        <div className="nav-wrapper">
            <div className="logo-container">
                <img className="logo" src="https://i.pinimg.com/474x/de/0d/07/de0d07ff99927b8ef47fe710cd091871.jpg" alt="Logo" />
            </div>
            <nav>
                <input className="hidden" type="checkbox" id="menuToggle"/>
                <label className="menu-btn" htmlFor="menuToggle">
                    <div className="menu"></div>
                    <div className="menu"></div>
                    <div className="menu"></div>
                </label>
                <div className="nav-container">
                    <ul className="nav-tabs">
                        <li className="nav-tab"><NavLink to="">Home</NavLink></li>
                        { (cookie.login)?
                        <>
                        	<li className="nav-tab"><NavLink to="dashboard">Dashboard</NavLink></li>        
	                        <li className="nav-tab" onClick={logoutHandle} ><NavLink to="">Log-out</NavLink></li>
                        </>
                        :       
                        	<li className="nav-tab"><NavLink to="login">Login</NavLink></li>                      
                        }
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <Outlet />
    </>
  );
}
