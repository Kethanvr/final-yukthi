import { UserProfile } from "@/lib/types";

interface ProfileCardProps {
  profile: UserProfile;
  onClick?: () => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{profile.name}</h3>
          <p className="text-sm text-gray-600">
            {profile.age} years • {profile.biologicalSex}
          </p>
        </div>
      </div>
      {profile.chronicConditions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {profile.chronicConditions.slice(0, 2).map((condition) => (
            <span
              key={condition}
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
            >
              {condition}
            </span>
          ))}
          {profile.chronicConditions.length > 2 && (
            <span className="text-xs text-gray-500">
              +{profile.chronicConditions.length - 2} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}


