import { Bell, Menu } from "lucide-react";

export default function TopNavbar({ onMenuClick }) {
  return (
    <header className="relative w-full">
      {/* =====================================================
          MOBILE ACTIONS
          Visible only on mobile
      ====================================================== */}
      <div className="mb-4 flex w-full items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          {/* Verifications */}
          <button
            type="button"
            className="flex h-[32px] items-center justify-center rounded-full border border-[#D7B993] bg-transparent px-3 text-[10px] font-medium text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
          >
            Verifications (12)
          </button>

          {/* Account */}
          <button
            type="button"
            className="flex h-[32px] items-center justify-center rounded-full border border-[#D7B993] bg-transparent px-3 text-[10px] font-medium text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
          >
            Account&nbsp; $100
          </button>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border border-[#D7B993] bg-transparent text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
          >
            <Bell size={14} strokeWidth={1.7} />

            <span className="absolute -right-[4px] -top-[5px] flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#C87929] px-1 text-[8px] font-medium leading-none text-white">
              3
            </span>
          </button>
        </div>

        {/* Hamburger - far right */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-md text-[#553922] transition-colors hover:bg-[#F3DFC5]"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* =====================================================
          MOBILE TITLE + LISTING HISTORY
      ====================================================== */}
      <div className="flex w-full items-start justify-between gap-3 sm:hidden">
        <div className="min-w-0 flex-1">
          <h1 className="text-[17px] font-semibold leading-[1.15] text-[#30271F]">
            List A Pet
          </h1>

          <p className="mt-1 max-w-[250px] text-[10px] leading-[1.35] text-[#624F3E]">
            This is where you can list microchips that you have implanted on
            Central Animal Records.
          </p>
        </div>

        {/* Listing History */}
        <button
          type="button"
          className="mt-0.5 flex h-[32px] shrink-0 items-center justify-center rounded-[3px] bg-white px-3 text-[10px] font-medium text-[#65462E] shadow-[0_2px_7px_rgba(80,50,20,0.03)] transition-colors hover:bg-[#FFF9F4]"
        >
          Listing History
        </button>
      </div>

      {/* =====================================================
          DESKTOP / TABLET TITLE + DESCRIPTION
      ====================================================== */}
      <div className="hidden w-full sm:block">
        <h1 className="text-[17px] font-semibold leading-[1.15] text-[#30271F]">
          List A Pet
        </h1>

        <p className="mt-1 max-w-[530px] text-[11px] leading-[1.35] text-[#624F3E]">
          This is where you can list microchips that you have implanted on
          <br className="hidden sm:block" />
          Central Animal Records.
        </p>
      </div>

      {/* =====================================================
          DESKTOP / TABLET ACTIONS
          Hidden only on mobile
      ====================================================== */}
      <div className="absolute right-0 top-0 hidden items-center gap-2 sm:flex sm:gap-3">
        {/* Verifications */}
        <button
          type="button"
          className="h-[32px] rounded-full border border-[#D7B993] bg-transparent px-4 text-[10px] font-medium text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
        >
          Verifications (12)
        </button>

        {/* Account */}
        <button
          type="button"
          className="h-[32px] rounded-full border border-[#D7B993] bg-transparent px-4 text-[10px] font-medium text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
        >
          Account&nbsp; $100
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#D7B993] bg-transparent text-[#63462D] transition-colors hover:bg-[#F3DFC5]"
        >
          <Bell size={14} strokeWidth={1.7} />

          <span className="absolute -right-[4px] -top-[5px] flex h-[15px] min-w-[15px] items-center justify-center rounded-full bg-[#C87929] px-1 text-[8px] font-medium leading-none text-white">
            3
          </span>
        </button>

        {/* Hamburger - tablet only */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-[32px] w-[32px] items-center justify-center rounded-md text-[#553922] transition-colors hover:bg-[#F3DFC5] lg:hidden"
        >
          <Menu size={20} strokeWidth={1.8} />
        </button>
      </div>

      {/* =====================================================
          DESKTOP / TABLET LISTING HISTORY
          Hidden on mobile
      ====================================================== */}
      <div className="mt-4 hidden w-full justify-end sm:flex">
        <button
          type="button"
          className="flex h-[32px] items-center justify-center rounded-[3px] bg-white px-4 text-[10px] font-medium text-[#65462E] shadow-[0_2px_7px_rgba(80,50,20,0.03)] transition-colors hover:bg-[#FFF9F4]"
        >
          Listing History
        </button>
      </div>
    </header>
  );
}
