import { CalendarDays } from "lucide-react";

export default function FormField({
  field,
  value,
  onChange,
}) {
  const isDate = field.type === "date";

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={field.id}
          name={field.name}
          type={field.type}
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className="
            h-[28px]
            w-full
            rounded-[2px]
            border
            border-[#BEB8B2]
            bg-white
            px-2
            text-[10px]
            text-[#5E554D]
            outline-none
            transition-colors
            placeholder:text-[#766F68]
            focus:border-[#C87829]
            focus:ring-1
            focus:ring-[#C87829]/20
          "
        />

        {isDate && (
          <CalendarDays
            size={13}
            strokeWidth={1.7}
            className="
              pointer-events-none
              absolute
              right-2
              top-1/2
              -translate-y-1/2
              text-[#C87829]
            "
          />
        )}
      </div>

      {/* Extra action */}
      {field.extraAction && (
        <button
          type="button"
          className="
            mt-1
            block
            ml-auto
            text-[9px]
            font-medium
            text-[#C87829]
            hover:underline
          "
        >
          {field.extraAction}
        </button>
      )}

      {/* Help */}
      {field.helpText && (
        <button
          type="button"
          className="
            mt-1
            block
            ml-auto
            text-[9px]
            text-[#C87829]
            hover:underline
          "
        >
          {field.helpText}
        </button>
      )}
    </div>
  );
}