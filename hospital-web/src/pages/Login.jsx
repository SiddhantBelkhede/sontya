import React, { useState } from 'react';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Activity, Building2, Lock, Mail, MapPin, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    hospitalName: '',
    location: ''
  });

  // Store precise coordinates for the map feature later
  const [coordinates, setCoordinates] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ latitude, longitude });

        try {
          // Free reverse geocoding to get City/State name for the text box
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          // specific format: City, PrincipalSubdivision (State)
          const cityState = `${data.city || data.locality}, ${data.principalSubdivision}`;
          setFormData(prev => ({ ...prev, location: cityState }));
        } catch (err) {
          console.error("Could not fetch address name, using coordinates.", err);
          setFormData(prev => ({ ...prev, location: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}` }));
        } finally {
          setLocationLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location. Please enter it manually.");
        setLocationLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login Logic
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        // Signup Logic
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Create Hospital Profile in Firestore
        await setDoc(doc(db, "hospitals", user.uid), {
          name: formData.hospitalName,
          email: formData.email,
          location: formData.location,
          coordinates: coordinates || null, // Precise for maps
          createdAt: new Date().toISOString(),
          uid: user.uid
        });
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-primary p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Activity className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Hospital Portal Login' : 'Register New Hospital'}
          </h2>
          <p className="text-blue-100 mt-2 text-sm">
            {isLogin ? 'Access your vaccination management dashboard' : 'Join the Sontya network'}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="hospitalName"
                    placeholder="Hospital Name"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Dynamic Location Section */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={detectLocation}
                    disabled={locationLoading}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors border border-gray-200"
                    title="Detect Current Location"
                  >
                    {locationLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    ) : (
                      <MapPin className="w-5 h-5 text-primary" />
                    )}
                  </button>
                </div>
                {coordinates && (
                  <p className="text-xs text-green-600 ml-1">
                    ✓ Precise location captured (Lat: {coordinates.latitude.toFixed(2)}, Lng: {coordinates.longitude.toFixed(2)})
                  </p>
                )}
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register Hospital')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm font-medium"
            >
              {isLogin ? "Don't have an account? Register here" : "Already registered? Login here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;