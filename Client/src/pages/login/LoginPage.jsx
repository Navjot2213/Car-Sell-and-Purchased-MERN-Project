import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import './LoginPage.css'

export default function LoginPage (){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
	const navigate = useNavigate();
	useEffect(()=>{
		if(cookie.login){
			cookie.login.isLogin?navigate("/"):0;
		}
	},[]);
	
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		dealer: ""
	});

	const handleInput = (field) => (event) => {
	    const { value } = event.target;
	    
	    setUser({
	      ...user,
	      [field]: value,
   		});
	}

	const verifyLogin = async (e) => {
		e.preventDefault();
		
		const requestOptions = {
       	 	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(user)
    	};
    	fetch('http://localhost:5002/auth/login', requestOptions)
    		.then(res =>{
    			if(res.status == 201){ 
    				setCookie('login', {
    					isLogin: true, 
    					isDealer: user.dealer =="Dealer"?true:false, 
    					email: user.email 
    				}, {path: '/'} );
    				
    				navigate("/");
    			}
    		});
	}
	
	const registerUser = (e) => {
		e.preventDefault();
		
		const requestOptions = {
       	 	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(user)
    	};
    	fetch('http://localhost:5002/auth/register', requestOptions)
    		.then(res =>{
    			if(res.status == 411) alert("User Alerady Exists try to Login");
    			else if(res.status == 201){ 
    				setCookie('login', {
    					isLogin: true, 
    					isDealer: user.dealer =="Dealer"?true:false, 
    					email: user.email 
    				}, {path: '/'} );
    				
    				navigate("/");
    			}
    		});
	}
	
	const [newRoom, setNewRoom] = useState(false);
	const panelhandler = () => {
	  const container = document.querySelector(".container");
	  if(newRoom){ 
	  	container.classList.remove("new-room-mode");
		setNewRoom(false);
	  }
	  else { 
	  	container.classList.add("new-room-mode");
	  	setNewRoom(true);
	  } 
	}


	return (
		<>
		<div className="container">
        <div className="forms-container">
            <div className="joinroom-newroom">
                <form onSubmit={verifyLogin} className="join-room-form">
                    <h2 className="title">Login</h2>
                     <div className="input-field">
                        <input type="email" onChange={handleInput("email")} placeholder="E-mail" required />
                     </div>
 	                 <div className="input-field"> 	                  
                        <input type="password" onChange={handleInput("password")} placeholder="Password" required />
                     </div>
                     <div className="input-field"> 	                  
	               	   <select onChange={handleInput("dealer")}>
    		                <option disabled selected hidden>Choose login as</option>
    		                <option>Seller</option>
    		                <option>Dealer</option>
    		             </select>
    		         </div>
                      <input type="submit" value="Enter" className="btn solid" />
                </form>
                
 	               <form onSubmit={registerUser} className="new-room-form">
 	                   <h2 className="title">Register Yourself</h2>
 	                    <div className="input-field">
 	                    	<input type="text" onChange={handleInput("firstName")} placeholder="First Name" required />
 	                   	</div>
 	                    <div className="input-field"> 	                 
 	                    	<input type="text" onChange={handleInput("lastName")} placeholder="Last Name" required />
 	                   	</div>
 	                    <div className="input-field"> 	                  
                        	<input type="email" onChange={handleInput("email")} placeholder="E-mail" required />
                       	</div>
 	                    <div className="input-field"> 	               
                    	   	<input type="password" onChange={handleInput("password")} placeholder="Password" required />
                     	</div>
                     	<div className="input-field">
                     		<select onChange={handleInput("dealer")}>
    		            	    <option disabled selected hidden>Choose Register as</option>
    		            	    <option>Seller</option>
    		            	    <option>Dealer</option>
    		            	 </select>
                     	</div>
 	                    <input type="submit" value="Create" className="btn solid" />
 	               </form>
 	               
 	           </div>
 	       </div>
 
 
 	       <div className="panels-container">
 	           <div className="panel left-panel">
 	               <div className="content">
 	                   <h3>Register Youreself?</h3>
 	                   <p>"Coming together is a beginning. Keeping together is progress.
                         Working together is success." <i> - Henry Ford</i></p>
 	                   <button className="btntsp" onClick={panelhandler}>Register Youreself</button>
 	               </div>
 	               <img src="https://i.pinimg.com/originals/5d/4d/b6/5d4db6e517a689e87c4266f61d77f803.png" className="image" />
 	           </div>
 
 
 	           <div className="panel right-panel">
 	               <div className="content">
 	                   <h3>Login Here?</h3>
 	                   <p>"The best teamwork comes from men who are working 
 	                       independently toward one goal in unison." <i>- James Cash Penney</i></p>
 	                   <button className="btntsp" onClick={panelhandler}>Login Here</button>
 	               </div>
 	               <img src="https://www.freeiconspng.com/thumbs/car-png/land-rover-range-rover-car-png-25.png" className="image" />
 	           </div>
 	       </div>
 	   </div>
	</>
	);
}
