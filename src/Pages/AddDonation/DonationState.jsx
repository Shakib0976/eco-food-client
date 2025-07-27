import React, { useContext } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import simpleAxios from "../../Hooks/simpleAxios";
import { AuthContext } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";

const DonationStatistics = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = simpleAxios();

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    const { data: donations = [], isLoading } = useQuery({
        queryKey: ["donationStats", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/donations/stats/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loader />;

    // Helper to extract numeric value from "2kg"
    const parseKg = (q) => {
        const num = parseFloat(q?.toLowerCase().replace("kg", ""));
        return isNaN(num) ? 0 : num;
    };

    // Group by foodType and sum quantities
    const groupedData = donations.reduce((acc, donation) => {
        const type = donation.foodType || "Unknown";
        const qty = parseKg(donation.quantity);
        if (acc[type]) {
            acc[type] += qty;
        } else {
            acc[type] = qty;
        }
        return acc;
    }, {});

    const chartData = Object.entries(groupedData).map(([type, total]) => ({
        name: type,
        quantity: total
    }));

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Donation Types by Quantity (kg)</h2>
            <BarChart
                width={900}
                height={400}
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Total Quantity (kg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="quantity" fill="#8884d8" label={{ position: 'top' }}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default DonationStatistics;
