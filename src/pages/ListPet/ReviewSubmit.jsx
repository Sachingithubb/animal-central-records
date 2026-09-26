/* eslint-disable react-hooks/static-components */
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ListingStepper from "../../components/listing/ListingStepper";

const ReviewSubmit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const litterDetails = useSelector((state) => state.listing.litterDetails);

  const petsDetails = useSelector((state) => state.listing.petsDetails);

  const ownerDetails = useSelector((state) => state.listing.ownerDetails);

  const ownerType = useSelector((state) => state.listing.ownerType);

  const selectedListingType = useSelector(
    (state) => state.listing.selectedListingType,
  );

  console.log(selectedListingType);

  /* ---------------------------------------------------------------------- */
  /* Listing Type                                                           */
  /* ---------------------------------------------------------------------- */

  const listingType = String(selectedListingType || "")
    .trim()
    .toLowerCase();

  const routeIsIndividual = location.pathname.startsWith(
    "/list-pet/individual",
  );

  const routeIsLitter = location.pathname.startsWith("/list-pet/litter");

  const routeIsMultiple = location.pathname.startsWith("/list-pet/multiple");

  const isIndividualListing = listingType === "individual" || routeIsIndividual;

  const isMultipleListing =
    listingType === "multiple" ||
    listingType === "multiplepets" ||
    listingType === "multiple-pets" ||
    listingType === "multiple_pets" ||
    listingType === "multiple pet" ||
    routeIsMultiple;

  /*
   * Litter is used when the listing is not Individual
   * and not Multiple Pets, and the route / Redux state
   * indicates the Litter flow.
   */
  const isLitterListing =
    !isIndividualListing &&
    !isMultipleListing &&
    (listingType === "litter" || routeIsLitter);

  const litter = litterDetails || {};
  const owner = ownerDetails?.[0] || {};

  const pets = Array.isArray(petsDetails) ? petsDetails : [];

  /* ---------------------------------------------------------------------- */
  /* Stepper                                                                */
  /* ---------------------------------------------------------------------- */

  /*
   * ListingStepper is now shared and automatically decides
   * which labels to display from selectedListingType.
   *
   * Individual:
   * 1. Pet Details
   * 2. Owner Details
   * 3. Review & Submit
   *
   * Multiple:
   * 1. Pet Details
   * 2. Owner Details
   * 3. Review & Submit
   *
   * Litter:
   * 1. Litter Details
   * 2. Pet Details
   * 3. Owner Details
   * 4. Review & Submit
   */
  const currentStep = isIndividualListing || isMultipleListing ? 3 : 4;

  /* ---------------------------------------------------------------------- */
  /* Microchip Number                                                       */
  /* ---------------------------------------------------------------------- */

  /*
  const getPetType = (microchipNumber) => {
    const number = microchipNumber?.replace(/\s/g, "");

    if (number?.startsWith("3")) {
      return "Prepaid";
    }

    if (number?.startsWith("2")) {
      return "Non-Prepaid";
    }

    return "";
  };

  const hasNonPrepaidPet = pets.some((pet) =>
    pet?.microchipNumber
      ?.replace(/\s/g, "")
      ?.startsWith("2"),
  );
  */

  /* ---------------------------------------------------------------------- */
  /* Helpers                                                                */
  /* ---------------------------------------------------------------------- */

  const getColors = (colors) => {
    if (Array.isArray(colors)) {
      return colors.filter((color) => color?.trim());
    }

    if (typeof colors === "string" && colors.trim()) {
      return [colors];
    }

    return [];
  };

  const formatDate = (date) => {
    if (!date) return "Text";

    if (date.includes("-")) {
      const [year, month, day] = date.split("-");

      if (year && month && day) {
        return `${day}-${month}-${year}`;
      }
    }

    return date;
  };

  /* ---------------------------------------------------------------------- */
  /* Navigation                                                             */
  /* ---------------------------------------------------------------------- */

  const handleBack = () => {
    navigate("/list-pet/litter/owner-detail");
  };

  const handleLitterEdit = () => {
    navigate("/list-pet/litter/editLitter");
  };

  const handlePetsEdit = () => {
    if (isIndividualListing) {
      navigate("/list-pet/individual", {
        state: {
          isEditMode: true,
        },
      });

      return;
    }

    if (isMultipleListing) {
      navigate("/list-pet/multiple/petdetailssummary");

      return;
    }

    navigate("/list-pet/litter/pets-detail", {
      state: {
        isEditMode: true,
      },
    });
  };

  const handleOwnerEdit = () => {
    if (isIndividualListing) {
      navigate("/list-pet/litter/manual-detail", {
        state: {
          isEditMode: true,
        },
      });

      return;
    }

    navigate("/list-pet/litter/manual-detail", {
      state: {
        isEditMode: true,
      },
    });
  };

  const handleSubmit = () => {
    if (isIndividualListing) {
      navigate("/list-pet/litter/listingsuccess");
      return;
    }

    navigate("/list-pet/litter/listingsuccess");
  };

  /* ---------------------------------------------------------------------- */
  /* Reusable Detail                                                        */
  /* ---------------------------------------------------------------------- */

  const IndividualDetail = ({ label, value }) => (
    <div>
      <p className="text-[10px] leading-3.25 text-[#A49B93]">{label}</p>

      <p className="mt-0.5 text-[11px] font-medium leading-3.25 text-[#514A44]">
        {value || "Text"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#F7E7D1] px-0.5 py-4">
      <div className="w-full rounded-lg bg-[#FFFCF9] px-3 pb-8 pt-3 shadow-[0_2px_12px_rgba(80,50,20,0.04)] sm:px-4 sm:pb-10 sm:pt-4 lg:px-5">
        {/* ---------------------------------------------------------------- */}
        {/* Shared Stepper                                                   */}
        {/* ---------------------------------------------------------------- */}

        <ListingStepper currentStep={currentStep} />

        {/* ---------------------------------------------------------------- */}
        {/* Header                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="relative mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={handleBack}
            className="absolute left-0 flex items-center gap-1 text-[12px] font-medium text-[#C87829] transition-colors hover:text-[#A95F1D]"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
            Back
          </button>

          <h1 className="text-center text-[16px] font-semibold text-[#30271F] sm:text-[17px]">
            Review all the details and Submit
          </h1>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Litter Details                                                   */}
        {/* ---------------------------------------------------------------- */}

        {isLitterListing && (
          <div className="mt-5 rounded-[5px] bg-white p-4 sm:p-5">
            <section className="bg-white px-0 pb-1 pt-0">
              <div className="mb-3 px-0.5 text-[14px] font-medium text-[#30271F]">
                Litter Details
              </div>

              <div className="relative rounded-[3px] bg-[#FFFCF9] px-3 py-4 sm:px-4">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 sm:gap-x-8">
                  <IndividualDetail
                    label="Implant Date"
                    value={formatDate(litter.implantDate)}
                  />

                  <IndividualDetail
                    label="DOB"
                    value={formatDate(litter.dob)}
                  />

                  <IndividualDetail label="Breed" value={litter.breed} />

                  <IndividualDetail label="Species" value={litter.species} />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleLitterEdit}
                    className="flex h-6 items-center justify-center border border-[#D88A43] px-3 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Individual Pet Details                                           */}
        {/* ---------------------------------------------------------------- */}

        {isIndividualListing && (
          <div className="mt-5 rounded-[5px] bg-white p-4 sm:p-5">
            <section>
              <div className="mb-3 px-0.5 text-[14px] font-medium text-[#30271F]">
                Pet Details
              </div>

              {pets.length > 0 &&
                pets.map((pet, index) => {
                  const colors = getColors(pet?.colors);

                  return (
                    <div
                      key={pet?.id || index}
                      className="relative rounded-[3px] bg-[#FFFCF9] px-3 py-4 sm:px-4"
                    >
                      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
                        {/* ================================================== */}
                        {/* MICROCHIP NUMBER - COMMENTED OUT                  */}
                        {/* ================================================== */}

                        {/*
                        <div>
                          <IndividualDetail
                            label="Microchip Number"
                            value={
                              pet?.microchipNumber ||
                              "054 374 789 944 444"
                            }
                          />

                          <span
                            className={`mt-1 inline-flex rounded-full px-3 py-0.5 text-[8px] font-medium text-white ${
                              pet?.microchipNumber
                                ?.replace(/\s/g, "")
                                ?.startsWith("3")
                                ? "bg-[#55C982]"
                                : "bg-[#68B6D8]"
                            }`}
                          >
                            {pet?.microchipNumber
                              ?.replace(/\s/g, "")
                              ?.startsWith("3")
                              ? "Prepaid"
                              : "Non-Prepaid ($9.95)"}
                          </span>
                        </div>
                        */}

                        <IndividualDetail
                          label="C.A.R. Tag (Optional)"
                          value={pet?.CARtag || pet?.carTag || "856565"}
                        />

                        <IndividualDetail
                          label="Pet Name"
                          value={pet?.petName || "Max"}
                        />

                        <IndividualDetail
                          label="Sex"
                          value={pet?.sex || "Male"}
                        />

                        <IndividualDetail
                          label="Implant Date"
                          value={formatDate(pet?.implantDate)}
                        />

                        <IndividualDetail
                          label="DOB"
                          value={formatDate(pet?.dob)}
                        />

                        <IndividualDetail
                          label="Breed"
                          value={pet?.breed || "Text"}
                        />

                        <IndividualDetail
                          label="Species"
                          value={pet?.species || "Text"}
                        />

                        <IndividualDetail
                          label="Sex"
                          value={pet?.sex || "Text"}
                        />

                        <IndividualDetail
                          label="Color"
                          value={
                            colors.length > 0 ? colors.join(", ") : "Brown"
                          }
                        />

                        <IndividualDetail
                          label="Source Number (VIC Only)"
                          value={pet?.sourceNumber || "87985"}
                        />

                        <IndividualDetail
                          label="Implanter Number (VIC Only)"
                          value={pet?.implanterNumber || "87985"}
                        />

                        <IndividualDetail
                          label="Breeder Supply Number (QLD Only)"
                          value={pet?.breederSupplyNumber || "87985"}
                        />
                      </div>

                      <div className="mt-5 flex justify-end">
                        <button
                          type="button"
                          onClick={handlePetsEdit}
                          className="flex h-6 items-center justify-center border border-[#D88A43] px-3 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
            </section>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Litter / Multiple Pet Details                                    */}
        {/* ---------------------------------------------------------------- */}

        {(isLitterListing || isMultipleListing) && (
          <div
            className={
              isLitterListing
                ? "rounded-[5px] bg-white p-4 sm:p-5"
                : "mt-5 rounded-[5px] bg-white p-4 sm:p-5"
            }
          >
            <section className="px-0 pb-1 pt-0">
              <div className="mb-3 px-0.5 text-[14px] font-medium text-[#30271F]">
                Pet(s) Details
              </div>

              <div className="rounded-[9px] bg-white px-0">
                {/* ========================================================== */}
                {/* MICROCHIP NUMBER - COMMENTED OUT                           */}
                {/* ========================================================== */}

                <div className="hidden grid-cols-[1.15fr_0.85fr_1.25fr_1fr] items-center rounded-t-[7px] bg-[#FFFCF9] px-3 py-4 sm:grid sm:px-3.5">
                  {/*
                  <p className="text-[10px] font-semibold text-[#514A44]">
                    Microchip Number
                  </p>
                  */}

                  <p className="text-[10px] font-semibold text-[#514A44]">
                    Pet Name
                  </p>

                  <p className="text-[10px] font-semibold text-[#514A44]">
                    Sex
                  </p>

                  <p className="text-[10px] font-semibold text-[#514A44]">
                    Colors
                  </p>

                  <p className="text-[10px] font-semibold text-[#514A44]">
                    C.A.R Tag (Optional)
                  </p>
                </div>

                {/* Pets */}
                {pets.map((pet, index) => {
                  const colors = getColors(pet?.colors);

                  /*
                  const petType = getPetType(
                    pet?.microchipNumber,
                  );

                  const isPrepaid =
                    petType === "Prepaid";
                  */

                  return (
                    <div
                      key={pet?.id || index}
                      className="grid grid-cols-1 gap-3 border-b border-[#D7D0C9] px-3 py-3 last:border-b-0 sm:grid-cols-[1.15fr_0.85fr_1.25fr_1fr] sm:items-center sm:gap-0 sm:px-3.5"
                    >
                      {/* ==================================================== */}
                      {/* MICROCHIP NUMBER - COMMENTED OUT                    */}
                      {/* ==================================================== */}

                      {/*
                      <div>
                        <p className="text-[10px] text-[#625B55] sm:hidden">
                          Microchip Num
                        </p>

                        <p className="text-[10px] text-[#625B55]">
                          {pet?.microchipNumber ||
                            "000 000 000 000 000"}
                        </p>

                        {petType && (
                          <span
                            className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[8px] font-medium text-white ${
                              isPrepaid
                                ? "bg-[#55C982]"
                                : "bg-[#68B6D8]"
                            }`}
                          >
                            {isPrepaid
                              ? "Prepaid"
                              : "Non-Prepaid ($9.95)"}
                          </span>
                        )}
                      </div>
                      */}

                      {/* Pet Name */}
                      <div>
                        <p className="text-[10px] text-[#625B55] sm:hidden">
                          Pet Name
                        </p>

                        <p className="text-[10px] text-[#625B55]">
                          {pet?.petName || "Max"}
                        </p>
                      </div>

                      {/* Sex */}
                      <div>
                        <p className="text-[10px] text-[#625B55] sm:hidden">
                          Sex
                        </p>

                        <p className="text-[10px] text-[#625B55]">
                          {pet?.sex || "Male"}
                        </p>
                      </div>

                      {/* Colors */}
                      <div>
                        <p className="text-[10px] text-[#625B55] sm:hidden">
                          Colors
                        </p>

                        {colors.length > 0 ? (
                          <div className="space-y-0.5">
                            {colors.map((color, colorIndex) => (
                              <p
                                key={`${color}-${colorIndex}`}
                                className="text-[10px] leading-[1.2] text-[#625B55]"
                              >
                                {`Color${
                                  colorIndex ? ` ${colorIndex}` : ""
                                } - ${color || "Brown"}`}
                              </p>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[10px] text-[#625B55]">
                            Color - Text
                          </p>
                        )}
                      </div>

                      {/* C.A.R Tag */}
                      <div>
                        <p className="text-[10px] text-[#625B55] sm:hidden">
                          C.A.R Tag (Optional)
                        </p>

                        <p className="text-[10px] text-[#625B55]">
                          {pet?.CARtag || pet?.carTag || "Text"}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="flex items-center justify-end gap-3 px-3 pt-3 sm:px-3.5">
                  <span className="text-[11px] font-medium text-[#625B55]">
                    Total Pet(s) Added : {pets.length}
                  </span>

                  <button
                    type="button"
                    onClick={handlePetsEdit}
                    className="flex h-6 items-center justify-center border border-[#D88A43] px-3 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Owner Details                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div
          className={
            isIndividualListing || isMultipleListing || isLitterListing
              ? "mt-5 rounded-[5px] bg-white p-4 sm:p-5"
              : "rounded-[5px] bg-white p-4 sm:p-5"
          }
        >
          <section className="px-0 pb-0 pt-0">
            <div className="mb-3 px-0.5 text-[14px] font-medium text-[#30271F]">
              Owner Details
            </div>

            <div className="rounded-[5px] bg-[#FFFCF9] px-3 py-4 sm:px-4">
              {/* Owner */}
              <div>
                <h3 className="inline-block border-b border-[#514A44] pb-1 text-[11px] font-semibold text-[#30271F]">
                  Owner
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-[#A49B93]">Owner Type</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {ownerType === "individual"
                        ? "Individual Person"
                        : ownerType === "business"
                          ? "Business"
                          : ownerType === "organisation"
                            ? "Our Organisation"
                            : ownerType || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">First Name</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.firstName || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Surname</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.surname || "Text"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="mt-5">
                <h3 className="inline-block border-b border-[#514A44] pb-1 text-[11px] font-semibold text-[#30271F]">
                  Address
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-[#A49B93]">Street Address</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.streetAddress || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Suburb</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.suburb || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Postcode</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.postCode || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Municipality</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.municipality || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">State</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.state || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Country</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.country || "Text"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="mt-5">
                <h3 className="inline-block border-b border-[#514A44] pb-1 text-[11px] font-semibold text-[#30271F]">
                  Contact Details
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-[#A49B93]">Home Phone</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.homePhone || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">Email</p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.email || "Text"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Alternate Contact */}
              <div className="mt-5">
                <h3 className="inline-block border-b border-[#514A44] pb-1 text-[11px] font-semibold text-[#30271F]">
                  Alternate Contact
                </h3>

                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] text-[#A49B93]">
                      Alternate Contact Name
                    </p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.alternateContactName || "Text"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-[#A49B93]">
                      Alternate Contact Number
                    </p>

                    <p className="mt-1 text-[11px] text-[#514A44]">
                      {owner.alternateContactNumber || "Text"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Owner Edit */}
              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={handleOwnerEdit}
                  className="flex h-6 items-center justify-center border border-[#D88A43] px-3 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                >
                  Edit
                </button>
              </div>

              {/* Information */}
              <p className="mx-auto mt-4 max-w-167.5 text-center text-[11px] leading-[1.35] text-[#514A44]">
                If the First Name, Surname, and Email address you have provided
                for this owner matches an existing record on our <br />
                database, we will update this existing record to reflect the
                information you have provided.
              </p>
            </div>
          </section>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Agreement Text                                                   */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-4 px-1">
          <p className="text-[10px] leading-[1.35] text-[#514A44]">
            By clicking the Agree and Submit button below, you are acknowledging
            that you believe the owner and pet information entered as part of
            this subscription is true and correct and that you have read and
            understood our privacy policy as it appears on car.com.au. You also
            confirm that the owner authorises Central Animal Records to provide
            their name and other personal information to other parties, and that
            you have advised the owner to contact Central Animal Records if they
            do not wish for their owner and pet information to be passed on to
            authorised users to enable the return of their pet(s).
          </p>

          <p className="mt-2 text-[10px] leading-[1.35] text-[#514A44]">
            Furthermore, you have made the owner aware that they have access to
            their owner and pet information on Central Animal Records and other
            national animal microchip registries and may use this information to
            assist with local council pet registrations and in administration of
            legislation.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Microchip / Non-Prepaid Invoice                                  */}
        {/* ---------------------------------------------------------------- */}

        {/*
        {hasNonPrepaidPet && (
          <div className="mt-4 flex justify-center">
            <div className="flex h-9.5 items-center gap-2 rounded-full border border-[#F0D6B7] bg-[#FFF0DD] px-4 text-[11px] text-[#766454] shadow-[0_2px_5px_rgba(80,50,20,0.03)]">
              <span className="flex h-5 w-5 items-center justify-center rounded-[3px] bg-white text-[#6D6258]">
                FileText icon
              </span>

              <span>
                You will be invoiced{" "}
                <strong className="font-semibold text-[#30271F]">
                  $9.95
                </strong>{" "}
                for this subscription
              </span>
            </div>
          </div>
        )}
        */}

        {/* ---------------------------------------------------------------- */}
        {/* Submit                                                           */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex h-8.5 items-center justify-center rounded-[3px] bg-[#C87829] px-5 text-[11px] font-medium text-white shadow-[0_2px_5px_rgba(80,50,20,0.08)] transition-colors hover:bg-[#B56820]"
          >
            Agree and Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmit;
