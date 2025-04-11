import { dummyKPIs } from '../../assets/data/dummyKPIs';

const KPIs = () => {
    return (
        <div className='text-white px-6 w-1/3'>
            {/* KPI title section */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold">Key Performance Indicators</h2>
                <button className='bg-gray-700 border border-gray-500 text-gray-400 hover:bg-gray-500 rounded-lg px-4 py-2'>+ Variables</button>
            </div>

            {/* KPI 2x2 grid using dummy data */}
            <div className="grid grid-cols-2 gap-4">
                {dummyKPIs.map((item, i) => (
                    <div key={i} className='bg-black/60 p-4 rounded-lg'>
                        <h3 className='text-lg text-gray-400 mb-2'>{item.title}</h3>
                        <p className='text-xl font-bold mb-2'>{item.value}</p>
                        <p className='text-sm text-gray-500'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KPIs
