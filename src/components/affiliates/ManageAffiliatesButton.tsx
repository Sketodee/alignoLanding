
import { useEffect, useState } from 'react';
import { HiUsers } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/auth';

interface ManageAffiliatesButtonProps {
    className?: string;
}

const ManageAffiliatesButton = ({ className = '' }: ManageAffiliatesButtonProps) => {
    const navigate = useNavigate();
    const [pendingCount, setPendingCount] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchPendingCount = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('affiliate/admin/getpendingaffiliatecount');

            if (response.data.success) {
                setPendingCount(response.data.data.pendingCount);
            }
        } catch (error) {
            console.error('Error fetching pending count:', error);
            setPendingCount(0);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        navigate('/affiliate/manage');
    };

    useEffect(() => {
        fetchPendingCount();

        // Optional: Set up interval to refresh count every 30 seconds
        const interval = setInterval(fetchPendingCount, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`relative flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <HiUsers className="w-5 h-5" />
            <span className="font-medium">Manage User Affiliates</span>

            {/* Pending Count Badge */}
            {!loading && pendingCount > 0 && (
                <div className="absolute -top-2 -right-2 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">
                                {pendingCount > 99 ? '99+' : pendingCount}
                            </span>
                        </div>
                        {/* Pulsing animation for urgent attention */}
                        <div className="absolute inset-0 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                </div>
            )}

            {/* Loading indicator */}
            {loading && (
                <div className="absolute -top-1 -right-1">
                    <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                </div>
            )}
        </button>
    );
};

export default ManageAffiliatesButton;