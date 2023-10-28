import React from 'react';
import * as AiIcons from 'react-icons/ai';
 import * as BsIcons from 'react-icons/bs';
import * as mdIcons from 'react-icons/md';


     
export const SidebarData =[
    {
    title: 'Home',
    path:"/",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },

  // {
  //   title: 'Login',
  //   path: '/login',
  //   icon: <AiIcons.AiOutlineLogin />,
  //   cName: 'nav-text'
  // },
  {
    title: 'AddTask',
    path: '/addtask',
    icon: <AiIcons.AiOutlineFileAdd />,
    cName: 'nav-text'

  },

  {
    title: 'AssignWork',
    path: '/assignwork',
    icon: <mdIcons.MdAssignmentLate />,
    cName: 'nav-text'

  },


  {
    title: 'Add_Employee',
    path:'/addnewemp',
    icon: <mdIcons.MdPersonAddAlt1/>,
    cName: 'nav-text'
  }
  ,

  {
    title: 'View_Employes',
    path:'/viewallemp',
    icon: <BsIcons.BsListCheck/>,
    cName: 'nav-text'
  }
  
  
  
  
];




    
