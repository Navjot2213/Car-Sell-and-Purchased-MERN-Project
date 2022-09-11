import {useState, useEffect} from 'react'
import {useCookies} from 'react-cookie'

import AddLogo from './AddLogo'

export default function Seller(){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
    const [final, setFinal] = useState({
        		bidId: "",
        		dealerEmail: "",
        		finalDeal: "",
        		email: cookie.login.email,
        	});
        	
    const selectValue = (id, dealerBids) => (e) => {
    	const index = e.target.value;
	    setFinal({...final,
	      bidId: id,
	      finalDeal: dealerBids[dealerBids.length - index][0],
	      dealerEmail: dealerBids[dealerBids.length - index][1],
   		});
   		console.log(final)
	}
        	
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
	
	const [sellData, setSellData] = useState([]);
	useEffect(()=>{
		const fetchData = () => {
			fetch(`http://localhost:5002/data/owner/${cookie.login.email}`)
				.then(res => res.json())
					.then(data => setSellData(data));
		}
		fetchData();
		setInterval(fetchData, 1000*5);
	},[refresh]);
	
  	const finalDeal = (e) => {
		e.preventDefault();
		
		const requestOptions = {
       	 	method: 'POST',
        	headers: { 'Content-Type': 'application/json' },
        	body: JSON.stringify(final)
    	};
    	fetch('http://localhost:5002/bid/final', requestOptions)
    		.then(res =>{
    			if(res.status == 201){
    				alert('Final Deal Successfully Submitted')
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
      		  { (post.dealerBids[0] == null)?<div className="desc-short">No Deal Made</div>
      		  :<>
      		  <div className="desc-short">Current Max Bid: {post.dealerBids[post.dealerBids.length - 1 ][0]}</div>
      		  { post.dealerBids.length == 1 ?
      		  <div  className="button">
      		  	<p>You Just have One Bid Take it or Wait</p>
      		  	<select onChange={selectValue(post._id, post.dealerBids)}>
      		   		<option value="0" defaultValue hidden >Choose a Deal</option>
      		   		<option value="1" >{post.dealerBids[post.dealerBids.length - 1 ][0]} Lakhs</option>
      		  	</select>
      		  	<button onClick={finalDeal} className="btn">Finalize a deal</button>
      		  </div>
      		  :
      		  <div  className="button">
      		  	<select onChange={selectValue(post._id, post.dealerBids)}>
      		   		<option value="0" defaultValue hidden >Choose a Deal</option>
      		   		<option value="1" >{post.dealerBids[post.dealerBids.length - 1 ][0]} Lakhs</option>
      		   		<option value="2" >{post.dealerBids[post.dealerBids.length - 2 ][0]} Lakhs</option>
      		  	</select>
      		  	<button onClick={finalDeal} className="btn solid">Finalize a deal</button>
      		  </div>
      		  }	
      		  </>}
    	</div>
    	))}
   
	   	<AddLogo />    	
   	 	
    	<h1>Previous Sells:</h1>
    	
 	   	{sellData.map( post => (
 	   		<div className="posta">
      		  <div className="previewa">
        		<img src={post.carImage} />
      		  </div>
      		  <h2>Car: {post.carModel}</h2>
      		  <p>Selled At: {post.selledAt} Lahks</p>
    		</div>
    		))} 		 
    </>
	);
}
