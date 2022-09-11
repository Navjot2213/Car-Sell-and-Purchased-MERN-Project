import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'

export default function Dealer(){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
	
	const [postData, setPostData] = useState([]);
	const [refresh, setRefresh] = useState(0);
	useEffect(()=>{
		const fetchData = () => {
			fetch(`http://localhost:5002/bid/data`)
				.then(res => res.json())
					.then(data => setPostData(data));
		}
		fetchData();
		setInterval(fetchData, 1000*5);
	},[refresh]);
	
	const [purchasedData, setPurchasedData] = useState([]);
	useEffect(()=>{
		const fetchData = () => {
			fetch(`http://localhost:5002/data/dealer/${cookie.login.email}`)
				.then(res => res.json())
					.then(data => setPurchasedData(data));
		}
		fetchData();
		setInterval(fetchData, 1000*5);
	},[refresh]);
	
	const [bid, setBid] = useState({
		bidId: "",
		dealerBid: "",
		email: cookie.login.email
	});
	
	const handleInput = (field) => (event) => {
	const { value } = event.target;
	    
	    setBid({
	      ...bid,
	      [field]: value,
   		});
	}
	
	  
  	const submitBid = (value) => (e) => {
		e.preventDefault();
		
		setBid({
	      ...bid,
	      bidId: value,
   		});
		
		const requestOptions = {
       	 	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(bid)
    	};
    	fetch('http://localhost:5002/bid/make', requestOptions)
    		.then(res =>{
    			if(res.status == 201){
    				alert('Bid Successfully Submitted');
    				setRefresh((refresh) => refresh +1);
    			}
		});
	}

	return(
	<>
	{ postData.map( post => (
    	<div className="post">
      		  <div className="preview">
        		<img src={post.carImage} />
      		  </div>
      		  <h1 className="product">Car: {post.carModel}<div className="detail">Description: {post.carDescription}</div></h1>
      		  <div className="desc-long">Starting Bid: {post.startingBid} Lahks</div>
      		  { (post.dealerBids[0] == null)?<div className="desc-short">Make a First Move</div>
      		  :<div className="desc-short">Current Max Bid: {post.dealerBids[post.dealerBids.length - 1 ][0]}</div>
      		  }
      		  <div className="button">
      		  	<input onChange={handleInput('dealerBid')} className="input-field" type="Number" step="any" placeholder="Value (in Lakhs)" required />
      		  	<button onClick={submitBid(post._id)} className="btn">Make a Bid</button>
      		  </div>
    	</div>
    	))}
    	
 	   	<h1>Previous Purchased:</h1>
    	
    	{ purchasedData.map( post => (
 	   		<div className="posta">
      		  <div className="previewa">
        		<img src={post.carImage} />
      		  </div>
      		  <h2>Car: {post.carModel}</h2>
      		  <p>Purchased At: {post.purchasedAt} Lahks</p>
    		</div>
    		))}
	</>
	);
}
