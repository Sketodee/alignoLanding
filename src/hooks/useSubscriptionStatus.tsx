import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import type { SubscriptionStatus } from '../types/appScopeTypes';

interface Subscription {
    id: number;
    plan: string;
    status: SubscriptionStatus
    productKey: string;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    trialStart: string | null;
    trialEnd: string | null;
    isTrialing: boolean;
    cancelAtPeriodEnd: boolean;
}

interface UseSubscriptionReturn {
    currentSubscription: Subscription | null;
    loading: boolean;
    error: string | null;
    checkSubscriptionStatus: () => Promise<void>;
    refetch: () => Promise<void>;
}

const useSubscriptionStatus = (autoFetch: boolean = true): UseSubscriptionReturn => {
    const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    const checkSubscriptionStatus = useCallback(async () => {
        if (!user?.id) {
            setLoading(false);
            setCurrentSubscription(null);
            return;
        }

        try {
            setError(null);
            const res = await axiosInstance.get(`/subscription/user/${user.id}`);

            if (res.status === 200 && res.data) {
                setCurrentSubscription(res.data);
            } else {
                setCurrentSubscription(null);
            }
        } catch (error: any) {
            console.error('Error checking subscription:', error);

            // Check if it's a 404 error (no subscription found)
            if (error.response && error.response.status === 404) {
                setCurrentSubscription(null);
                setError(null); // 404 is not really an error in this context
            } else {
                setCurrentSubscription(null);
                setError(error.response?.data?.message || 'Failed to fetch subscription');
            }
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    // Auto-fetch on mount and when user changes
    useEffect(() => {
        if (autoFetch) {
            checkSubscriptionStatus();
        }
    }, [checkSubscriptionStatus, autoFetch]);

    // Alias for checkSubscriptionStatus to make it clear it's a refetch
    const refetch = useCallback(() => {
        setLoading(true);
        return checkSubscriptionStatus();
    }, [checkSubscriptionStatus]);

    return {
        currentSubscription,
        loading,
        error,
        checkSubscriptionStatus,
        refetch
    };
};

export default useSubscriptionStatus;