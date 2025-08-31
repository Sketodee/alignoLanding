import axiosInstance from '../../utils/auth';
import { useEffect, useState } from 'react';
import { HiCheck, HiChevronDown, HiChevronLeft, HiChevronRight, HiClock, HiExclamation, HiEye, HiSearch, HiX } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export const AffiliateStatus = {
    PENDING: 'pending',
    APPROVED: 'approved',
    SUSPENDED: 'suspended',
    REJECTED: 'rejected'
} as const;

export type AffiliateStatus = typeof AffiliateStatus[keyof typeof AffiliateStatus];

interface Affiliate {
    id: number;
    userId: number;
    referralCode: string;
    status: AffiliateStatus;
    commissionRate: string;
    totalEarnings: string;
    totalReferrals: number;
    appliedAt: string;
    approvedAt?: string;
    createdAt: string;
    updatedAt: string;
    User: {
        id: number;
        email: string;
        createdAt: string;
    };
    ApprovedByUser?: {
        id: number;
        email: string;
    };
}

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

const ManageAffiliates = () => {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [pagination, setPagination] = useState<PaginationData>({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState({
        status: 'all',
        search: ''
    });
    const [selectedAffiliates, setSelectedAffiliates] = useState<Set<number>>(new Set());
    const [bulkLoading, setBulkLoading] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const navigate = useNavigate();

    // const fetchAffiliates = async (page: number = 1) => {
    //     try {
    //         setLoading(true);
    //         setError(null);

    //         const params = new URLSearchParams({
    //             page: page.toString(),
    //             limit: pagination.itemsPerPage.toString(),
    //         });

    //         if (filters.status !== 'all') {
    //             params.append('status', filters.status);
    //         }

    //         if (filters.search.trim()) {
    //             params.append('search', filters.search.trim());
    //         }

    //         const response = await axiosInstance.get(`affiliate/admin/getallaffiliates?${params}`);

    //         if (response.data.success) {
    //             setAffiliates(response.data.data.affiliates);
    //             setPagination(response.data.data.pagination);
    //         } else {
    //             throw new Error(response.data.message || 'Failed to fetch affiliates');
    //         }
    //     } catch (err: any) {
    //         console.error('Error fetching affiliates:', err);
    //         setError(err.response?.data?.message || 'Failed to load affiliates');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const updateAffiliateStatus = async (affiliateId: number, status: AffiliateStatus) => {
        try {
            const response = await axiosInstance.post(`affiliate/admin/update/${affiliateId}`, {
                status
            });

            if (response.data.success) {
                // Update local state
                setAffiliates(prev => prev.map(affiliate =>
                    affiliate.id === affiliateId
                        ? { ...affiliate, ...response.data.data.affiliate }
                        : affiliate
                ));
                // Close dropdown
                setOpenDropdown(null);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err: any) {
            console.error('Error updating status:', err);
            alert(err.response?.data?.message || 'Failed to update status');
        }
    };

    const bulkUpdateStatus = async (status: AffiliateStatus) => {
        if (selectedAffiliates.size === 0) {
            alert('Please select affiliates to update');
            return;
        }

        try {
            setBulkLoading(true);
            const response = await axiosInstance.post('affiliate/admin/bulkupdatestatus', {
                affiliateIds: Array.from(selectedAffiliates),
                status
            });
            if (response.data.success) {
                setSelectedAffiliates(new Set());
                fetchAffiliatesWithStatus(pagination.currentPage);
            } else {
                throw new Error(response.data.message);
            }
        } catch (err: any) {
            console.error('Error bulk updating:', err);
            alert(err.response?.data?.message || 'Failed to bulk update');
        } finally {
            setBulkLoading(false);
        }
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            fetchAffiliatesWithStatus(newPage);
        }
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        if (key === 'status') {
            fetchAffiliatesWithStatus(1, value);
        }
    };

    const fetchAffiliatesWithStatus = async (page: number = 1, statusFilter?: string) => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams({
                page: page.toString(),
                limit: pagination.itemsPerPage.toString(),
            });

            const currentStatus = statusFilter !== undefined ? statusFilter : filters.status;

            if (currentStatus !== 'all') {
                params.append('status', currentStatus);
            }

            if (filters.search.trim()) {
                params.append('search', filters.search.trim());
            }

            const response = await axiosInstance.get(`affiliate/admin/getallaffiliates?${params}`);

            if (response.data.success) {
                setAffiliates(response.data.data.affiliates);
                setPagination(response.data.data.pagination);
            } else {
                throw new Error(response.data.message || 'Failed to fetch affiliates');
            }
        } catch (err: any) {
            console.error('Error fetching affiliates:', err);
            setError(err.response?.data?.message || 'Failed to load affiliates');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchAffiliatesWithStatus(1);
    };

    const handleSelectAffiliate = (affiliateId: number) => {
        setSelectedAffiliates(prev => {
            const newSet = new Set(prev);
            if (newSet.has(affiliateId)) {
                newSet.delete(affiliateId);
            } else {
                newSet.add(affiliateId);
            }
            return newSet;
        });
    };

    const handleSelectAll = () => {
        if (selectedAffiliates.size === affiliates.length) {
            setSelectedAffiliates(new Set());
        } else {
            setSelectedAffiliates(new Set(affiliates.map(a => a.id)));
        }
    };

    const handleViewAffiliate = (affiliateId: number) => {
        console.log('View affiliate:', affiliateId);
        setOpenDropdown(null);
    };

    const getAvailableActions = (currentStatus: AffiliateStatus) => {
        const allActions = [
            {
                label: 'View',
                value: 'view',
                icon: HiEye,
                color: 'text-blue-400 hover:bg-blue-400/10',
                action: 'view'
            },
            {
                label: 'Approve',
                value: AffiliateStatus.APPROVED,
                icon: HiCheck,
                color: 'text-green-400 hover:bg-green-400/10',
                action: 'status'
            },
            {
                label: 'Reject',
                value: AffiliateStatus.REJECTED,
                icon: HiX,
                color: 'text-red-400 hover:bg-red-400/10',
                action: 'status'
            },
            {
                label: 'Suspend',
                value: AffiliateStatus.SUSPENDED,
                icon: HiExclamation,
                color: 'text-orange-400 hover:bg-orange-400/10',
                action: 'status'
            }
        ];

        return allActions.filter(action =>
            action.action === 'view' || action.value !== currentStatus
        );
    };

    const getStatusColor = (status: AffiliateStatus) => {
        switch (status) {
            case AffiliateStatus.APPROVED:
                return 'text-green-400 bg-green-400/10 border-green-400/20';
            case AffiliateStatus.PENDING:
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case AffiliateStatus.SUSPENDED:
                return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case AffiliateStatus.REJECTED:
                return 'text-red-400 bg-red-400/10 border-red-400/20';
            default:
                return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    const getStatusIcon = (status: AffiliateStatus) => {
        switch (status) {
            case AffiliateStatus.APPROVED:
                return <HiCheck className="w-3 h-3 sm:w-4 sm:h-4" />;
            case AffiliateStatus.PENDING:
                return <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />;
            case AffiliateStatus.SUSPENDED:
                return <HiExclamation className="w-3 h-3 sm:w-4 sm:h-4" />;
            case AffiliateStatus.REJECTED:
                return <HiX className="w-3 h-3 sm:w-4 sm:h-4" />;
            default:
                return <HiClock className="w-3 h-3 sm:w-4 sm:h-4" />;
        }
    };

    useEffect(() => {
        const handleClickOutside = () => {
            setOpenDropdown(null);
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    useEffect(() => {
        fetchAffiliatesWithStatus();
    }, []);

    if (loading && affiliates.length === 0) {
        return (
            <div className="bg-black text-white">
                <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading affiliates...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 md:pt-0 bg-black text-white">
            <div className="w-[95%] lg:w-[80%] mx-auto md:pt-28 md:pb-16 ">
                <div className="mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors text-sm sm:text-base"
                        >
                            ← Back
                        </button>
                    </div>
                {/* Header */}
                <div className="mb-6 sm:mb-8 text-center lg:text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        Manage Affiliates
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        Review and manage affiliate applications
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-4 sm:p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                            {/* Status Filter */}
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="all">All Status</option>
                                <option value={AffiliateStatus.PENDING}>Pending</option>
                                <option value={AffiliateStatus.APPROVED}>Approved</option>
                                <option value={AffiliateStatus.SUSPENDED}>Suspended</option>
                                <option value={AffiliateStatus.REJECTED}>Rejected</option>
                            </select>

                            {/* Search */}
                            <div className="flex gap-2 w-full sm:w-auto">
                                <div className="relative flex-1 sm:flex-initial">
                                    <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by email..."
                                        value={filters.search}
                                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <button
                                    onClick={handleSearch}
                                    className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors text-sm sm:text-base"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Bulk Actions */}
                        {selectedAffiliates.size > 0 && (
                            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                                <button
                                    onClick={() => bulkUpdateStatus(AffiliateStatus.APPROVED)}
                                    disabled={bulkLoading}
                                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50 text-xs sm:text-sm"
                                >
                                    Approve ({selectedAffiliates.size})
                                </button>
                                <button
                                    onClick={() => bulkUpdateStatus(AffiliateStatus.REJECTED)}
                                    disabled={bulkLoading}
                                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors disabled:opacity-50 text-xs sm:text-sm"
                                >
                                    Reject ({selectedAffiliates.size})
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="mt-4 text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                        Showing {affiliates.length} of {pagination.totalItems} affiliates
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-4 mb-6">
                        <p className="text-red-300 text-sm sm:text-base mb-2">{error}</p>
                        <button
                            onClick={() => fetchAffiliatesWithStatus(pagination.currentPage)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors text-sm"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Mobile Cards View */}
                <div className="block lg:hidden space-y-4">
                    {affiliates.map((affiliate) => (
                        <div key={affiliate.id} className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-4">
                            {/* Header with checkbox and status */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedAffiliates.has(affiliate.id)}
                                        onChange={() => handleSelectAffiliate(affiliate.id)}
                                        className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                                    />
                                    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg border ${getStatusColor(affiliate.status)}`}>
                                        {getStatusIcon(affiliate.status)}
                                        <span className="capitalize text-xs font-medium">{affiliate.status}</span>
                                    </div>
                                </div>
                                
                                {/* Actions Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenDropdown(openDropdown === affiliate.id ? null : affiliate.id);
                                        }}
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                                    >
                                        Actions
                                        <HiChevronDown className={`w-4 h-4 transition-transform ${openDropdown === affiliate.id ? 'rotate-180' : ''}`} />
                                    </button>

                                    {openDropdown === affiliate.id && (
                                        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-[999]">
                                            <div className="py-1">
                                                {getAvailableActions(affiliate.status).map((action) => {
                                                    const IconComponent = action.icon;
                                                    return (
                                                        <button
                                                            key={action.value}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                if (action.action === 'view') {
                                                                    handleViewAffiliate(affiliate.id);
                                                                } else {
                                                                    updateAffiliateStatus(affiliate.id, action.value as AffiliateStatus);
                                                                }
                                                            }}
                                                            className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${action.color}`}
                                                        >
                                                            <IconComponent className="w-4 h-4" />
                                                            {action.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <div>
                                    <p className="text-white font-medium text-sm">{affiliate.User.email}</p>
                                    <p className="text-xs text-gray-400">ID: {affiliate.User.id}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400 text-xs">Referral Code</p>
                                        <code className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-xs font-mono">
                                            {affiliate.referralCode}
                                        </code>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Commission Rate</p>
                                        <p className="text-white font-medium">
                                            {(parseFloat(affiliate.commissionRate) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-400 text-xs">Earnings</p>
                                        <p className="text-green-400 font-medium">${affiliate.totalEarnings}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-xs">Referrals</p>
                                        <p className="text-white">{affiliate.totalReferrals}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-gray-400 text-xs">Applied Date</p>
                                    <p className="text-white text-sm">
                                        {new Date(affiliate.appliedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="text-left p-4 w-12">
                                        <input
                                            type="checkbox"
                                            checked={selectedAffiliates.size === affiliates.length && affiliates.length > 0}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                                        />
                                    </th>
                                    <th className="text-left p-4 text-gray-300 font-medium">User</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Referral Code</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Commission Rate</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Earnings & Referrals</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Applied Date</th>
                                    <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {affiliates.map((affiliate) => (
                                    <tr key={affiliate.id} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedAffiliates.has(affiliate.id)}
                                                onChange={() => handleSelectAffiliate(affiliate.id)}
                                                className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500"
                                            />
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <p className="text-white font-medium">{affiliate.User.email}</p>
                                                <p className="text-sm text-gray-400">ID: {affiliate.User.id}</p>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <code className="text-purple-400 bg-purple-400/10 px-2 py-1 rounded text-sm font-mono">
                                                {affiliate.referralCode}
                                            </code>
                                        </td>

                                        <td className="p-4">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusColor(affiliate.status)}`}>
                                                {getStatusIcon(affiliate.status)}
                                                <span className="capitalize text-sm font-medium">{affiliate.status}</span>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <span className="text-white font-medium">
                                                {(parseFloat(affiliate.commissionRate) * 100).toFixed(1)}%
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <p className="text-green-400 font-medium">${affiliate.totalEarnings}</p>
                                                <p className="text-sm text-gray-400">{affiliate.totalReferrals} referrals</p>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <p className="text-white text-sm">
                                                    {new Date(affiliate.appliedAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {new Date(affiliate.appliedAt).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-4">
                                            <div className="relative">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenDropdown(openDropdown === affiliate.id ? null : affiliate.id);
                                                    }}
                                                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                                                >
                                                    Actions
                                                    <HiChevronDown className={`w-4 h-4 transition-transform ${openDropdown === affiliate.id ? 'rotate-180' : ''}`} />
                                                </button>

                                                {openDropdown === affiliate.id && (
                                                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-[999]">
                                                        <div className="py-1">
                                                            {getAvailableActions(affiliate.status).map((action) => {
                                                                const IconComponent = action.icon;
                                                                return (
                                                                    <button
                                                                        key={action.value}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            if (action.action === 'view') {
                                                                                handleViewAffiliate(affiliate.id);
                                                                            } else {
                                                                                updateAffiliateStatus(affiliate.id, action.value as AffiliateStatus);
                                                                            }
                                                                        }}
                                                                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors ${action.color}`}
                                                                    >
                                                                        <IconComponent className="w-4 h-4" />
                                                                        {action.label}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {affiliates.length === 0 && !loading && (
                    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                            <HiSearch className="w-8 h-8 text-gray-500" />
                        </div>
                        <p className="text-gray-400 mb-2 text-sm sm:text-base">No affiliates found</p>
                        <p className="text-xs sm:text-sm text-gray-500">
                            {filters.search || filters.status !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'No affiliate applications yet'
                            }
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
                            Page {pagination.currentPage} of {pagination.totalPages}
                            ({pagination.totalItems} total affiliates)
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrevPage || loading}
                                className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                            >
                                <HiChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            {/* Page Numbers - Hide some on mobile */}
                            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                                const startPage = Math.max(1, pagination.currentPage - 2);
                                const pageNum = startPage + i;

                                if (pageNum > pagination.totalPages) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        disabled={loading}
                                        className={`px-2 sm:px-3 py-2 rounded-lg transition-colors disabled:cursor-not-allowed text-sm ${pagination.currentPage === pageNum
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.hasNextPage || loading}
                                className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                            >
                                <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Loading Overlay */}
                {loading && affiliates.length > 0 && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-3xl p-6 text-center mx-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
                            <p className="text-gray-400">Loading...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAffiliates;