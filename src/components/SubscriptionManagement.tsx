import React, { useState } from 'react';
import { SubscriptionPlan, SubscriptionStatus } from '../types/appScopeTypes';
import axiosInstance from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import usePreviousPath from '../hooks/usePreviousPath';
import useSubscriptionStatus from '../hooks/useSubscriptionStatus';

interface PricingPlan {
    type: string;
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonVariant: 'default' | 'primary' | 'premium';
    isPopular?: boolean;
}

const SubscriptionManagement: React.FC = () => {
    // Use the custom hook instead of local state and function
    const { currentSubscription, loading, error, refetch } = useSubscriptionStatus();
    
    
    const [actionLoading, setActionLoading] = useState(false);
    const [, setSubscribing] = useState(false);
    const [cancelMessage, setCancelMessage] = useState<string | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const prevPath = usePreviousPath();

    const plans: PricingPlan[] = [
        {
            type: SubscriptionPlan.SINGLE,
            title: 'Single Plugin Plan',
            price: '$25',
            period: '/month',
            description: 'Access to just one (let them pick)',
            features: [
                'Access to one plugin of your choice',
                'Basic customer support',
                'Regular updates for selected plugin',
                'Community forum access',
                'Cancel anytime'
            ],
            buttonVariant: 'default'
        },
        {
            type: SubscriptionPlan.MONTHLY,
            title: 'Full Access Plan',
            price: '$50',
            period: '/month',
            description: 'Everything (8-10 Plug-Ins)',
            features: [
                'Access to all 8-10 plugins',
                'Priority customer support',
                'Early access to new plugins',
                'Advanced analytics dashboard',
                'Custom workflow templates',
                'API access for integrations'
            ],
            buttonVariant: 'primary',
            isPopular: true
        },
        {
            type: SubscriptionPlan.YEARLY,
            title: 'Annual Full Access Plan',
            price: '$350',
            period: '/year',
            description: 'Save 42%, includes bonus packs or tutorials',
            features: [
                'Everything in Full Access Plan',
                'Save 42% compared to monthly',
                'Exclusive bonus plugin packs',
                'Premium tutorial library',
                'One-on-one onboarding session',
                'Custom plugin development consultation'
            ],
            buttonVariant: 'premium'
        }
    ];

    const handleSubscribe = async (planType: string) => {
        if (!user?.id) {
            console.error('User not found');
            return;
        }

        setActionLoading(true);
        setSubscribing(true);

        try {
            const data = { userId: user.id, plan: planType };
            console.log('Creating checkout session with data:', data);

            const response = await axiosInstance.post('subscription/create-checkout-session', data);

            if (response.data.success && response.data.data?.url) {
                console.log('Checkout session created successfully:', response.data);

                // Redirect to Stripe checkout in the same tab
                window.location.href = response.data.data.url;
            } else {
                console.error('Failed to create checkout session:', response.data);
                setSubscribing(false);
                setActionLoading(false);
            }

        } catch (error: any) {
            console.error('Error creating checkout session:', error);

            // Handle specific error messages from the API if available
            if (error.response?.data?.message) {
                console.error('API Error:', error.response.data.message);
                // You can show a toast notification or error message to the user here
            }

            setSubscribing(false);
            setActionLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!currentSubscription || !user?.id) return;

        setActionLoading(true);

        try {
            const response = await axiosInstance.post(`/subscription/user/cancel/${user.id}`);

            if (response.status === 200) {
                // Show temporary success message
                setCancelMessage('Subscription canceled successfully! Your subscription will remain active until the next billing date.');
                
                // Hide the message after 5 seconds
                setTimeout(() => {
                    setCancelMessage(null);
                }, 5000);

                // Refresh subscription status using the hook's refetch function
                await refetch();
            }

        } catch (error: any) {
            console.error('Error cancelling subscription:', error);
            
            // Show error message if available
            if (error.response?.data?.message) {
                setCancelMessage(`Error: ${error.response.data.message}`);
                setTimeout(() => {
                    setCancelMessage(null);
                }, 5000);
            }
        } finally {
            setActionLoading(false);
        }
    };

    const handleReactivateSubscription = async () => {
        if (!currentSubscription) return;

        setActionLoading(true);

        try {
            // Replace with your actual reactivate subscription endpoint
            // await axiosInstance.post(`/subscription/${currentSubscription.id}/reactivate`);

            // Refresh subscription status using the hook's refetch function
            await refetch();

        } catch (error) {
            console.error('Error reactivating subscription:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getPlanTitle = (planType: string) => {
        const plan = plans.find(p => p.type === planType);
        return plan?.title || 'Unknown Plan';
    };

    const getPlanAmount = (planType: string) => {
        const plan = plans.find(p => p.type === planType);
        return plan ? `${plan.price}${plan.period}` : 'Unknown Amount';
    };

    const handleDownload = (platform: 'windows' | 'mac') => {
        // Dummy file URLs - replace with your actual application downloads
        const downloadUrls = {
            windows: 'https://the.earth.li/~sgtatham/putty/latest/wa64/putty.exe', // PuTTY as dummy Windows exe
            mac: 'https://github.com/microsoft/vscode/releases/download/1.85.0/VSCode-darwin-universal.zip' // VS Code as dummy Mac app
        };

        const fileNames = {
            windows: `YourApp-Windows-v1.0.exe`,
            mac: `YourApp-Mac-v1.0.zip`
        };

        console.log(`Downloading ${platform} application...`);
        
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = downloadUrls[platform];
        link.download = fileNames[platform];
        link.target = '_blank';
        
        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Show error state if there's an error
    if (error) {
        return (
            <div className='relative bg-black text-white min-h-screen'>
                <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                    <div className="text-white text-center mb-12">
                        {(prevPath === '/home' || prevPath === '/profile') && (
                            <button
                                onClick={() => navigate(-1)}
                                className="text-purple-400 hover:text-purple-300 mb-4 flex items-center gap-2 mx-auto transition-colors"
                            >
                                ← Back
                            </button>
                        )}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Manage Your Subscription</h1>
                    </div>

                    <div className="flex flex-col justify-center items-center py-20">
                        <div className="text-red-400 text-center">
                            <p className="mb-4">Error loading subscription: {error}</p>
                            <button
                                onClick={() => refetch()}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className='relative bg-black text-white min-h-screen'>
                <div className="w-[95%] lg:w-[90%] mx-auto py-10 md:pt-28 md:pb-16">
                    <div className="text-white text-center mb-12">
                        {(prevPath === '/home' || prevPath === '/profile') && (
                        <button
                            onClick={() => navigate(-1)}
                            className="text-purple-400 hover:text-purple-300 mb-4 flex items-center gap-2 mx-auto transition-colors"
                        >
                            ← Back
                        </button>
                        )}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white  mb-4">Manage Your Subscription</h1>
                    </div>

                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='relative bg-black text-white min-h-screen'>
            <div className="w-[95%] lg:w-[80%] mx-auto py-10 md:pt-28 md:pb-16">
                <div className="text-white mb-12">
                    <button
                        onClick={() => {navigate(-1)
                        }}
                        className="text-purple-400 hover:text-purple-300 mb-4 gap-2 mx-auto transition-colors"
                    >
                        ← Back 
                    </button>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Manage Your Subscription</h1>
                    <p className="text-[#858381] font-extralight">
                        {currentSubscription ? 'Manage your current plan' : 'Choose your plan to get started'}
                    </p>
                </div>

                {/* Temporary Cancel Message */}
                {cancelMessage && (
                    <div className={`mb-6 p-4 rounded-xl border ${cancelMessage.startsWith('Error') 
                        ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                        : 'bg-green-500/10 border-green-500/30 text-green-400'
                    }`}>
                        <p className="text-sm font-medium">{cancelMessage}</p>
                    </div>
                )}

                {currentSubscription ? (
                    /* Has Active Subscription */
                    <div className="mx-auto">
                        {/* Current Subscription Card */}
                        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-white">Current Subscription</h2>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium ${currentSubscription.status === SubscriptionStatus.ACTIVE
                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                        : currentSubscription?.status === SubscriptionStatus.CANCELED
                                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}>
                                    {currentSubscription.status === SubscriptionStatus.ACTIVE ? 'Active' :
                                        currentSubscription?.status === SubscriptionStatus.CANCELED? 'Cancelled' : 'Expired'}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-sm mb-1">Plan</p>
                                    <p className="text-white font-semibold text-lg">{getPlanTitle(currentSubscription.plan)}</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-sm mb-1">Amount</p>
                                    <p className="text-white font-semibold text-lg">{getPlanAmount(currentSubscription.plan)}</p>
                                </div>
                                <div className="text-center md:text-left">
                                    <p className="text-gray-400 text-sm mb-1">
                                        {currentSubscription.status === SubscriptionStatus.ACTIVE ? 'Next Billing' : 'Period End'}
                                    </p>
                                    <p className="text-white font-semibold text-lg">
                                        {formatDate(currentSubscription.currentPeriodEnd)}
                                    </p>
                                </div>
                            </div>

                            {/* Product Key */}
                            <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                                <p className="text-gray-400 text-sm mb-1">Product Key</p>
                                <p className="text-white font-mono text-lg">{currentSubscription.productKey}</p>
                            </div>

                            {/* Trial Status */}
                            {currentSubscription.isTrialing && (
                                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                                    <p className="text-blue-400 text-sm">
                                        You are currently on a trial period until {currentSubscription.trialEnd && formatDate(currentSubscription.trialEnd)}.
                                    </p>
                                </div>
                            )}

                            {currentSubscription?.status === SubscriptionStatus.CANCELED && (
                                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                                    <p className="text-yellow-400 text-sm">
                                        Your subscription has been cancelled but remains active until {formatDate(currentSubscription.currentPeriodEnd)}.
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-gradient-to-r from-violet-400 to-purple-400 hover:from-purple-500 hover:to-purple-500 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200">
                                    Change Plan
                                </button>

                                {currentSubscription.status === SubscriptionStatus.ACTIVE && !currentSubscription.cancelAtPeriodEnd  ? (
                                    <button
                                        onClick={handleCancelSubscription}
                                        disabled={actionLoading}
                                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading ? 'Processing...' : 'Cancel Subscription'} 
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleReactivateSubscription}
                                        disabled={actionLoading}
                                        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50"
                                    >
                                        {actionLoading ? 'Processing...' : 'Reactivate Subscription'}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Subscription Details */}
                        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 mb-8">
                            <h3 className="text-xl font-semibold text-white mb-6">Subscription Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Current Period Start</p>
                                    <p className="text-white">{formatDate(currentSubscription.currentPeriodStart)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Current Period End</p>
                                    <p className="text-white">{formatDate(currentSubscription.currentPeriodEnd)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Subscription ID</p>
                                    <p className="text-white font-mono">#{currentSubscription.id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Plan Type</p>
                                    <p className="text-white capitalize">{currentSubscription.plan}</p>
                                </div>
                            </div>
                        </div>

                        {/* Download Applications */}
                        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-3xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6">Download Applications</h3>
                            <p className="text-gray-400 text-sm mb-6">Download the desktop application for your operating system</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Windows Download */}
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-200">
                                    <div className="flex items-center mb-4">
                                        <div className="text-3xl mr-4">🪟</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-lg">Windows</h4>
                                            <p className="text-gray-400 text-sm">Windows 10 or later</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload('windows')}
                                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span>⬇️</span>
                                        Download for Windows
                                    </button>
                                </div>

                                {/* Mac Download */}
                                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-600 hover:border-purple-400 transition-all duration-200">
                                    <div className="flex items-center mb-4">
                                        <div className="text-3xl mr-4">🍎</div>
                                        <div>
                                            <h4 className="text-white font-semibold text-lg">macOS</h4>
                                            <p className="text-gray-400 text-sm">macOS 10.15 or later</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload('mac')}
                                        className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <span>⬇️</span>
                                        Download for Mac
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                                <p className="text-blue-400 text-sm">
                                    <strong>Note:</strong> You'll need your product key ({currentSubscription.productKey}) to activate the application after installation.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* No Subscription - Show Plans */
                    <div className="mx-auto">
                        <div className=" mb-8">
                            <p className="text-gray-400 mb-6">You don't have an active subscription. Choose a plan to get started:</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {plans.map((plan) => (
                                <div key={plan.type} className={`relative bg-gray-900/60 backdrop-blur-sm border rounded-3xl p-8 ${plan.isPopular ? 'border-purple-400 shadow-lg shadow-purple-400/20' : 'border-gray-700'
                                    }`}>
                                    {plan.isPopular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <span className="bg-gradient-to-r from-violet-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                                                Most Popular
                                            </span>
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-white text-xl font-medium mb-4">{plan.title}</h3>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-purple-400 text-4xl font-bold">{plan.price}</span>
                                            <span className="text-purple-400 text-lg">{plan.period}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">{plan.description}</p>
                                    </div>

                                    <button
                                        onClick={() => handleSubscribe(plan.type)}
                                        disabled={actionLoading || !user?.id}
                                        className={`w-full py-3 px-6 rounded-2xl font-medium text-white transition-all duration-200 disabled:opacity-50 mb-6 ${plan.buttonVariant === 'primary'
                                                ? 'bg-gradient-to-r from-violet-400 to-purple-400 hover:from-purple-500 hover:to-purple-500 shadow-lg'
                                                : plan.buttonVariant === 'premium'
                                                    ? 'bg-gradient-to-r from-violet-700 to-purple-900 hover:from-purple-500 hover:to-purple-700 shadow-lg'
                                                    : 'bg-gray-800 hover:bg-gray-700 border border-gray-600'
                                            }`}
                                    >
                                        {actionLoading ? 'Processing...' : 'Subscribe Now'}
                                    </button>

                                    <div>
                                        <ul className="space-y-2">
                                            {plan.features.slice(0, 4).map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-300 text-sm">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionManagement;