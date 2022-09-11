import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'
import './AddLogo.css'

export default function AddLogo(){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
    const [istoogle, setistoogle] = useState(false);
  
    const toogle = () => {
    setistoogle(!istoogle);
  }
	
	const [post, setPost] = useState({
		carModel: "",
		carDescription: "",
		startingBid: "",
		carImage: "",
		email: cookie.login.email
	});
	
	const handleInput = (field) => (event) => {
	const { value } = event.target;
	    
	    setPost({
	      ...post,
	      [field]: value,
   		});
	}
	  
  	const submitPost = (e) => {
		
		const requestOptions = {
       	 	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(post)
    	};
    	fetch('http://localhost:5002/bid/addPost', requestOptions)
    		.then(res =>{
    			if(res.status == 201){
    				alert('Form Successfully Submitted')
    			}
		});
	}
  
    return (
    <>
     <div className='add-logo' onClick={()=> toogle()}><h1>+</h1></div>
   
      { istoogle &&
        <div className="popup-container">
            <button className="popup-background" onClick={() => toogle()} />
              <div className="add-pop-container">
                <div className="add-info">
                  <div className="add-info-text">
                    <h3>Enter a Your Selling Car Details</h3>
                    <p>We are here to help you with all your queries :)</p>
                  </div>
                </div>
                
                <form className="add-form">
                  <input onChange={handleInput("carModel")} placeholder="Car Model" />
                  <input onChange={handleInput("carDescription")} placeholder="Car Description" />
                  <input onChange={handleInput("carImage")} placeholder="Car Image URL" />
                  <input onChange={handleInput("startingBid")} type="Number" placeholder="Starting Bid (in Lakhs)"/>
                  <button onClick={submitPost}>Submit</button>
                </form>
              
              </div>
         </div>
      }
    </>
  );
}
