import { useMemo } from 'react';
import { HiTrendingUp } from 'react-icons/hi';

interface PerformanceChartProps {
    dailyStats: Array<{
        date: string;
        referrals: string;
        conversions: string;
        revenue: string;
        commission: string;
    }>;
}

const PerformanceChart = ({ dailyStats }: PerformanceChartProps) => {
    const chartData = useMemo(() => {
        if (!dailyStats || dailyStats.length === 0) return [];

        return dailyStats.map(stat => ({
            date: new Date(stat.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }),
            referrals: parseInt(stat.referrals),
            conversions: parseInt(stat.conversions),
            commission: parseFloat(stat.commission)
        }));
    }, [dailyStats]);

    const maxValues = useMemo(() => {
        if (chartData.length === 0) return { referrals: 0, commission: 0 };

        return {
            referrals: Math.max(...chartData.map(d => d.referrals)),
            commission: Math.max(...chartData.map(d => d.commission))
        };
    }, [chartData]);

    const totalStats = useMemo(() => {
        if (chartData.length === 0) return { totalReferrals: 0, totalCommission: 0 };

        return {
            totalReferrals: chartData.reduce((sum, d) => sum + d.referrals, 0),
            totalCommission: chartData.reduce((sum, d) => sum + d.commission, 0)
        };
    }, [chartData]);

    const getBarHeight = (value: number, maxValue: number) => {
        if (maxValue === 0) return 0;
        return Math.max((value / maxValue) * 100, 2); // Minimum 2% height for visibility
    };

    if (chartData.length === 0) {
        return (
            <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Chart</h3>
                <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                        <HiTrendingUp className="w-8 h-8 text-gray-500" />
                    </div>
                    <p className="text-gray-400 mb-2">No performance data yet</p>
                    <p className="text-sm text-gray-500">
                        Start referring users to see your performance metrics!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#121212] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Performance Chart</h3>
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-400">Referrals</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-400">Commission</span>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <HiTrendingUp className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-purple-400">Total Referrals</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalStats.totalReferrals}</p>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <HiTrendingUp className="w-5 h-5 text-green-400" />
                        <span className="text-sm text-green-400">Total Commission</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${totalStats.totalCommission.toFixed(2)}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="relative">
                <div className="flex items-end justify-between h-48 gap-2">
                    {chartData.map((data, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-2">
                            {/* Commission Bar */}
                            <div className="relative w-full flex items-end gap-1">
                                <div
                                    className="bg-purple-500 rounded-t w-1/2 transition-all duration-300 hover:bg-purple-400"
                                    style={{
                                        height: `${getBarHeight(data.referrals, maxValues.referrals)}%`,
                                        minHeight: data.referrals > 0 ? '4px' : '0px'
                                    }}
                                    title={`${data.referrals} referrals`}
                                />
                                <div
                                    className="bg-green-500 rounded-t w-1/2 transition-all duration-300 hover:bg-green-400"
                                    style={{
                                        height: `${getBarHeight(data.commission, maxValues.commission)}%`,
                                        minHeight: data.commission > 0 ? '4px' : '0px'
                                    }}
                                    title={`$${data.commission} commission`}
                                />
                            </div>

                            {/* Date Label */}
                            <span className="text-xs text-gray-400 text-center">
                                {data.date}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 -ml-8">
                    <span>{Math.max(maxValues.referrals, maxValues.commission)}</span>
                    <span>{Math.round(Math.max(maxValues.referrals, maxValues.commission) / 2)}</span>
                    <span>0</span>
                </div>
            </div>

            {/* Detailed Stats */}
            <div className="mt-6 grid grid-cols-1 gap-3">
                {chartData.slice(-3).map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span className="text-sm text-gray-300">{data.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-purple-400">{data.referrals} referrals</span>
                            <span className="text-green-400">${data.commission}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PerformanceChart;