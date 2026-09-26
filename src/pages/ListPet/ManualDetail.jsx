import { useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOwnerDetails } from "../../redux/listingSlice";

const ManualDetail = ({ ownerType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const ownerDetails = useSelector((state) => state.listing.ownerDetails);
  const isEditMode = location.state?.isEditMode === true;
  const owner = ownerDetails[0] || {};

  // console.log(ownerType);

  const [formData, setFormData] = useState({
    rescueKennelName: owner.rescueKennelName || "",
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
    alternateContactName: owner.alternateContactName || "",
    alternateContactNumber: owner.alternateContactNumber || "",
  });

  const [errors, setErrors] = useState({});
  const [showStreetSuggestions, setShowStreetSuggestions] = useState(false);
  const [showMunicipalitySuggestions, setShowMunicipalitySuggestions] =
    useState(false);

  const streetAddressOptions = [
    "10 Collins Street, Melbourne VIC 3000",
    "25 George Street, Sydney NSW 2000",
    "42 Queen Street, Brisbane QLD 4000",
    "18 King William Street, Adelaide SA 5000",
    "35 Murray Street, Perth WA 6000",
  ];

  const municipalityOptions = [
    "Melbourne City",
    "Greater Geelong",
    "Yarra City",
    "Monash City",
    "Casey City",
    "Darebin City",
    "Brisbane City",
    "Gold Coast City",
    "Sydney City",
    "Parramatta City",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (value.trim() && value.trim().length < 2) {
          error = "The 'First Name' field must be 2 or more characters.";
        }
        break;

      case "surname":
        if (value.trim() && value.trim().length < 2) {
          error = "The 'Surname' field must be 2 or more characters.";
        }
        break;

      case "mobile":
        if (value.trim() && !/^04\d{8}$/.test(value)) {
          error =
            "Please enter a mobile number in the correct format 04XXXXXXXX.";
        }
        break;

      case "email":
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = "Please enter a valid email address.";
        }
        break;

      case "homePhone":
        if (!value.trim()) {
          error = "You cannot enter a mobile number in the 'Home Phone' field.";
        } else if (value.startsWith("04")) {
          error = "You cannot enter a mobile number in the 'Home Phone' field.";
        } else if (!/^\d{10}$/.test(value)) {
          error =
            "A landline should be 10 numeric characters with no spaces or symbols.";
        }
        break;

      case "streetAddress":
        if (!value.trim()) {
          error = "The 'Street Address' field cannot be blank.";
        }
        break;

      case "suburb":
        if (!value.trim()) {
          error = "The 'Suburb' field cannot be blank.";
        }
        break;

      case "postCode":
        if (!value.trim()) {
          error = "The 'Post Code' field cannot be blank.";
        } else if (!/^\d{4}$/.test(value)) {
          error = "The 'Post Code' field should have 4 digits.";
        }
        break;

      case "municipality":
        if (!value) {
          error = "You must add a municipality.";
        }
        break;

      case "state":
        if (!value) {
          error = "You must select a state.";
        }
        break;

      case "alternateContactName":
        if (!value.trim()) {
          error = "The 'Alternate Contact Name' field cannot be blank.";
        } else if (value.trim() && value.trim().length < 2) {
          error =
            "The 'Alternate Contact Name' field must be 2 or more characters.";
        }
        break;

      case "alternateContactNumber":
        if (!value.trim()) {
          error = "The 'Alternate Contact Number' field cannot be blank.";
        } else if (value === formData.mobile) {
          error = "This must be different to the owner's mobile number.";
        } else if (value.trim().length !== 10) {
          error =
            "The 'Alternate Contact Number' field must be 10 or more digits.";
        }
        break;

      default:
        break;
    }

    setErrors((current) => ({
      ...current,
      [name]: error,
    }));
  };

  const isFormValid =
    formData.firstName.trim().length >= 2 &&
    formData.surname.trim().length >= 2 &&
    /^04\d{8}$/.test(formData.mobile) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    /^\d{10}$/.test(formData.homePhone) &&
    !formData.homePhone.startsWith("04") &&
    formData.streetAddress.trim() !== "" &&
    formData.suburb.trim() !== "" &&
    /^\d{4}$/.test(formData.postCode) &&
    formData.municipality !== "" &&
    formData.state !== "" &&
    formData.country.trim() !== "" &&
    formData.alternateContactName.trim() !== "" &&
    /^\d{10}$/.test(formData.alternateContactNumber) &&
    formData.alternateContactNumber !== formData.mobile;

  const handleNext = () => {
    if (!isFormValid) {
      return;
    }

    dispatch(setOwnerDetails([formData]));

    navigate("/list-pet/litter/reviewsubmit");
  };

  const inputClass = (fieldName) =>
    `peer h-[36px] w-full rounded-[3px] border bg-white px-3 text-[12px] text-[#514A45] outline-none transition-colors ${
      errors[fieldName]
        ? "border-[#F04444] focus:border-[#F04444]"
        : "border-[#A9A5A2] focus:border-[#C87829]"
    }`;

  const labelClass = (fieldName) =>
    `pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-[12px] transition-all duration-150 peer-focus:-top-[7px] peer-focus:translate-y-0 peer-focus:text-[9px] peer-[:not(:placeholder-shown)]:-top-[7px] peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[9px] ${
      errors[fieldName]
        ? "text-[#F04444] peer-focus:text-[#F04444] peer-[:not(:placeholder-shown)]:text-[#F04444]"
        : "text-[#68615B] peer-focus:text-[#624F3E] peer-[:not(:placeholder-shown)]:text-[#624F3E]"
    }`;

  const errorClass = "mt-1 text-[9.5px] leading-[11px] text-[#F04444]";

  return (
    <div
      className={`min-h-screen  w-full bg-[#F7E7D1] ${isEditMode ? "mt-0" : "mt-10"}`}
    >
      <div className="min-h-screen w-full bg-white p-2 pb-8 pt-3 sm:pb-10 sm:pt-4">
        {isEditMode && (
          <div className="relative flex w-full items-center justify-center pb-4">
            <button
              type="button"
              onClick={() => navigate("/list-pet/litter/reviewsubmit")}
              className="absolute left-0 top-0 flex items-center gap-1 text-[12px] font-medium text-[#C87829] transition-colors hover:text-[#A95F1D]"
            >
              <span className="text-[16px] leading-none">‹</span>
              Back to Review &amp; Submit
            </button>

            <h1 className="text-[18px] font-semibold text-[#30271F]">
              Edit Owner Details
            </h1>
          </div>
        )}

        {!isEditMode && (
          <div className="flex w-full items-center gap-3 rounded-md bg-[#F4EAEA] px-4 py-4">
            <AlertCircle
              size={18}
              className="shrink-0 text-[#D63B22]"
              fill="#D63B22"
              strokeWidth={0}
            />
            <p className="text-[11px] font-medium leading-[1.4] text-[#4E4640]">
              We could not find any existing owner records. Please enter the
              owner details manually. 
            </p>
          </div>
        )}

        {!isEditMode && (
          <h2 className="mt-7 text-[14px] font-medium text-[#4A4038]">
            Please enter the owner details manually
          </h2>
        )}

        <div className="mt-4 w-full rounded-sm bg-[#FFFCF9] px-3 py-3">
          <p className="text-[11px] font-medium tracking-[0.2px] text-[#5D534C]">
            WE DO NOT OFFER JOINT OWNERSHIP
          </p>

          <p className="mt-1 text-[10px] font-normal leading-[1.4] text-[#8A8179]">
            Please enter the Given Name and Surname of one person only.
          </p>
        </div>

        <div className="mx-auto mt-4 flex w-full max-w-73.75 flex-col gap-6">
          {/* Rescue/Kennel Name - Business Only */}
          {ownerType === "business" && (
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="rescueKennelName"
                  value={formData.rescueKennelName}
                  onChange={handleChange}
                  placeholder=" "
                  className={inputClass("rescueKennelName")}
                />

                <label className={labelClass("rescueKennelName")}>
                  Rescue/Kennel Name (Optional)
                </label>
              </div>

              {errors.rescueKennelName && (
                <p className={errorClass}>{errors.rescueKennelName}</p>
              )}
            </div>
          )}
          <div>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={(e) => validateField("firstName", e.target.value)}
                placeholder=" "
                className={inputClass("firstName")}
              />

              <label className={labelClass("firstName")}>First Name</label>
            </div>

            {errors.firstName && (
              <p className={errorClass}>{errors.firstName}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                onBlur={(e) => validateField("surname", e.target.value)}
                placeholder=" "
                className={inputClass("surname")}
              />

              <label className={labelClass("surname")}>Surname</label>
            </div>

            {errors.surname && <p className={errorClass}>{errors.surname}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "mobile",
                      value: e.target.value.replace(/\D/g, "").slice(0, 10),
                    },
                  })
                }
                onBlur={(e) => validateField("mobile", e.target.value)}
                inputMode="numeric"
                placeholder=" "
                className={inputClass("mobile")}
              />

              <label className={labelClass("mobile")}>Mobile</label>
            </div>

            {errors.mobile && <p className={errorClass}>{errors.mobile}</p>}
          </div>

          {/* Email Address */}
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => validateField("email", e.target.value)}
                placeholder=" "
                className={inputClass("email")}
              />

              <label className={labelClass("email")}>Email Address</label>
            </div>

            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Home Phone */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="homePhone"
                value={formData.homePhone}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "homePhone",
                      value: e.target.value.replace(/\D/g, "").slice(0, 10),
                    },
                  })
                }
                onBlur={(e) => validateField("homePhone", e.target.value)}
                inputMode="numeric"
                placeholder=" "
                className={inputClass("homePhone")}
              />

              <label className={labelClass("homePhone")}>Home Phone</label>
            </div>

            {errors.homePhone && (
              <p className={errorClass}>{errors.homePhone}</p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                onFocus={() => setShowStreetSuggestions(true)}
                onBlur={(e) => {
                  validateField("streetAddress", e.target.value);

                  setTimeout(() => {
                    setShowStreetSuggestions(false);
                  }, 150);
                }}
                placeholder=" "
                className={inputClass("streetAddress")}
              />

              <label className={labelClass("streetAddress")}>
                Street Address
              </label>

              {/* Street Address Dropdown */}
              {showStreetSuggestions && (
                <div className="absolute left-0 top-9.5 z-50 w-full overflow-hidden rounded-[3px] border border-[#D7CFC7] bg-white shadow-md">
                  {streetAddressOptions.map((address) => (
                    <button
                      key={address}
                      type="button"
                      onMouseDown={() => {
                        setFormData((current) => ({
                          ...current,
                          streetAddress: address,
                        }));

                        setErrors((current) => ({
                          ...current,
                          streetAddress: "",
                        }));

                        setShowStreetSuggestions(false);
                      }}
                      className="block w-full px-3 py-2 text-left text-[11px] font-normal text-[#514A45] hover:bg-[#FFF3E5] hover:text-[#514A45]"
                    >
                      {address}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {errors.streetAddress && (
              <p className={errorClass}>{errors.streetAddress}</p>
            )}
          </div>

          {/* Suburb */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="suburb"
                value={formData.suburb}
                onChange={handleChange}
                onBlur={(e) => validateField("suburb", e.target.value)}
                placeholder=" "
                className={inputClass("suburb")}
              />

              <label className={labelClass("suburb")}>Suburb</label>
            </div>

            {errors.suburb && <p className={errorClass}>{errors.suburb}</p>}
          </div>

          {/* Post Code */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="postCode"
                value={formData.postCode}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "postCode",
                      value: e.target.value.replace(/\D/g, "").slice(0, 4),
                    },
                  })
                }
                onBlur={(e) => validateField("postCode", e.target.value)}
                inputMode="numeric"
                placeholder=" "
                className={inputClass("postCode")}
              />

              <label className={labelClass("postCode")}>Post Code</label>
            </div>

            {errors.postCode && <p className={errorClass}>{errors.postCode}</p>}
          </div>

          {/* Municipality */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="municipality"
                autoComplete="off"
                value={formData.municipality}
                onChange={(e) => {
                  handleChange(e);
                  setShowMunicipalitySuggestions(true);
                }}
                onFocus={() => setShowMunicipalitySuggestions(true)}
                onBlur={(e) => {
                  validateField("municipality", e.target.value);

                  setTimeout(() => {
                    setShowMunicipalitySuggestions(false);
                  }, 150);
                }}
                placeholder=" "
                className={inputClass("municipality")}
              />

              <label className={labelClass("municipality")}>Municipality</label>

              {/* Municipality Suggestions */}
              {showMunicipalitySuggestions &&
                municipalityOptions.filter((municipality) =>
                  municipality
                    .toLowerCase()
                    .includes(formData.municipality.toLowerCase()),
                ).length > 0 && (
                  <div className="absolute left-0 top-9.5 z-50 w-full overflow-hidden rounded-[3px] border border-[#D7CFC7] bg-white shadow-md">
                    {municipalityOptions
                      .filter((municipality) =>
                        municipality
                          .toLowerCase()
                          .includes(formData.municipality.toLowerCase()),
                      )
                      .map((municipality) => (
                        <button
                          key={municipality}
                          type="button"
                          onMouseDown={(event) => {
                            event.preventDefault();

                            setFormData((current) => ({
                              ...current,
                              municipality,
                            }));

                            setErrors((current) => ({
                              ...current,
                              municipality: "",
                            }));

                            setShowMunicipalitySuggestions(false);
                          }}
                          className="block w-full px-3 py-2 text-left text-[11px] font-normal text-[#514A45] hover:bg-[#FFF3E5] hover:text-[#514A45]"
                        >
                          {municipality}
                        </button>
                      ))}
                  </div>
                )}
            </div>

            {errors.municipality && (
              <p className={errorClass}>{errors.municipality}</p>
            )}
          </div>

          {/* State */}
          <div>
            <div className="relative">
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={(e) => validateField("state", e.target.value)}
                className={`h-8.5 w-full appearance-none rounded-[3px] border bg-white px-3 pr-9 text-[12px] outline-none ${
                  errors.state
                    ? "border-[#F04444] text-[#514A45]"
                    : formData.state
                      ? "border-[#A9A5A2] text-[#514A45] focus:border-[#C87829]"
                      : "border-[#A9A5A2] text-transparent focus:border-[#C87829]"
                }`}
              >
                <option value="" disabled>
                  State
                </option>

                <option className="text-black" value="VIC">
                  VIC
                </option>
                <option className="text-black" value="NSW">
                  NSW
                </option>
                <option className="text-black" value="QLD">
                  QLD
                </option>
                <option className="text-black" value="SA">
                  SA
                </option>
                <option className="text-black" value="WA">
                  WA
                </option>
                <option className="text-black" value="TAS">
                  TAS
                </option>
                <option className="text-black" value="NT">
                  NT
                </option>
                <option className="text-black" value="ACT">
                  ACT
                </option>
              </select>

              <label
                className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-150 ${
                  formData.state
                    ? `-top-1.75 text-[10px] ${
                        errors.state ? "text-[#F04444]" : "text-[#624F3E]"
                      }`
                    : `top-1/2 -translate-y-1/2 text-[12px] ${
                        errors.state ? "text-[#F04444]" : "text-[#68615B]"
                      }`
                }`}
              >
                State
              </label>

              <ChevronDown
                size={15}
                strokeWidth={2}
                className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
                  errors.state ? "text-[#F04444]" : "text-[#C87829]"
                }`}
              />
            </div>

            {errors.state && <p className={errorClass}>{errors.state}</p>}
          </div>

          {/* Country */}
          <div className="relative">
            <input
              type="text"
              name="country"
              value="Australia"
              disabled
              placeholder=" "
              className="h-8.5 w-full rounded-[3px] border border-[#D0D0D0] bg-[#E4E4E4] px-3 text-[12px] text-[#514A45] outline-none"
            />

            <label className="pointer-events-none absolute left-3 -top-1.75 px-1 text-[10px] text-[#817A74]">
              Country
            </label>
          </div>

          {/* Alternate Contact Name */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="alternateContactName"
                value={formData.alternateContactName}
                onChange={handleChange}
                onBlur={(e) =>
                  validateField("alternateContactName", e.target.value)
                }
                placeholder=" "
                className={inputClass("alternateContactName")}
              />

              <label className={labelClass("alternateContactName")}>
                Alternate Contact Name
              </label>
            </div>

            {errors.alternateContactName && (
              <p className={errorClass}>{errors.alternateContactName}</p>
            )}

            <p className="mt-1 text-[9px] leading-[1.45] text-[#81776F]">
              Alternate contacts will only be contacted if your pet is found
              <br />
              and you cannot be contacted. Alternate contacts have no
              <br />
              authority on the account.
            </p>
          </div>

          {/* Alternate Contact Number */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="alternateContactNumber"
                value={formData.alternateContactNumber}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "alternateContactNumber",
                      value: e.target.value.replace(/\D/g, "").slice(0, 10),
                    },
                  })
                }
                onBlur={(e) =>
                  validateField("alternateContactNumber", e.target.value)
                }
                inputMode="numeric"
                placeholder=" "
                className={inputClass("alternateContactNumber")}
              />

              <label className={labelClass("alternateContactNumber")}>
                Alternate Contact Number
              </label>
            </div>

            {errors.alternateContactNumber && (
              <p className={errorClass}>{errors.alternateContactNumber}</p>
            )}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!isFormValid}
            className={`mt-4.5 h-9.25 w-full rounded-[3px] text-[13px] font-medium transition-colors ${
              isFormValid
                ? "bg-[#C87829] text-white hover:bg-[#B66D24]"
                : "cursor-not-allowed bg-[#E7C5A4] text-white"
            }`}
          >
            {isEditMode ? "Update" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualDetail;
