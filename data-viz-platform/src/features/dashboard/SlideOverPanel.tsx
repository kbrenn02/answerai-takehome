import React, { useRef, useState } from 'react'
import VariableItem from '../../components/VariableItem';
import { Variable } from '../../assets/data/dummyData';
  
type SlideOverPanelProps = {
    isOpen: boolean;
    onClose: () => void;
    variables: Variable[];
    selectedVars: Variable[];
    setSelectedVars: React.Dispatch<React.SetStateAction<Variable[]>>;
};

const SlideOverPanel: React.FC<SlideOverPanelProps> = ({ isOpen, onClose, variables, selectedVars, setSelectedVars }) => {
    
    const [hoveredVar, setHoveredVar] = useState<string | null>(null);
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

    // Add variables to the "selected variables" that then get sent to the dashboard and can be used in other components like the graph
    const handleSelect = (variable: string) => {
        setSelectedVars(prev => {
            const alreadySelected = prev.find(v => v.name === variable);
            if (alreadySelected) {
                return prev.filter(v => v.name !== variable);
            } else {
                const newVar = variables.find(v => v.name === variable);
                return newVar ? [...prev, newVar] : prev;
            }
        });
    };

    // sets which variable is being hovered over so that the description can show up after 1.5s
    const handleHoverStart = (variable: string) => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        hoverTimeout.current = setTimeout(() => setHoveredVar(variable), 1500);
    }

    const handleHoverEnd = () => {
        if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
        setHoveredVar(null);
    }
    
    // group variables by category so that it's shown by category in the slide panel
    const groupedVariables = variables.reduce<Record<string, Variable[]>>((acc, curr) => {
        if (!acc[curr.category]) acc[curr.category] = [];
        acc[curr.category].push(curr);
        return acc;
    }, {});

    return (
        <div 
            className={`fixed inset-0 z-50 flex transition-opacity duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Blur current background */}
            <div className='flex-1 backdrop-blur-sm bg-black/30' onClick={onClose}></div>

            {/* Panel */}
            <div 
                className={`w-1/2 bg-gray-800 border-l border-gray-500 shadow-lg h-full flex flex-col transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                } pt-3 px-3`}
            >
                {/* Header */}
                <div className='flex justify-between items-center p-4'>
                    <h2 className='text-4xl font-semibold'>Edit Variables</h2>
                    <button onClick={onClose} className='text-xl font-bold cursor-pointer'>×</button>
                </div>

                {/* Search and rerun */}
                <div className='flex gap-4 py-4'>
                    <input 
                        type="text"
                        placeholder='Search variables...' 
                        className='w-full px-3 py-2 rounded-lg border border-gray-300'
                    />
                    <div className='flex gap-2'>
                        <button className='cursor-pointer bg-gray-800 py-2 px-4 rounded-lg border border-gray-500'>✨Autofill</button>
                        <button className='cursor-pointer bg-transparent hover:bg-gray-800 py-2 px-4 rounded-lg border border-green-500 text-green-500 text-[20px]'>⟳Rerun</button>
                    </div>
                </div>

                {/* Variables list section */}
                <div className={`p-4 overflow-y-auto h-[35%] border border-gray-500 relative flex flex-wrap gap-2 ${
                    hoveredVar ? 'rounded-t-lg rounded-b-none' : 'rounded-lg'
                    } transition-all duration-200`}>
                    {Object.entries(groupedVariables).map(([category, subVariables]) => (
                        <div key={category} className='mb-2 w-full'>
                            <h3 className="text-white font-semibold mb-2">{category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {subVariables.map((v) => (
                                    <VariableItem
                                        key={v.name}
                                        name={v.name}
                                        description={v.description}
                                        isSelected={selectedVars.some(selected => selected.name === v.name)}
                                        onSelect={() => handleSelect(v.name)}
                                        onHover={() => handleHoverStart(v.name)}
                                        onLeave={handleHoverEnd}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    
                </div>
                {/* Context window for var */}
                {hoveredVar && (
                    <div className='p-2 bg-gray-700 border border-t-0 border-gray-500 text-md text-gray-400 rounded-b-lg transition-all duration-300'>
                        {variables.find((v) => v.name === hoveredVar)?.description}
                    </div>
                )}
                

                {/* Primary and Secondary Variable placeholders */}
                <div className='py-6 space-y-4 flex flex-col '>
                    <div className='flex justify-between items-center bg-gray-800 border border-gray-500 rounded-lg p-4'>
                        <h2 className='text-2xl font-semibold text-green-500'>Primary Variables</h2>
                        <button 
                            className="cursor-pointer bg-transparent hover:bg-gray-800 py-2 px-4 rounded-4xl border border-green-500 text-green-500 text-[20px]"
                        >  
                            ∨
                        </button>
                    </div>
                    <div className='flex justify-between items-center bg-gray-800 border border-gray-500 rounded-lg p-4'>
                        <h2 className='text-2xl font-semibold text-green-500'>Secondary Variables</h2>
                        <button 
                            className="cursor-pointer bg-transparent hover:bg-gray-800 py-2 px-4 rounded-4xl border border-green-500 text-green-500 text-[20px]"
                        >  
                            ∨
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SlideOverPanel