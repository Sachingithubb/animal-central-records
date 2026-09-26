import { useSelector } from "react-redux";
import { Check, AlertTriangle, Download, RefreshCw } from "lucide-react";
import EditDetails from "./EditDetails";
import { useState } from "react";

export default function ListingSuccess() {
  const [editingPet, setEditingPet] = useState(null);

  const petsDetails = useSelector((state) => state.listing.petsDetails);

  const failedPets = Array.isArray(petsDetails) ? petsDetails : [];

  /* ---------------------------------------------------------------------- */
  /* Download                                                                */
  /* ---------------------------------------------------------------------- */

  const handleDownload = () => {
    console.log("Download certificates");
  };

  /* ---------------------------------------------------------------------- */
  /* Retry                                                                   */
  /* ---------------------------------------------------------------------- */

  const handleRetry = (pet) => {
    console.log("Retry listing:", pet);
  };

  /* ---------------------------------------------------------------------- */
  /* Edit                                                                    */
  /* ---------------------------------------------------------------------- */

  const handleEdit = (pet) => {
    setEditingPet(pet);
  };

  const handleEditRetry = (updatedPet) => {
    console.log("Updated pet:", updatedPet);
  };

  /* ---------------------------------------------------------------------- */
  /* Microchip Number - COMMENTED OUT                                        */
  /* ---------------------------------------------------------------------- */

  /*
  const getPetType = (microchipNumber) => {
    const number = microchipNumber?.replace(/\s/g, "");

    if (number?.startsWith("3")) {
      return "Prepaid";
    }

    if (number?.startsWith("2")) {
      return "Non - Prepaid ($9.95)";
    }

    return "";
  };
  */

  /* ---------------------------------------------------------------------- */
  /* Colors                                                                   */
  /* ---------------------------------------------------------------------- */

  const getColors = (pet) => {
    if (Array.isArray(pet?.colors) && pet.colors.length) {
      return pet.colors.filter(Boolean);
    }

    if (pet?.color) {
      return [pet.color];
    }

    return [];
  };

  return (
    <div className="min-h-screen w-full bg-[#F7E7D1]">
      <div className="min-h-screen w-full bg-white px-3 py-3 sm:px-5 sm:py-4">
        {/* ================================================================== */}
        {/* SUCCESS                                                            */}
        {/* ================================================================== */}

        <section className="flex min-h-26.25 w-full items-center justify-center rounded-sm bg-[#F1F8ED] px-5 py-5">
          <div className="flex items-center justify-center gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[#25C957] text-[#25C957]">
              <Check size={29} strokeWidth={1.4} />
            </div>

            <div className="text-center">
              <p className="text-[12px] font-semibold leading-[1.4] text-[#29251F] sm:text-[13px]">
                You have successfully listed {petsDetails.length} pet
                {petsDetails.length !== 1 ? "s" : ""} on the Central Animal
                Records
                <br />
                Database
              </p>

              <p className="mt-2 text-[12px] leading-[2.4] text-[#71685F]">
                To download certificate(s) scroll down
              </p>

              <p className="mt-0.5 text-[12px] leading-[1.4] text-[#71685F]">
                To view previous listings, go to 'Listing History'.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* FAILED PETS                                                        */}
        {/* ================================================================== */}

        <section className="mt-4 w-full bg-white px-3 py-7 sm:px-6 sm:py-8">
          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-[1.3px] border-[#FF5555] text-[#FF5555]">
              <AlertTriangle size={22} strokeWidth={1.25} />
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-212.5 text-center text-[10px] font-semibold leading-[1.6] text-[#5C5148] sm:text-[13px]">
            The following pet listing(s) could not be added to the database due
            to a system error. Please use the available action for each pet.
          </p>

          {/* ================================================================== */}
          {/* TABLE                                                              */}
          {/* ================================================================== */}

          <div className="mx-auto mt-6 w-full max-w-7xl overflow-x-auto rounded-sm bg-white">
            <table className="w-full min-w-225 table-fixed border-collapse">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[18%]" />
                <col className="w-[20%]" />
                <col className="w-[18%]" />
                <col className="w-[9.5%]" />
                <col className="w-[9.5%]" />
              </colgroup>

              {/* ============================================================ */}
              {/* TABLE HEADER                                                  */}
              {/* ============================================================ */}

              <thead>
                <tr className="bg-[#FFFCF9]">
                  <th className="rounded-tl-sm px-4 py-3 text-left text-[8px] font-semibold text-[#3F3832] sm:px-5 sm:text-[10px]">
                    Pet Name
                  </th>

                  <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#3F3832] sm:px-5 sm:text-[10px]">
                    Sex
                  </th>

                  <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#3F3832] sm:px-5 sm:text-[10px]">
                    Colors
                  </th>

                  <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#3F3832] sm:px-5 sm:text-[10px]">
                    C.A.R Tag (Optional)
                  </th>

                  {/* <th className="px-2 py-3 text-center text-[8px] font-semibold text-[#3F3832] sm:text-[10px]">
                    Edit
                  </th>

                  <th className="rounded-tr-sm px-2 py-3 text-center text-[8px] font-semibold text-[#3F3832] sm:text-[10px]">
                    Retry
                  </th> */}

                  {/*
                  MICROCHIP COLUMN - COMMENTED OUT

                  <th className="px-4 py-3 text-left text-[8px] font-semibold text-[#3F3832] sm:px-5 sm:text-[10px]">
                    Microchip Number
                  </th>
                  */}
                </tr>
              </thead>

              {/* ============================================================ */}
              {/* TABLE BODY                                                    */}
              {/* ============================================================ */}

              <tbody>
                {failedPets.length > 0 ? (
                  failedPets.map((pet, index) => {
                    const colors = getColors(pet);

                    return (
                      <tr
                        key={pet?.id || index}
                        className="border-b border-[#F1ECE7] last:border-b-0"
                      >
                        {/* ================================================== */}
                        {/* MICROCHIP NUMBER - COMMENTED OUT                  */}
                        {/* ================================================== */}

                        {/*
                        <td className="px-4 py-4 align-middle sm:px-5">
                          <p className="text-[11px] text-[#625B55] sm:text-[10px]">
                            {pet?.microchipNumber || ""}
                          </p>

                          {(() => {
                            const petType = getPetType(
                              pet?.microchipNumber,
                            );

                            return petType ? (
                              <span
                                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[8px] font-medium leading-none text-white ${
                                  petType === "Prepaid"
                                    ? "bg-[#55C982]"
                                    : "bg-[#67B1D5]"
                                }`}
                              >
                                {petType}
                              </span>
                            ) : null;
                          })()}
                        </td>
                        */}

                        {/* ================================================== */}
                        {/* PET NAME                                           */}
                        {/* ================================================== */}

                        <td className="px-4 py-4 align-middle sm:px-5">
                          <p className="text-[11px] text-[#625B55] sm:text-[10px]">
                            {pet?.petName || "Not Provided"}
                          </p>
                        </td>

                        {/* ================================================== */}
                        {/* SEX                                                */}
                        {/* ================================================== */}

                        <td className="px-4 py-4 align-middle sm:px-5">
                          <p className="text-[11px] text-[#625B55] sm:text-[10px]">
                            {pet?.sex || "Not Provided"}
                          </p>
                        </td>

                        {/* ================================================== */}
                        {/* COLORS                                             */}
                        {/* ================================================== */}

                        <td className="px-4 py-4 align-middle sm:px-5">
                          {colors.length > 0 ? (
                            colors.map((color, colorIndex) => (
                              <p
                                key={`${color}-${colorIndex}`}
                                className="text-[11px] text-[#625B55] sm:text-[10px]"
                              >
                                Color
                                {colorIndex > 0 ? ` ${colorIndex}` : ""} -{" "}
                                {color}
                              </p>
                            ))
                          ) : (
                            <p className="text-[11px] text-[#625B55] sm:text-[10px]">
                              Not Provided
                            </p>
                          )}
                        </td>

                        {/* ================================================== */}
                        {/* C.A.R TAG                                          */}
                        {/* ================================================== */}

                        <td className="px-4 py-4 align-middle sm:px-5">
                          <p className="text-[11px] text-[#625B55] sm:text-[10px]">
                            {pet?.CARtag || pet?.carTag || "Not Provided"}
                          </p>
                        </td>

                        {/* ================================================== */}
                        {/* EDIT                                               */}
                        {/* ================================================== */}

                        <td className="px-2 py-4 text-center align-middle">
                          <button
                            type="button"
                            onClick={() => handleEdit(pet)}
                            className="inline-flex h-7 items-center justify-center rounded-xs border border-[#D88A43] bg-white px-3 text-[10px] font-medium text-[#C87829] transition-colors hover:bg-[#FFF5EA]"
                          >
                            Edit
                          </button>
                        </td>

                        {/* ================================================== */}
                        {/* RETRY                                              */}
                        {/* ================================================== */}

                        <td className="px-2 py-4 text-center align-middle">
                          <button
                            type="button"
                            onClick={() => handleRetry(pet)}
                            className="inline-flex h-7 items-center justify-center gap-1.5 rounded-xs bg-[#C87829] px-3 text-[10px] font-medium text-white transition-colors hover:bg-[#B56820]"
                          >
                            <RefreshCw size={12} strokeWidth={1.8} />
                            Retry
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-[11px] text-[#8A8179]"
                    >
                      No pet listings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================================================================== */}
        {/* DOWNLOAD CERTIFICATE                                              */}
        {/* ================================================================== */}

        <section className="flex min-h-107.5 w-full flex-col items-center justify-center bg-white px-4 pb-50 text-center">
          <h2 className="text-[13px] font-medium text-[#29251F] sm:text-[16px]">
            Download your listing certificate(s)
          </h2>

          <button
            type="button"
            onClick={handleDownload}
            className="mt-6 flex h-9.5 items-center justify-center gap-2 rounded-[3px] bg-[#C87829] px-6 text-[14px] font-medium text-white shadow-[0_2px_6px_rgba(80,50,20,0.08)] transition-colors hover:bg-[#B56820]"
          >
            <Download size={18} strokeWidth={1.7} />
            Download Certificate(s)
          </button>

          <p className="mt-4 max-w-72.5 text-[9px] leading-[1.45] text-[#8A8179]">
            If you have made any entry, you have 48 hours to edit the
            city/municipality details from the Listing History page.
          </p>

          {/*
          MICROCHIP-RELATED TEXT - COMMENTED OUT

          <p className="mt-4 max-w-72.5 text-[9px] leading-[1.45] text-[#8A8179]">
            Click here to amend any microchip number(s).
          </p>
          */}
        </section>

        {/* ================================================================== */}
        {/* EDIT DETAILS                                                       */}
        {/* ================================================================== */}

        {editingPet && (
          <EditDetails
            pet={editingPet}
            onClose={() => setEditingPet(null)}
            onRetry={handleEditRetry}
          />
        )}
      </div>
    </div>
  );
}
