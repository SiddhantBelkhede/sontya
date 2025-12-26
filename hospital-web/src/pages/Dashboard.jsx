import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Sidebar from "../components/Sidebar";
import { Users, Calendar, Clock } from "lucide-react";

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className={`p-4 rounded-xl ${color} bg-opacity-10`}>
      {React.cloneElement(icon, {
        className: `w-8 h-8 ${color.replace("bg-", "text-")}`,
      })}
    </div>
    <div>
      <p className="text-gray-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ children: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!auth.currentUser) return;

      try {
        // Simple query to count children registered by this hospital
        const q = query(
          collection(db, "children"),
          where("hospitalId", "==", auth.currentUser.uid),
        );
        const snapshot = await getDocs(q);

        setStats({
          children: snapshot.size,
          appointments: 0, // Will implement this later
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Hospital Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back, here's what's happening today.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Users />}
            label="Registered Children"
            value={loading ? "..." : stats.children}
            color="bg-blue-500"
          />
          <StatCard
            icon={<Calendar />}
            label="Appointments Today"
            value="0"
            color="bg-purple-500"
          />
          <StatCard
            icon={<Clock />}
            label="Pending Actions"
            value="0"
            color="bg-orange-500"
          />
        </div>

        {/* Empty State for Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Calendar className="text-gray-400 w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No appointments scheduled
          </h3>
          <p className="text-gray-500 mt-2">
            New appointments will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
