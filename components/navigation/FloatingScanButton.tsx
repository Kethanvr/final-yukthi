import Link from "next/link";
import { CameraIcon } from "@heroicons/react/24/outline";

export function FloatingScanButton() {
  return (
    <>
      {/* Mobile: Bottom right floating button */}
      <Link
        href="/camera"
        className="fixed bottom-20 right-4 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all z-40 lg:hidden"
        aria-label="Scan Product"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <CameraIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </Link>
      
      {/* Desktop: Top right button */}
      <Link
        href="/camera"
        className="hidden lg:flex fixed top-20 right-6 w-14 h-14 bg-blue-600 rounded-full shadow-sm items-center justify-center hover:bg-blue-700 transition-all z-40"
        aria-label="Scan Product"
      >
        <CameraIcon className="w-7 h-7 text-white" />
      </Link>
    </>
  );
}


