import React, { useState } from 'react';
import { db } from '../config/firebase';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { Search, Syringe, CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { VACCINE_SCHEDULE } from '../data/vaccines';

const VaccinationRecords = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [childData, setChildData] = useState(null);
  const [docId, setDocId] = useState(null); // Firestore Document ID (not the Unique ID)
  const [error, setError] = useState('');

  // Search logic
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError('');
    setChildData(null);

    try {
      // Query by the custom uniqueId field
      const q = query(collection(db, "children"), where("uniqueId", "==", searchId.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No child found with this Unique ID.");
      } else {
        // We assume uniqueId is unique, so we take the first doc
        const childDoc = querySnapshot.docs[0];
        setChildData(childDoc.data());
        setDocId(childDoc.id);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while searching.");
    } finally {
      setLoading(false);
    }
  };

  // Mark vaccine as done
  const markAsCompleted = async (vaccineId, vaccineName) => {
    if (!docId) return;

    try {
      const vaccineEntry = {
        vaccineId,
        vaccineName,
        dateAdministered: new Date().toISOString(),
        status: 'Completed'
      };

      const childRef = doc(db, "children", docId);
      
      // Update Firestore: Add to the history array
      await updateDoc(childRef, {
        vaccinationHistory: arrayUnion(vaccineEntry)
      });

      // Update local state to reflect change immediately
      setChildData(prev => ({
        ...prev,
        vaccinationHistory: [...(prev.vaccinationHistory || []), vaccineEntry]
      }));

    } catch (err) {
      console.error("Error updating vaccine:", err);
      alert("Failed to update record.");
    }
  };

  // Helper to check status
  const getStatus = (vaccineId) => {
    const history = childData?.vaccinationHistory || [];
    const found = history.find(v => v.vaccineId === vaccineId);
    return found ? { status: 'Completed', date: found.dateAdministered } : { status: 'Pending', date: null };
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Vaccination Records</h1>
          <p className="text-gray-500">Search for a child to view or update their history.</p>
        </header>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Enter Unique Health ID (e.g. SON-X92Z)" 
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none font-mono text-lg uppercase"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-colors shadow-sm disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </form>
          {error && (
            <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>

        {/* Child Profile & List */}
        {childData && (
          <div className="space-y-6 animate-fade-in">
            {/* Child Info Card */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{childData.childName || "Newborn"}</h2>
                <p className="text-gray-500">Parent: {childData.parentName}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Calendar size={14}/> DOB: {childData.dob}</span>
                  <span className="flex items-center gap-1">🩸 Blood: {childData.bloodGroup}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-wider">Health ID</div>
                <div className="text-3xl font-mono font-bold text-primary">{childData.uniqueId}</div>
              </div>
            </div>

            {/* Vaccine List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Syringe className="text-primary" size={20} />
                  Vaccination Schedule
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {VACCINE_SCHEDULE.map((vaccine) => {
                  const { status, date } = getStatus(vaccine.id);
                  const isCompleted = status === 'Completed';

                  return (
                    <div key={vaccine.id} className={`p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${isCompleted ? 'bg-green-50/30' : ''}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-800">{vaccine.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                            {vaccine.age}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{vaccine.type}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        {isCompleted ? (
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-green-600 font-bold">
                              <CheckCircle size={18} />
                              Administered
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(date).toLocaleDateString()}
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => markAsCompleted(vaccine.id, vaccine.name)}
                            className="flex items-center gap-2 px-4 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-medium transition-all"
                          >
                            <Clock size={16} />
                            Mark as Done
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccinationRecords;