import axiosInstance from '../../utils/auth';
import { useState } from 'react';
import { HiCreditCard, HiCurrencyDollar, HiMail } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface AffiliateApplicationProps {
    onSuccess: () => void;
}

const AffiliateApplication = ({ onSuccess }: AffiliateApplicationProps) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        paymentMethod: 'paypal',
        paymentDetails: {
            email: '',
            accountNumber: '',
            routingNumber: '',
            bankName: '',
            accountHolderName: ''
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Prepare payment details based on method
            let paymentDetailsObj;
            if (formData.paymentMethod === 'paypal') {
                paymentDetailsObj = {
                    email: formData.paymentDetails.email
                };
            } else if (formData.paymentMethod === 'bank') {
                paymentDetailsObj = {
                    accountNumber: formData.paymentDetails.accountNumber,
                    routingNumber: formData.paymentDetails.routingNumber,
                    bankName: formData.paymentDetails.bankName,
                    accountHolderName: formData.paymentDetails.accountHolderName
                };
            } else if (formData.paymentMethod === 'stripe') {
                paymentDetailsObj = {
                    email: formData.paymentDetails.email
                };
            } else {
                paymentDetailsObj = formData.paymentDetails;
            }

            // Convert payment details object to string
            const paymentDetailsString = JSON.stringify(paymentDetailsObj);

            console.log('Submitting with payment details as string:', paymentDetailsString);

            const response = await axiosInstance.post('/affiliate/apply', {
                paymentMethod: formData.paymentMethod,
                paymentDetails: paymentDetailsString // Send as string instead of object
            });

            if (response.data.success) {
                onSuccess();
            }
        } catch (err: any) {
            console.error('Application error:', err);
            setError(err.response?.data?.message || 'Failed to submit application');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            paymentDetails: {
                ...prev.paymentDetails,
                [field]: value
            }
        }));
    };

    const paymentMethods = [
        {
            id: 'paypal',
            name: 'PayPal',
            icon: HiMail,
            description: 'Fast and secure payments via PayPal'
        },
        {
            id: 'bank',
            name: 'Bank Transfer',
            icon: HiCurrencyDollar,
            description: 'Direct deposit to your bank account'
        },
        {
            id: 'stripe',
            name: 'Stripe',
            icon: HiCreditCard,
            description: 'Professional payment processing'
        }
    ];

    return (
        <div className="min-h-screen text-white flex items-center justify-center px-8">
            <div className="w-full">
                <div className="mb-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors text-sm sm:text-base"
                        >
                            ← Back
                        </button>
                    </div>
                {/* Header */}
                <div className=" mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        Join Our{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Affiliate Program
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Earn commissions by referring new users to our platform
                    </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">10%</span>
                        </div>
                        <h3 className="font-semibold text-green-400 mb-2">Commission Rate</h3>
                        <p className="text-sm text-gray-400">Earn 10% commission on every referral</p>
                    </div>

                    <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">∞</span>
                        </div>
                        <h3 className="font-semibold text-blue-400 mb-2">Unlimited Earning</h3>
                        <p className="text-sm text-gray-400">No limit on referrals or earnings</p>
                    </div>

                    <div className="bg-[#121212] border border-gray-800 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">📊</span>
                        </div>
                        <h3 className="font-semibold text-purple-400 mb-2">Real-time Tracking</h3>
                        <p className="text-sm text-gray-400">Track your performance in real-time</p>
                    </div>
                </div>

                {/* Application Form */}
                <div className="bg-[#121212] border border-gray-800 rounded-xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Apply to Become an Affiliate</h2>

                    {error && (
                        <div className="mb-6 bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                            <p className="text-red-300">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Payment Method Selection */}
                        <div>
                            <label className="block text-sm font-medium mb-4">Preferred Payment Method</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {paymentMethods.map((method) => {
                                    const IconComponent = method.icon;
                                    return (
                                        <label
                                            key={method.id}
                                            className={`cursor-pointer border-2 rounded-lg p-4 transition-colors ${formData.paymentMethod === method.id
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-gray-700 hover:border-gray-600'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                                                className="sr-only"
                                            />
                                            <div className="text-center">
                                                <IconComponent className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                                <h3 className="font-medium text-white mb-1">{method.name}</h3>
                                                <p className="text-xs text-gray-400">{method.description}</p>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div>
                            <label className="block text-sm font-medium mb-4">Payment Details</label>

                            {formData.paymentMethod === 'paypal' && (
                                <div>
                                    <input
                                        type="email"
                                        placeholder="PayPal Email Address"
                                        value={formData.paymentDetails.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                    />
                                </div>
                            )}

                            {formData.paymentMethod === 'bank' && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Account Holder Name"
                                        value={formData.paymentDetails.accountHolderName}
                                        onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bank Name"
                                        value={formData.paymentDetails.bankName}
                                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                    />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Account Number"
                                            value={formData.paymentDetails.accountNumber}
                                            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Routing Number"
                                            value={formData.paymentDetails.routingNumber}
                                            onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                        />
                                    </div>
                                </div>
                            )}

                            {formData.paymentMethod === 'stripe' && (
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Stripe Account Email"
                                        value={formData.paymentDetails.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="bg-gray-800/50 rounded-lg p-4">
                            <h3 className="font-medium mb-2">Terms & Conditions</h3>
                            <ul className="text-sm text-gray-400 space-y-1">
                                <li>• Commission payments are processed monthly</li>
                                <li>• Minimum payout threshold is $50</li>
                                <li>• Referrals must result in valid conversions</li>
                                <li>• Self-referrals are not permitted</li>
                            </ul>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Submitting Application...
                                </div>
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </form>
                </div>

                {/* Help Text */}
                <div className="text-center mt-8 text-gray-400">
                    <p className="text-sm">
                        Questions about our affiliate program?{' '}
                        <a href="mailto:support@editlabs.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AffiliateApplication;