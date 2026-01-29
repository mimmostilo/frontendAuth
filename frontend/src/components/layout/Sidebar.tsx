import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { MENU_ITEMS } from '../../constants/roles';
import { UserRole } from '../../types';

const Sidebar = () => {
  const { user } = useAuth();
  
  // Get menu items based on user role
  const menuItems = user ? MENU_ITEMS[user.ruolo as UserRole] || [] : [];
  
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
      </div>
      
      <nav className="mt-5 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.route}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;