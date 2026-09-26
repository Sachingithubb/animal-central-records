export default function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#c98038]/30 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-[#c98038] text-white hover:bg-[#b87332]",

    secondary:
      "border border-[#c98038] bg-white text-[#8b5526] hover:bg-[#fff7ed]",

    ghost:
      "bg-transparent text-[#704521] hover:bg-[#f8eee1]",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}