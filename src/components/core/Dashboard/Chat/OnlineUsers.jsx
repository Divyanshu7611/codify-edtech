import { VscClose, VscCircle } from "react-icons/vsc"

export default function OnlineUsers({ onlineUsers, onClose }) {
  return (
    <div className="absolute right-0 top-0 h-full w-80 border-l border-richblack-700 bg-richblack-800">
      <div className="flex items-center justify-between border-b border-richblack-700 p-4">
        <h3 className="font-semibold text-richblack-5">Online Users</h3>
        <button
          onClick={onClose}
          className="rounded p-1 text-richblack-400 hover:bg-richblack-700"
        >
          <VscClose className="text-lg" />
        </button>
      </div>

      <div className="overflow-y-auto p-4">
        {onlineUsers.length === 0 ? (
          <div className="text-center text-richblack-400">
            <div className="mb-2 text-4xl">👥</div>
            <p>No users online</p>
          </div>
        ) : (
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-richblack-700"
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-richblack-600 flex items-center justify-center">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-richblack-5">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-richblack-800">
                    <VscCircle className="h-full w-full text-green-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-richblack-5 truncate">
                      {user.firstName} {user.lastName}
                    </span>
                    {user.accountType === "Instructor" && (
                      <span className="rounded bg-yellow-500 px-1 py-0.5 text-xs font-semibold text-richblack-900">
                        Instructor
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-richblack-400">
                    Last seen {new Date(user.lastSeen).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
