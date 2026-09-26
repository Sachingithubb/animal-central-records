import {
  ArrowLeft,
  Barcode,
  Cable,
  CircleCheck,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";

export default function BarCode({ onClose, scanStatus, setScanStatus }) {
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanStatus("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, [setScanStatus]);

  useEffect(() => {
    if (scanStatus === "success" ) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [onClose, scanStatus]);

  return (
    <div
      className="fixed inset-0 z-100 bg-black/35 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-205 flex-col rounded-l-[28px] bg-[#FFFCF9] shadow-[-10px_0_40px_rgba(60,40,20,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex h-15.5 shrink-0 items-center border-b border-[#D9D0C8] px-6 sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close barcode scanner"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#C87829] transition-colors hover:bg-[#F8E9D7]"
          >
            <ArrowLeft size={22} strokeWidth={1.8} />
          </button>

          <h1 className="flex-1 pr-9 text-center text-[17px] font-bold text-[#302820]">
            Scan Bar Code
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-10 sm:py-8">
          <div className="rounded-[7px] border border-[#EFE7DF] bg-white p-6 shadow-[0_3px_14px_rgba(80,50,20,0.06)] sm:p-8">
            <h2 className="text-[20px] font-bold leading-[1.3] text-[#17120F] sm:text-[21px]">
              Enter the correct microchip number EVERYTIME.
            </h2>

            <p className="mt-3 max-w-170 text-[11px] leading-4 text-[#625B55] sm:text-[12px] sm:leading-4.25">
              Using a barcode scanner when completing online subscriptions
              prevents the chance of listing a microchip number incorrectly.
              Mistyped microchip numbers can result in owners not being
              contacted when their pets are found.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-7">
              <div>
                <div className="flex h-15.5 w-15.5 items-center justify-center rounded-full bg-[#FCF1E6]">
                  <Cable
                    size={29}
                    strokeWidth={1.6}
                    className="text-[#C87829]"
                  />
                </div>

                <h3 className="mt-4 text-[12px] font-bold text-[#40372F]">
                  Step 1
                </h3>

                <p className="mt-2 max-w-47.5 text-[10px] leading-3.5 text-[#625B55]">
                  Connect your CAR-approved barcode scanner to your computer via
                  USB-cable.
                </p>
              </div>

              <div>
                <div className="flex h-15.5 w-15.5 items-center justify-center rounded-full bg-[#FCF1E6]">
                  <Barcode
                    size={30}
                    strokeWidth={1.6}
                    className="text-[#C87829]"
                  />
                </div>

                <h3 className="mt-4 text-[12px] font-bold text-[#40372F]">
                  Step 2
                </h3>

                <p className="mt-2 max-w-47.5 text-[10px] leading-3.5 text-[#625B55]">
                  Place the scanner over the microchip barcode and click the
                  scanning button.
                </p>
              </div>

              <div>
                <div className="flex h-15.5 w-15.5 items-center justify-center rounded-full bg-[#FCF1E6]">
                  <CircleCheck
                    size={29}
                    strokeWidth={1.7}
                    className="text-[#C87829]"
                  />
                </div>

                <h3 className="mt-4 text-[12px] font-bold text-[#40372F]">
                  Step 3
                </h3>

                <p className="mt-2 max-w-47.5 text-[10px] leading-3.5 text-[#625B55]">
                  When you've scanned the barcode, you'll see an instant
                  confirmation below.
                </p>
              </div>
            </div>

            {scanStatus === "waiting" && (
              <div className="mt-9 flex min-h-17 flex-col items-center justify-center rounded-lg border border-[#F2E5D8] bg-[#FCF3EA] px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.75 w-1.75 animate-bounce rounded-full bg-[#C87829] [animation-delay:0ms]" />
                  <span className="h-1.75 w-1.75 animate-bounce rounded-full bg-[#C87829] [animation-delay:150ms]" />
                  <span className="h-1.75 w-1.75 animate-bounce rounded-full bg-[#C87829] [animation-delay:300ms]" />
                </div>

                <p className="mt-2 text-[11px] font-medium text-[#302820]">
                  Waiting for Scan
                </p>
              </div>
            )}

            {scanStatus === "success" && (
              <>
                <div className="mt-9 flex min-h-[9] items-center gap-4 rounded-[5px] bg-[#D9F5E2] px-5 py-3">
                  <CircleCheck
                    size={27}
                    strokeWidth={1.5}
                    className="shrink-0 text-[#20C65A]"
                  />

                  <div>
                    <p className="text-[12] font-medium text-[#302820]">
                      Scan Successful
                    </p>

                    <p className="mt-1 text-[12px] font-bold text-[#17120F]">
                      95172837399300
                    </p>
                  </div>
                </div>

                <p className="mt-12 text-[12px] text-[#625B55]">
                  Note :This window will close shortly.
                </p>
              </>
            )}

            {scanStatus === "error" && (
              <>
                <div className="mt-9 flex min-h-22.5 items-start gap-3 rounded-[5px] bg-[#FDE4E4] px-3 py-2.5">
                  <div className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border border-[#F0444E] text-[9px] font-bold text-[#F0444E]">
                    !
                  </div>

                  <div>
                    <p className="text-[12px] font-medium text-[#302820]">
                      Error
                    </p>

                    <p className="mt-1 text-[14px] font-semibold leading-4 text-[#17120F]">
                      This microchip is already listed on [database]. Please
                      contact [database] on [phone_number].
                    </p>
                  </div>
                </div>

                <p className="mt-16 text-[12px] text-[#625B55]">
                </p>
              </>
            )}
            
          </div>

          <div className="flex flex-col items-center justify-center gap-3 py-7 sm:flex-row sm:gap-4">
            <span className="text-[10px] text-[#625B55]">
              Don't have a barcode scanner?
            </span>

            <button
              type="button"
              className="flex h-7.25 items-center gap-1.5 rounded-[3px] bg-[#C87829] px-4 text-[10px] font-medium text-white transition-colors hover:bg-[#B96D21]"
            >
              <ShoppingCart size={11} strokeWidth={1.8} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
