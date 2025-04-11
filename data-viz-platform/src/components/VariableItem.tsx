import React from 'react'

type VariableItemProps = {
    name: string;
    description: string;
    isSelected: boolean;
    onSelect: () => void;
    onHover: () => void;
    onLeave: () => void;
  };

const VariableItem: React.FC<VariableItemProps> = ({ name, isSelected, onSelect, onHover, onLeave} ) => {
    return (
        <div
            onClick={onSelect}
            onMouseEnter={() => setTimeout(onHover, 1500)}
            onMouseLeave={onLeave}
            className={`cursor-pointer px-4 py-3 mb-4 rounded-full border ${
                isSelected ? 'bg-gray-500 text-green-500 border-green-500' : 'bg-gray-700 text-gray-400 hover:bg-gray-500'
                } transition`}
        >
            {isSelected ? '✨' : ''} {name}
        </div>
    )
}

export default VariableItem