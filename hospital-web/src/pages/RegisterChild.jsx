import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import { UserPlus, Save, Loader2 } from 'lucide-react';

const RegisterChild = () => {
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null); // To show the generated ID
  
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    gender: 'Male',
    dob: '',
    bloodGroup: 'Unknown',
    weight: '',
    phone: ''
  });

  // Generate a random 6-character ID (e.g., SON-9X2A)
  const generateUniqueId = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = 'SON-';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values for weight
    if (name === 'weight' && value < 0) {
      return; 
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uniqueId = generateUniqueId();
      
      // Save to Firestore
      await addDoc(collection(db, "children"), {
        ...formData,
        uniqueId: uniqueId,
        hospitalId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
        vaccinationHistory: [] 
      });

      setSuccessId(uniqueId);
      setFormData({
        parentName: '', childName: '', gender: 'Male', dob: '', 
        bloodGroup: 'Unknown', weight: '', phone: ''
      });

    } catch (error) {
      console.error("Error registering child: ", error);
      alert("Failed to register child. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-background min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Register New Child</h1>
          <p className="text-gray-500">Create a profile and generate a Unique Health ID.</p>
        </header>

        {successId && (
          <div className="mb-6 bg-green-50 border border-green-200 p-6 rounded-xl flex flex-col items-center justify-center text-center animate-pulse">
            <h3 className="text-green-800 font-bold text-lg">Registration Successful!</h3>
            <p className="text-green-600">The child's Unique ID is:</p>
            <div className="mt-2 text-3xl font-mono font-bold text-primary bg-white px-6 py-2 rounded-lg border border-green-200 shadow-sm">
              {successId}
            </div>
            <p className="text-xs text-gray-500 mt-2">Share this ID with the parents for their app.</p>
            <button onClick={() => setSuccessId(null)} className="mt-4 text-sm text-green-700 underline">Register another</button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Parent Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent's Name (Mother/Father)</label>
                <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Sarah Smith" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="+91 98765..." />
              </div>

              {/* Child Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Child's Name (Optional)</label>
                <input type="text" name="childName" value={formData.childName} onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Baby of Sarah" />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input required type="date" name="dob" value={formData.dob} onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>

              {/* Weight - Updated with validation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Birth Weight (kg)</label>
                <input 
                  required 
                  type="number" 
                  step="0.1" 
                  min="0"
                  name="weight" 
                  value={formData.weight} 
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
                  placeholder="3.5" 
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white">
                  <option>Unknown</option>
                  <option>A+</option> <option>A-</option>
                  <option>B+</option> <option>B-</option>
                  <option>O+</option> <option>O-</option>
                  <option>AB+</option> <option>AB-</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                Register Child
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterChild;