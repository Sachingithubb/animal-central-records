import ListingStepper from "../../components/listing/ListingStepper";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  CalendarDays,
  X,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPetsDetails } from "../../redux/listingSlice";
import BarCode from "../ListPet/BarCode";

function FloatingInput({
  id,
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  label,
  error,
  type = "text",
  maxLength,
  inputMode,
  pattern,
  readOnly = false,
  disabled = false,
}) {
  const hasValue = Boolean(value);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength}
          inputMode={inputMode}
          pattern={pattern}
          readOnly={readOnly}
          disabled={disabled}
          placeholder=""
          autoComplete="off"
          className={`h-8 w-full rounded-xs border bg-white px-2 font-medium text-[12px] text-[#5E554D] outline-none transition-colors focus:ring-1 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
          } ${
            disabled
              ? "cursor-not-allowed bg-[#F3F0ED] text-[#A49B93] opacity-70"
              : ""
          }`}
        />

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-2 px-1 text-[12px] leading-none transition-all duration-150 ${
            hasValue
              ? "-top-1.25 bg-white"
              : "top-1/2 -translate-y-1/2 bg-white"
          } ${error ? "text-red-500" : "text-[#766F68]"}`}
        >
          {label}
        </label>
      </div>

      {error && (
        <p className="mt-1 text-[10px] leading-3 text-red-500">{error}</p>
      )}
    </div>
  );
}

export default function MultiplePetsDetails({ isAddPet = false, onCancel }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const litterDetails = useSelector((state) => state.listing.litterDetails);

  const petsDetails = useSelector((state) => state.listing.petsDetails);
  const isAddMode = isAddPet;

  if (isAddPet) {
    console.log("hello isAddPet");
  }
  const individualPetDetails = useSelector(
    (state) => state.individual.petDetails,
  );

  const selectedListingType = useSelector(
    (state) => state.listing.selectedListingType,
  );

  const isMultipleListing = selectedListingType === "multiple";

  const initialPetDetails = isAddPet
    ? {}
    : isMultipleListing
      ? individualPetDetails
      : petsDetails?.[0] || {};

  const petSteps = isMultipleListing
    ? [
        {
          number: 1,
          label: "Pet Details",
        },
        {
          number: 2,
          label: "Owner Details",
        },
        {
          number: 3,
          label: "Review & Submit",
        },
      ]
    : [
        {
          number: 1,
          label: "Litter Details",
        },
        {
          number: 2,
          label: "Pet Details",
        },
        {
          number: 3,
          label: "Owner Details",
        },
        {
          number: 4,
          label: "Review & Submit",
        },
      ];

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
  const colorOptions = [
    "Black",
    "White",
    "Brown",
    "Tan",
    "Cream",
    "Fawn",
    "Red",
    "Orange",
    "Yellow",
    "Gold",
    "Golden",
    "Grey",
    "Gray",
    "Silver",
    "Blue",
    "Chocolate",
    "Liver",
    "Rust",
    "Apricot",
    "Beige",
    "Sable",
    "Brindle",
    "Merle",
    "Roan",
    "Spotted",
    "Mottled",
    "Ticked",
    "Speckled",
    "Harlequin",
    "Tortoiseshell",
    "Calico",
    "Black & White",
    "Black & Tan",
    "Black & Brown",
    "Black & Grey",
    "Black & Cream",
    "Brown & White",
    "Brown & Tan",
    "Brown & Black",
    "Brown & Cream",
    "Brown & Grey",
    "Red & White",
    "Red & Black",
    "Red & Brown",
    "Red & Tan",
    "Red & Cream",
    "Grey & White",
    "Grey & Black",
    "Grey & Brown",
    "Grey & Tan",
    "White & Brown",
    "White & Black",
    "White & Tan",
    "White & Grey",
    "White & Cream",
    "Cream & White",
    "Cream & Brown",
    "Cream & Black",
    "Tan & Black",
    "Tan & White",
    "Tan & Brown",
    "Gold & White",
    "Gold & Brown",
    "Gold & Black",
    "Tri-Colour",
    "Multi-Colour",
    "Other",
  ];

  const getInitialColors = () => {
    const existingColors = initialPetDetails?.colors;

    if (Array.isArray(existingColors)) {
      return existingColors.length > 0 ? existingColors : [""];
    }

    if (typeof existingColors === "string") {
      return existingColors.trim() ? [existingColors] : [""];
    }

    return [""];
  };

  const [focusedField, setFocusedField] = useState(null);

  const [showBreedDropdown, setShowBreedDropdown] = useState(false);

  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);

  const [breedError, setBreedError] = useState("");
  const [speciesError, setSpeciesError] = useState("");

  const [showXBreed, setShowXBreed] = useState(false);
  const [xBreed, setXBreed] = useState(initialPetDetails?.xBreed || "");
  const [xBreedFocused, setXBreedFocused] = useState(false);

  const [scanStatus, setScanStatus] = useState("waiting");
  const [showComponent, setShowComponent] = useState(false);
  const [selectedColors, setSelectedColors] = useState(() =>
    getInitialColors().map((color) =>
      colorOptions.some(
        (option) => option.toLowerCase() === color.trim().toLowerCase(),
      ),
    ),
  );

  const [openColorDropdown, setOpenColorDropdown] = useState(null);

  const [addModal, setAddModal] = useState(null);

  const [breederSupplyNotRequired, setBreederSupplyNotRequired] = useState(
    initialPetDetails?.breederSupplyNotRequired || false,
  );

  const [touched, setTouched] = useState({
    microchipNumber: false,
    CARtag: false,
    petName: false,
    implantDate: false,
    dob: false,
    breed: false,
    species: false,
    sex: false,
    colors: false,
    sourceNumber: false,
    implanterNumber: false,
    breederSupplyNumber: false,
  });

  const [formData, setFormData] = useState({
    microchipNumber: initialPetDetails?.microchipNumber || "",
    CARtag: initialPetDetails?.CARtag || "",
    petName: initialPetDetails?.petName || "",
    sex: initialPetDetails?.sex || "",
    implantDate: initialPetDetails?.implantDate || "",
    colors:
      Array.isArray(initialPetDetails?.colors) &&
      initialPetDetails.colors.length > 0
        ? initialPetDetails.colors
        : [""],
    dob: initialPetDetails?.dob || "",
    breed: initialPetDetails?.breed || "",
    species: initialPetDetails?.species || "",
    sourceNumber: initialPetDetails?.sourceNumber || "",
    implanterNumber: initialPetDetails?.implanterNumber || "",
    breederSupplyNumber: initialPetDetails?.breederSupplyNumber || "",
  });

  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const todayDate = getTodayDate();

  const getDobMaxDate = () => {
    let maxDate = todayDate;

    if (formData.implantDate) {
      const implantDate = new Date(`${formData.implantDate}T00:00:00`);

      implantDate.setDate(implantDate.getDate() - 1);

      const implantMaxDate = implantDate.toISOString().split("T")[0];

      if (implantMaxDate < maxDate) {
        maxDate = implantMaxDate;
      }
    }

    return maxDate;
  };

  useEffect(() => {
    if (scanStatus === "success") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((current) => ({
        ...current,
        microchipNumber: "345675890125871",
      }));
    }
  }, [scanStatus]);

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
        "A Breeder Supply Number is used to identify the breeder associated with the supply of the animal.",
    },
  ];

  const selectedModal = modalData.find((modal) => modal.name === addModal);

  const getNextDay = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    date.setDate(date.getDate() + 1);

    return date.toISOString().split("T")[0];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [year, month, day] = dateString.split("-");

    if (!year || !month || !day) {
      return dateString;
    }

    return `${day}/${month}/${year}`;
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

      if (name === "microchipNumber") {
        updatedValue = value.replace(/\D/g, "").slice(0, 15);
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
    // if (isEditMode) {
    //   navigate("/list-pet/litter/reviewsubmit");
    //   return;
    // }
    navigate("/list-pet");
  };

  const isBreedValid = breedOptions.some(
    (breed) => breed.toLowerCase() === formData.breed.trim().toLowerCase(),
  );

  const handleBreedChange = (event) => {
    const value = event.target.value;

    setFormData((current) => ({
      ...current,
      breed: value,
    }));

    const exactMatch = breedOptions.some(
      (breed) => breed.toLowerCase() === value.trim().toLowerCase(),
    );

    setBreedError(
      exactMatch || value.trim() === ""
        ? ""
        : "Please select a valid breed from the dropdown.",
    );
  };

  const isSpeciesValid = speciesOptions.some(
    (species) =>
      species.toLowerCase() === formData.species.trim().toLowerCase(),
  );

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

  const handleColorChange = (index, value) => {
    setFormData((current) => {
      const updatedColors = [...current.colors];
      updatedColors[index] = value;

      return {
        ...current,
        colors: updatedColors,
      };
    });

    setSelectedColors((current) => {
      const updated = [...current];
      updated[index] = false;
      return updated;
    });

    setOpenColorDropdown(index);

    setTouched((current) => ({
      ...current,
      colors: false,
    }));
  };

  const selectColor = (index, color) => {
    setFormData((current) => {
      const updatedColors = [...current.colors];
      updatedColors[index] = color;

      return {
        ...current,
        colors: updatedColors,
      };
    });

    setSelectedColors((current) => {
      const updated = [...current];
      updated[index] = true;
      return updated;
    });

    setOpenColorDropdown(null);

    setTouched((current) => ({
      ...current,
      colors: false,
    }));
  };

  const addColor = () => {
    setFormData((current) => ({
      ...current,
      colors: [...current.colors, ""],
    }));

    setSelectedColors((current) => [...current, false]);
  };

  const removeColor = (index) => {
    if (formData.colors.length <= 1) {
      return;
    }

    setFormData((current) => ({
      ...current,
      colors: current.colors.filter((_, colorIndex) => colorIndex !== index),
    }));

    setSelectedColors((current) =>
      current.filter((_, colorIndex) => colorIndex !== index),
    );

    setOpenColorDropdown(null);
  };

  const getFieldError = (fieldName) => {
    switch (fieldName) {
      // case "microchipNumber": {
      //   if (!formData.microchipNumber.trim()) {
      //     return "Microchip Number cannot be blank.";
      //   }

      //   if (formData.microchipNumber === "000000000000000") {
      //     return "This Microchip Number is already taken.";
      //   }

      //   if (!/^\d{15}$/.test(formData.microchipNumber)) {
      //     return "Must be 15-Digits.";
      //   }

      //   if (!["2", "3"].includes(formData.microchipNumber[0])) {
      //     return "Invalid Microchip Number.";
      //   }

      //   return "";
      // }

      case "CARtag": {
        if (!formData.CARtag.trim()) {
          return "";
        }

        return "";
      }

      case "petName": {
        if (!formData.petName.trim()) {
          return "The 'Pet Name' field cannot be blank.";
        }

        return "";
      }

      case "implantDate": {
        if (!formData.implantDate) {
          return "The Implant Date field cannot be blank.";
        }

        if (formData.dob && formData.implantDate <= formData.dob) {
          return "The Implant Date must be after the DOB.";
        }

        return "";
      }

      case "dob": {
        if (!formData.dob) {
          return "The DOB field cannot be blank.";
        }

        if (formData.dob > todayDate) {
          return "DOB cannot be in the future.";
        }

        if (formData.implantDate && formData.dob >= formData.implantDate) {
          return "The DOB cannot be after the implant date.";
        }

        return "";
      }

      case "breed": {
        if (!formData.breed.trim()) {
          return "The 'Breed' field cannot be blank.";
        }

        if (!isBreedValid) {
          return "Please select a valid breed from the dropdown.";
        }

        return "";
      }

      case "species": {
        if (!formData.species.trim()) {
          return "The 'Species' field cannot be blank.";
        }

        if (!isSpeciesValid) {
          return "Please select a valid species from the dropdown.";
        }

        return "";
      }

      case "sex": {
        if (!formData.sex) {
          return "You must select a sex.";
        }

        return "";
      }

      case "colors": {
        const hasEmptyColor = formData.colors.some((color) => !color.trim());

        if (hasEmptyColor) {
          return "The 'Color' field cannot be blank.";
        }

        const allColorsValid = formData.colors.every(
          (_, index) => selectedColors[index] === true,
        );

        if (!allColorsValid) {
          return "Please select a valid color from the dropdown.";
        }

        return "";
      }

      case "sourceNumber": {
        if (!formData.sourceNumber.trim()) {
          return "Invalid source number.";
        }

        if (formData.sourceNumber.length !== 15) {
          return "Invalid source number.";
        }

        return "";
      }

      case "implanterNumber": {
        if (!formData.implanterNumber) {
          return "Invalid implanter number.";
        }

        if (!/^\d{15}$/.test(formData.implanterNumber)) {
          return "Must be 15-Digits.";
        }

        return "";
      }

      case "breederSupplyNumber": {
        if (breederSupplyNotRequired) {
          return "";
        }

        if (!formData.breederSupplyNumber.trim()) {
          return "Invalid breeder supply number.";
        }

        if (formData.breederSupplyNumber.length !== 15) {
          return "Invalid breeder supply number.";
        }

        return "";
      }

      default:
        return "";
    }
  };

  const hasError = (fieldName) => {
    return touched[fieldName] && Boolean(getFieldError(fieldName));
  };

  const markTouched = (fieldName) => {
    setTouched((current) => ({
      ...current,
      [fieldName]: true,
    }));
  };

  const requiredFields = [
    "microchipNumber",
    "petName",
    "implantDate",
    "dob",
    "breed",
    "species",
    "sex",
    "colors",
    "sourceNumber",
    "implanterNumber",
  ];

  const validateForm = () => {
    const fieldsToTouch = [
      ...requiredFields,
      ...(breederSupplyNotRequired ? [] : ["breederSupplyNumber"]),
    ];

    setTouched((current) => {
      const updated = {
        ...current,
      };

      fieldsToTouch.forEach((field) => {
        updated[field] = true;
      });

      return updated;
    });

    const requiredFieldsValid = requiredFields.every(
      (field) => !getFieldError(field),
    );

    const breederValid =
      breederSupplyNotRequired || !getFieldError("breederSupplyNumber");

    return requiredFieldsValid && breederValid;
  };

  const isFormValid =
    requiredFields.every((field) => !getFieldError(field)) &&
    (breederSupplyNotRequired || !getFieldError("breederSupplyNumber"));

  const handleNext = () => {
    const valid = validateForm();

    if (!valid) {
      return;
    }

    const petData = {
      ...formData,
      xBreed,
      breederSupplyNotRequired,
    };

    if (isAddPet) {
      dispatch(setPetsDetails([...petsDetails, petData]));
      onCancel?.();
      return;
    }

    dispatch(setPetsDetails([petData]));

    navigate("/list-pet/multiple/petdetailssummary");
  };

  const handleCancelAddPet = () => {
    if (isAddPet) {
      onCancel?.();
    }
  };

  return (
    <div className="w-full">
      <section
        className={`w-full ${isAddMode ? "-mt-15" : "mt-5"} rounded-md bg-[#FEFCF9] px-3 py-4 sm:px-4 sm:py-5 lg:px-4 lg:py-4`}
      >
        {!isAddMode && (
          <>
            <ListingStepper
              currentStep={isMultipleListing ? 1 : 2}
              steps={petSteps}
            />

            <div className="relative mt-5 flex h-6.75 items-center justify-center">
              <button
                type="button"
                onClick={handleBack}
                className="absolute left-0 flex items-center gap-1 text-[12px] font-medium text-[#C87829] transition-colors hover:text-[#A95F18]"
              >
                <ChevronLeft size={15} strokeWidth={1.8} />
                Back
              </button>

              <h1 className="text-[15px] font-medium leading-none text-[#40372F]">
                Enter Pet Details
              </h1>
            </div>
          </>
        )}

        <div className="mt-5 rounded-md bg-white px-4 py-5 sm:px-6 sm:py-6">
          <div className="mx-auto w-full max-w-73">
            {/* <div className="mt-5">
              <FloatingInput
                id="microchipNumber"
                name="microchipNumber"
                value={formData.microchipNumber}
                label="Enter Microchip Number"
                error={
                  hasError("microchipNumber")
                    ? getFieldError("microchipNumber")
                    : ""
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("microchipNumber")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("microchipNumber");
                }}
              />

              {scanStatus === "success" && (
                <div className="relative mt-1 min-h-13.75 w-full">
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

                      <p className="max-w-20 text-[11px] font-normal leading-2.75 text-[#4F4740]">
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

              {scanStatus !== "success" && (
                <button
                  type="button"
                  onClick={() => setShowComponent(true)}
                  className="mt-1 ml-auto block text-[10px] font-medium text-[#C87829] hover:underline"
                >
                  SCAN BAR CODE
                </button>
              )}
            </div> */}

            <div className="">
              <FloatingInput
                id="CARtag"
                name="CARtag"
                value={formData.CARtag}
                label="C.A.R Tag Number (Optional)"
                error={hasError("CARtag") ? getFieldError("CARtag") : ""}
                onChange={handleChange}
                onFocus={() => setFocusedField("CARtag")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("CARtag");
                }}
              />
            </div>

            <div className="mt-5">
              <FloatingInput
                id="petName"
                name="petName"
                value={formData.petName}
                label="Pet Name (Optional)"
                error={hasError("petName") ? getFieldError("petName") : ""}
                onChange={handleChange}
                onFocus={() => setFocusedField("petName")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("petName");
                }}
              />
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="implantDate"
                  type="text"
                  name="implantDate"
                  value={formatDate(formData.implantDate)}
                  readOnly
                  onFocus={() => setFocusedField("implantDate")}
                  onBlur={() => {
                    setFocusedField(null);
                    markTouched("implantDate");
                  }}
                  placeholder=""
                  className={`h-8.75 w-full rounded-xs border bg-white px-2 font-medium text-[12px] text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                    hasError("implantDate")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                />

                <label
                  htmlFor="implantDate"
                  className={`pointer-events-none absolute left-2 z-10 px-1 text-[12px] leading-none transition-all duration-150 ${
                    formData.implantDate
                      ? "-top-1.25 bg-white"
                      : "top-1/2 -translate-y-1/2 bg-white"
                  } ${
                    hasError("implantDate") ? "text-red-500" : "text-[#766F68]"
                  }`}
                >
                  Implant Date
                </label>

                <input
                  type="date"
                  tabIndex="-1"
                  aria-hidden="true"
                  min={getNextDay(formData.dob)}
                  max={todayDate}
                  className="absolute h-0 w-0 opacity-0"
                  onChange={(event) => {
                    const value = event.target.value;

                    // Prevent future Implant Date
                    if (value > todayDate) {
                      setTouched((current) => ({
                        ...current,
                        implantDate: true,
                      }));

                      return;
                    }

                    if (formData.dob && value <= formData.dob) {
                      setFormData((current) => ({
                        ...current,
                        implantDate: value,
                      }));

                      markTouched("implantDate");

                      return;
                    }

                    handleChange({
                      target: {
                        name: "implantDate",
                        value,
                      },
                    });

                    markTouched("implantDate");
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
                    className={
                      hasError("implantDate")
                        ? "text-red-500"
                        : "text-[#C87829]"
                    }
                  />
                </button>
              </div>

              {hasError("implantDate") && (
                <p className="mt-1 text-[10px] leading-3 text-red-500">
                  {getFieldError("implantDate")}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="dob"
                  type="text"
                  name="dob"
                  value={formatDate(formData.dob)}
                  readOnly
                  onFocus={() => setFocusedField("dob")}
                  onBlur={() => {
                    setFocusedField(null);
                    markTouched("dob");
                  }}
                  placeholder=""
                  className={`h-8 w-full rounded-xs border bg-white px-2 font-medium text-[12px] text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                    hasError("dob")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                />

                <label
                  htmlFor="dob"
                  className={`pointer-events-none absolute left-2 z-10 px-1 text-[12px] leading-none transition-all duration-150 ${
                    formData.dob
                      ? "-top-1.25 bg-white"
                      : "top-1/2 -translate-y-1/2 bg-white"
                  } ${hasError("dob") ? "text-red-500" : "text-[#766F68]"}`}
                >
                  DOB
                </label>

                <input
                  type="date"
                  tabIndex="-1"
                  aria-hidden="true"
                  max={getDobMaxDate()}
                  className="absolute h-0 w-0 opacity-0"
                  onChange={(event) => {
                    const value = event.target.value;

                    if (value > todayDate) {
                      setTouched((current) => ({
                        ...current,
                        dob: true,
                      }));

                      return;
                    }

                    if (formData.implantDate && value >= formData.implantDate) {
                      setFormData((current) => ({
                        ...current,
                        dob: value,
                      }));

                      markTouched("dob");

                      return;
                    }

                    handleChange({
                      target: {
                        name: "dob",
                        value,
                      },
                    });

                    markTouched("dob");
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
                    className={
                      hasError("dob") ? "text-red-500" : "text-[#C87829]"
                    }
                  />
                </button>
              </div>

              {hasError("dob") && (
                <p className="mt-1 text-[10px] leading-3 text-red-500">
                  {getFieldError("dob")}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="relative">
                <input
                  id="breed"
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleBreedChange}
                  onFocus={() => {
                    setFocusedField("breed");
                    setShowBreedDropdown(true);
                  }}
                  onBlur={() => {
                    setFocusedField(null);
                    markTouched("breed");

                    setTimeout(() => {
                      setShowBreedDropdown(false);
                    }, 150);
                  }}
                  placeholder=""
                  autoComplete="off"
                  className={`h-8 w-full rounded-xs border bg-white px-2 text-[12px] font-medium text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                    hasError("breed")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                />

                <label
                  htmlFor="breed"
                  className={`pointer-events-none absolute left-2 px-1 text-[12px] leading-none transition-all duration-150 ${
                    formData.breed
                      ? "-top-1.25 bg-white"
                      : "top-1/2 -translate-y-1/2 bg-white"
                  } ${hasError("breed") ? "text-red-500" : "text-[#766F68]"}`}
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

                            setTouched((current) => ({
                              ...current,
                              breed: false,
                            }));

                            setShowBreedDropdown(false);

                            setFocusedField(null);
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

              {hasError("breed") && (
                <p className="mt-1 text-[10px] leading-3 text-red-500">
                  {getFieldError("breed")}
                </p>
              )}

              {/* X Breed */}
              {showXBreed && (
                <div className="relative mt-5">
                  <input
                    type="text"
                    value={xBreed}
                    onChange={(event) => setXBreed(event.target.value)}
                    onFocus={() => setXBreedFocused(true)}
                    onBlur={() => setXBreedFocused(false)}
                    placeholder=""
                    className="h-8 w-full rounded-xs border border-[#BEB8B2] bg-white px-2 text-[12px] font-medium text-[#5E554D] outline-none transition-colors focus:border-[#C87829] focus:ring-1 focus:ring-[#C87829]/20"
                  />

                  <label
                    className={`pointer-events-none absolute left-2 px-1 text-[12px] leading-none transition-all duration-150 ${
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
                    markTouched("species");

                    setTimeout(() => {
                      setShowSpeciesDropdown(false);
                    }, 150);
                  }}
                  placeholder=""
                  autoComplete="off"
                  className={`h-8 w-full rounded-xs border bg-white px-2 font-medium text-[12px] text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                    hasError("species")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                />

                <label
                  htmlFor="species"
                  className={`pointer-events-none absolute left-2 px-1 text-[12px] leading-none transition-all duration-150 ${
                    formData.species
                      ? "-top-1.25 bg-white"
                      : "top-1/2 -translate-y-1/2 bg-white"
                  } ${hasError("species") ? "text-red-500" : "text-[#766F68]"}`}
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

                            setSpeciesError("");

                            setTouched((current) => ({
                              ...current,
                              species: false,
                            }));

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

              {hasError("species") && (
                <p className="mt-1 text-[10px] leading-3 text-red-500">
                  {getFieldError("species")}
                </p>
              )}
            </div>

            <div className="mt-5">
              <div className="relative">
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("sex")}
                  onBlur={() => {
                    setFocusedField(null);
                    markTouched("sex");
                  }}
                  className={`h-8 w-full rounded-xs border bg-white px-2 font-medium text-[12px] text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                    hasError("sex")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                  }`}
                >
                  <option value="" disabled>
                    Sex
                  </option>

                  <option value="Male">Male</option>

                  <option value="Female">Female</option>
                </select>

                <label
                  htmlFor="sex"
                  className={`pointer-events-none absolute left-2 -top-1.25 bg-white px-1 text-[12px] leading-none ${
                    hasError("sex") ? "text-red-500" : "text-[#766F68]"
                  }`}
                >
                  Sex
                </label>
              </div>

              {hasError("sex") && (
                <p className="mt-1 text-[10px] leading-3 text-red-500">
                  {getFieldError("sex")}
                </p>
              )}
            </div>

            <div className="mt-5">
              {formData.colors.map((color, index) => {
                const colorNumber = index + 1;

                const filteredColors = colorOptions.filter((option) =>
                  option.toLowerCase().includes(color.toLowerCase()),
                );

                const colorHasError =
                  hasError("colors") &&
                  (!color.trim() || !selectedColors[index]);

                return (
                  <div
                    key={`color-${index}`}
                    className={index > 0 ? "relative mt-5" : "relative"}
                  >
                    <div className="relative">
                      <input
                        id={`color-${index}`}
                        type="text"
                        value={color}
                        onChange={(event) =>
                          handleColorChange(index, event.target.value)
                        }
                        onFocus={() => setOpenColorDropdown(index)}
                        onBlur={() => {
                          setTimeout(() => {
                            setOpenColorDropdown(null);
                          }, 150);

                          if (index === 0) {
                            markTouched("colors");
                          }
                        }}
                        placeholder=""
                        autoComplete="off"
                        className={`h-8 w-full rounded-xs border bg-white px-2 text-[12px] font-medium text-[#5E554D] outline-none transition-colors focus:ring-1 ${
                          colorHasError
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-[#BEB8B2] focus:border-[#C87829] focus:ring-[#C87829]/20"
                        }`}
                      />

                      <label
                        htmlFor={`color-${index}`}
                        className={`pointer-events-none absolute left-2 px-1 text-[12px] leading-none ${
                          color
                            ? "-top-1.25 bg-white"
                            : "top-1/2 -translate-y-1/2 bg-white"
                        } ${colorHasError ? "text-red-500" : "text-[#766F68]"}`}
                      >
                        {index === 0 ? "Color" : `Color ${colorNumber}`}
                      </label>

                      {/* Color Dropdown */}
                      {openColorDropdown === index && (
                        <div className="absolute left-0 top-9 z-50 max-h-48 w-full overflow-y-auto rounded-xs border border-[#D8D0C8] bg-white shadow-[0_4px_12px_rgba(80,50,20,0.12)]">
                          {filteredColors.length > 0 ? (
                            filteredColors.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onMouseDown={(event) => {
                                  event.preventDefault();

                                  selectColor(index, option);
                                }}
                                className="block w-full px-3 py-2 text-left text-[11px] text-[#5E554D] hover:bg-[#FFF4E8]"
                              >
                                {option}
                              </button>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-[11px] text-[#8A8179]">
                              No colors found
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {colorHasError && (
                      <p className="mt-1 text-[10px] leading-3 text-red-500">
                        {!color.trim()
                          ? "The 'Color' field cannot be blank."
                          : "Please select a valid color from the dropdown."}
                      </p>
                    )}

                    {/* Remove additional color */}
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeColor(index)}
                        className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full text-[#C87829] hover:text-[#A95F18]"
                        aria-label={`Remove color ${colorNumber}`}
                      >
                        <X size={14} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add another color */}
              <button
                type="button"
                onClick={addColor}
                className="mt-1 ml-auto block text-[10px] font-medium text-[#C87829] hover:underline"
              >
                + ADD COLOR {formData.colors.length + 1}
              </button>
            </div>

            <div className="mt-5">
              <FloatingInput
                id="sourceNumber"
                name="sourceNumber"
                value={formData.sourceNumber}
                label="Source Number (VIC Only)"
                error={
                  hasError("sourceNumber") ? getFieldError("sourceNumber") : ""
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("sourceNumber")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("sourceNumber");
                }}
              />

              <button
                type="button"
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                onClick={() => setAddModal("sourceNumber")}
              >
                What is this?
              </button>
            </div>

            <div className="mt-5">
              <FloatingInput
                id="implanterNumber"
                name="implanterNumber"
                value={formData.implanterNumber}
                label="Implanter Number (VIC Only)"
                maxLength={15}
                inputMode="numeric"
                pattern="[0-9]{15}"
                error={
                  hasError("implanterNumber")
                    ? getFieldError("implanterNumber")
                    : ""
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("implanterNumber")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("implanterNumber");
                }}
              />

              <button
                type="button"
                className="mt-1 ml-auto block text-[10px] text-[#C87829] hover:underline"
                onClick={() => setAddModal("implantNumber")}
              >
                What is this?
              </button>
            </div>

            <div className="mt-5">
              <FloatingInput
                id="breederSupplyNumber"
                name="breederSupplyNumber"
                value={formData.breederSupplyNumber}
                label="Breeder Supply Number (QLD Only)"
                disabled={breederSupplyNotRequired}
                error={
                  hasError("breederSupplyNumber")
                    ? getFieldError("breederSupplyNumber")
                    : ""
                }
                onChange={handleChange}
                onFocus={() => setFocusedField("breederSupplyNumber")}
                onBlur={() => {
                  setFocusedField(null);
                  markTouched("breederSupplyNumber");
                }}
              />

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
                  }
                }}
                className="mt-px h-3.75 w-3.75 shrink-0 cursor-pointer accent-[#C87829]"
              />

              <span className="text-[12px] leading-[1.35] text-[#5C5148]">
                Tick this box if a Breeder Supply Number
                <br />
                is not required.
              </span>
            </label>

            {isAddPet ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleCancelAddPet}
                  className="h-10.5 w-full rounded-sm border border-[#C87829] bg-white px-5 text-[12px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF7EE]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className={`h-10.5 w-full rounded-sm px-5 text-[12px] font-medium text-white transition-all duration-200 ${
                    isFormValid
                      ? "cursor-pointer bg-[#C87829] hover:bg-[#B96D21]"
                      : "cursor-pointer bg-[#E7C9A5]"
                  }`}
                >
                  Save
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={`mt-5 h-10.5 w-full rounded-sm px-5 text-[12px] font-medium text-white transition-all duration-200 ${
                  isFormValid
                    ? "cursor-pointer bg-[#C87829] hover:bg-[#B96D21]"
                    : "cursor-pointer bg-[#E7C9A5]"
                }`}
              >
                Next
              </button>
            )}

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
                    <p className="text-[12px] leading-4.75 text-[#5E554D]">
                      {selectedModal.answer}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAddModal(null)}
                    className="mt-6 h-9 w-full rounded-[5px] bg-[#C87829] text-[12px] font-bold text-white hover:bg-[#B66B24]"
                  >
                    GOT IT
                  </button>
                </div>
              </div>
            )}
          </div>
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
}
