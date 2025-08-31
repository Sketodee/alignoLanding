import axiosInstance from '../utils/auth';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiEllipsisVertical, HiEye, HiPlay, HiQuestionMarkCircle, HiUser } from 'react-icons/hi2';
import { useNavigate, useParams } from 'react-router-dom';
import type { Plugin } from '../types/appScopeTypes';




const PluginDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [plugin, setPlugin] = useState<Plugin | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const menuItems = [
        { icon: HiEye, label: 'View previous version' },
        { icon: HiUser, label: 'Submit support request' },
        { icon: HiQuestionMarkCircle, label: 'Access FAQ' },
        { icon: HiPlay, label: 'Tutorials' }
    ];

    // Feature pill colors
    const pillColors = [
        'bg-purple-600',
        'bg-green-600',
        'bg-blue-600',
        'bg-orange-500',
        'bg-red-500',
        'bg-teal-500',
        'bg-pink-500',
        'bg-indigo-500',
        'bg-yellow-500',
        'bg-cyan-500'
    ];

    // Feature icons
    const featureIcons = ['⚡', '⏱️', '🎨', '🚀', '💡', '🔧', '✨', '🎯', '🎪', '🌟'];


    // Fetch plugin data
    const fetchPlugin = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axiosInstance.get(`/plugin/getpluginwithversions/${id}`);
            const data = await res.data;
            console.log(data)

            if (data.success) {
                setPlugin(data.data);
            } else {
                setError(data.error || 'Failed to fetch plugin');
            }
        } catch (err) {
            setError('Network error occurred');
            console.error('Error fetching plugin:', err);
        } finally {
            setLoading(false);
        }
    };




    // Handle back navigation
    const handleBack = () => {
        navigate('/plugins');
    };

    // Initial load
    useEffect(() => {
        console.log('Plugin ID from params:', id);
        if (id) {
            fetchPlugin();
        } else {
            console.log('No ID found in params');
        }
    }, [id]);



    if (loading) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
                    <p className="text-gray-400">Loading plugin details...</p>
                </div>
            </div>
        );
    }

    if (error || !plugin) {
        return (
            <div className="min-h-screen text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl text-gray-600 mb-4">❌</div>
                    <p className="text-gray-400 text-lg mb-4">{error || 'Plugin not found'}</p>
                    <button
                        onClick={handleBack}
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                        Back to Plugins
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#0a0a0a] text-white pt-20 ">
            <div className='w-[95%] lg:w-[90%] mx-auto'>
                {/* Header with back button */}
                <div className="relative">
                    <div className="relative">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                className="flex items-center text-white hover:text-gray-300 transition-colors"
                            >
                                <HiChevronLeft className="w-5 h-5 mr-2" />
                                <span className="text-sm">Plugins / {plugin.name}</span>
                            </button>
                            <div className="relative">
                                <button
                                    onClick={toggleMenu}
                                    className="p-2 text-white hover:text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <HiEllipsisVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Menu Popup - Portal outside parent */}
                {showMenu && (
                    <>
                        {/* Overlay to close menu when clicking outside */}
                        <div
                            className="fixed inset-0 z-[9998]"
                            onClick={() => setShowMenu(false)}
                        ></div>
                        {/* Menu Popup */}
                        <div className="fixed top-20 right-8 w-64 bg-black rounded-lg shadow-lg border border-gray-700 z-[9999]">
                            {menuItems.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={index}
                                        className="w-full flex items-center px-4 py-3 text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                        onClick={() => {
                                            setShowMenu(false);
                                            console.log(`Clicked: ${item.label}`);
                                        }}
                                    >
                                        <IconComponent className="w-5 h-5 mr-3 text-gray-400" />
                                        <span className="text-sm">{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
                {/* Plugin Preview Section */}
                <div className="py-8">
                    <div className="rounded-xl mb-8">
                        {/* Plugin image */}
                        <div className="bg-gray-800 rounded-lg mb-6">
                            <img
                                src={plugin.imageUrl}
                                alt={plugin.name}
                                className="rounded-lg w-full h-[380px] object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjM4MCIgdmlld0JveD0iMCAwIDgwMCAzODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjQwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5Q0E0QUYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                                }}
                            />
                        </div>
                        {/* Plugin Info */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">{plugin.name} </h1>
                                <p className="text-gray-400 mb-4">{plugin.description}</p>
                            </div>

                        </div>

                    </div>
                    {/* Features Grid */}
                    {plugin.subDescriptions && plugin.subDescriptions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {plugin.subDescriptions.map((feature, index) => (
                                <div key={index} className="bg-gradient-to-r from-black to-[#1A1A1A] rounded-xl p-6">
                                    <div className={`w-12 h-12 ${pillColors[index % pillColors.length]} rounded-lg flex items-center justify-center mb-4`}>
                                        <span className="text-white text-xl">{featureIcons[index % featureIcons.length]}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* Product Description */}
                    <div className="rounded-xl mb-8">
                        <h2 className="text-2xl font-bold mb-4">Product description</h2>
                        <div className="text-gray-400 leading-relaxed">
                            <p>{plugin.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PluginDetailPage;