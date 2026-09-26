import { useState } from "react";

const individualResults = [
  {
    id: 1,
    name: "JOHN S****",
    location: "From Keysborough VIC",
  },
  {
    id: 2,
    name: "JOHN K****",
    location: "From Cranbourne VIC",
  },
];

const businessResults = [
  {
    id: 1,
    businessName: "Rescue Name / Kennel Name",
    ownerName: "Owner Name",
    address:
      "22 Fiveways Boulevard, Keysborough, Greater Dandenong,VIC 3173, Australia",
    email: "lorem@car.com.au",
    phone: "85093003093",
  },
  {
    id: 2,
    businessName: "Rescue Name / Kennel Name",
    ownerName: "Owner Name",
    address: "22 FIVEWAYS BOULEVARD, KEYSBOROUGH 3173, VIC, AUSTRALIA",
    email: "lorem@car.com.au",
    phone: "85093003093",
  },
];

export default function OwnerSearchResults({ ownerType, onSubmit }) {
  const [selectedOwner, setSelectedOwner] = useState(null);

  const isBusiness = ownerType === "business";

  const handleSelectOwner = (ownerId) => {
    setSelectedOwner(ownerId);
  };

  return (
    <div className="mt-9">
      {/* ================= BUSINESS ================= */}
      {isBusiness ? (
        <>
          <p className="text-[12px] leading-[1.4] text-[#3F3731] font-medium sm:text-[13px]">
            Please select the correct business/kennel record OR enter manually.
          </p>

          {/* Business Results */}
          <div className="mt-4 space-y-4">
            {businessResults.map((business) => {
              const isSelected = selectedOwner === business.id;

              return (
                <button
                  key={business.id}
                  type="button"
                  onClick={() => handleSelectOwner(business.id)}
                  className={`flex min-h-26.75 w-full items-center justify-between rounded-[5px] border px-4 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#C87829] bg-[#FFF9F2] border-2"
                      : "border-[#BDB7B2] bg-white hover:border-[#C87829]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-[#403832] sm:text-[12px]">
                      {business.businessName}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-[#403832] sm:text-[11px]">
                      {business.ownerName}
                    </p>

                    <p className="mt-1 text-[9px] leading-[1.4] text-[#6C655F] sm:text-[11px]">
                      {business.address}
                    </p>

                    <p className="text-[9px] mt-0.5 leading-[1.4] text-[#6C655F] sm:text-[10px]">
                      {business.email}
                    </p>

                    <p className="text-[9px] mt-0.5 leading-[1.4] text-[#6C655F] sm:text-[10px]">
                      {business.phone}
                    </p>
                  </div>

                  {/* Radio */}
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-[#C87829] ${
                      isSelected ? "" : "bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-3 w-3 rounded-full bg-[#C87829]" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Manual Information */}
          <p className="mt-4 text-[11px] font-medium leading-[1.4] text-[#625B55] sm:text-[12px]">
            If none of the above results match your client, Enter owner details
            manually.
          </p>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              disabled={!selectedOwner}
              onClick={onSubmit}
              className={`h-10.5 w-full rounded-[3px] px-7 text-[12px] font-medium transition-all duration-200 sm:w-74.25 ${
                selectedOwner
                  ? "bg-[#C87829] text-white hover:bg-[#B96D21]"
                  : "cursor-not-allowed bg-[#E8C8A7] text-white"
              }`}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        /* ================= INDIVIDUAL ================= */
        <>
          <p className="text-[12px] font-medium leading-[1.4] text-[#3F3731] sm:text-[13px]">
            Please select the correct owner record OR enter manually.
          </p>

          <p className="mt-2 text-[11px] font-medium leading-[1.4] text-[#625B55] sm:text-[11px]">
            Due to privacy, you should not disclose any results with your
            client.
          </p>

          {/* Individual Results */}
          <div className="mt-4 space-y-4">
            {individualResults.map((owner) => {
              const isSelected = selectedOwner === owner.id;

              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => handleSelectOwner(owner.id)}
                  className={`flex min-h-23.25 w-full items-center justify-between rounded-[5px] border px-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#C87829] bg-[#FFF9F2] border-2"
                      : "border-[#BDB7B2] bg-white hover:border-[#C87829]"
                  }`}
                >
                  <div>
                    <p className="text-[11px] font-semibold text-[#403832] sm:text-[12px]">
                      {owner.name}
                    </p>

                    <p className="mt-1 text-[10px] text-[#6C655F] sm:text-[11px]">
                      {owner.location}
                    </p>
                  </div>

                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-[2.5px] border-[#C87829] ${
                      isSelected ? "" : "bg-transparent"
                    }`}
                  >
                    {isSelected && (
                      <span className="h-3 w-3 rounded-full bg-[#C87829]" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Manual Information */}
          <p className="mt-4 text-[11px] font-medium leading-[1.4] text-[#5A5A5A] sm:text-[12px]">
            If none of the above results match your client, Enter owner details
            manually.
          </p>

          {/* Next */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              disabled={!selectedOwner}
              onClick={onSubmit}
              className={`h-10.5 max-w-95 rounded-[3px] px-7 text-[14px] font-medium transition-all duration-200 sm:w-74.25 ${
                selectedOwner
                  ? "bg-[#C87829] text-white hover:bg-[#B96D21]"
                  : "cursor-not-allowed bg-[#E8C8A7] text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
