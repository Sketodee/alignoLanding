import { PluginType } from '../../types/appScopeTypes';
import { useEffect, useRef, useState } from 'react';


const PluginTypeDropdown = ({ value, onChange, error }: {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}) => {
    const [showMenu, setShowMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-full max-w-md" ref={dropdownRef}>
            <label className="block text-sm font-medium mb-2 text-white">Plugin Type *</label>

            {/* Button to toggle menu */}
            <button
                type='button'
                onClick={() => setShowMenu(!showMenu)}
                className={`w-full text-left px-4 py-3 bg-black border-[0.5px] rounded-lg text-white border-gray-600 hover:border-purple-500 transition-colors
          ${error ? 'border-red-500' : ''}`}
            >
                {value
                    ? value.charAt(0).toUpperCase() + value.slice(1)
                    : 'Select plugin type'}
            </button>

            {/* Dropdown menu */}
            {showMenu && (
                <>
                    <div className="fixed inset-0 z-[9998]" onClick={() => setShowMenu(false)}></div>

                    <div className="absolute z-[9999] mt-2 w-full bg-black rounded-lg shadow-lg border border-gray-700">
                        {Object.values(PluginType).map((type) => (
                            <button
                                type='button'
                                key={type}
                                className="w-full text-left flex items-center px-4 py-3 text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                onClick={() => {
                                    onChange(type);
                                    setShowMenu(false);
                                }}
                            >
                                <span className="text-sm">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default PluginTypeDropdown;
