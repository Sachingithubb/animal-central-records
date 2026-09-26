export default function ListingTypeCard({
  listing,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(listing.id)}
      className={`
        flex
        min-h-[115px]
        w-full
        items-center
        gap-4
        rounded-md
        px-4
        py-4
        text-left
        transition-all
        duration-200

        ${
          selected
            ? "bg-[#C87829] text-white"
            : "bg-[#FCF2E7] text-[#5C4A3B] hover:bg-[#F9EBDD]"
        }
      `}
    >
      {/* Image */}
      <div
        className="
          h-[92px]
          w-[92px]
          shrink-0
          overflow-hidden
          rounded-sm
          bg-white
        "
      >
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p
          className={`
            text-[14px]
            font-medium
            leading-tight
            ${
              selected
                ? "text-white"
                : "text-[#59483A]"
            }
          `}
        >
          {listing.title}
        </p>

        {listing.description && (
          <p
            className={`
              mt-1
              text-[10px]
              leading-tight
              ${
                selected
                  ? "text-white/80"
                  : "text-[#806E5D]"
              }
            `}
          >
            {listing.description}
          </p>
        )}
      </div>

      {/* Radio */}
      <span
        className={`
          flex
          h-[18px]
          w-[18px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border-[1.5px]

          ${
            selected
              ? "border-white"
              : "border-[#C87829]"
          }
        `}
      >
        {selected && (
          <span
            className="
              h-[9px]
              w-[9px]
              rounded-full
              bg-white
            "
          />
        )}
      </span>
    </button>
  );
}