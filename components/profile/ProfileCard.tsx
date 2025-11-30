import { UserProfile } from "@/lib/types";
import { Avatar } from "./Avatar";
import { PencilIcon } from "@heroicons/react/24/outline";

interface ProfileCardProps {
  profile: UserProfile;
  onClick?: () => void;
  onEdit?: () => void;
}

export function ProfileCard({ profile, onClick, onEdit }: ProfileCardProps) {
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <Avatar profile={profile} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900 text-sm md:text-base">
                {profile.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                {profile.age} yrs
              </p>
            </div>
            <button
              onClick={handleEditClick}
              className="p-1.5 hover:bg-slate-100 rounded-full transition-colors flex-shrink-0"
              aria-label="Edit profile"
            >
              <PencilIcon className="w-5 h-5 text-slate-500 hover:text-blue-600" />
            </button>
          </div>
          {profile.chronicConditions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {profile.chronicConditions.map((condition) => (
                <span
                  key={condition}
                  className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                >
                  {condition}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
