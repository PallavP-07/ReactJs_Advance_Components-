import {Link} from 'react-router-dom';
import *as FaIcons from 'react-icons/fa';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import {SidebarData} from '../Components/SidebarData'
import * as AiIcons from 'react-icons/ai';
import '../Components/Navbar.css';
import * as MdIcon from 'react-icons/md'
import * as IoIcons from 'react-icons/io';

const Navbar = () =>{
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='#' className='menu-bar'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>

            <Link to="/" className='menu-bars-Log' > LogOut <IoIcons.IoMdLogOut/></Link>
          </div>

        
          <nav className={sidebar? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bar1'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              <div >< MdIcon.MdOutlineDashboard className='Empdasicon'/> <Link to='/admindashbord' className='Empdasicontext_Link'><h6 className='Empdasicontext'>Admin_Dashbord</h6></Link></div>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }






export default Navbar;