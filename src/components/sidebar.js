import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiHome, HiUser, HiCog } from 'react-icons/hi';

function App() {
  //const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div className="flex">
      {/* Sidebar */}
      
        <Sidebar aria-label="Default sidebar example" className="w-64">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiHome}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Profile
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiCog}>
                Settings
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
    

      {/* Main Content */}
      
    </div>
  );
}

export default App;