import { UserProfile } from "@/lib/types";
import { Avatar } from "./Avatar";

interface ProfileCardProps {
  profile: UserProfile;
  onClick?: () => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-blue-200 p-3 md:p-4 lg:p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] lg:active:scale-100 min-h-[80px] md:min-h-[100px]"
    >
      <div className="flex items-center gap-3 md:gap-4">
        <Avatar profile={profile} size="md" />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-blue-900 text-sm md:text-base lg:text-lg">
            {profile.name}
          </h3>
          <p className="text-xs md:text-sm text-blue-600 mt-1">
            {profile.age} years • {profile.biologicalSex}
          </p>
        </div>
      </div>
      {profile.chronicConditions.length > 0 && (
        <div className="mt-3 md:mt-4 flex flex-wrap gap-1 md:gap-2">
          {profile.chronicConditions.slice(0, 2).map((condition) => (
            <span
              key={condition}
              className="text-xs md:text-sm bg-blue-100 text-blue-700 px-2 md:px-3 py-1 rounded"
            >
              {condition}
            </span>
          ))}
          {profile.chronicConditions.length > 2 && (
            <span className="text-xs md:text-sm text-blue-500">
              +{profile.chronicConditions.length - 2} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}
