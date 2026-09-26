import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const litterSteps = [
  { number: 1, label: "Litter Details" },
  { number: 2, label: "Pet(s) Details" },
  { number: 3, label: "Owner Details" },
  { number: 4, label: "Review & Submit" },
];

const petListingSteps = [
  { number: 1, label: "Pet Details" },
  { number: 2, label: "Owner Details" },
  { number: 3, label: "Review & Submit" },
];

const ListingStepper = ({ currentStep = 1 }) => {
  const location = useLocation();

  const selectedListingType = useSelector(
    (state) => state.listing.selectedListingType,
  );

  const listingType = String(selectedListingType || "").toLowerCase();

  const isMultiplePets =
    listingType === "multiple" ||
    listingType === "multiplepets" ||
    listingType === "multiple-pets" ||
    listingType === "multiple_pets" ||
    listingType === "multiple pet" ||
    location.pathname.startsWith("/list-pet/multiple");

  const isIndividual =
    listingType === "individual" ||
    location.pathname.startsWith("/list-pet/individual");

  const steps = isMultiplePets || isIndividual ? petListingSteps : litterSteps;

  return (
    <div className="flex w-full overflow-hidden rounded-full bg-white shadow-[0_2px_12px_rgba(80,50,20,0.04)]">
      {steps.map((step, index) => {
        const isActive = step.number === currentStep;

        return (
          <div
            key={step.number}
            className={`relative flex h-8.5 flex-1 items-center gap-2 px-2 text-[8px] transition-colors sm:h-9.5 sm:px-3 sm:text-[10px] ${
              isActive
                ? "bg-[#C87829] text-white"
                : "bg-white text-[#8A8179]"
            }`}
          >
            <span
              className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
                isActive
                  ? "bg-white text-[#C87829]"
                  : "bg-[#F1DFC8] text-[#5E4B39]"
              }`}
            >
              {step.number}
            </span>

            <span className="truncate text-sm">{step.label}</span>

            {index < steps.length - 1 && (
              <span
                className={`absolute right-0 top-1/2 h-5.5 w-px -translate-y-1/2 ${
                  isActive ? "bg-white/30" : "bg-[#EFE8E0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ListingStepper;