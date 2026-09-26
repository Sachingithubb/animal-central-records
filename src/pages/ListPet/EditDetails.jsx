import { useState } from "react";
import { ChevronLeft, CalendarDays, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPetsDetails,
  setOwnerDetails,
  setLitterDetails,
} from "../../redux/listingSlice";

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

const speciesOptions = [
  "Dog",
  "Cat",
  "Rabbit",
  "Bird",
  "Reptile",
  "Other",
];

const sexOptions = ["Male", "Female", "Unknown"];

const stateOptions = [
  "VIC",
  "NSW",
  "QLD",
  "SA",
  "WA",
  "TAS",
  "NT",
  "ACT",
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

export default function EditDetails({ pet, onClose, onRetry }) {
  const dispatch = useDispatch();

  // ================= REDUX =================

  const petsDetails = useSelector(
    (state) => state.listing.petsDetails,
  );

  const ownerDetails = useSelector(
    (state) => state.listing.ownerDetails,
  );

  const ownerType = useSelector(
    (state) => state.listing.ownerType,
  );

  const litterDetails = useSelector(
    (state) => state.listing.litterDetails,
  );

  // litterDetails is stored as an object
  const litter = litterDetails || {};

  // ownerDetails is stored as an array
  const owner = ownerDetails?.[0] || {};

  // ================= PET DATA =================

  const [petData, setPetData] = useState({
    // Pet Details
    microchipNumber: pet?.microchipNumber || "",
    carTag: pet?.carTag || "",
    petName: pet?.petName || "",

    // Litter Details
    breed: pet?.breed || litter.breed || "",
    xBreed: pet?.xBreed || litter.xBreed || "",
    species: pet?.species || litter.species || "",

    implantDate:
      pet?.implantDate ||
      litter.implantDate ||
      "",

    dob:
      pet?.dob ||
      litter.dob ||
      "",

    // Pet specific
    sex: pet?.sex || "",

    color:
      pet?.colors?.[0] ||
      pet?.color ||
      "",
  });

  // ================= OWNER DATA =================

  const [ownerData, setOwnerData] = useState({
    ownerType: ownerType || "individual",
    firstName: owner.firstName || "",
    surname: owner.surname || "",
    mobile: owner.mobile || "",
    email: owner.email || "",
    homePhone: owner.homePhone || "",
    streetAddress: owner.streetAddress || "",
    suburb: owner.suburb || "",
    postCode: owner.postCode || "",
    municipality: owner.municipality || "",
    state: owner.state || "",
    country: owner.country || "Australia",
    alternateContactName:
      owner.alternateContactName || "",
    alternateContactNumber:
      owner.alternateContactNumber || "",
  });

  // ================= LITTER DATA =================

  const [litterFormData, setLitterFormData] = useState({
    sourceNumber: litter.sourceNumber || "",
    implanterNumber: litter.implanterNumber || "",
    breederSupplyNumber:
      litter.breederSupplyNumber || "",
  });

  // Checkbox comes directly from Redux
  const [breederSupplyNotRequired, setBreederSupplyNotRequired] =
    useState(
      litter.breederSupplyNotRequired || false,
    );

  // ================= DROPDOWNS =================

  const [showBreedDropdown, setShowBreedDropdown] =
    useState(false);

  const [showSpeciesDropdown, setShowSpeciesDropdown] =
    useState(false);

  const [showSexDropdown, setShowSexDropdown] =
    useState(false);

  const [showStateDropdown, setShowStateDropdown] =
    useState(false);

  // ================= X BREED =================

  const [showXBreed, setShowXBreed] = useState(
    Boolean(pet?.xBreed || litter.xBreed),
  );

  // ================= PET CHANGE =================

  const handlePetChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "microchipNumber") {
      const numbersOnly = value
        .replace(/\D/g, "")
        .slice(0, 15);

      updatedValue = numbersOnly.replace(
        /(\d{3})(?=\d)/g,
        "$1 ",
      );
    }

    if (name === "carTag") {
      updatedValue = value.slice(0, 15);
    }

    setPetData((current) => ({
      ...current,
      [name]: updatedValue,
    }));
  };

  // ================= LITTER CHANGE =================

  const handleLitterChange = (event) => {
    const { name, value } = event.target;

    let updatedValue = value;

    if (name === "sourceNumber") {
      updatedValue = value
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 15);
    }

    if (name === "implanterNumber") {
      updatedValue = value
        .replace(/\D/g, "")
        .slice(0, 15);
    }

    if (name === "breederSupplyNumber") {
      updatedValue = value
        .replace(/[^a-zA-Z0-9]/g, "")
        .slice(0, 15);
    }

    setLitterFormData((current) => ({
      ...current,
      [name]: updatedValue,
    }));
  };

  // ================= OWNER CHANGE =================

  const handleOwnerChange = (event) => {
    const { name, value } = event.target;

    setOwnerData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // ================= BREED =================

  const handleBreedSelect = (breed) => {
    setPetData((current) => ({
      ...current,
      breed,
    }));

    setShowBreedDropdown(false);
  };

  // ================= SPECIES =================

  const handleSpeciesSelect = (species) => {
    setPetData((current) => ({
      ...current,
      species,
    }));

    setShowSpeciesDropdown(false);
  };

  // ================= SEX =================

  const handleSexSelect = (sex) => {
    setPetData((current) => ({
      ...current,
      sex,
    }));

    setShowSexDropdown(false);
  };

  // ================= STATE =================

  const handleStateSelect = (state) => {
    setOwnerData((current) => ({
      ...current,
      state,
    }));

    setShowStateDropdown(false);
  };

  // ================= SAVE =================

  const handleSaveAndRetry = () => {
    // Update pet in Redux
    const updatedPets = petsDetails.map((currentPet) => {
      if (currentPet.id !== pet?.id) {
        return currentPet;
      }

      return {
        ...currentPet,

        // Pet Details
        microchipNumber: petData.microchipNumber,
        carTag: petData.carTag,
        petName: petData.petName,
        sex: petData.sex,

        // Color
        colors: [petData.color],
        color: petData.color,

        // Litter Details
        breed: petData.breed,
        xBreed: petData.xBreed,
        species: petData.species,
        implantDate: petData.implantDate,
        dob: petData.dob,
      };
    });

    dispatch(setPetsDetails(updatedPets));

    // Update litter details in Redux
    dispatch(
      setLitterDetails({
        ...litter,

        breed: petData.breed,
        xBreed: petData.xBreed,
        species: petData.species,
        implantDate: petData.implantDate,
        dob: petData.dob,

        sourceNumber:
          litterFormData.sourceNumber,

        implanterNumber:
          litterFormData.implanterNumber,

        breederSupplyNumber:
          litterFormData.breederSupplyNumber,

        breederSupplyNotRequired,
      }),
    );

    // Update owner details in Redux
    dispatch(
      setOwnerDetails([
        {
          ...owner,
          ...ownerData,
        },
      ]),
    );

    // Send updated data back to ListingSuccess
    if (onRetry) {
      onRetry({
        ...pet,
        ...petData,

        colors: [petData.color],
        color: petData.color,

        sourceNumber:
          litterFormData.sourceNumber,

        implanterNumber:
          litterFormData.implanterNumber,

        breederSupplyNumber:
          litterFormData.breederSupplyNumber,

        breederSupplyNotRequired,
      });
    }

    onClose();
  };

  // ================= OWNER TYPE LABEL =================

  const selectedOwnerType =
    ownerTypes.find(
      (type) => type.id === ownerData.ownerType,
    )?.label || "Individual Person";

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-end overflow-y-auto bg-black/45 px-1 py-4 sm:py-6">
      <div className="relative w-full max-w-[320px] rounded-[9px] bg-white px-3 pb-3 pt-3 shadow-[0_10px_35px_rgba(0,0,0,0.18)]">

        <div className="flex items-center border-b border-[#E8DED4] pb-2">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center text-[#C87829]"
          >
            <ChevronLeft
              size={13}
              strokeWidth={1.5}
            />
          </button>

          <h2 className="flex-1 pr-4 text-center text-[10px] font-semibold text-[#30271F]">
            Edit Details
          </h2>
        </div>


        <section className="mt-3 rounded-[3px] bg-[#FFFCF9] px-4 pb-4 pt-4">
          <h3 className="mb-3 text-[10px] font-semibold text-[#30271F]">
            Pet Details
          </h3>


          {/* <div className="relative">
            <label className="absolute -top-1.25 left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Microchip Number
            </label>

            <input
              type="text"
              name="microchipNumber"
              value={petData.microchipNumber}
              onChange={handlePetChange}
              maxLength={19}
              className="h-6.75 w-full rounded-xs border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div> */}

          {/* C.A.R Tag */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              C.A.R Tag Number (Optional)
            </label>

            <input
              type="text"
              name="carTag"
              value={petData.carTag}
              onChange={handlePetChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Pet Name */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Pet Name
            </label>

            <input
              type="text"
              name="petName"
              value={petData.petName}
              onChange={handlePetChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Breed */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Breed
            </label>

            <input
              type="text"
              value={petData.breed}
              onChange={(event) => {
                setPetData((current) => ({
                  ...current,
                  breed: event.target.value,
                }));

                setShowBreedDropdown(true);
              }}
              onFocus={() => setShowBreedDropdown(true)}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />

            {showBreedDropdown && (
              <div className="absolute left-0 right-0 top-[30px] z-30 max-h-[120px] overflow-y-auto rounded-[2px] border border-[#D6C8BA] bg-white shadow-md">
                {breedOptions
                  .filter((breed) =>
                    breed
                      .toLowerCase()
                      .includes(
                        petData.breed.toLowerCase(),
                      ),
                  )
                  .slice(0, 8)
                  .map((breed) => (
                    <button
                      key={breed}
                      type="button"
                      onMouseDown={(event) =>
                        event.preventDefault()
                      }
                      onClick={() =>
                        handleBreedSelect(breed)
                      }
                      className="block w-full px-2 py-1.5 text-left text-[8px] text-[#51473F] hover:bg-[#F7E7D1]"
                    >
                      {breed}
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* X Breed */}

          <button
            type="button"
            onClick={() =>
              setShowXBreed((current) => !current)
            }
            className="mt-1 ml-auto block text-[8px] text-[#C87829] hover:underline"
          >
            {showXBreed
              ? "- REMOVE X-BREED"
              : "+ ADD X-BREED"}
          </button>

          {showXBreed && (
            <div className="relative mt-2">
              <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
                X-Breed
              </label>

              <input
                type="text"
                name="xBreed"
                value={petData.xBreed}
                onChange={handlePetChange}
                className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
              />
            </div>
          )}

          {/* Species */}

          <div className="relative mt-2">
            <button
              type="button"
              onClick={() =>
                setShowSpeciesDropdown(
                  (current) => !current,
                )
              }
              className="relative flex h-[27px] w-full items-center rounded-[2px] border border-[#A89788] bg-white px-2 text-left"
            >
              <span className="absolute -top-[5px] left-2 bg-white px-1 text-[8px] text-[#8A8179]">
                Species
              </span>

              <span className="text-[8px] text-[#51473F]">
                {petData.species}
              </span>

              <ChevronDown
                size={9}
                className="ml-auto text-[#C87829]"
              />
            </button>

            {showSpeciesDropdown && (
              <div className="absolute left-0 right-0 top-[30px] z-30 rounded-[2px] border border-[#D6C8BA] bg-white shadow-md">
                {speciesOptions.map((species) => (
                  <button
                    key={species}
                    type="button"
                    onClick={() =>
                      handleSpeciesSelect(species)
                    }
                    className="block w-full px-2 py-1.5 text-left text-[8px] text-[#51473F] hover:bg-[#F7E7D1]"
                  >
                    {species}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Implant Date */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Implant Date
            </label>

            <input
              type="date"
              name="implantDate"
              value={petData.implantDate}
              onChange={handlePetChange}
              className="h-[27px] w-full appearance-none rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0"
            />

            <CalendarDays
              size={11}
              strokeWidth={1.7}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#C87829]"
            />
          </div>

          {/* DOB */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              DOB
            </label>

            <input
              type="date"
              name="dob"
              value={petData.dob}
              onChange={handlePetChange}
              className="h-[27px] w-full appearance-none rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none [&::-webkit-calendar-picker-indicator]:opacity-0"
            />

            <CalendarDays
              size={11}
              strokeWidth={1.7}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#C87829]"
            />
          </div>

          {/* Sex */}

          <div className="relative mt-2">
            <button
              type="button"
              onClick={() =>
                setShowSexDropdown(
                  (current) => !current,
                )
              }
              className="relative flex h-[27px] w-full items-center rounded-[2px] border border-[#A89788] bg-white px-2 text-left"
            >
              <span className="absolute -top-[5px] left-2 bg-white px-1 text-[8px] text-[#8A8179]">
                Sex
              </span>

              <span className="text-[8px] text-[#51473F]">
                {petData.sex}
              </span>

              <ChevronDown
                size={9}
                className="ml-auto text-[#C87829]"
              />
            </button>

            {showSexDropdown && (
              <div className="absolute left-0 right-0 top-[30px] z-30 rounded-[2px] border border-[#D6C8BA] bg-white shadow-md">
                {sexOptions.map((sex) => (
                  <button
                    key={sex}
                    type="button"
                    onClick={() =>
                      handleSexSelect(sex)
                    }
                    className="block w-full px-2 py-1.5 text-left text-[8px] text-[#51473F] hover:bg-[#F7E7D1]"
                  >
                    {sex}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Color
            </label>

            <input
              type="text"
              name="color"
              value={petData.color}
              onChange={handlePetChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Source Number */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Source Number (VIC Only)
            </label>

            <input
              type="text"
              name="sourceNumber"
              value={litterFormData.sourceNumber}
              onChange={handleLitterChange}
              maxLength={15}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />

            <button
              type="button"
              className="mt-1 ml-auto block text-[8px] text-[#C87829]"
            >
              What is this?
            </button>
          </div>

          {/* Implanter Number */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Implanter Number (VIC Only)
            </label>

            <input
              type="text"
              name="implanterNumber"
              value={litterFormData.implanterNumber}
              onChange={handleLitterChange}
              inputMode="numeric"
              maxLength={15}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />

            <button
              type="button"
              className="mt-1 ml-auto block text-[8px] text-[#C87829]"
            >
              What is this?
            </button>
          </div>

          {/* Breeder Supply Number */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Breeder Supply Number (QLD Only)
            </label>

            <input
              type="text"
              name="breederSupplyNumber"
              value={litterFormData.breederSupplyNumber}
              onChange={handleLitterChange}
              disabled={breederSupplyNotRequired}
              maxLength={15}
              className={`h-[27px] w-full rounded-[2px] border border-[#A89788] px-2 text-[8px] outline-none ${
                breederSupplyNotRequired
                  ? "cursor-not-allowed bg-[#F5F2EE] text-[#AAA29A]"
                  : "bg-white text-[#51473F] focus:border-[#624F3E]"
              }`}
            />

            <button
              type="button"
              className="mt-1 ml-auto block text-[8px] text-[#C87829]"
            >
              What is this?
            </button>
          </div>

          {/* Checkbox */}

          <label className="mt-3 flex cursor-pointer items-start gap-1.5">
            <input
              type="checkbox"
              checked={breederSupplyNotRequired}
              onChange={(event) => {
                const checked =
                  event.target.checked;

                setBreederSupplyNotRequired(checked);

                if (checked) {
                  setLitterFormData((current) => ({
                    ...current,
                    breederSupplyNumber: "",
                  }));
                }
              }}
              className="mt-[1px] h-[10px] w-[10px] accent-[#C87829]"
            />

            <span className="text-[8px] leading-[1.3] text-[#51473F]">
              Tick this box is a Breeder Supply Number
              <br />
              is not required.
            </span>
          </label>
        </section>

        {/* ================= OWNER DETAILS ================= */}

        <section className="mt-3 rounded-[3px] bg-[#FFFCF9] px-4 pb-4 pt-4">
          <h3 className="mb-3 text-[11px] font-semibold text-[#30271F]">
            Owner Details
          </h3>

          {/* Business Type */}

          <div className="relative">
            <button
              type="button"
              className="relative flex h-[27px] w-full items-center rounded-[2px] border border-[#A89788] bg-white px-2 text-left"
            >
              <span className="absolute -top-[5px] left-2 bg-white px-1 text-[8px] text-[#8A8179]">
                Business Type
              </span>

              <span className="text-[8px] text-[#51473F]">
                {selectedOwnerType}
              </span>

              <ChevronDown
                size={9}
                className="ml-auto text-[#C87829]"
              />
            </button>
          </div>

          {/* First Name */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={ownerData.firstName}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Surname */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Surname
            </label>

            <input
              type="text"
              name="surname"
              value={ownerData.surname}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Mobile */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Mobile
            </label>

            <input
              type="text"
              name="mobile"
              value={ownerData.mobile}
              onChange={handleOwnerChange}
              inputMode="numeric"
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Email */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={ownerData.email}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Home Phone */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Home Phone
            </label>

            <input
              type="text"
              name="homePhone"
              value={ownerData.homePhone}
              onChange={handleOwnerChange}
              inputMode="numeric"
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Street Address */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Street Address
            </label>

            <input
              type="text"
              name="streetAddress"
              value={ownerData.streetAddress}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Suburb */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Suburb
            </label>

            <input
              type="text"
              name="suburb"
              value={ownerData.suburb}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Post Code */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Post Code
            </label>

            <input
              type="text"
              name="postCode"
              value={ownerData.postCode}
              onChange={handleOwnerChange}
              inputMode="numeric"
              maxLength={4}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* Municipality */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Municipality
            </label>

            <input
              type="text"
              name="municipality"
              value={ownerData.municipality}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>

          {/* State */}

          <div className="relative mt-2">
            <button
              type="button"
              onClick={() =>
                setShowStateDropdown(
                  (current) => !current,
                )
              }
              className="relative flex h-[27px] w-full items-center rounded-[2px] border border-[#A89788] bg-white px-2 text-left"
            >
              <span className="absolute -top-[5px] left-2 bg-white px-1 text-[8px] text-[#8A8179]">
                State
              </span>

              <span className="text-[8px] text-[#51473F]">
                {ownerData.state}
              </span>

              <ChevronDown
                size={9}
                className="ml-auto text-[#C87829]"
              />
            </button>

            {showStateDropdown && (
              <div className="absolute left-0 right-0 top-[30px] z-30 rounded-[2px] border border-[#D6C8BA] bg-white shadow-md">
                {stateOptions.map((state) => (
                  <button
                    key={state}
                    type="button"
                    onClick={() =>
                      handleStateSelect(state)
                    }
                    className="block w-full px-2 py-1.5 text-left text-[8px] text-[#51473F] hover:bg-[#F7E7D1]"
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={ownerData.country}
              readOnly
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-[#FAF8F5] px-2 text-[8px] text-[#51473F] outline-none"
            />
          </div>

          {/* Alternate Contact Name */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Alternate Contact Name
            </label>

            <input
              type="text"
              name="alternateContactName"
              value={ownerData.alternateContactName}
              onChange={handleOwnerChange}
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />

            <p className="mt-1 text-[5px] leading-[1.3] text-[#8A8179]">
              Alternate contact will only be contacted
              if your first attempt cannot be completed.
              Alternate contacts must be over 18 years of
              age.
            </p>
          </div>

          {/* Alternate Contact Number */}

          <div className="relative mt-2">
            <label className="absolute -top-[5px] left-2 z-10 bg-white px-1 text-[8px] text-[#8A8179]">
              Alternate Contact Number
            </label>

            <input
              type="text"
              name="alternateContactNumber"
              value={ownerData.alternateContactNumber}
              onChange={handleOwnerChange}
              inputMode="numeric"
              className="h-[27px] w-full rounded-[2px] border border-[#A89788] bg-white px-2 text-[8px] text-[#51473F] outline-none focus:border-[#624F3E]"
            />
          </div>
        </section>

        {/* ================= ACTIONS ================= */}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-[27px] rounded-[2px] border border-[#D88A43] bg-white text-[8px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAndRetry}
            className="h-[27px] rounded-[2px] bg-[#C87829] text-[8px] font-medium text-white transition-colors hover:bg-[#B56820]"
          >
            Save and Retry
          </button>
        </div>
      </div>
    </div>
  );
}