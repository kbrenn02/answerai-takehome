import { useState } from 'react'
import SlideOverPanel from './SlideOverPanel';
import { dummyData, Variable } from '../../assets/data/dummyData';
import { dummyGraph } from '../../assets/data/dummyGraph';
import Graph from './Graph';
import KPIs from './KPIs';


const Dashboard = () => {
    const [isDroppedDown, setIsDroppedDown] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [selectedVars, setSelectedVars] = useState<Variable[]>([]);

    const handleDropDown = () => {
        setIsDroppedDown((prev) => !prev)
    }
  
    return (
        <div className="flex min-h-screen">
            {/* Left Sidebar */}
            <div className="w-20 bg-black text-white min-h-screen p-4 flex flex-col items-center">
                <div className="text-2xl mb-8 cursor-pointer">☰</div>

                <ul className="space-y-4 w-full text-center">
                    <li className="cursor-pointer bg-gray-800 py-3 rounded-lg border border-gray-500">🏠</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">🔔</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">📋</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">☁️</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">⚙️</li>
                </ul>

                <div className="mt-auto text-2xl cursor-pointer">
                    👤
                </div>
            </div>

            {/* <!-- Right Section --> */}
            <div className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* <!-- Top Bar --> */}
                <div className="bg-black text-white p-4 m-0 flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button className="bg-gray-800 py-2 px-4 rounded-lg border border-gray-500">Charging Stations</button>
                        <button className="bg-transparent hover:bg-gray-800 py-2 px-4 rounded-lg">Fleet Sizing</button>
                        <button className="bg-transparent hover:bg-gray-800 py-2 px-4 rounded-lg">Parking</button>
                    </div>

                    <div className="flex items-center">
                        <input type="text" className="py-2 px-4 rounded-lg bg-gray-800 border border-gray-500" placeholder="Search..." />
                    </div>
                </div>

                {/* <!-- Main Content Area --> */}
                <div className="bg-gray-800 p-6 m-0 rounded-lg border border-gray-500">

                    {/* First header w/ the edit variables button */}
                    <div className="p-6 rounded-lg flex justify-between items-center">
                        <div className='flex items-center'>
                            <h2 className='text-4xl font-bold'>⚡️ Charging Station</h2>
                        </div>
                        <div className='flex space-x-4'>
                            <button className="cursor-pointer bg-transparent hover:bg-gray-600 py-2 px-4 rounded-lg border border-gray-500 text-[20px]">⟲</button>
                            <button 
                                className="cursor-pointer bg-transparent hover:bg-gray-600 py-2 px-4 rounded-lg border border-gray-500 text-[20px]"
                                onClick={() => setShowPanel(true)}
                            >
                                Edit Variables
                            </button>
                            <button className="cursor-pointer bg-transparent hover:bg-gray-600 py-2 px-4 rounded-lg border border-gray-500 text-[20px]">↥</button>
                        </div>
                    </div>

                    {/* Second section with Best Scenario Results */}
                    <div className='p-6 rounded-lg flex justify-between items-center'>
                        <div className='flex items-center text-green-500'>
                            <h3 className='text-2xl font-bold'>✨ Best Scenario Results</h3>
                        </div>
                        <div className='flex'>
                            <button 
                              className="cursor-pointer bg-transparent hover:bg-gray-800 py-2 px-4 rounded-4xl border border-green-500 text-green-500 text-[20px]"
                              onClick={handleDropDown}>
                                {isDroppedDown ? '∧' : '∨'}
                            </button>
                        </div>
                    </div>

                    { isDroppedDown ? (
                    <div className='pb-6 px-6 rounded-lg flex flex-col items-center space-y-4'>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                            <p className='text-[20px]'>⋯</p>
                        </div>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                            <p className='text-[20px]'>⋯</p>
                        </div>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</p>
                            <p className='text-[20px]'>⋯</p>
                        </div>
                    </div>
                    ) : (
                        <div></div>
                    )}

                    <div className='flex justify-between p-6'>
                        <Graph data={dummyGraph} variableNames={selectedVars.map((v) => v.name)}/>
                        <KPIs />
                    </div>

                    <SlideOverPanel
                        isOpen={showPanel}
                        onClose={() => setShowPanel(false)}
                        variables={dummyData}
                        selectedVars={selectedVars}
                        setSelectedVars={setSelectedVars}
                    />

                </div>
            </div>
        </div>
    )
}

export default Dashboard