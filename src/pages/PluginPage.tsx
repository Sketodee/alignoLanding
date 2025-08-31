import axiosInstance from '../utils/auth';
import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiOutlineSearch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface Plugin {
    id: number;
    name: string;
    description: string;
    iconUrl: string;
    imageUrl: string;
    pluginType: string;
    currentWindowsVersion: string;
    currentMacOsVersion: string;
    createdAt: string;
    updatedAt: string;
}

const PluginPage = () => {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [plugins, setPlugins] = useState<Plugin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

    const ITEMS_PER_PAGE = 10;

    // Map filter names to API values
    const getFilterTypeParam = (filter: string): string => {
        switch (filter) {
            case 'Premiere Pro': return 'premierepro';
            case 'After Effect': return 'aftereffects';
            default: return ''; // 'All' case
        }
    };

    // Map plugin type to display category
    const getDisplayCategory = (pluginType: string): string => {
        switch (pluginType.toLowerCase()) {
            case 'premierepro': return 'Premiere Pro';
            case 'aftereffects': return 'After Effect';
            default: return pluginType;
        }
    };

    // Get abbreviation for category badge
    const getAbbreviation = (pluginType: string): string => {
        switch (pluginType.toLowerCase()) {
            case 'premierepro': return 'Pr';
            case 'aftereffects': return 'Ae';
            default: return pluginType.substring(0, 2).toUpperCase();
        }
    };

    // Generate gradient colors based on plugin type or name
    const getPluginColor = (pluginType: string, name: string): string => {
        const colors = [
            'from-purple-600 to-blue-600',
            'from-red-600 to-red-700',
            'from-purple-600 to-purple-700',
            'from-green-500 to-green-600',
            'from-purple-500 to-pink-600',
            'from-blue-500 to-blue-600',
            'from-orange-500 to-red-500',
            'from-teal-500 to-cyan-600',
        ];

        // Use a simple hash to consistently assign colors
        const hash = (name + pluginType).split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);

        return colors[Math.abs(hash) % colors.length];
    };

    // Fetch plugins from API
    const fetchPlugins = async (page: number = 1, type: string = '', filter: string = '') => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: ITEMS_PER_PAGE.toString(),
            });

            if (type) params.append('type', type);
            if (filter) params.append('filter', filter);

            // const response = await fetch(`/api/plugins?${params}`);
            const res = await axiosInstance.get(`/plugin/getallplugins?${params}`);
            const data = await res.data;
            console.log(data)

            if (data.success) {
                setPlugins(data.data.items);
                setCurrentPage(data.data.currentPage);
                setTotalPages(data.data.totalPages);
                setTotalItems(data.data.totalItems);
            } else {
                setError(data.error || 'Failed to fetch plugins');
            }
        } catch (err) {
            setError('Network error occurred');
            console.error('Error fetching plugins:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle filter change
    const handleFilterClick = (filter: string) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page
        const typeParam = getFilterTypeParam(filter);
        fetchPlugins(1, typeParam, searchTerm);
    };

    // Handle search with debouncing
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page

        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout for debounced search
        const newTimeout = setTimeout(() => {
            const typeParam = getFilterTypeParam(activeFilter);
            fetchPlugins(1, typeParam, value);
        }, 300); // 300ms delay

        setSearchTimeout(newTimeout);
    };

    // Handle pagination
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            const typeParam = getFilterTypeParam(activeFilter);
            fetchPlugins(newPage, typeParam, searchTerm);
        }
    };

    // Navigate to plugin detail
    const handleNavigate = (pluginId: number) => {
        navigate(`/plugins/${pluginId}`);
    };

    // Initial load
    useEffect(() => {
        fetchPlugins();
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    // Generate pagination numbers
    const getPaginationNumbers = (): (number | string)[] => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index && totalPages > 1);
    };

    return (
        <div className="bg-[#0a0a0a] text-white pt-20">
            <div className="w-[95%] lg:w-[90%] mx-auto " >
                {/* Header Section */}
                  <button
                                onClick={() => navigate(-1)}
                                className="text-purple-400 hover:text-purple-300 mb-4  transition-colors"
                            >
                                ← Back
                            </button>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Plugins</h1>
                  


                {/* Filter and Search Section */}
               <div className="py-6 border-b border-gray-800">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    {/* Filters */}
    <div className="flex flex-wrap gap-2 border-[0.5px] rounded-lg border-[#242424] p-2">
      {['All', 'Premiere Pro', 'After Effect'].map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          disabled={loading}
          className={`px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            activeFilter === filter
              ? 'text-white bg-[#191919] rounded-lg'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>

    {/* Search & Info */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full md:w-auto">
      <div className="text-sm text-gray-400">
        {totalItems > 0 && `${totalItems} plugin${totalItems !== 1 ? 's' : ''} found`}
      </div>
      <div className="relative w-full sm:w-64">
        <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search plugins..."
          value={searchTerm}
          onChange={handleSearchChange}
          disabled={loading}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  </div>
</div>

                {/* Loading State */}
                {loading && (
                    <div className="py-8 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        <p className="mt-2 text-gray-400">Loading plugins...</p>
                    </div>
                )}
                {/* Error State */}
                {error && (
                    <div className="py-8">
                        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-center">
                            <p className="text-red-300">{error}</p>
                            <button
                                onClick={() => fetchPlugins(currentPage, getFilterTypeParam(activeFilter), searchTerm)}
                                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}
                {/* Plugins Grid */}
                {!loading && !error && (
                    <div className="py-8 ">
                        {plugins.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {plugins.map((plugin) => (
                                        <div
                                            key={plugin.id}
                                            className="bg-[#121212] text-white rounded-xl p-4 flex items-center gap-4 shadow-lg border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
                                            onClick={() => handleNavigate(plugin.id)}
                                        >
                                            {/* Icon */}
                                            <div className={`bg-gradient-to-br ${getPluginColor(plugin.pluginType, plugin.name)} p-3 rounded-lg h-20 w-20 flex-shrink-0`}>
                                                {plugin.iconUrl ? (
                                                    <img
                                                        src={plugin.iconUrl}
                                                        alt={plugin.name}
                                                        className="w-full h-full object-cover rounded"
                                                        onError={(e) => {
                                                            // Fallback to gradient with first letter if image fails
                                                            e.currentTarget.style.display = 'none';
                                                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                                            if (nextElement) {
                                                                nextElement.style.display = 'flex';
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-2xl font-bold text-white">
                                                            {plugin.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="w-full h-full items-center justify-center text-2xl font-bold text-white" style={{ display: 'none' }}>
                                                    {plugin.name.charAt(0).toUpperCase()}
                                                </div>
                                            </div>
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="text-lg font-semibold truncate">{plugin.name}</h3>
                                                    <span className="text-xs bg-zinc-700 px-2 py-0.5 rounded text-gray-300 flex-shrink-0 ml-2">
                                                        {getAbbreviation(plugin.pluginType)}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                                                    {plugin.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="text-xs text-gray-500">
                                                        v{plugin.currentWindowsVersion} • {getDisplayCategory(plugin.pluginType)}
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleNavigate(plugin.id);
                                                        }}
                                                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm"
                                                    >
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-8 flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1 || loading}
                                            className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                                        >
                                            <HiChevronLeft className="w-5 h-5" />
                                        </button>
                                        {getPaginationNumbers().map((pageNum, index) => (
                                            pageNum === '...' ? (
                                                <span key={`dots-${index}`} className="px-3 py-2 text-gray-400">...</span>
                                            ) : (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum as number)}
                                                    disabled={loading}
                                                    className={`px-3 py-2 rounded-lg transition-colors disabled:cursor-not-allowed ${currentPage === pageNum
                                                        ? 'bg-purple-600 text-white'
                                                        : 'bg-gray-800 text-white hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            )
                                        ))}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages || loading}
                                            className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                                        >
                                            <HiChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* No Results */
                            <div className="text-center py-12">
                                <div className="text-6xl text-gray-600 mb-4">🔍</div>
                                <p className="text-gray-400 text-lg mb-2">No plugins found</p>
                                <p className="text-gray-500 text-sm">
                                    {searchTerm || activeFilter !== 'All'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'No plugins are available at the moment'
                                    }
                                </p>
                                {(searchTerm || activeFilter !== 'All') && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setActiveFilter('All');
                                            fetchPlugins(1, '', '');
                                        }}
                                        className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PluginPage;