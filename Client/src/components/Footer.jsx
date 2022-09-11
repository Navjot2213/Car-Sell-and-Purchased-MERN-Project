import'./Footer.css'

export default function Footer(){

	return(
		<>
		<footer>	
			<div className="section5">
				<h1>Subscribe to our Newsletter</h1>
				<div className="input-field">
					<input type="email" placeholder="E-mail" required />
				</div>
				<button className="btn">Subscribe</button>
			</div>

		<div className="main">
    		<div className="col1">
      		<h3 className="heading">About the store</h3>
      			<ul>
        			<li><a href="#">Home</a></li>
        			<li><a href="#">Become a customer</a></li>
        			<li><a href="#">About us</a></li>
        			<li><a href="#">FAQ</a></li>
        			<li><a href="#">Contact us</a></li>
		    	</ul>
			</div>
			
			<div className="col2">
      			<h3 className="heading">Language</h3>
      			<div className="languages">
        			<a href="#">Deutsch</a>
        			<a href="#">English</a>
        			<a href="#">Espaṅol</a>
     	 		</div>
    		</div>

    		<div className="col3">
     			<h3 className="heading">Contact US</h3>
      			<form className="join-room-form">
                     <div className="input-field">
                        <input type="email" placeholder="E-mail" required />
                     </div>
 	                 <div className="input-field"> 	                  
                        <input type="text" placeholder="Description" required />
                     </div>
                      <input type="submit" value="Enter" className="btn solid" />
                </form>
            </div>
		</div>
	</footer>
	</>
	);
}
