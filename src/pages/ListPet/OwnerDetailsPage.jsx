import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ListingStepper from "../../components/listing/ListingStepper";
import ManualDetail from "./ManualDetail";
import OwnerSearchResults from "./OwnerSearchResults";

import { setOwnerType } from "../../redux/listingSlice";

const ownerTypes = [
  {
    id: "individual",
    label: "Individual Person",
  },
  {
    id: "business",
    label: "Business",
  },
  {
    id: "organisation",
    label: "Our Organisation",
  },
];

export default function OwnerDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ownerType = useSelector((state) => state.listing.ownerType);

  const selectedListingType = useSelector(
    (state) => state.listing.selectedListingType,
  );

  const isIndividualListing = selectedListingType === "individual";

  const isMultipleListing =
    selectedListingType === "multiple" ||
    selectedListingType === "multiplepets" ||
    selectedListingType === "multiple-pets" ||
    selectedListingType === "multiple_pets" ||
    selectedListingType === "multiple pet";

  const currentStep = isIndividualListing || isMultipleListing ? 2 : 3;

  const [selectedOwnerType, setSelectedOwnerType] = useState(ownerType || null);

  const [inputDetails, setInputDetails] = useState(false);
  const [manualButton, setManualButton] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [manualDetails, setManualDetails] = useState(false);

  const handleBack = () => {
    if (isIndividualListing) {
      navigate("/list-pet/individual");
      return;
    }

    if (isMultipleListing) {
      navigate("/list-pet/multiple/petdetailssummary");
      return;
    }

    navigate("/list-pet/litter/pets-detail");
  };

  const handleOwnerTypeSelect = (ownerId) => {
    setSelectedOwnerType(ownerId);

    setInputDetails(true);
    setManualButton(true);

    setManualDetails(false);
    setShowDetails(false);

    setFirstName("");
    setMobileNumber("");
  };

  const handleFindDetails = () => {
    setShowDetails(true);
  };

  const handleSubmit = () => {
    if (!selectedOwnerType) return;

    dispatch(setOwnerType(selectedOwnerType));

    if (isIndividualListing) {
      navigate("/list-pet/individual/reviewsubmit");
      return;
    }

    navigate("/list-pet/litter/reviewsubmit");
  };

  const handleManualDetails = () => {
    if (!selectedOwnerType) return;

    dispatch(setOwnerType(selectedOwnerType));

    setShowDetails(false);
    setInputDetails(false);
    setManualButton(false);
    setManualDetails(true);
  };

  const isFindDetailsEnabled =
    Boolean(selectedOwnerType) &&
    Boolean(firstName.trim().length >= 4) &&
    Boolean(
      mobileNumber.trim().startsWith("04") && mobileNumber.trim().length === 10,
    );

  const isBusinessFindDetailsEnabled =
    selectedOwnerType === "business" && firstName.trim().length >= 4;

  return (
    <div className="flex w-full flex-col">
      <section className="flex min-h-[calc(100vh-170px)] w-full flex-1 flex-col rounded-md bg-[#FEFCF9] px-4 py-5 sm:px-7 sm:py-6 lg:px-6 lg:py-4">
        <ListingStepper currentStep={currentStep} />

        <div className="relative mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-1 text-[11px] font-medium text-[#C87829] transition-colors hover:text-[#A85F1C]"
          >
            <ChevronLeft size={14} strokeWidth={1.8} />
            Back
          </button>

          <h2 className="text-[16px] font-semibold text-[#3A3028] sm:text-[17px]">
            Enter Owner Details
          </h2>
        </div>

        <div className="mt-5 w-full rounded-sm bg-white px-4 py-5 shadow-[0_2px_10px_rgba(80,50,20,0.03)] sm:px-5 sm:py-5 lg:px-5 lg:py-6">
          <p className="text-[10px] font-medium text-[#4F453D] sm:text-[11px]">
            Select Owner Type
          </p>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {ownerTypes.map((owner) => {
              const isSelected = selectedOwnerType === owner.id;

              return (
                <button
                  key={owner.id}
                  type="button"
                  onClick={() => handleOwnerTypeSelect(owner.id)}
                  className={`flex h-16.5 w-full items-center justify-between rounded-[5px] px-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-[#F4E2CC]"
                      : "bg-[#FBF3EA] hover:bg-[#F7E9D9]"
                  }`}
                >
                  <span className="text-[12px] font-semibold text-[#51463D] sm:text-[12px]">
                    {owner.label}
                  </span>

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

          {selectedOwnerType === "individual" &&
            !showDetails &&
            inputDetails && (
              <div className="mt-9">
                <p className="text-[11px] font-medium leading-[1.4] text-[#3F3731] sm:text-[12px]">
                  Enter the owner's first name and mobile number, and we'll find
                  the record for you.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div className="relative">
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder=" "
                      className="peer h-8.75 w-full rounded-[3px] border border-[#AFA9A4] bg-white px-3 text-[11px] text-[#3A3028] outline-none transition-colors focus:border-[#C87829] sm:text-[12px]"
                    />

                    <label
                      htmlFor="firstName"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-[11px] text-[#6F6862] transition-all duration-150 peer-focus:-top-1.75 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-[#624F3E] peer-not-placeholder-shown:-top-1.75 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#624F3E] sm:text-[12px]"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      id="mobileNumber"
                      type="tel"
                      value={mobileNumber}
                      onChange={(event) => {
                        const numbersOnly = event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);

                        setMobileNumber(numbersOnly);
                      }}
                      placeholder=" "
                      inputMode="numeric"
                      className="peer h-8.75 w-full rounded-[3px] border border-[#AFA9A4] bg-white px-3 text-[11px] text-[#3A3028] outline-none transition-colors focus:border-[#C87829] sm:text-[12px]"
                    />

                    <label
                      htmlFor="mobileNumber"
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-[11px] text-[#6F6862] transition-all duration-150 peer-focus:-top-1.75 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-[#624F3E] peer-not-placeholder-shown:-top-1.75 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#624F3E] sm:text-[12px]"
                    >
                      Mobile Number
                    </label>

                    {mobileNumber &&
                      mobileNumber !== "0" &&
                      !mobileNumber.startsWith("04") && (
                        <p className="mt-1 text-[10px] text-red-500">
                          Mobile number must start with "04".
                        </p>
                      )}
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    disabled={!isFindDetailsEnabled}
                    onClick={handleFindDetails}
                    className={`h-9.5 w-full rounded-[3px] px-7 text-[12px] font-medium transition-all duration-200 sm:w-74.25 ${
                      isFindDetailsEnabled
                        ? "bg-[#C87829] text-white hover:bg-[#B96D21]"
                        : "cursor-not-allowed bg-[#E8C8A7] text-white"
                    }`}
                  >
                    Find Details
                  </button>
                </div>
              </div>
            )}

          {selectedOwnerType === "business" && !showDetails && inputDetails && (
            <div className="mt-9">
              <p className="text-[11px] font-medium leading-[1.4] text-[#3F3731] sm:text-[12px]">
                Enter the business or kennel name, and we'll find matching
                records.
              </p>

              <div className="mt-6 flex justify-center">
                <div className="relative w-full max-w-95">
                  <input
                    id="businessName"
                    type="text"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder=" "
                    className="peer h-10.5 w-full rounded-[3px] border border-[#AFA9A4] bg-white px-3 text-[11px] text-[#3A3028] outline-none transition-colors focus:border-[#C87829] sm:text-[12px]"
                  />

                  <label
                    htmlFor="businessName"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-[11px] text-[#6F6862] transition-all duration-150 peer-focus:-top-1.75 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-[#624F3E] peer-not-placeholder-shown:-top-1.75 peer-not-placeholder-shown:translate-y-0 peer-not-placeholder-shown:text-[9px] peer-not-placeholder-shown:text-[#624F3E] sm:text-[12px]"
                  >
                    Business / Kennel Name
                  </label>
                </div>
              </div>

              <div className="mt-3.75 flex justify-center">
                <button
                  type="button"
                  disabled={!isBusinessFindDetailsEnabled}
                  onClick={handleFindDetails}
                  className={`h-10.5 w-full max-w-95 rounded-[3px] px-7 text-[15px] font-medium transition-all duration-200 ${
                    isBusinessFindDetailsEnabled
                      ? "bg-[#C87829] text-white hover:bg-[#B96D21]"
                      : "cursor-not-allowed bg-[#E8C8A7] text-white"
                  }`}
                >
                  Find Details
                </button>
              </div>
            </div>
          )}

          {selectedOwnerType === "organisation" &&
            !showDetails &&
            inputDetails && (
              <div className="mt-9">
                <p className="text-[12px] font-medium leading-[1.4] text-[#3F3731] sm:text-[13px]">
                  Your organisation details
                </p>

                <div className="mt-4 w-full rounded-[5px] border border-[#BDB7B2] bg-white px-4 py-5">
                  <p className="text-[11px] font-semibold text-[#403832] sm:text-[12px]">
                    Organisation Name
                  </p>

                  <p className="mt-1 text-[9px] font-medium leading-[1.4] text-[#6C655F] sm:text-[11px]">
                    22 FIVEWAYS BOULEVARD, KEYSBOROUGH 3173, VIC, AUSTRALIA
                  </p>

                  <p className="mt-0.5 text-[9px] font-medium leading-[1.4] text-[#6C655F] sm:text-[11px]">
                    lorem@car.com.au
                  </p>

                  <p className="mt-0.5 text-[9px] font-medium leading-[1.4] text-[#6C655F] sm:text-[11px]">
                    85093003093
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="h-10.5 w-full rounded-[3px] bg-[#C87829] px-7 text-[14px] font-medium text-white transition-colors hover:bg-[#B96D21] sm:w-74.25"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

          {showDetails && (
            <OwnerSearchResults
              ownerType={selectedOwnerType}
              onSubmit={handleSubmit}
            />
          )}

          {(selectedOwnerType === "individual" ||
            selectedOwnerType === "business") &&
            manualButton && (
              <>
                <div className="mt-10 flex w-full items-center gap-3">
                  <span className="h-px flex-1 bg-[#CFCAC5]" />

                  <span className="text-[10px] font-medium text-[#403933]">
                    OR
                  </span>

                  <span className="h-px flex-1 bg-[#CFCAC5]" />
                </div>

                <div className="mt-9 flex justify-center">
                  <button
                    type="button"
                    onClick={handleManualDetails}
                    className="h-9.5 w-full rounded-[3px] border border-[#C87829] bg-white px-6 text-[12px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF7EE] sm:w-74.25"
                  >
                    {selectedOwnerType === "individual"
                      ? "Enter Owner Details Manually"
                      : "Enter Business Details Manually"}
                  </button>
                </div>
              </>
            )}

          {manualDetails && <ManualDetail ownerType={selectedOwnerType} />}
        </div>
      </section>
    </div>
  );
}
 