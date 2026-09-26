import { useState } from "react";
import { ChevronLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setLitterDetails } from "../../redux/listingSlice";

export default function EditLitterDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const litterDetails = useSelector((state) => state.listing.litterDetails);

  const litter = litterDetails || {};

  const breedOptions = [
    {
      dogBreeds: [
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
      ],
    },
    {
      catBreeds: [
        "Abyssinian",
        "American Shorthair",
        "Bengal",
        "Birman",
        "British Shorthair",
        "Burmese",
        "Devon Rex",
        "Maine Coon",
        "Persian",
        "Ragdoll",
        "Russian Blue",
        "Scottish Fold",
        "Siamese",
        "Sphynx",
      ],
    },
  ];

  const speciesOptions = ["Dog", "Cat", "Rabbit", "Bird", "Reptile", "Other"];

  const initialFormData = {
    implantDate: litter.implantDate || "",
    dob: litter.dob || "",
    breed: litter.breed || "",
    species: litter.species || "",
    sourceNumber: litter.sourceNumber || "",
    implanterNumber: litter.implanterNumber || "",
    breederSupplyNumber: litter.breederSupplyNumber || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [breederSupplyNotRequired, setBreederSupplyNotRequired] = useState(
    litter.breederSupplyNotRequired || false,
  );

  const [focusedField, setFocusedField] = useState(null);
  const [showBreedDropdown, setShowBreedDropdown] = useState(false);
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);

  const [breedError, setBreedError] = useState("");
  const [speciesError, setSpeciesError] = useState("");

  const [showXBreed, setShowXBreed] = useState(Boolean(litter.xBreed));
  const [xBreed, setXBreed] = useState(litter.xBreed || "");
  const [xBreedFocused, setXBreedFocused] = useState(false);

  const [addModal, setAddModal] = useState(null);

  const [touched, setTouched] = useState({
    sourceNumber: false,
    implanterNumber: false,
    breederSupplyNumber: false,
  });

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

  const selectedBreeds =
    formData.species === "Dog"
      ? breedOptions[0].dogBreeds
      : formData.species === "Cat"
        ? breedOptions[1].catBreeds
        : [];

  const filteredBreeds = selectedBreeds.filter((breed) =>
    breed.toLowerCase().includes(formData.breed.toLowerCase()),
  );

  const getNextDay = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);
    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    if (!year || !month || !day) return "";

    return `${day} - ${month} - ${year}`;
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

  const handleBreedChange = (event) => {
    const value = event.target.value;

    setFormData((current) => ({
      ...current,
      breed: value,
    }));

    setBreedError("");

    if (value.trim()) {
      setShowBreedDropdown(true);
    } else {
      setShowBreedDropdown(false);
    }
  };

  const handleBreedSelect = (breed) => {
    setFormData((current) => ({
      ...current,
      breed,
    }));

    setBreedError("");
    setShowBreedDropdown(false);
  };

  const handleSpeciesSelect = (species) => {
    setFormData((current) => ({
      ...current,
      species,
      breed: "",
    }));

    setSpeciesError("");
    setBreedError("");
    setShowSpeciesDropdown(false);
    setShowBreedDropdown(false);
  };

  const isInvalid = (fieldName) => {
    return (
      touched[fieldName] &&
      formData[fieldName].length !== 15 &&
      formData[fieldName].length >= 1
    );
  };

  const isFormValid =
    formData.implantDate &&
    formData.dob &&
    formData.implantDate > formData.dob &&
    formData.breed &&
    selectedBreeds.includes(formData.breed) &&
    formData.species &&
    formData.sourceNumber &&
    formData.sourceNumber.length <= 15 &&
    /^\d{15}$/.test(formData.implanterNumber) &&
    (breederSupplyNotRequired || formData.breederSupplyNumber);

  const handleUpdate = () => {
    if (!isFormValid) return;

    dispatch(
      setLitterDetails({
        ...formData,
        xBreed,
        breederSupplyNotRequired,
      }),
    );

    navigate("/list-pet/litter/reviewsubmit");
  };

  const handleBack = () => {
    navigate("/list-pet/litter/reviewsubmit");
  };

  return (
    <div className="flex w-full flex-col">
      <section className="flex min-h-[calc(100vh-170px)] w-full flex-1 flex-col rounded-md bg-[#FFFCF9] px-4 py-5 sm:px-7 sm:py-6 lg:px-6 lg:py-4">
        {/* Header */}
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-1 text-[12px] font-medium text-[#C87829] transition-colors hover:text-[#A85F1C]"
          >
            <ChevronLeft size={15} strokeWidth={2.5} />
            Back to Review & Submit
          </button>

          <h1 className="text-[18px] font-semibold text-[#4B4036]">
            Edit Litter Details
          </h1>
        </div>

        {/* Form */}
        <div className="mt-5 flex flex-1 justify-center">
          <div className="w-full bg-[#FFFEFD] rounded-4xl px-4 py-5 sm:px-8 sm:py-6 lg:max-w-300 lg:px-8 lg:py-5">
            <div className="mx-auto w-full lg:max-w-75.25">
              {/* Implant Date */}
              <div className="relative">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    focusedField === "implantDate"
                      ? "border-[#624F3E]"
                      : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label
                    className={`absolute left-2 z-10 bg-white px-1 text-[11px] transition-all ${
                      formData.implantDate || focusedField === "implantDate"
                        ? "-top-1.5 text-[#624F3E]"
                        : "top-1/2 -translate-y-1/2 text-[#8B8178]"
                    }`}
                  >
                    Implant Date
                  </label>

                  <input
                    type="text"
                    value={formatDate(formData.implantDate)}
                    readOnly
                    onFocus={() => setFocusedField("implantDate")}
                    onBlur={() => setFocusedField(null)}
                    onClick={(event) => {
                      event.currentTarget.nextElementSibling?.showPicker?.();
                    }}
                    className="h-full w-full cursor-pointer bg-transparent px-2 text-[12px] font-medium text-[#51473F] outline-none"
                  />

                  <input
                    type="date"
                    value={formData.implantDate}
                    min={getNextDay(formData.dob)}
                    onChange={handleChange}
                    name="implantDate"
                    className="pointer-events-none absolute inset-0 opacity-0"
                  />

                  <CalendarDays
                    size={19}
                    strokeWidth={2.5}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#C87829]"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="relative mt-4">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    focusedField === "dob"
                      ? "border-[#624F3E]"
                      : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label
                    className={`absolute left-2 z-10 bg-white px-1 text-[11px] transition-all ${
                      formData.dob || focusedField === "dob"
                        ? "-top-1.5 text-[#624F3E]"
                        : "top-1/2 -translate-y-1/2 text-[#8B8178]"
                    }`}
                  >
                    DOB
                  </label>

                  <input
                    type="text"
                    value={formatDate(formData.dob)}
                    readOnly
                    onFocus={() => setFocusedField("dob")}
                    onBlur={() => setFocusedField(null)}
                    onClick={(event) => {
                      event.currentTarget.nextElementSibling?.showPicker?.();
                    }}
                    className="h-full w-full cursor-pointer bg-transparent px-2 text-[11px] font-medium text-[#51473F] outline-none"
                  />

                  <input
                    type="date"
                    value={formData.dob}
                    max={getNextDay(formData.implantDate) || undefined}
                    onChange={handleChange}
                    name="dob"
                    className="pointer-events-none absolute inset-0 opacity-0"
                  />

                  <CalendarDays
                    size={19}
                    strokeWidth={2.5}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#C87829]"
                  />
                </div>
              </div>

              {/* Breed */}
              <div className="relative mt-4">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    breedError
                      ? "border-red-400"
                      : focusedField === "breed"
                        ? "border-[#624F3E]"
                        : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label
                    className={`absolute left-2 z-10 bg-white px-1 text-[11px] transition-all ${
                      formData.breed || focusedField === "breed"
                        ? "-top-1.5 text-[#624F3E]"
                        : "top-1/2 -translate-y-1/2 text-[#8B8178]"
                    }`}
                  >
                    Breed
                  </label>

                  <input
                    type="text"
                    value={formData.breed}
                    onChange={handleBreedChange}
                    onFocus={() => {
                      setFocusedField("breed");
                      if (formData.breed) {
                        setShowBreedDropdown(true);
                      }
                    }}
                    onBlur={() => {
                      setFocusedField(null);

                      setTimeout(() => {
                        setShowBreedDropdown(false);
                      }, 150);

                      if (
                        formData.breed &&
                        !selectedBreeds.includes(formData.breed)
                      ) {
                        setBreedError("Please select a valid breed.");
                      }
                    }}
                    placeholder=" "
                    disabled={!formData.species}
                    className="peer h-full w-full bg-transparent px-2 text-[11px] font-medium text-[#51473F] outline-none disabled:cursor-not-allowed disabled:bg-[#FAF8F5]"
                  />
                </div>

                {showBreedDropdown && filteredBreeds.length > 0 && (
                  <div className="absolute left-0 right-0 top-11.25 z-30 max-h-40 overflow-y-auto rounded-[3px] border border-[#D6C8BA] bg-white shadow-md">
                    {filteredBreeds.map((breed) => (
                      <button
                        key={breed}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleBreedSelect(breed)}
                        className="block w-full px-3 py-2 text-left text-[11px] text-[#51473F] hover:bg-[#F7E7D1]"
                      >
                        {breed}
                      </button>
                    ))}
                  </div>
                )}

                {breedError && (
                  <p className="mt-1 text-[9px] text-red-500">{breedError}</p>
                )}
              </div>

              {/* Add X Breed */}
              <button
                type="button"
                onClick={() => setShowXBreed((current) => !current)}
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
              >
                {showXBreed ? "- REMOVE X-BREED" : "+ ADD X-BREED"}
              </button>

              {showXBreed && (
                <div className="relative mt-4">
                  <div
                    className={`relative h-10.5 rounded-[3px] border ${
                      xBreedFocused ? "border-[#624F3E]" : "border-[#9B8B7C]"
                    } bg-white`}
                  >
                    <label
                      className={`absolute left-2 z-10 bg-white px-1 text-[11px] transition-all ${
                        xBreed || xBreedFocused
                          ? "-top-1.5 text-[#624F3E]"
                          : "top-1/2 -translate-y-1/2 text-[#8B8178]"
                      }`}
                    >
                      X-Breed
                    </label>

                    <input
                      type="text"
                      value={xBreed}
                      onChange={(event) => setXBreed(event.target.value)}
                      onFocus={() => setXBreedFocused(true)}
                      onBlur={() => setXBreedFocused(false)}
                      placeholder=" "
                      className="h-full w-full bg-transparent px-2 text-[11px] font-medium text-[#51473F] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Species */}
              <div className="relative mt-5">
                <button
                  type="button"
                  onClick={() => setShowSpeciesDropdown((current) => !current)}
                  className={`relative flex h-10.5 w-full items-center rounded-[3px] border ${
                    speciesError ? "border-red-400" : "border-[#9B8B7C]"
                  } bg-white px-2 text-left`}
                >
                  <span
                    className={`absolute left-2 bg-white px-1 text-[11px] ${
                      formData.species
                        ? "-top-1.5 text-[#624F3E]"
                        : "top-1/2 -translate-y-1/2 text-[#8B8178]"
                    }`}
                  >
                    Species
                  </span>

                  <span className="text-[11px] font-medium text-[#51473F]">
                    {formData.species}
                  </span>
                </button>

                {showSpeciesDropdown && (
                  <div className="absolute left-0 right-0 top-11.25 z-30 rounded-[3px] border border-[#D6C8BA] bg-white shadow-md">
                    {speciesOptions.map((species) => (
                      <button
                        key={species}
                        type="button"
                        onClick={() => handleSpeciesSelect(species)}
                        className="block w-full px-3 py-2 text-left text-[11px] text-[#51473F] hover:bg-[#F7E7D1]"
                      >
                        {species}
                      </button>
                    ))}
                  </div>
                )}

                {speciesError && (
                  <p className="mt-1 text-[9px] text-red-500">{speciesError}</p>
                )}
              </div>

              {/* Source Number */}
              <div className="relative mt-4">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    isInvalid("sourceNumber")
                      ? "border-red-400"
                      : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label className="absolute -top-1.5 left-2 z-10 bg-white px-1 text-[11px] text-[#624F3E]">
                    Source Number (VIC Only)
                  </label>

                  <input
                    type="text"
                    name="sourceNumber"
                    value={formData.sourceNumber}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((current) => ({
                        ...current,
                        sourceNumber: true,
                      }))
                    }
                    inputMode="text"
                    maxLength={15}
                    className="h-full w-full bg-transparent px-2 text-[11px] font-medium text-[#51473F] outline-none"
                  />
                </div>

                {isInvalid("sourceNumber") && (
                  <p className="mt-1 text-[9px] text-red-500">
                    Maximum 15 characters.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setAddModal("sourceNumber")}
                  className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                >
                  What is this?
                </button>
              </div>

              {/* Implanter Number */}
              <div className="relative mt-5">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    isInvalid("implanterNumber")
                      ? "border-red-400"
                      : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label className="absolute -top-1.5 left-2 z-10 bg-white px-1 text-[11px] text-[#624F3E]">
                    Implanter Number (VIC Only)
                  </label>

                  <input
                    type="text"
                    name="implanterNumber"
                    value={formData.implanterNumber}
                    onChange={handleChange}
                    onBlur={() =>
                      setTouched((current) => ({
                        ...current,
                        implanterNumber: true,
                      }))
                    }
                    inputMode="numeric"
                    maxLength={15}
                    className="h-full w-full bg-transparent px-2 text-[11px] font-medium text-[#51473F] outline-none"
                  />
                </div>

                {isInvalid("implanterNumber") && (
                  <p className="mt-1 text-[9px] text-red-500">
                    Enter exactly 15 digits.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setAddModal("implantNumber")}
                  className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                >
                  What is this?
                </button>
              </div>

              {/* Breeder Supply Number */}
              <div className="relative mt-5">
                <div
                  className={`relative h-10.5 rounded-[3px] border ${
                    isInvalid("breederSupplyNumber")
                      ? "border-red-400"
                      : "border-[#9B8B7C]"
                  } bg-white`}
                >
                  <label className="absolute -top-1.5 left-2 z-10 bg-white px-1 text-[11px] text-[#624F3E]">
                    Breeder Supply Number (QLD Only)
                  </label>

                  <input
                    type="text"
                    name="breederSupplyNumber"
                    value={formData.breederSupplyNumber}
                    onChange={handleChange}
                    disabled={breederSupplyNotRequired}
                    onBlur={() =>
                      setTouched((current) => ({
                        ...current,
                        breederSupplyNumber: true,
                      }))
                    }
                    maxLength={15}
                    className={`h-full w-full bg-transparent px-2 text-[11px] font-medium outline-none ${
                      breederSupplyNotRequired
                        ? "cursor-not-allowed bg-[#F5F2EE] text-[#AAA29A]"
                        : "text-[#51473F]"
                    }`}
                  />
                </div>

                {isInvalid("breederSupplyNumber") && (
                  <p className="mt-1 text-[9px] text-red-500">
                    Maximum 15 characters.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setAddModal("breederNumber")}
                  className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                >
                  What is this?
                </button>
              </div>

              {/* Checkbox */}
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
                    }
                  }}
                  className="mt-px h-3.75 w-3.75 shrink-0 cursor-pointer accent-[#C87829]"
                />

                <span className="text-[12px] leading-[1.35] text-[#5C5148]">
                  Tick this box is a Breeder Supply Number
                  <br />
                  is not required.
                </span>
              </label>

              {/* Update */}
              <button
                type="button"
                disabled={!isFormValid}
                onClick={handleUpdate}
                className={`mt-5 h-10.5 w-full rounded-sm px-5 text-[14px] font-medium text-white transition-all duration-200 ${
                  isFormValid
                    ? "cursor-pointer bg-[#C87829] hover:bg-[#B96D21]"
                    : "cursor-not-allowed bg-[#E7C9A5]"
                }`}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Information Modal */}
      {selectedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-105 rounded-md bg-white p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[14px] font-semibold text-[#4B4036]">
                {selectedModal.questions}
              </h2>

              <button
                type="button"
                onClick={() => setAddModal(null)}
                className="text-[18px] leading-none text-[#8B8178]"
              >
                ×
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-[1.6] text-[#62574E]">
              {selectedModal.answer}
            </p>

            <button
              type="button"
              onClick={() => setAddModal(null)}
              className="mt-5 w-full rounded-sm bg-[#C87829] py-2 text-[11px] font-medium text-white hover:bg-[#B96D21]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
