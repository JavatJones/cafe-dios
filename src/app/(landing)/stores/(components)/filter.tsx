import React from 'react'


interface Location {
    id: string;
    name: string;
    address: string;
    url: string;
}

interface LocationListProps {
    locations: Location[];
    onLocationSelect: (url: string) => void;
    selectedLocation: string;
}


const Filter: React.FC<LocationListProps> = ({ locations, onLocationSelect, selectedLocation }) => {

    return (
        <div className="flex flex-col items-center h-96 lg:h-screen w-full overflow-hidden">
            <h2 className="text-2xl font-semibold mb-4">Sucursales</h2>
            <div className="w-full h-full overflow-y-auto border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {locations.map(location => (
                        <li
                            key={location.id}
                            className={`flex flex-col gap-2 p-4 cursor-pointer ${selectedLocation === location.url ? 'bg-gray-100' : 'hover:bg-gray-100'
                                }`}
                            onClick={() => onLocationSelect(location.url)}
                        >
                            <p className="text-lg font-medium truncate">{location.name}</p>
                            <p className="text-sm text-gray-500 truncate">{location.address}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default Filter