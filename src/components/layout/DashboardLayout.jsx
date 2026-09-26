import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const location = useLocation();

  const isListPetPage =
    location.pathname === "/list-pet" ||
    location.pathname.startsWith("/list-pet/");

  return (
    <div className="min-h-screen w-full bg-[#F7E7D1]">
      <div className="flex min-h-screen w-full">
        <Sidebar
          mobileOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <main
          className="
            min-w-0
            flex-1
            px-5
            py-5
            sm:px-7
            sm:py-6
            lg:px-4
            lg:py-7
          "
        >
  
          {isListPetPage && (
            <TopNavbar
              onMenuClick={() =>
                setMobileSidebarOpen(true)
              }
            />
          )}

          <div className={isListPetPage ? "mt-5" : ""}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}