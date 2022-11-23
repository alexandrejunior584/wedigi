import Cart from '../../files/pictures/cart.png';
import Dropdown from '../../files/pictures/dropdown.png';
import Logo from '../../files/pictures/logo.png';
// 
const Header = () => {
    return(
        <header className="header">
            <div className="container main-header">
                <div>
                    <img src={Dropdown} alt={Dropdown} />
                </div>
                <div>
                    <img src={Logo} alt={Logo} />
                </div>
                <div>
                    <img src={Cart} alt={Cart} />
                </div>
            </div>

            <div className='bottom-line'></div>
        </header>
    )
}

export default Header;