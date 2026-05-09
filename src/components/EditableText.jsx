import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

export const EditableText = ({ contentKey, defaultText, isAdmin, updateContent, className }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(defaultText);

  const handleSave = async () => {
    const success = await updateContent(contentKey, text);
    if (success) setIsEditing(false);
  };

  const handleCancel = () => {
    setText(defaultText);
    setIsEditing(false);
  };

  if (!isAdmin) {
    return <span className={className}>{defaultText}</span>;
  }

  return (
    <span className={`relative group/edit inline-block ${className}`}>
      {isEditing ? (
        <div className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-[#00bffa]/30 min-w-[200px]">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-transparent text-white border-none focus:ring-0 w-full resize-none font-inherit text-inherit"
            rows={2}
          />
          <div className="flex flex-col gap-1">
            <button onClick={handleSave} className="p-1 text-green-400 hover:bg-green-400/10 rounded">
              <Check size={16} />
            </button>
            <button onClick={handleCancel} className="p-1 text-red-400 hover:bg-red-400/10 rounded">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <>
          {defaultText}
          <button 
            onClick={() => setIsEditing(true)}
            className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover/edit:opacity-100 p-1.5 rounded-full bg-[#00bffa] text-black transition-all shadow-[0_0_15px_#00bffa]"
          >
            <Edit2 size={12} />
          </button>
        </>
      )}
    </span>
  );
};
