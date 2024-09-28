'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/components/PrivateRoute';

const Profile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    email: 'informação não consta',
    name: 'informação não consta',
    uid: 'informação não consta',
  });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      const { displayName, email, uid } = user;
      setUserData({
        name: displayName || 'informação não consta',
        email: email || 'informação não consta',
        uid: uid || 'informação não consta',
      });
    }
  }, [user, router]);

  return (
    <PrivateRoute>
      <div className="container mx-auto min-h-screen p-6 bg-gray-100"> 
        <h1 className="text-4xl font-semibold mb-6 text-center text-gray-800">Perfil do Usuário</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-lg mb-2"><strong>Nome:</strong> <span className="text-gray-700">{userData.name}</span></p>
          <p className="text-lg mb-2"><strong>Email:</strong> <span className="text-gray-700">{userData.email}</span></p>
          <p className="text-lg mb-2"><strong>ID do Usuário:</strong> <span className="text-gray-700">{userData.uid}</span></p>
        </div>
      </div>
    </PrivateRoute>
  );
  
};

export default Profile;