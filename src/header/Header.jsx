import React from 'react';
import  './header.css';
import {Link} from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStateValue } from '../StateProvider';
import {auth} from '../firebase';

function Header() {
        // const [click, setClick] = useState(false);
        // const handleClick = () => setClick(!click);
        // const closeMobileMenu = () => setClick(false);
        const [{basket, user},dispatch] = useStateValue();
    const handleAuth = () => {
       if (user){
           auth.signOut();
       }
   }
    return (
        <div className="header">
            <Link to='/'>
            <img className="header_logo" src='http://asem.mx/wp-content/uploads/2021/08/amazon.jpg' alt='logoAmazo'/>
            </Link>
            <div className="header_search">
                <input type="text" className="header_searchIn" />
                <SearchIcon className="header_serchIcon" />
            </div>
            <div className="header_nav">
                <Link to={!user && '/login'}>
                <div onClick={handleAuth} className="header_nav_option">
                    <span className="header_nav_optionone">
                     Hello {user ? user.email.slice(0, -10) :'Guest'}
                    </span>
                    <span className="header_nav_optiontwo">
                       {user ? 'Sign Out' : 'SignIn'} 
                    </span>
                </div>
                </Link>

                <Link to='/orders'>
                <div className="header_nav_option">
                    <span className="header_nav_optionone">
                        return
                    </span>
                    <span className="header_nav_optiontwo">
                        Orders
                    </span>
                </div>
                </Link>

                <div className="header_nav_option">
                    <span className="header_nav_optionone">
                        Your
                    </span>
                    <span className="header_nav_optiontwo">
                        Prime
                    </span>
                </div>
               <Link to='/checkout'>
                 <div className="header_optionbascket">
                    <ShoppingCartIcon/>
                    <span className="header_basketCount">
                        {basket.length}
                    </span>
                </div>
               </Link>
            </div>
        </div>
    
        
    )
}

export default Header
