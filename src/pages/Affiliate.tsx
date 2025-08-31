import axiosInstance from '../utils/auth';
import AffiliateApplication from '../components/affiliates/AffiliateApplication';
import AffiliateStats from '../components/affiliates/AffiliateStats';
import ManageAffiliatesButton from '../components/affiliates/ManageAffiliatesButton';
import PerformanceChart from '../components/affiliates/PerformanceChart';
import RecentReferrals from '../components/affiliates/RecentReferrals';
import { useAuth } from '../context/AuthContext';
import { UserType } from '../types/appScopeTypes';
import { useEffect, useState } from 'react';
import { HiCheckCircle, HiClipboardCopy, HiExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface AffiliateVerification {
    id: number;
    referralCode: string;
    status: 'pending' | 'approved' | 'suspended' | 'rejected';
    appliedAt: string;
    approvedAt?: string;
    commissionRate: string;
}

interface AffiliateDashboard {
    affiliate: {
        id: number;
        userId: number;
        referralCode: string;
        status: string;
        commissionRate: string;
        totalEarnings: string;
        totalReferrals: number;
        appliedAt: string;
        approvedAt?: string;
        approvedBy?: number;
        paymentMethod?: string;
        paymentDetails?: string;
        createdAt: string;
        updatedAt: string;
        User: {
            id: number;
            email: string;
        };
    };
    stats: {
        totalReferrals: number;
        totalEarnings: number;
        pendingCommissions: number;
        paidCommissions: number;
        conversionRate: number;
        referralBreakdown: {
            pending: number;
            converted: number;
            cancelled: number;
        };
    };
    recentReferrals: Array<{
        id: number;
        affiliateId: number;
        referredUserId: number;
        referralCode: string;
        status: string;
        conversionValue: string;
        commission: string;
        conversionDate: string;
        ReferredUser: {
            id: number;
            email: string;
        };
    }>;
    recentCommissions: Array<{
        id: number;
        amount: string;
        status: string;
        createdAt: string;
    }>;
}

interface PerformanceReport {
    dailyStats: Array<{
        date: string;
        referrals: string;
        conversions: string;
        revenue: string;
        commission: string;
    }>;
    summary: {
        totalReferrals: number;
        totalEarnings: number;
        pendingCommissions: number;
        paidCommissions: number;
        conversionRate: number;
        referralBreakdown: {
            pending: number;
            converted: number;
            cancelled: number;
        };
    };
}

const Affiliate = () => {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAffiliate, setIsAffiliate] = useState(false);
    const [affiliateData, setAffiliateData] = useState<AffiliateVerification | null>(null);
    const [dashboardData, setDashboardData] = useState<AffiliateDashboard | null>(null);
    const [reportData, setReportData] = useState<PerformanceReport | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const navigate = useNavigate();

    const fetchAffiliateData = async () => {
        try {
            setLoading(true);
            setError(null);

            // First, verify affiliate status
            const verifyResponse = await axiosInstance.get('/affiliate/verify');

            if (verifyResponse.data.success) {
                setIsAffiliate(true);
                setAffiliateData(verifyResponse.data.data);

                // If verified, fetch dashboard and report data
                const [dashboardResponse, reportResponse] = await Promise.all([
                    axiosInstance.get('/affiliate/dashboard'),
                    axiosInstance.get('/affiliate/report')
                ]);

                if (dashboardResponse.data.success) {
                    setDashboardData(dashboardResponse.data.data);
                }

                if (reportResponse.data.success) {
                    setReportData(reportResponse.data.data);
                }
            } else {
                setIsAffiliate(false);
            }
        } catch (err: any) {
            console.error('Error fetching affiliate data:', err);
            if (err.response?.status === 404) {
                setIsAffiliate(false);
            } else {
                setError(err.response?.data?.message || 'Failed to load affiliate data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApplicationSuccess = () => {
        // Reload the component after successful application
        fetchAffiliateData();
    };

    const copyReferralLink = () => {
        if (affiliateData?.referralCode) {
            const referralUrl = `${window.location.origin}/?ref=${affiliateData.referralCode}`;
            navigator.clipboard.writeText(referralUrl);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'text-green-400 bg-green-400/10 border border-green-400/30';
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30';
            case 'suspended':
                return 'text-red-400 bg-red-400/10 border border-red-400/30';
            case 'rejected':
                return 'text-red-400 bg-red-400/10 border border-red-400/30';
            default:
                return 'text-gray-400 bg-gray-400/10 border border-gray-400/30';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved':
                return <HiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            case 'pending':
                return <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
            default:
                return <HiExclamationCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
        }
    };

    useEffect(() => {
        fetchAffiliateData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading affiliate data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="w-[95%] lg:w-[80%] mx-auto py-10 md:pt-28 md:pb-16">
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center max-w-md">
                            <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
                                <h2 className="text-lg sm:text-xl font-semibold text-red-300 mb-2">Error</h2>
                                <p className="text-red-200 mb-4 text-sm sm:text-base">{error}</p>
                                <button
                                    onClick={fetchAffiliateData}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    Retry
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAffiliate) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="w-[95%] lg:w-[80%] mx-auto py-10 md:pt-28 md:pb-16">
                    <AffiliateApplication onSuccess={handleApplicationSuccess} />
                </div>
            </div>
        );
    }

    return (
        <div className="pt-20 md:pt-0 bg-black text-white">
            <div className="w-[95%] lg:w-[80%] mx-auto md:pt-28 md:pb-16 ">
                {/* Header Section */}
                <div className="border-b border-gray-800 pb-6 mb-8">
                    <div className="mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors text-sm sm:text-base"
                        >
                            ← Back
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                                Affiliate Dashboard
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Track your referrals and earnings
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-end">
                            {/* Admin Manage Button */}
                            {user?.userType === UserType.ADMIN && (
                                <ManageAffiliatesButton />
                            )}

                            {/* Status Badge */}
                            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${getStatusColor(affiliateData?.status || '')}`}>
                                {getStatusIcon(affiliateData?.status || '')}
                                <span className="font-medium capitalize">{affiliateData?.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Referral Link Section */}
                    {affiliateData?.status === 'approved' && (
                        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
                                Your Referral Link
                            </h3>

                            {/* Mobile: Stack vertically, Desktop: Flex horizontally */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <div className="flex-1 bg-gray-800 rounded-lg p-3 font-mono text-xs sm:text-sm break-all">
                                    {`${window.location.origin}/?ref=${affiliateData.referralCode}`}
                                </div>
                                <button
                                    onClick={copyReferralLink}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    <HiClipboardCopy className="w-4 h-4" />
                                    {copySuccess ? 'Copied!' : 'Copy'}
                                </button>
                            </div>

                            {/* Info Grid - Responsive */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                                <div className="text-center sm:text-left">
                                    <span className="text-gray-400 block">Referral Code:</span>
                                    <p className="font-mono font-semibold mt-1">{affiliateData.referralCode}</p>
                                </div>
                                <div className="text-center sm:text-left">
                                    <span className="text-gray-400 block">Commission Rate:</span>
                                    <p className="font-semibold mt-1">{(parseFloat(affiliateData.commissionRate) * 100).toFixed(1)}%</p>
                                </div>
                                <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
                                    <span className="text-gray-400 block">Member Since:</span>
                                    <p className="font-semibold mt-1">
                                        {new Date(affiliateData.appliedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pending Status Message */}
                    {affiliateData?.status === 'pending' && (
                        <div className="bg-yellow-900/20 border border-yellow-500/50 rounded-xl p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <HiExclamationCircle className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                                <div className="text-center sm:text-left">
                                    <h3 className="font-semibold text-yellow-300 text-base sm:text-lg">
                                        Application Pending
                                    </h3>
                                    <p className="text-yellow-200 mt-1 text-sm sm:text-base">
                                        Your affiliate application is under review. You'll receive an email once it's approved.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dashboard Content */}
                {affiliateData?.status === 'approved' && dashboardData && reportData && (
                    <div className="space-y-8">
                        {/* Stats Overview */}
                        <AffiliateStats stats={dashboardData.stats} />

                        {/* Charts and Recent Activity - Responsive Grid */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                            {/* Performance Chart */}
                            <div className="order-1">
                                <PerformanceChart dailyStats={reportData.dailyStats} />
                            </div>

                            {/* Recent Referrals */}
                            <div className="order-2">
                                <RecentReferrals referrals={dashboardData.recentReferrals} />
                            </div>
                        </div>

                        {/* Recent Commissions */}
                        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-4 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
                                Recent Commissions
                            </h3>
                            <div className="space-y-3">
                                {dashboardData.recentCommissions.length > 0 ? (
                                    dashboardData.recentCommissions.map((commission) => (
                                        <div key={commission.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-800/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                                                <div>
                                                    <p className="font-medium text-sm sm:text-base">${commission.amount}</p>
                                                    <p className="text-xs sm:text-sm text-gray-400">
                                                        {new Date(commission.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-1 rounded text-xs font-medium self-start sm:self-center ${commission.status === 'paid'
                                                ? 'text-green-400 bg-green-400/10'
                                                : 'text-yellow-400 bg-yellow-400/10'
                                                }`}>
                                                {commission.status}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        <p className="text-sm sm:text-base">No commissions yet</p>
                                        <p className="text-xs sm:text-sm mt-1">Start referring users to earn commissions!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Affiliate;