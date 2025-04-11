import React from 'react';

const KPIs = () => {
  const items = [
    { title: 'Infrastructure Units', value: '€421.07' },
    { title: 'Charging Growth', value: '33.07' },
    { title: 'Localization Change', value: '21.9%' },
    { title: 'Fleet Growth', value: '7.03%' },
  ];

  return (
    <div className="text-white px-6">
        <div className="flex justify-between items-center mb-4">
        <h2 className='text-4xl font-semibold'>Key Performance Indicators</h2>
            <button className='bg-gray-700 border border-gray-500 text-gray-400 hover:bg-gray-500 rounded-lg p-4'>+ Variables</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, i) => (
            <div key={i} className="bg-[#1f1f1f] p-4 rounded-lg h-[200px]">
                <h3 className="text-sm text-gray-400 mb-1">{item.title}</h3>
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs text-gray-500">This describes variable and what the shown data means.</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default KPIs