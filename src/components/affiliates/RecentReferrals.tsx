import { HiCurrencyDollar, HiUser } from 'react-icons/hi';

interface RecentReferralsProps {
    referrals: Array<{
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
}

const RecentReferrals = ({ referrals }: RecentReferralsProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'converted':
                return 'text-green-400 bg-green-400/10';
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/10';
            case 'cancelled':
                return 'text-red-400 bg-red-400/10';
            default:
                return 'text-gray-400 bg-gray-400/10';
        }
    };

    const formatEmail = (email: string) => {
        if (email.length > 20) {
            return email.substring(0, 17) + '...';
        }
        return email;
    };

    return (
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Referrals</h3>

            {referrals.length > 0 ? (
                <div className="space-y-4">
                    {referrals.map((referral) => (
                        <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                    <HiUser className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">
                                        {formatEmail(referral.ReferredUser.email)}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(referral.conversionDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-center gap-2 mb-1">
                                    <HiCurrencyDollar className="w-4 h-4 text-green-400" />
                                    <span className="font-medium text-green-400">
                                        ${referral.commission}
                                    </span>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(referral.status)}`}>
                                    {referral.status}
                                </span>
                            </div>
                        </div>
                    ))}

                    {referrals.length >= 4 && (
                        <div className="text-center pt-2">
                            <button className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                                View All Referrals
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <HiUser className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 mb-2">No referrals yet</p>
                    <p className="text-sm text-gray-500">
                        Share your referral link to start earning commissions!
                    </p>
                </div>
            )}
        </div>
    );
};

export default RecentReferrals;