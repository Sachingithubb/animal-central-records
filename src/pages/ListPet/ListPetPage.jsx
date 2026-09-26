import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { listingTypes } from "../../data/listingTypes";
import ListingTypeCard from "../../components/listing/ListingTypeCard";
import { setSelectedListingType } from "../../redux/listingSlice";

export default function ListPetPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (type) => {
    setSelectedType(type);

    dispatch(setSelectedListingType(type));
  };

  const handleNext = () => {
    if (!selectedType) return;

    navigate(`/list-pet/${selectedType}`);
  };

  return (
    <div className="flex w-full flex-col">
      {/* Page Header */}
      <div className="flex items-start justify-between"></div>

      {/* White Section */}
      <section
        className="
          mt-5
          flex
          min-h-[calc(100vh-170px)]
          w-full
          flex-1
          flex-col
          rounded-md
          bg-[#FFFEFD]
          px-4
          py-6
          sm:px-8
          sm:py-8
          lg:px-10
          lg:py-8
        "
      >
        {/* Listing Content */}
        <div className="mx-auto flex w-full max-w-95 flex-col">
          {/* Heading */}
          <h2 className="text-center text-lg font-semibold text-[#3A3028]">
            Choose Listing Type
          </h2>

          {/* Listing Cards */}
          <div className="mt-5 space-y-3">
            {listingTypes.map((listing) => (
              <ListingTypeCard
                key={listing.id}
                listing={listing}
                selected={selectedType === listing.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={!selectedType}
            onClick={handleNext}
            className="
              mt-5
              h-10.5
              w-full
              rounded-sm
              bg-[#C87829]
              px-5
              text-[12px]
              font-medium
              text-white
              transition-all
              duration-200
              hover:bg-[#B96D21]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
