import Link from "next/link";

export function FloatingScanButton() {
  return (
    <Link
      href="/camera"
      className="fixed bottom-20 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-40"
      aria-label="Scan Product"
    >
      <span className="text-3xl">📷</span>
    </Link>
  );
}


