import { HiClock, HiCurrencyDollar, HiTrendingUp, HiUsers } from 'react-icons/hi';

interface AffiliateStatsProps {
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
}

const AffiliateStats = ({ stats }: AffiliateStatsProps) => {
    const statCards = [
        {
            title: 'Total Referrals',
            value: stats.totalReferrals.toLocaleString(),
            icon: HiUsers,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-500/10',
            textColor: 'text-blue-400'
        },
        {
            title: 'Total Earnings',
            value: `$${stats.totalEarnings.toLocaleString()}`,
            icon: HiCurrencyDollar,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-500/10',
            textColor: 'text-green-400'
        },
        {
            title: 'Conversion Rate',
            value: `${stats.conversionRate.toFixed(1)}%`,
            icon: HiTrendingUp,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-500/10',
            textColor: 'text-purple-400'
        },
        {
            title: 'Pending Commissions',
            value: `$${stats.pendingCommissions.toLocaleString()}`,
            icon: HiClock,
            color: 'from-yellow-500 to-yellow-600',
            bgColor: 'bg-yellow-500/10',
            textColor: 'text-yellow-400'
        }
    ];

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Performance Overview</h2>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div key={index} className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-400">{stat.title}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Referral Breakdown */}
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Referral Breakdown</h3>
                <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{stats.referralBreakdown.converted}</span>
                        </div>
                        <p className="text-sm font-medium text-green-400">Converted</p>
                        <p className="text-xs text-gray-400">Active referrals</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{stats.referralBreakdown.pending}</span>
                        </div>
                        <p className="text-sm font-medium text-yellow-400">Pending</p>
                        <p className="text-xs text-gray-400">Awaiting conversion</p>
                    </div>

                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">{stats.referralBreakdown.cancelled}</span>
                        </div>
                        <p className="text-sm font-medium text-red-400">Cancelled</p>
                        <p className="text-xs text-gray-400">Inactive referrals</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateStats;