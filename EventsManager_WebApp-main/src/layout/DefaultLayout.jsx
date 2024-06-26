import React, { useState, ReactNode } from 'react';
//import Header from '../components/Header/index';
//import Sidebar from '../components/Sidebar/index';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const DefaultLayout = ({ children, overflow_y }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className={`flex h-screen overflow-${overflow_y}`}>
        {/* <!-- ===== Sidebar Start ===== --> 
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />*/}
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className={`relative flex flex-1 flex-col overflow-y-${overflow_y} overflow-x-${overflow_y}`}>
          {/* <!-- ===== Header Start ===== --> */}
          <Navbar  />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
      
    </div>
  );
};

export default DefaultLayout;
