import { VscClose } from "react-icons/vsc"

const emojis = [
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃",
  "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙",
  "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔",
  "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥",
  "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮",
  "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
  "👆", "👇", "☝️", "✋", "🤚", "🖐", "🖖", "👋", "🤝", "👏",
  "🙌", "👐", "🤲", "🤜", "🤛", "✊", "👊", "👎", "👌", "✌️"
]

export default function EmojiPicker({ onEmojiSelect, onClose }) {
  return (
    <div className="absolute bottom-16 left-4 z-50 w-80 rounded-lg border border-richblack-600 bg-richblack-800 p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-richblack-5">Choose an emoji</h3>
        <button
          onClick={onClose}
          className="rounded p-1 text-richblack-400 hover:bg-richblack-700"
        >
          <VscClose className="text-lg" />
        </button>
      </div>
      <div className="grid grid-cols-10 gap-2 max-h-48 overflow-y-auto">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => onEmojiSelect(emoji)}
            className="rounded p-2 text-lg hover:bg-richblack-700 transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
