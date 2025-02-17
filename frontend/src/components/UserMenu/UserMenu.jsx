import React, { useEffect, useState } from 'react';

const UserMenu = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5000/api/user-detail", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className='text-black font-bold text-xl h-10 w-10 flex items-center justify-center bg-gray-300 rounded-full mr-8'>
      {user ? <h1 className='bold text-3xl'>{user.username[0]}</h1> : <p>Loading...</p>}
    </div>
  );
};

export default UserMenu;
