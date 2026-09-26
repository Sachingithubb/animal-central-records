import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ListingStepper from "../../components/listing/ListingStepper";
import MultiplePetsDetails from "./MultiplePetsDetails";

export default function PetDetailsSummary() {
  const navigate = useNavigate();

  const petsDetails = useSelector((state) => state.listing.petsDetails);
  const litterDetails = useSelector((state) => state.listing.litterDetails);

  const pets = petsDetails?.length ? petsDetails : [];

  // eslint-disable-next-line no-unused-vars
  const [selectedPet, setSelectedPet] = useState(null);
  const [multiplePet, setMultiplePet] = useState(false);
  const [addPet, setAddPet] = useState(false);

  const getPetType = (microchipNumber) => {
    const number = microchipNumber?.replace(/\s/g, "");

    if (number?.startsWith("3")) {
      return "Prepaid";
    }

    if (number?.startsWith("2")) {
      return "Non-Prepaid ($9.95)";
    }

    return "";
  };

  const getColors = (pet) => {
    if (pet.colors?.length) {
      return pet.colors.filter(Boolean);
    }

    if (pet.color) {
      return [pet.color];
    }

    return [];
  };

  const handleBack = () => {
    navigate("/list-pet/multiple");
  };

  const handleNext = () => {
    console.log("hello");
    
    navigate("/list-pet/litter/owner-detail");
  };

  const handleAddSecondPet = () => {
    setAddPet(true);
  };

  const handleEdit = () => {
    
  };

  const handleDelete = (pet) => {
    console.log("Delete pet:", pet);
  };

  return (
    <div className="min-h-screen w-full bg-[#F7E7D1]">
      <div className="min-h-screen w-full bg-white px-5 pb-0 pt-5 sm:px-7 lg:px-8">
        {/* ================= STEPPER ================= */}
        <ListingStepper currentStep={1} />

        {/* ================= HEADER ================= */}
        <div className="relative mt-7 flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-1 text-[13px] font-medium text-[#C87829] transition-colors hover:text-[#A95F1D]"
          >
            <span className="text-[20px] leading-none">‹</span>
            Back
          </button>

          <h1 className="mx-auto text-[19px] font-semibold text-[#403832] sm:text-[20px]">
            Enter Pet Details
          </h1>
        </div>

        {/* ================= MAIN WHITE CARD ================= */}
        <div className="mt-6 w-full rounded-[7px] bg-white px-0 pb-5">
          {/* ================= PET CARDS ================= */}
          <div className="space-y-4 px-0">
            {pets.length === 0 ? (
              <div className="rounded-[5px] bg-[#FFFCF9] px-5 py-10 text-center text-[12px] text-[#81776F]">
                No pet details added.
              </div>
            ) : (
              pets.map((pet, index) => {
                const petType = getPetType(pet.microchipNumber);
                const isPrepaid = petType === "Prepaid";
                const colors = getColors(pet);

                return (
                  <div
                    key={pet.id || index}
                    className="rounded-[5px] bg-[#FFFCF9] px-5 py-5 sm:px-5 sm:py-5"
                  >
                    {/* ================= DETAILS GRID ================= */}
                    <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-3">
                      {/* Microchip Number */}
                      {/* <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Microchip Number
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.microchipNumber || "000 000 000 000 000"}
                        </p>

                        {petType && (
                          <span
                            className={`mt-1.5 inline-flex min-w-[103px] justify-center rounded-full px-3 py-1 text-[8px] font-medium leading-none text-white ${
                              isPrepaid ? "bg-[#55C982]" : "bg-[#68B6D8]"
                            }`}
                          >
                            {petType}
                          </span>
                        )}
                      </div> */}

                      {/* C.A.R Tag */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          C.A.R Tag (Optional)
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.carTag || "Text"}
                        </p>
                      </div>

                      {/* Pet Name */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Pet Name
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.petName || "Text"}
                        </p>
                      </div>

                      {/* Sex */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Sex
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.sex || "Text"}
                        </p>
                      </div>

                      {/* Implant Date */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Implant Date
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.implantDate ||
                            litterDetails?.implantDate ||
                            "Text"}
                        </p>
                      </div>

                      {/* DOB */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          DOB
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.dob || litterDetails?.dob || "Text"}
                        </p>
                      </div>

                      {/* Breed */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Breed
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.breed || litterDetails?.breed || "Text"}
                        </p>
                      </div>

                      {/* Species */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Species
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.species || litterDetails?.species || "Text"}
                        </p>
                      </div>

                      {/* Sex */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Sex
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {pet.sex || "Text"}
                        </p>
                      </div>

                      {/* Color */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Color
                        </p>

                        {colors.length > 0 ? (
                          colors.map((color, colorIndex) => (
                            <p
                              key={`${color}-${colorIndex}`}
                              className="mt-1 text-[12px] font-medium text-[#30271F]"
                            >
                              {color || "Text"}
                            </p>
                          ))
                        ) : (
                          <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                            Text
                          </p>
                        )}
                      </div>

                      {/* Source Number */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Source Number (VIC Only)
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {litterDetails?.sourceNumber || "Text"}
                        </p>
                      </div>

                      {/* Implanter Number */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Implanter Number (VIC Only)
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {litterDetails?.implanterNumber || "Text"}
                        </p>
                      </div>

                      {/* Breeder Supply Number */}
                      <div>
                        <p className="text-[10px] leading-[1.3] text-[#716A64]">
                          Breeder Supply Number (QLD Only)
                        </p>

                        <p className="mt-1 text-[12px] font-medium text-[#30271F]">
                          {litterDetails?.breederSupplyNumber || "Text"}
                        </p>
                      </div>
                    </div>

                    {/* ================= EDIT / DELETE ================= */}
                    <div className="mt-5 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(pet)}
                        className="flex h-[27px] items-center justify-center rounded-[2px] border border-[#D88A43] bg-white px-4 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(pet)}
                        className="flex h-[27px] items-center justify-center rounded-[2px] border border-[#D88A43] bg-white px-4 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* ================= TOTAL ================= */}
          <div className="mt-4 flex justify-center">
            <p className="text-[13px] font-medium text-[#403832]">
              Total Pet(s) : {pets.length}
            </p>
          </div>

          {/* ================= BOTTOM ACTIONS ================= */}
        {!addPet &&  <div className="mt-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddSecondPet}
                className="h-[40px] w-full rounded-[3px] border border-[#C87829] bg-white text-[13px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF7EE]"
              >
                Add a 2nd Pet
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="h-[40px] w-full rounded-[3px] bg-[#C87829] text-[13px] font-medium text-white transition-colors hover:bg-[#B66D24]"
              >
                Next
              </button>
            </div>
          </div> }
        </div>
      </div>
      {addPet && <MultiplePetsDetails isAddPet={addPet} onCancel={() => setAddPet(false)} /> }
    </div>
  );
}
