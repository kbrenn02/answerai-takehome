import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SlideOverPanel from './SlideOverPanel';
import { dummyData, Variable } from '../../assets/data/dummyData';
import { dummyGraph } from '../../assets/data/dummyGraph';
import Graph from './Graph';
import KPIs from './KPIs';
import { signOutUser } from '../../utils/firebase';
import { clearUser } from '../../components/Auth/authSlice';


const Dashboard = () => {
    const [isDroppedDown, setIsDroppedDown] = useState(true);
    const [showPanel, setShowPanel] = useState(false);
    const [selectedVars, setSelectedVars] = useState<Variable[]>([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleDropDown = () => {
        setIsDroppedDown((prev) => !prev)
    }

    const handleSignOut = async() => {
        try {
            await signOutUser()
            console.log("Successfully signed user out")
            dispatch(clearUser());
            navigate('/login');
        } catch (error) {
            console.error("Error signing user out:", error)
        }
    }
  
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Left Sidebar */}
            <div className="md:hidden bg-black text-white p-4 flex justify-between items-center">
                <div className="text-2xl cursor-pointer" onClick={() => setShowSidebar(!showSidebar)}>☰</div>
                <div className="text-xl">Dashboard</div>
            </div>

            <div className={`bg-black text-white p-4 flex flex-col items-center 
                ${showSidebar ? 'flex' : 'hidden'} 
                md:flex md:w-20 min-h-screen fixed md:relative z-50 top-0 left-0`}
            >
                <ul className="space-y-4 w-full text-center">
                    <li className="cursor-pointer bg-gray-800 py-3 rounded-lg border border-gray-500" onClick={() => setShowSidebar(false)}>🏠</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">🔔</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">📋</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">☁️</li>
                    <li className="cursor-pointer hover:bg-gray-800 py-3 rounded-lg">⚙️</li>
                </ul>

                <div className="mt-auto text-2xl cursor-pointer hover:bg-gray-800 py-3 rounded-lg w-full text-center" onClick={handleSignOut}>
                    👤
                </div>
            </div>

            {/* <!-- Right Section --> */}
            <div className="flex-1 flex flex-col md:ml-20 h-screen overflow-y-auto">
                {/* <!-- Top Bar --> */}
                <div className="bg-black text-white p-4 m-0 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-2 md:space-x-4">
                        <button className="bg-gray-800 py-2 px-4 rounded-lg border border-gray-500">Charging Stations</button>
                        <button className="bg-transparent hover:bg-gray-800 py-2 px-4 rounded-lg">Fleet Sizing</button>
                        <button className="bg-transparent hover:bg-gray-800 py-2 px-4 rounded-lg">Parking</button>
                    </div>

                    <div className="flex items-center">
                        <input type="text" className="py-2 px-4 rounded-lg bg-gray-800 border border-gray-500 w-full sm:w-auto" placeholder="Search..." />
                    </div>
                </div>

                {/* <!-- Main Content Area --> */}
                <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-500 flex-1 m-0">

                    {/* First header w/ the edit variables button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 rounded-lg">
                        <h2 className='text-2xl sm:text-4xl font-bold'>⚡️ Charging Station</h2>
                        <div className='flex flex-wrap gap-2'>
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
                    <div className='flex justify-between items-center p-4'>
                        <h3 className='text-xl sm:text-2xl font-bold text-green-500'>✨ Best Scenario Results</h3>
                        <button 
                            className="bg-transparent hover:bg-gray-800 py-2 px-4 rounded-4xl border border-green-500 text-green-500 text-[20px] cursor-pointer"
                            onClick={handleDropDown}
                        >
                            {isDroppedDown ? '∧' : '∨'}
                        </button>
                    </div>

                    { isDroppedDown ? (
                    <div className='pb-6 px-6 rounded-lg flex flex-col items-center space-y-4'>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
                            <p className='text-[20px] cursor-pointer'>⋯</p>
                        </div>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                            <p className='text-[20px] cursor-pointer'>⋯</p>
                        </div>
                        <div className='text-green-500 border border-green-500 rounded-lg w-full p-3 flex justify-between'>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident</p>
                            <p className='text-[20px] cursor-pointer'>⋯</p>
                        </div>
                    </div>
                    ) : (
                        <div></div>
                    )}

                    {/* Graph component and KPI component */}
                    <div className='flex flex-col lg:flex-row gap-4 justify-between p-6 px-4'>
                        <div className="w-full md:w-2/3">
                            <Graph data={dummyGraph} variableNames={selectedVars.map((v) => v.name)}/>
                        </div>
                        <div className="w-full lg:w-1/3">
                            <KPIs />
                        </div>
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