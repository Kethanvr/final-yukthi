import Link from "next/link";
import { CameraIcon } from "@heroicons/react/24/outline";

export function FloatingScanButton() {
  return (
    <Link
      href="/camera"
      className="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40"
      aria-label="Scan Product"
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <CameraIcon className="w-8 h-8 text-white" />
    </Link>
  );
}


