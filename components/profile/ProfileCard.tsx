import { UserProfile } from "@/lib/types";

interface ProfileCardProps {
  profile: UserProfile;
  onClick?: () => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-stone-200 p-3 md:p-4 lg:p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] lg:active:scale-100 min-h-[80px] md:min-h-[100px]"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-slate-600 flex items-center justify-center text-white font-bold text-lg md:text-xl lg:text-2xl flex-shrink-0 shadow-sm">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm md:text-base lg:text-lg">
            {profile.name}
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            {profile.age} years • {profile.biologicalSex}
          </p>
        </div>
      </div>
      {profile.chronicConditions.length > 0 && (
        <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
          {profile.chronicConditions.slice(0, 2).map((condition) => (
            <span
              key={condition}
              className="text-xs md:text-sm bg-slate-100 text-slate-700 px-2 md:px-3 py-1 rounded"
            >
              {condition}
            </span>
          ))}
          {profile.chronicConditions.length > 2 && (
            <span className="text-xs md:text-sm text-slate-500">
              +{profile.chronicConditions.length - 2} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
