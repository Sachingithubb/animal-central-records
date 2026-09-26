import { useState } from "react";
import {
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { colorOptions } from "../../data/color";
import ListingStepper from "../../components/listing/ListingStepper";
import BarCode from "./BarCode";
import { useDispatch } from "react-redux";
import { setPetsDetails } from "../../redux/listingSlice";
import { useSelector } from "react-redux";

const createEmptyPet = (id) => ({
  id,
  microchipNumber: "",
  petName: "",
  sex: "",
  colors: [""],
  carTag: "",
  saved: false,
});

const getOrdinal = (number) => {
  if (number % 100 >= 11 && number % 100 <= 13) {
    return `${number}th`;
  }

  switch (number % 10) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
};

const PetsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.isEditMode === true;
  const dispatch = useDispatch();
  const petsDetails = useSelector((state) => state.listing.petsDetails);

  const [pets, setPets] = useState(
    petsDetails?.length > 0 ? petsDetails : [createEmptyPet(1)],
  );
  const [microchipErrors, setMicrochipErrors] = useState({});
  const [colorErrors, setColorErrors] = useState({});
  const [colorSuggestions, setColorSuggestions] = useState({});
  const [showComponent, setShowComponent] = useState(false);
  const [scanStatus, setScanStatus] = useState("waiting");
  const [sexBlur, setSexBlur] = useState(false);
  const [colorBlur, setColorBlur] = useState(false);

  const updatePet = (id, field, value) => {
    setPets((current) =>
      current.map((pet) => (pet.id === id ? { ...pet, [field]: value } : pet)),
    );

    if (field === "microchipNumber") {
      setMicrochipErrors((current) => ({
        ...current,
        [id]: "",
      }));
    }
  };

  const getMicrochipStatus = (value) => {
    const numbersOnly = value?.replace(/\s/g, "") || "";

    if (!numbersOnly) {
      return { valid: false, status: "", error: "" };
    }

    if (numbersOnly === "000000000000000") {
      return {
        valid: false,
        status: "",
        error: "This Microchip Number is already taken",
      };
    }

    if (!/^\d+$/.test(numbersOnly)) {
      return {
        valid: false,
        status: "",
        error: "Microchip Number must contain digits only",
      };
    }

    if (numbersOnly.length !== 15) {
      return {
        valid: false,
        status: "",
        error:
          numbersOnly.length > 0
            ? "Microchip Number must contain exactly 15 digits"
            : "",
      };
    }

    if (!["2", "3"].includes(numbersOnly[0])) {
      return {
        valid: false,
        status: "",
        error: "Microchip Number must start with 2 or 3",
      };
    }

    if (numbersOnly.startsWith("3")) {
      return {
        valid: true,
        status: "prepaid",
        error: "",
      };
    }

    if (numbersOnly.startsWith("2")) {
      return {
        valid: true,
        status: "non-prepaid",
        error: "",
      };
    }

    return {
      valid: false,
      status: "",
      error: "Invalid Microchip Number",
    };
  };

  const handleMicrochipChange = (id, value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 15);
    const formattedValue = numbersOnly.replace(/(\d{3})(?=\d)/g, "$1 ");

    updatePet(id, "microchipNumber", formattedValue);

    if (numbersOnly === "000000000000000") {
      setMicrochipErrors((current) => ({
        ...current,
        [id]: "This Microchip Number is already taken",
      }));
      return;
    }

    if (numbersOnly.length === 15 && !["2", "3"].includes(numbersOnly[0])) {
      setMicrochipErrors((current) => ({
        ...current,
        [id]: "Microchip Number must start with 2 or 3",
      }));
      return;
    }

    setMicrochipErrors((current) => ({
      ...current,
      [id]: "",
    }));
  };

  const updateColor = (petId, colorIndex, value) => {
    setPets((current) =>
      current.map((pet) => {
        if (pet.id !== petId) return pet;

        const updatedColors = [...pet.colors];
        updatedColors[colorIndex] = value;

        return {
          ...pet,
          colors: updatedColors,
        };
      }),
    );

    const searchValue = value.trim().toLowerCase();

    const suggestions =
      searchValue === ""
        ? []
        : colorOptions.filter((color) =>
            color.toLowerCase().includes(searchValue),
          );

    setColorSuggestions((current) => ({
      ...current,
      [`${petId}-${colorIndex}`]: suggestions,
    }));

    const exactMatch = colorOptions.some(
      (color) => color.toLowerCase() === searchValue,
    );

    setColorErrors((current) => ({
      ...current,
      [`${petId}-${colorIndex}`]:
        value.trim() !== "" && !exactMatch ? "Please enter a valid color." : "",
    }));
  };

  const selectColorSuggestion = (petId, colorIndex, color) => {
    setPets((current) =>
      current.map((pet) => {
        if (pet.id !== petId) return pet;

        const updatedColors = [...pet.colors];
        updatedColors[colorIndex] = color;

        return {
          ...pet,
          colors: updatedColors,
        };
      }),
    );

    setColorSuggestions((current) => ({
      ...current,
      [`${petId}-${colorIndex}`]: [],
    }));

    setColorErrors((current) => ({
      ...current,
      [`${petId}-${colorIndex}`]: "",
    }));
  };

  const addColor = (petId) => {
    setPets((current) =>
      current.map((pet) =>
        pet.id === petId
          ? {
              ...pet,
              colors: [...pet.colors, ""],
            }
          : pet,
      ),
    );
  };

  const deleteColor = (petId, colorIndex) => {
    setPets((current) =>
      current.map((pet) => {
        if (pet.id !== petId) return pet;

        if (pet.colors.length === 1) {
          return pet;
        }

        return {
          ...pet,
          colors: pet.colors.filter((_, index) => index !== colorIndex),
        };
      }),
    );
  };

  const deletePet = (id) => {
    if (pets.length === 1) return;

    setPets((current) => current.filter((pet) => pet.id !== id));

    setMicrochipErrors((current) => {
      const updated = { ...current };
      delete updated[id];
      return updated;
    });
  };

  const isValidColor = (value) =>
    colorOptions.some(
      (color) => color.toLowerCase() === value.trim().toLowerCase(),
    );

  const isPetValid = (pet) => {
    const microchipStatus = getMicrochipStatus(pet.microchipNumber);

    return (
      // microchipStatus.valid &&
      Boolean(pet.sex) &&
      pet.colors.every((color) => isValidColor(color))
    );
  };

  const savePet = (id) => {
    const pet = pets.find((item) => item.id === id);

    if (!pet) return;

    if (!isPetValid(pet)) {
      const microchipStatus = getMicrochipStatus(pet.microchipNumber);

      if (microchipStatus.error) {
        setMicrochipErrors((current) => ({
          ...current,
          [id]: microchipStatus.error,
        }));
      }

      return;
    }

    setPets((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              saved: true,
            }
          : item,
      ),
    );
  };

  const addNextPet = () => {
    const savedCount = pets.filter((pet) => pet.saved).length;

    const nextId =
      pets.length > 0 ? Math.max(...pets.map((pet) => pet.id)) + 1 : 1;

    setPets((current) => [...current, createEmptyPet(nextId)]);

    console.log(`Creating Pet ${savedCount + 1}`);
  };

  const savedPets = pets.filter((pet) => pet.saved);

  const currentPet = pets.find((pet) => !pet.saved);

  const hasUnsavedPet = Boolean(currentPet);

  const nextPetNumber = savedPets.length + 1;

  const showEnterNextButton = savedPets.length > 0 && !hasUnsavedPet;

  const isNextEnabled = savedPets.length > 0 && !hasUnsavedPet;

  const getNextPetText = () => {
    return `Enter ${getOrdinal(nextPetNumber)} Pet Details`;
  };

  const handleNext = () => {
    if (!isNextEnabled) return;

    dispatch(setPetsDetails(savedPets));

    if (isEditMode) {
      navigate("/list-pet/litter/reviewsubmit");
      return;
    }

    navigate("/list-pet/litter/owner-detail");
  };

  return (
    <div className="flex w-full flex-col ">
      <section className="flex min-h-[calc(100vh-170px)] w-full flex-1 flex-col rounded-md bg-[#FFFEFD] px-8 py-4 sm:px-6 sm:py-5 lg:px-4 lg:py-5">
        <ListingStepper currentStep={2} />

        <div className="relative mt-10 flex items-center justify-between">
          <button
            type="button"
            className="absolute left-0 flex items-center gap-1 text-[13px] font-medium text-[#C87829] transition-colors hover:text-[#A95F18]"
            onClick={() =>
              navigate(
                isEditMode
                  ? "/list-pet/litter/reviewsubmit"
                  : "/list-pet/litter",
              )
            }
          >
            <ChevronLeft size={15} strokeWidth={1.7} />

            {isEditMode ? "Back to Review & Submit" : "Back"}
          </button>

          <h2 className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[17px] font-semibold text-[#3A3028]">
            {isEditMode ? "Edit Pet(s) Details" : "Add Pet(s) Details"}
          </h2>

          <div className="w-11.25" />
        </div>

        <div className="mt-10 w-full overflow-hidden rounded-lg border border-[#EEE5DC] bg-white">
          <div className="hidden md:block">
            <div className="grid grid-cols-[1.15fr_1.2fr_1.1fr_1.25fr_38px] items-center bg-[#FBF2E9] px-2 py-3.5">
              {/* <div className="px-2 text-[11px] font-semibold text-[#3F342B]">
                Microchip Number
              </div> */}

              <div className="px-2 text-[11px] font-semibold text-[#3F342B]">
                Pet Name (Optional)
              </div>

              <div className="px-2 text-[11px] font-semibold text-[#3F342B]">
                Sex
              </div>

              <div className="px-2 text-[11px] font-semibold text-[#3F342B]">
                Color
              </div>

              <div className="px-2 text-[11px] font-semibold text-[#3F342B]">
                C.A.R Tag (Optional)
              </div>

              <div />
            </div>

            {pets.map((pet) => {
              const microchipStatus = getMicrochipStatus(pet.microchipNumber);

              const error = microchipErrors[pet.id];

              return (
                <div key={pet.id} className="border-t border-[#F1EAE3]">
                  <div className="grid grid-cols-[1.15fr_1.2fr_1.1fr_1.25fr_38px] items-start px-2 pt-3.5">
                    {/* <div className="px-2">
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={
                          scanStatus === "success"
                            ? (pet.microchipNumber = "345 675 890 125 871")
                            : pet.microchipNumber
                        }
                        onChange={(event) =>
                          handleMicrochipChange(pet.id, event.target.value)
                        }
                        placeholder="Microchip Number"
                        className={`h-8 w-full rounded-[3px] border bg-white px-2.5 font-medium text-[11px] text-[#4F4740] outline-none transition-colors ${error ? "border-[#E24A3B]" : "border-[#D7CFC7]"} focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/15`}
                      />

                      {microchipStatus.status === "prepaid" &&
                        !error &&
                        scanStatus !== "success" && (
                          <span className="mt-1 inline-flex rounded-full bg-[#55C879] px-2 py-1.5 text-[9px] font-medium leading-none text-white">
                            Prepaid
                          </span>
                        )}

                      {scanStatus === "success" && (
                        <div className="relative mt-1 min-h-[55px] w-full">
                          <span className="inline-flex rounded-full bg-[#55C879] px-2.5 py-1.5 text-[9px] font-medium leading-none text-white">
                            Prepaid
                          </span>

                          <button
                            type="button"
                            aria-label="Delete microchip"
                            className="absolute right-1 top-0.5 flex h-7 w-5 items-center justify-center text-[#D9534F] transition-colors hover:text-[#B52B27]"
                          >
                            <Trash2 size={13} strokeWidth={1.8} />
                          </button>

                          <div className="mt-1.5 flex items-start justify-between">
                            <div className="flex items-start gap-1.5">
                              <CheckCircle
                                size={11}
                                strokeWidth={1.8}
                                className="mt-0.5 shrink-0 text-[#16C65B]"
                              />

                              <p className="max-w-[80px] text-[11px] font-normal leading-[11px] text-[#4F4740]">
                                BarCode
                                <br />
                                Scanned
                              </p>
                            </div>

                            <button
                              type="button"
                              className="mr-1 mt-0.5 text-[11px] font-medium uppercase text-[#C87829] transition-colors hover:text-[#A96120]"
                            >
                              RESCAN
                            </button>
                          </div>
                        </div>
                      )}

                      {microchipStatus.status === "non-prepaid" && !error && (
                        <span className="mt-1 inline-flex rounded-full bg-[#61B4D5] px-2 py-1.5 text-[9px] font-medium leading-none text-white">
                          Non - Prepaid ($9.95)
                        </span>
                      )}

                      {error && (
                        <p className="mt-1 text-[8px] leading-tight text-[#E24A3B]">
                          {error}
                        </p>
                      )}

                      {!error &&
                        pet.microchipNumber.replace(/\s/g, "").length > 0 &&
                        pet.microchipNumber.replace(/\s/g, "").length < 15 && (
                          <p className="mt-1 text-[8px] leading-tight text-[#9B9087]">
                            {15 - pet.microchipNumber.replace(/\s/g, "").length}{" "}
                            digits remaining
                          </p>
                        )}

                      {!pet.saved &&
                        pet.microchipNumber.length === 0 &&
                        scanStatus !== "success" && (
                          <button
                            type="button"
                            onClick={() => setShowComponent(true)}
                            className="mt-1.5 text-[9px] font-medium uppercase tracking-[0.02em] text-[#C87829] hover:text-[#A96120]"
                          >
                            SCAN BAR CODE
                          </button>
                        )}
                    </div> */}

                    <div className="px-2">
                      <input
                        type="text"
                        placeholder="Not Provided"
                        value={pet.petName}
                        onChange={(event) =>
                          updatePet(pet.id, "petName", event.target.value)
                        }
                        className="h-8 w-full rounded-[3px] border border-[#D7CFC7] bg-white px-2.5 font-medium text-[11px] text-[#4F4740] outline-none transition-colors placeholder:text-[#77716B] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/15"
                      />
                    </div>

                    <div className="px-2">
                      <div className="relative">
                        <select
                          value={pet.sex}
                          onChange={(event) =>
                            updatePet(pet.id, "sex", event.target.value)
                          }
                          onFocus={() => {
                            setSexBlur(false);
                          }}
                          onBlur={() => {
                            if (pet.sex === "") {
                              setSexBlur(true);
                            }
                          }}
                          className="h-8 w-full appearance-none rounded-[3px] border border-[#D7CFC7] bg-white px-2.5 pr-7 text-[11px] font-medium text-[#77716B] outline-none transition-colors focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/15"
                        >
                          <option value="" disabled>
                            Sex
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {sexBlur && (
                          <p className="mt-1 text-[9.5px] text-red-500">
                            You must select a sex.
                          </p>
                        )}

                        <ChevronDown
                          size={12}
                          strokeWidth={1.7}
                          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C87829]"
                        />
                      </div>
                    </div>

                    <div className="px-2">
                      {pet.colors.map((color, colorIndex) => (
                        <div
                          key={`${pet.id}-${colorIndex}`}
                          className="relative mb-2.5"
                        >
                          <input
                            type="text"
                            value={color}
                            onChange={(event) =>
                              updateColor(
                                pet.id,
                                colorIndex,
                                event.target.value,
                              )
                            }
                            onFocus={() => setColorBlur(false)}
                            onBlur={() => {
                              if (color === "") {
                                setColorBlur(true);
                              }
                            }}
                            placeholder={colorIndex === 0 ? "Color" : ""}
                            className={`h-8 w-full rounded-[3px] border bg-white px-2.5 font-medium text-[11px] text-[#4F4740] outline-none transition-colors placeholder:text-[#77716B] focus:ring-1 ${
                              colorErrors[`${pet.id}-${colorIndex}`]
                                ? "border-[#E24A3B] focus:border-[#E24A3B] focus:ring-[#E24A3B]/15"
                                : "border-[#D7CFC7] focus:border-[#C87829] focus:ring-[#C87829]/15"
                            }`}
                          />

                          {colorBlur && (
                            <p className="mt-1 text-[10px] text-red-500">
                              The 'Colour' field cannot be <br /> blank.
                            </p>
                          )}

                          {colorSuggestions[`${pet.id}-${colorIndex}`]?.length >
                            0 && (
                            <div className="absolute left-0 top-9 z-50 max-h-32 w-full overflow-y-auto rounded-[3px] border border-[#D7CFC7] bg-white shadow-md">
                              {colorSuggestions[`${pet.id}-${colorIndex}`].map(
                                (suggestion) => (
                                  <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() =>
                                      selectColorSuggestion(
                                        pet.id,
                                        colorIndex,
                                        suggestion,
                                      )
                                    }
                                    className="block w-full px-2.5 py-2 text-left text-[10px] text-[#4F4740] hover:bg-[#FFF3E5]"
                                  >
                                    {suggestion}
                                  </button>
                                ),
                              )}
                            </div>
                          )}

                          {colorErrors[`${pet.id}-${colorIndex}`] && (
                            <p className="mt-1 text-[8px] leading-tight text-[#E24A3B]">
                              {colorErrors[`${pet.id}-${colorIndex}`]}
                            </p>
                          )}

                          {colorIndex > 0 && (
                            <label className="pointer-events-none absolute left-2 -top-1.25 bg-white px-1 text-[8px] leading-none text-[#766F68]">
                              Color {colorIndex + 1}
                            </label>
                          )}

                          {colorIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => deleteColor(pet.id, colorIndex)}
                              aria-label={`Delete Color ${colorIndex + 1}`}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F0442E] hover:opacity-70"
                            >
                              <Trash2 size={10} strokeWidth={1.8} />
                            </button>
                          )}
                        </div>
                      ))}

                      {!pet.saved && (
                        <button
                          type="button"
                          onClick={() => addColor(pet.id)}
                          className="mt-0.5 flex items-center gap-1 text-[11px] font-medium uppercase text-[#C87829] hover:text-[#A96120]"
                        >
                          <Plus size={10} strokeWidth={1.8} />
                          ADD COLOR {pet.colors.length + 1}
                        </button>
                      )}
                    </div>

                    <div className="px-2">
                      <input
                        type="text"
                        placeholder="C.A.R Tag (Optional)"
                        value={pet.carTag}
                        onChange={(event) =>
                          updatePet(pet.id, "carTag", event.target.value)
                        }
                        className="h-8 w-full rounded-[3px] border border-[#D7CFC7] bg-white px-2.5 font-medium text-[10px] text-[#4F4740] outline-none transition-colors placeholder:text-[#77716B] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/15"
                      />
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => deletePet(pet.id)}
                        disabled={pets.length === 1}
                        aria-label="Delete pet"
                        className="text-[#F0442E] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-100"
                      >
                        <Trash2 size={17} strokeWidth={1.7} />
                      </button>
                    </div>
                  </div>

                  {!pet.saved && (
                    <div className="flex justify-end px-4 pb-3.5 pt-2">
                      <button
                        type="button"
                        onClick={() => savePet(pet.id)}
                        disabled={!isPetValid(pet)}
                        className={`h-7.5 rounded-[3px] border px-5 text-[10px] font-medium transition-colors ${isPetValid(pet) ? "border-[#D99355] bg-white text-[#C87829] hover:bg-[#FFF7EF]" : "cursor-not-allowed border-[#E0D5CA] bg-white text-[#B8AEA5]"}`}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {showEnterNextButton && (
              <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#F1EAE3] px-4 py-3.5">
                <span className="text-[10px] font-medium text-[#3F342B]">
                  Total Pet(s) Added : {savedPets.length}
                </span>

                <button
                  type="button"
                  onClick={addNextPet}
                  className="h-7.5 rounded-[3px] border border-[#D99355] bg-white px-4 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF7EF]"
                >
                  {getNextPetText()}
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <div className="bg-[#FBF2E9] px-4 py-3.5">
              <p className="text-[10px] font-medium text-[#3F342B]">
                Pet Details
              </p>
            </div>

            {pets.map((pet, index) => {
              const microchipStatus = getMicrochipStatus(pet.microchipNumber);

              const error = microchipErrors[pet.id];

              return (
                <div key={pet.id} className="border-t border-[#F0E8E0] p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#624F3E]">
                      Pet {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() => deletePet(pet.id)}
                      disabled={pets.length === 1}
                      aria-label="Delete pet"
                      className="text-[#F0442E] disabled:opacity-30"
                    >
                      <Trash2 size={16} strokeWidth={1.7} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[10px] font-medium text-[#3F342B]">
                        Microchip Number
                      </label>

                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={19}
                        value={pet.microchipNumber}
                        onChange={(event) =>
                          handleMicrochipChange(pet.id, event.target.value)
                        }
                        className={`h-8.5 w-full rounded-[3px] border px-2.5 text-[10px] outline-none ${error ? "border-[#E24A3B]" : "border-[#D7CFC7]"} focus:border-[#C87829]`}
                      />

                      {microchipStatus.status === "prepaid" && !error && (
                        <span className="mt-1 inline-flex rounded-full bg-[#55C879] px-2 py-0.5 text-[8px] font-medium text-white">
                          Prepaid
                        </span>
                      )}

                      {microchipStatus.status === "non-prepaid" && !error && (
                        <span className="mt-1 inline-flex rounded-full bg-[#61B4D5] px-2 py-0.5 text-[8px] font-medium text-white">
                          Non - Prepaid ($9.95)
                        </span>
                      )}

                      {error && (
                        <p className="mt-1 text-[8px] text-[#E24A3B]">
                          {error}
                        </p>
                      )}

                      {!pet.saved &&
                        pet.microchipNumber.replace(/\s/g, "").length === 0 && (
                          <button
                            type="button"
                            className="mt-1.5 text-[9px] font-medium text-[#C87829]"
                            onClick={() => setShowComponent(true)}
                          >
                            SCAN BAR CODE
                          </button>
                        )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-medium text-[#3F342B]">
                        Pet Name (Optional)
                      </label>

                      <input
                        type="text"
                        placeholder="Pet Name"
                        value={pet.petName}
                        onChange={(event) =>
                          updatePet(pet.id, "petName", event.target.value)
                        }
                        className="h-8.5 w-full rounded-[3px] border border-[#D7CFC7] px-2.5 text-[10px] outline-none placeholder:text-[#77716B] focus:border-[#C87829]"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-medium text-[#3F342B]">
                        Sex
                      </label>

                      <div className="relative">
                        <select
                          value={pet.sex}
                          onChange={(event) =>
                            updatePet(pet.id, "sex", event.target.value)
                          }
                          className={`h-8.5 w-full appearance-none rounded-[3px] border border-[#D7CFC7] bg-white px-2.5 text-[10px] outline-none focus:border-[#C87829] ${
                            pet.sex
                              ? "font-bold text-[#4F4740]"
                              : "font-normal text-[#77716B]"
                          }`}
                        >
                          <option value="">Sex</option>
                          <option value="Male" className="font-bold">
                            Male
                          </option>
                          <option value="Female" className="font-bold">
                            Female
                          </option>
                        </select>

                        <ChevronDown
                          size={12}
                          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C87829]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-[10px] font-medium text-[#3F342B]">
                        Color
                      </label>

                      {pet.colors.map((color, colorIndex) => (
                        <div
                          key={`${pet.id}-mobile-${colorIndex}`}
                          className="relative mb-3"
                        >
                          <input
                            type="text"
                            value={color}
                            onChange={(event) =>
                              updateColor(
                                pet.id,
                                colorIndex,
                                event.target.value,
                              )
                            }
                            placeholder={colorIndex === 0 ? "Color" : ""}
                            className={`h-8 w-full rounded-[3px] border bg-white px-2.5 text-[10px] text-[#4F4740] outline-none transition-colors placeholder:text-[#77716B] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/15 ${
                              colorErrors[`${pet.id}-${colorIndex}`]
                                ? "border-[#E24A3B]"
                                : "border-[#D7CFC7]"
                            }`}
                          />

                          {colorErrors[`${pet.id}-${colorIndex}`] && (
                            <p className="mt-1 text-[8px] leading-tight text-[#E24A3B]">
                              {colorErrors[`${pet.id}-${colorIndex}`]}
                            </p>
                          )}

                          {colorIndex > 0 && (
                            <label className="pointer-events-none absolute left-2 -top-1.25 bg-white px-1 text-[8px] leading-none text-[#766F68]">
                              Color {colorIndex + 1}
                            </label>
                          )}

                          {colorIndex > 0 && !pet.saved && (
                            <button
                              type="button"
                              onClick={() => deleteColor(pet.id, colorIndex)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F0442E]"
                            >
                              <Trash2 size={10} />
                            </button>
                          )}
                        </div>
                      ))}

                      {!pet.saved && (
                        <button
                          type="button"
                          onClick={() => addColor(pet.id)}
                          className="flex items-center gap-1 text-[9px] font-medium text-[#C87829]"
                        >
                          <Plus size={10} />
                          ADD COLOR {pet.colors.length + 1}
                        </button>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[10px] font-medium text-[#3F342B]">
                        C.A.R Tag (Optional)
                      </label>

                      <input
                        type="text"
                        placeholder="C.A.R Tag"
                        value={pet.carTag}
                        onChange={(event) =>
                          updatePet(pet.id, "carTag", event.target.value)
                        }
                        className="h-8.5 w-full rounded-[3px] border border-[#D7CFC7] px-2.5 text-[10px] outline-none placeholder:text-[#77716B] focus:border-[#C87829]"
                      />
                    </div>
                  </div>

                  {!pet.saved && (
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => savePet(pet.id)}
                        disabled={!isPetValid(pet)}
                        className={`h-7.75 rounded-[3px] border px-5 text-[10px] font-medium ${isPetValid(pet) ? "border-[#D99355] bg-white text-[#C87829]" : "cursor-not-allowed border-[#E0D5CA] bg-white text-[#B8AEA5]"}`}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {showEnterNextButton && (
              <div className="flex flex-col items-end gap-3 border-t border-[#F0E8E0] px-4 py-3">
                <span className="text-[10px] font-medium text-[#3F342B]">
                  Total Pet(s) Added : {savedPets.length}
                </span>

                <button
                  type="button"
                  onClick={addNextPet}
                  className="h-7.75 rounded-[3px] border border-[#D99355] bg-white px-4 text-[10px] font-medium text-[#C87829]"
                >
                  {getNextPetText()}
                </button>
              </div>
            )}
          </div>
        </div>

        {savedPets.some(
          (pet) =>
            getMicrochipStatus(pet.microchipNumber).status === "non-prepaid",
        ) && (
          <div className="mt-7 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-[#F9E9D4] px-8 py-4 text-[12px] text-[#5E554D] shadow-[0_1px_5px_rgba(80,50,20,0.04)]">
              <span>▣</span>

              <span>
                You will be invoiced{" "}
                <strong className="text-[#17120F]">$9.95</strong> for this
                subscription
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="button"
            disabled={!isNextEnabled}
            onClick={handleNext}
            className={`mt-7 h-8.75 w-46.75 rounded-[3px] text-[12px] font-medium text-white transition-all duration-200 ${isNextEnabled ? "cursor-pointer bg-[#C87829] hover:bg-[#B96D21]" : "cursor-not-allowed bg-[#E7C9A5]"}`}
          >
            {isEditMode ? "Update" : "Next"}
          </button>
        </div>
      </section>
      {showComponent && (
        <BarCode
          onClose={() => setShowComponent(false)}
          scanStatus={scanStatus}
          setScanStatus={setScanStatus}
        />
      )}
    </div>
  );
};

export default PetsDetail;
