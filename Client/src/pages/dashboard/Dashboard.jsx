import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useCookies} from 'react-cookie'
import Dealer from './components/Dealer'
import Seller from './components/Seller'
import './Dashboard.css'

export default function Dashboard (){
	const [cookie, setCookie, removeCookie] = useCookies(['login']);
	const navigate = useNavigate();
	useEffect(()=>{
		if(!cookie.login){
			navigate("/");
		}
	},[]);
	
//	cookie.login.isDealer
	return (
		<dashboard-wrapper>
		   { cookie.login.isDealer?<Dealer />:<Seller />}
		</dashboard-wrapper>
	);	
}
