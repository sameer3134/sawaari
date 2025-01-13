import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQtB3nB-vLbbdQzdI1R_ot8STQ7_yiDnA",
  authDomain: "meet-d278b.firebaseapp.com",
  projectId: "meet-d278b",
  storageBucket: "meet-d278b.firebasestorage.app",
  messagingSenderId: "309780897296",
  appId: "1:309780897296:web:c700d288339381c404b495",
  measurementId: "G-DDHEC7R9ER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FetchData = () => {
  // State to hold the fetched data
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const bookingsArray = [];
        querySnapshot.forEach((doc) => {
          bookingsArray.push({ id: doc.id, ...doc.data() });
        });
        setBookings(bookingsArray); // Set state with fetched data
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto">
          <div class="lg:w-2/3 w-full mt-10 mx-auto overflow-auto">
      <table class="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Name</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Mobile</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Pickup Location</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Drop Location</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Pickup Time</th>
            <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Return Pickup Time</th>
          </tr>
        </thead>
        <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id} >
            <td class="px-4 py-3">{booking.name}</td>
            <td class="px-4 py-3">{booking.mobile}</td>
            <td class="px-4 py-3">{booking.pickup}</td>
            <td class="px-4 py-3">{booking.drop}</td>
            <td class="px-4 py-3">{booking.pickupTime}</td>
            <td class="px-4 py-3">{booking.returnPickupTime}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default FetchData;
