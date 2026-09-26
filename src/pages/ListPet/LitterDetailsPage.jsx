import { useState } from "react";
import { ChevronLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLitterDetails } from "../../redux/listingSlice";

import ListingStepper from "../../components/listing/ListingStepper";

export default function LitterDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const litterDetails = useSelector((state) => state.listing.litterDetails);

  const breedOptions = [
    "German Shepherd",
    "Golden Retriever",
    "Great Dane",
    "Greyhound",
    "Giant Schnauzer",
    "Labrador Retriever",
    "Labradoodle",
    "Beagle",
    "Belgian Malinois",
    "Border Collie",
    "Boxer",
    "Bulldog",
    "Chihuahua",
    "Cocker Spaniel",
    "Dachshund",
    "Doberman",
    "French Bulldog",
    "Jack Russell Terrier",
    "Maltese",
    "Poodle",
    "Rottweiler",
    "Shih Tzu",
    "Siberian Husky",
    "Staffordshire Bull Terrier",
    "Whippet",
    "Yorkshire Terrier",
  ];

  const speciesOptions = ["Dog", "Cat", "Rabbit", "Bird", "Reptile", "Other"];

  const [focusedField, setFocusedField] = useState(null);
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);
  const [breedError, setBreedError] = useState("");
  const [speciesError, setSpeciesError] = useState("");
  const [showXBreed, setShowXBreed] = useState(false);
  const [xBreed, setXBreed] = useState("");
  const [xBreedFocused, setXBreedFocused] = useState(false);
  const [addModal, setAddModal] = useState(null);
  const [touched, setTouched] = useState({
    sourceNumber: false,
    implanterNumber: false,
    breederSupplyNumber: false,
  });

   const selectedListingType = useSelector(
    (state) => state.listing.selectedListingType,
  );

  // console.log(selectedListingType);

  const isInvalid = (fieldName) => {
    return (
      touched[fieldName] &&
      formData[fieldName].length !== 15 &&
      formData[fieldName].length >= 1
    );
  };

  const modalData = [
    {
      id: 1,
      name: "sourceNumber",
      questions: "What is this Source Number?",
      answer:
        "A Source Number is used to identify the source associated with the animal. It helps maintain accurate records and traceability.",
    },
    {
      id: 2,
      name: "implantNumber",
      questions: "What is this Implant Number?",
      answer:
        "An Implant Number is used to identify the implant associated with the animal. It helps maintain accurate records and traceability.",
    },
    {
      id: 3,
      name: "breederNumber",
      questions: "What is this Breeder Number?",
      answer:
        "A Breeder Supply Number is used to identify the breeder associated with the supply of the animal. It helps maintain accurate records and traceability.",
    },
  ];

  const selectedModal = modalData.find((modal) => modal.name === addModal);

  const [formData, setFormData] = useState({
    implantDate: litterDetails?.implantDate || "",
    dob: litterDetails?.dob || "",
    breed: litterDetails?.breed || "",
    species: litterDetails?.species || "",
    sourceNumber: litterDetails?.sourceNumber || "",
    implanterNumber: litterDetails?.implanterNumber || "",
    breederSupplyNumber: litterDetails?.breederSupplyNumber || "",
  });

  const [breederSupplyNotRequired, setBreederSupplyNotRequired] =
    useState(false);

  const getNextDay = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      let updatedValue = value;

      if (name === "implanterNumber") {
        updatedValue = value.replace(/\D/g, "").slice(0, 15);
      }

      if (name === "sourceNumber") {
        updatedValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15);
      }

      if (name === "breederSupplyNumber") {
        updatedValue = value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15);
      }

      const updated = {
        ...current,
        [name]: updatedValue,
      };

      if (
        name === "dob" &&
        updated.implantDate &&
        updated.implantDate <= updatedValue
      ) {
        updated.implantDate = "";
      }

      return updated;
    });
  };

  const handleBack = () => {
    navigate("/list-pet");
  };

  const handleBreedChange = (event) => {
    const value = event.target.value;

    setFormData((current) => ({
      ...current,
      breed: value,
    }));

    setBreedError("");

    setShowBreedDropdown(true);
  };

  const handleSpeciesChange = (event) => {
    const value = event.target.value;

    setFormData((current) => ({
      ...current,
      species: value,
    }));

    const exactMatch = speciesOptions.some(
      (species) => species.toLowerCase() === value.trim().toLowerCase(),
    );

    setSpeciesError(
      exactMatch || value.trim() === ""
        ? ""
        : "Please select a valid species from the dropdown.",
    );
  };

  const isBreedValid = breedOptions.some(
    (breed) => breed.toLowerCase() === formData.breed.trim().toLowerCase(),
  );

  const isSpeciesValid = speciesOptions.some(
    (species) =>
      species.toLowerCase() === formData.species.trim().toLowerCase(),
  );

  const isFormValid =
    formData.implantDate &&
    formData.dob &&
    isBreedValid &&
    isSpeciesValid &&
    formData.species &&
    formData.sourceNumber &&
    /^\d{15}$/.test(formData.implanterNumber) &&
    (breederSupplyNotRequired || formData.breederSupplyNumber);

  const handleNext = () => {
    if (!isFormValid) return;

    dispatch(
      setLitterDetails({
        ...formData,
        xBreed,
        breederSupplyNotRequired,
      }),
    );

    navigate("/list-pet/litter/pets-detail");
  };

  return (
    <div className="w-full">
      <section className="mt-5 w-full rounded-md bg-[#FFFEFD] px-3 py-4 sm:py-5 lg:px-4 lg:py-4">
        <ListingStepper currentStep={1} />

        <div className="relative mt-5 flex h-6.75 items-center justify-center">
          {/* Back */}
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-1 text-[11px] font-medium text-[#C87829] transition-colors hover:text-[#A95F18]"
          >
            <ChevronLeft size={15} strokeWidth={1.8} />
            Back
          </button>

          {/* Title */}
          <h1 className="text-[15px] font-medium leading-none text-[#40372F]">
            Enter Litter Details
          </h1>
        </div>

        <div className="mt-5 rounded-md bg-white px-4 py-5 sm:px-6 sm:py-6">
          <div className="mx-auto w-full max-w-73">
            <div className="relative">
              <label
                htmlFor="implantDate"
                className={`pointer-events-none absolute left-2 z-10 px-1 text-[11px] leading-none transition-all duration-150 ${
                  focusedField === "implantDate" || formData.implantDate
                    ? "-top-1.25 bg-white text-[#624F3E]"
                    : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                }`}
              >
                Implant Date
              </label>

              {/* Visible input */}
              <input
                id="implantDate"
                type="text"
                name="implantDate"
                value={formData.implantDate}
                onChange={handleChange}
                onFocus={() => setFocusedField("implantDate")}
                onBlur={() => setFocusedField(null)}
                readOnly
                className="h-8.75 w-full rounded-xs border font-medium border-[#BEB8B2] bg-white px-2 text-[11px] text-[#5E554D] outline-none transition-colors focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
              />

              <input
                type="date"
                tabIndex="-1"
                aria-hidden="true"
                min={getNextDay(formData.dob)}
                max={
                  formData.implantDate
                    ? new Date(
                        new Date(`${formData.implantDate}T00:00:00`).getTime() -
                          86400000,
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                className="absolute h-0 w-0 opacity-0"
                onChange={(event) => {
                  const value = event.target.value;
                  const today = new Date().toISOString().split("T")[0];

                  if (value > today) {
                    return;
                  }

                  if (formData.dob && value <= formData.dob) {
                    return;
                  }

                  handleChange({
                    target: {
                      name: "implantDate",
                      value,
                    },
                  });
                }}
              />

              <button
                type="button"
                onClick={(event) => {
                  const dateInput =
                    event.currentTarget.parentElement.querySelector(
                      'input[type="date"]',
                    );

                  if (dateInput?.showPicker) {
                    dateInput.showPicker();
                  } else {
                    dateInput?.click();
                  }

                  setFocusedField("implantDate");
                }}
                className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-center p-1"
                aria-label="Select implant date"
              >
                <CalendarDays
                  size={18}
                  strokeWidth={1.7}
                  className="text-[#C87829]"
                />
              </button>
            </div>

            <div className="relative mt-5">
              <label
                htmlFor="dob"
                className={`pointer-events-none absolute left-2 z-10 px-1 text-[11px] leading-none transition-all duration-150 ${
                  focusedField === "dob" || formData.dob
                    ? "-top-1.25 bg-white text-[#624F3E]"
                    : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                }`}
              >
                DOB
              </label>

              <input
                id="dob"
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                onFocus={() => setFocusedField("dob")}
                onBlur={() => setFocusedField(null)}
                readOnly
                className="h-8 w-full rounded-xs border font-medium border-[#BEB8B2] bg-white px-2 text-[11px] text-[#5E554D] outline-none transition-colors focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
              />

              <input
                type="date"
                tabIndex="-1"
                aria-hidden="true"
                max={
                  formData.implantDate
                    ? new Date(
                        new Date(`${formData.implantDate}T00:00:00`).getTime() -
                          86400000,
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                className="absolute h-0 w-0 opacity-0"
                onChange={(event) => {
                  const value = event.target.value;
                  const today = new Date().toISOString().split("T")[0];

                  if (value > today) {
                    return;
                  }

                  if (formData.implantDate && value >= formData.implantDate) {
                    return;
                  }

                  handleChange({
                    target: {
                      name: "dob",
                      value,
                    },
                  });

                  setFocusedField(null);
                  event.target.blur();
                }}
              />

              <button
                type="button"
                onClick={(event) => {
                  const dateInput =
                    event.currentTarget.parentElement.querySelector(
                      'input[type="date"]',
                    );

                  if (dateInput?.showPicker) {
                    dateInput.showPicker();
                  } else {
                    dateInput?.click();
                  }

                  setFocusedField("dob");
                }}
                className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-center p-1"
                aria-label="Select date of birth"
              >
                <CalendarDays
                  size={18}
                  strokeWidth={1.7}
                  className="text-[#C87829]"
                />
              </button>
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="breed"
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={() => handleBreedChange(event)}
                  onFocus={() => {
                    setFocusedField("breed");
                    setShowBreedDropdown(true);
                  }}
                  onBlur={() => {
                    setTimeout(() => {
                      setShowBreedDropdown(false);

                      const value = formData.breed.trim();

                      if (!value) {
                        setBreedError("");
                        return;
                      }

                      const isValid = breedOptions.some(
                        (breed) => breed.toLowerCase() === value.toLowerCase(),
                      );

                      setBreedError(
                        isValid
                          ? ""
                          : "Please select a valid breed from the dropdown.",
                      );
                    }, 150);
                  }}
                  placeholder={focusedField === "breed" ? "" : "Breed"}
                  autoComplete="off"
                  className={`h-8 w-full rounded-xs border bg-white px-2 text-[11px] font-medium text-[#5E554D] outline-none transition-colors placeholder:text-[#766F68] focus:ring-1 ${
                    breedError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                />

                {breedError && (
                  <p className="mt-1 text-[10px] text-red-500">{breedError}</p>
                )}

                <label
                  htmlFor="breed"
                  className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                    focusedField === "breed" || formData.breed
                      ? "-top-1.25 bg-white text-[#624F3E]"
                      : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                  }`}
                >
                  Breed
                </label>

                {showBreedDropdown && (
                  <div className="absolute left-0 top-9 z-50 w-full overflow-hidden rounded-xs border border-[#D8D0C8] bg-white shadow-[0_4px_12px_rgba(80,50,20,0.10)]">
                    {breedOptions
                      .filter((breed) =>
                        breed
                          .toLowerCase()
                          .includes(formData.breed.toLowerCase()),
                      )
                      .slice(0, 3)
                      .map((breed) => (
                        <button
                          key={breed}
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();

                            setFormData((current) => ({
                              ...current,
                              breed,
                            }));

                            setBreedError("");
                            setShowBreedDropdown(false);

                            if (breed) {
                              setFormData((current) => ({
                                ...current,
                                species: "",
                              }));
                            }
                          }}
                          className="block w-full px-3 py-2 text-left text-[11px] text-[#5E554D] transition-colors hover:bg-[#FFF4E8]"
                        >
                          {breed}
                        </button>
                      ))}

                    {breedOptions.filter((breed) =>
                      breed
                        .toLowerCase()
                        .includes(formData.breed.toLowerCase()),
                    ).length === 0 && (
                      <div className="px-3 py-2 text-[11px] text-[#8A8179]">
                        No breeds found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {showXBreed && (
                <div className="relative mt-5">
                  <input
                    type="text"
                    value={xBreed}
                    onChange={(event) => setXBreed(event.target.value)}
                    onFocus={() => setXBreedFocused(true)}
                    onBlur={() => setXBreedFocused(false)}
                    placeholder={xBreedFocused ? "" : "X-Breed"}
                    className="h-8 w-full rounded-xs border border-[#BEB8B2] bg-white px-2 text-[11px] font-medium text-[#5E554D] outline-none transition-colors placeholder:text-[#766F68] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                  />

                  <label
                    className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                      xBreedFocused || xBreed
                        ? "-top-1.25 bg-white text-[#624F3E]"
                        : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                    }`}
                  >
                    X-Breed
                  </label>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowXBreed((current) => !current)}
                className="mt-1 ml-auto block text-[10px] font-medium text-[#C87829] hover:underline"
              >
                {showXBreed ? "- REMOVE X-BREED" : "+ ADD X-BREED"}
              </button>
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="species"
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={(event) => {
                    handleSpeciesChange(event);
                    setShowSpeciesDropdown(true);
                  }}
                  onFocus={() => {
                    setFocusedField("species");
                    setShowSpeciesDropdown(true);
                  }}
                  onBlur={() => {
                    setFocusedField(null);
                    setTimeout(() => {
                      setShowSpeciesDropdown(false);
                    }, 150);
                  }}
                  placeholder={focusedField === "species" ? "" : "Species"}
                  autoComplete="off"
                  className="h-8 w-full rounded-xs border border-[#BEB8B2] bg-white px-2 font-medium text-[11px] text-[#5E554D] outline-none transition-colors placeholder:text-[#766F68] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                />

                {speciesError && (
                  <p className="mt-1 text-[10px] text-red-500">
                    {speciesError}
                  </p>
                )}

                <label
                  htmlFor="species"
                  className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                    focusedField === "species" || formData.species
                      ? "-top-1.25 bg-white text-[#624F3E]"
                      : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                  }`}
                >
                  Species
                </label>

                {showSpeciesDropdown && (
                  <div className="absolute left-0 top-9 z-50 w-full overflow-hidden rounded-xs border border-[#D8D0C8] bg-white shadow-[0_4px_12px_rgba(80,50,20,0.10)]">
                    {speciesOptions
                      .filter((species) =>
                        species
                          .toLowerCase()
                          .includes(formData.species.toLowerCase()),
                      )
                      .map((species) => (
                        <button
                          key={species}
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();

                            setFormData((current) => ({
                              ...current,
                              species,
                            }));

                            if (breedOptions && species !== "Dog") {
                              setFormData((current) => ({
                                ...current,
                                breed: "",
                              }));
                            }

                            setSpeciesError("");
                            setShowSpeciesDropdown(false);
                            setFocusedField(null);
                          }}
                          className="block w-full px-3 py-2 text-left text-[11px] text-[#5E554D] transition-colors hover:bg-[#FFF4E8]"
                        >
                          {species}
                        </button>
                      ))}

                    {speciesOptions.filter((species) =>
                      species
                        .toLowerCase()
                        .includes(formData.species.toLowerCase()),
                    ).length === 0 && (
                      <div className="px-3 py-2 text-[11px] text-[#8A8179]">
                        No species found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="sourceNumber"
                  type="text"
                  name="sourceNumber"
                  // autoComplete="off"
                  value={formData.sourceNumber}
                  onChange={() => handleChange(event)}
                  onFocus={() => setFocusedField("sourceNumber")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((current) => ({
                      ...current,
                      [event.target.name]: true,
                    }));
                  }}
                  placeholder={
                    focusedField === "sourceNumber"
                      ? ""
                      : "Source Number (VIC Only)"
                  }
                  className="h-8 w-full rounded-xs border border-[#BEB8B2] bg-white px-2 font-medium text-[11px] text-[#5E554D] outline-none transition-colors placeholder:text-[#766F68] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                />

                <label
                  htmlFor="sourceNumber"
                  className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                    focusedField === "sourceNumber" || formData.sourceNumber
                      ? "-top-1.25 bg-white text-[#624F3E]"
                      : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                  } ${isInvalid("sourceNumber") ? "text-red-500" : "text-[#766F68]"}`}
                >
                  Source Number (VIC Only)
                </label>
                {isInvalid("sourceNumber") && (
                  <p className="mt-1 text-[10px] text-red-500">
                    Invalid source number.
                  </p>
                )}
              </div>

              <button
                type="button"
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                onClick={() => setAddModal("sourceNumber")}
              >
                What is this?
              </button>
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="implanterNumber"
                  type="text"
                  name="implanterNumber"
                  value={formData.implanterNumber}
                  maxLength={15}
                  // autoComplete="off"
                  inputMode="numeric"
                  pattern="[0-9]{15}"
                  onChange={(event) => {
                    const numbersOnly = event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 15);

                    setFormData((current) => ({
                      ...current,
                      implanterNumber: numbersOnly,
                    }));
                  }}
                  onFocus={() => setFocusedField("implanterNumber")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((current) => ({
                      ...current,
                      [event.target.name]: true,
                    }));
                  }}
                  placeholder={
                    focusedField === "implanterNumber"
                      ? ""
                      : "Implanter Number (VIC Only)"
                  }
                  className="h-8 w-full rounded-xs border border-[#BEB8B2] bg-white px-2 font-medium text-[11px] text-[#5E554D] outline-none transition-colors placeholder:text-[#766F68] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                />

                {/* Floating Label */}
                <label
                  htmlFor="implanterNumber"
                  className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                    focusedField === "implanterNumber" ||
                    formData.implanterNumber
                      ? "-top-1.25 bg-white text-[#624F3E]"
                      : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                  } ${isInvalid("implanterNumber") ? "text-red-500" : "text-[#766F68]"}`}
                >
                  Implanter Number (VIC Only)
                </label>
                {isInvalid("implanterNumber") && (
                  <p className="mt-1 text-[10px] text-red-500">
                    Invalid implanter number.
                  </p>
                )}
              </div>

              <button
                type="button"
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                onClick={() => setAddModal("implantNumber")}
              >
                What is this?
              </button>
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="breederSupplyNumber"
                  type="text"
                  name="breederSupplyNumber"
                  value={formData.breederSupplyNumber}
                  // autoComplete="off"

                  onChange={handleChange}
                  onFocus={() => setFocusedField("breederSupplyNumber")}
                  onBlur={() => {
                    setFocusedField(null);
                    setTouched((current) => ({
                      ...current,
                      [event.target.name]: true,
                    }));
                  }}
                  disabled={breederSupplyNotRequired}
                  placeholder={
                    focusedField === "breederSupplyNumber"
                      ? ""
                      : "Breeder Supply Number (QLD Only)"
                  }
                  className={` h-8 w-full rounded-xs border px-2 font-medium text-[11px] outline-none transition-colors ${
                    breederSupplyNotRequired
                      ? "cursor-not-allowed border-[#D8D0C8] bg-[#F5F5F5] text-[#B5ADA5]"
                      : "border-[#BEB8B2] bg-white text-[#5E554D] focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                  }`}
                />

                <label
                  htmlFor="breederSupplyNumber"
                  className={`pointer-events-none absolute left-2 px-1 text-[11px] leading-none transition-all duration-150 ${
                    focusedField === "breederSupplyNumber" ||
                    formData.breederSupplyNumber
                      ? "-top-1.25 bg-white text-[#624F3E]"
                      : "top-1/2 -translate-y-1/2 bg-white text-[#766F68]"
                  } ${isInvalid("breederSupplyNumber") ? "text-red-500" : "text-[#766F68]"}`}
                >
                  Breeder Supply Number (QLD Only)
                </label>
                {isInvalid("breederSupplyNumber") && (
                  <p className="mt-1 text-[10px] text-red-500">
                    Invalid breeders supply number.
                  </p>
                )}
              </div>

              <button
                type="button"
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                onClick={() => setAddModal("breederNumber")}
              >
                What is this?
              </button>
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-2">
              <input
                type="checkbox"
                checked={breederSupplyNotRequired}
                onChange={(event) => {
                  const checked = event.target.checked;

                  setBreederSupplyNotRequired(checked);

                  if (checked) {
                    setFormData((current) => ({
                      ...current,
                      breederSupplyNumber: "",
                    }));

                    setTouched((current) => ({
                      ...current,
                      breederSupplyNumber: false,
                    }));

                    setFocusedField(null);
                  }
                }}
                className="mt-px h-3.75 w-3.75 shrink-0 cursor-pointer accent-[#C87829]"
              />

              <span className="text-[11px] leading-[1.35] text-[#5C5148] select-none">
                Tick this box if Breeder Supply Number
                <br />
                is not required.
              </span>
            </label> 

            <button
              type="button"
              disabled={!isFormValid}
              onClick={handleNext}
              className={`mt-5 h-10.5 w-full rounded-sm px-5 text-[11px] font-medium text-white transition-all duration-200 ${
                isFormValid
                  ? "cursor-pointer bg-[#C87829] hover:bg-[#B96D21]"
                  : "cursor-not-allowed bg-[#E7C9A5]"
              }`}
            >
              Next
            </button>

            {selectedModal && (
              <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 px-4 backdrop-blur-[2px]">
                <div className="w-full max-w-105 rounded-[14px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-[18px] font-bold text-[#4F4740]">
                      {selectedModal.questions}
                    </h2>

                    <button
                      type="button"
                      onClick={() => setAddModal(null)}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[18px] text-[#8A8179] hover:bg-[#F7E7D1] hover:text-[#C87829]"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg bg-[#FFF8EF] p-4">
                    <p className="text-[11px] leading-4.75 text-[#5E554D]">
                      {selectedModal.answer}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAddModal(null)}
                    className="mt-6 h-9 w-full rounded-[5px] bg-[#C87829] text-[11px] font-bold text-white hover:bg-[#B66B24]"
                  >
                    GOT IT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
