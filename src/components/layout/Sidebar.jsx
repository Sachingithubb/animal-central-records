import { useState } from "react";
import {
  ChevronDown,
  Phone,
  LogOut,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  navigationItems,
  bottomNavigationItems,
} from "../../data/navigation";

export default function Sidebar({
  mobileOpen,
  onClose,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [expandedItems, setExpandedItems] = useState({
    Pets: false,
    Profile: false,
  });

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    if (!path) return;

    navigate(path);
    onClose?.();
  };

  const toggleExpandable = (label) => {
    setExpandedItems((current) => ({
      ...current,
      [label]: !current[label],
    }));
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          z-50

          left-[12px]
          top-[12px]
          bottom-[12px]

          w-[235px]

          overflow-hidden

          rounded-[16px]

          bg-[#FFFCF9]

          shadow-[0_2px_20px_rgba(80,50,20,0.04)]

          transition-transform
          duration-300

          lg:static
          lg:ml-[12px]
          lg:my-[12px]
          lg:h-[calc(100vh-24px)]

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-[270px]"
          }

          lg:translate-x-0
        `}
      >
        {/* Inner content */}
        <div className="flex h-full w-full flex-col px-3 py-3">
          {/* ==================================================
              LOGO
          =================================================== */}
          <div
            className="
              flex
              h-[105px]
              shrink-0
              items-center
              justify-center

              rounded-[10px]

              bg-white
            "
          >
            <div className="text-center">
              <div className="mx-auto flex h-[55px] w-[55px] items-center justify-center">
                <span className="text-[40px]">
                  🐾
                </span>
              </div>

              <p
                className="
                  mt-1
                  text-[9px]
                  font-semibold
                  tracking-[0.02em]
                  text-[#573922]
                "
              >
                Central Animal Records
              </p>
            </div>
          </div>

          {/* ==================================================
              MAIN NAVIGATION
          =================================================== */}
          <nav className="mt-5 min-h-0 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;

                const active =
                  item.path &&
                  isActive(item.path);

                const expanded =
                  expandedItems[item.label];

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.expandable) {
                          toggleExpandable(
                            item.label
                          );
                        } else {
                          handleNavigation(
                            item.path
                          );
                        }
                      }}
                      className={`
                        relative
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-[5px]
                        px-3
                        py-[9px]
                        text-left
                        text-[12px]
                        transition-colors

                        ${
                          active
                            ? "bg-[#FBF0E4] text-[#C87829]"
                            : "text-[#583F2B] hover:bg-[#FCF4EB]"
                        }
                      `}
                    >
                      {active && (
                        <span
                          className="
                            absolute
                            left-0
                            top-1/2
                            h-6
                            w-[2px]
                            -translate-y-1/2
                            rounded-full
                            bg-[#C87829]
                          "
                        />
                      )}

                      <Icon
                        size={15}
                        strokeWidth={1.8}
                        className={
                          active
                            ? "text-[#C87829]"
                            : "text-[#583F2B]"
                        }
                      />

                      <span className="flex-1">
                        {item.label}
                      </span>

                      {item.badge && (
                        <span className="text-[10px] text-[#624A36]">
                          ({item.badge})
                        </span>
                      )}

                      {item.expandable && (
                        <ChevronDown
                          size={13}
                          strokeWidth={1.8}
                          className={`
                            transition-transform
                            duration-200
                            ${
                              expanded
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      )}
                    </button>

                    {item.expandable &&
                      expanded &&
                      item.children && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.children.map(
                            (child) => (
                              <button
                                key={child.path}
                                type="button"
                                onClick={() =>
                                  handleNavigation(
                                    child.path
                                  )
                                }
                                className={`
                                  block
                                  w-full
                                  rounded-[5px]
                                  px-3
                                  py-1.5
                                  text-left
                                  text-[11px]
                                  ${
                                    isActive(
                                      child.path
                                    )
                                      ? "text-[#C87829]"
                                      : "text-[#806B58]"
                                  }
                                `}
                              >
                                {child.label}
                              </button>
                            )
                          )}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* ==================================================
              BOTTOM NAVIGATION
          =================================================== */}
          <div className="shrink-0 pt-4">
            <div className="space-y-1">
              {bottomNavigationItems.map(
                (item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      type="button"
                      onClick={() =>
                        handleNavigation(
                          item.path
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-[5px]
                        px-3
                        py-[9px]
                        text-left
                        text-[12px]
                        text-[#583F2B]
                        hover:bg-[#FCF4EB]
                      "
                    >
                      <Icon
                        size={15}
                        strokeWidth={1.8}
                      />

                      {item.label}
                    </button>
                  );
                }
              )}

              {/* Logout */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-[5px]
                  px-3
                  py-[9px]
                  text-left
                  text-[12px]
                  text-[#583F2B]
                  hover:bg-[#FCF4EB]
                "
              >
                <LogOut
                  size={15}
                  strokeWidth={1.8}
                />

                Log out
              </button>

              {/* Contact */}
              <button
                type="button"
                className="
                  mt-2
                  flex
                  h-[38px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-[#C87829]
                  bg-transparent
                  text-[11px]
                  font-medium
                  text-[#74481F]
                  transition-colors
                  hover:bg-[#FCF0E2]
                "
              >
                <span
                  className="
                    flex
                    h-[21px]
                    w-[21px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#C87829]
                    text-white
                  "
                >
                  <Phone size={11} />
                </span>

                Contact Us
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}