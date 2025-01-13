// Import React and necessary Firebase functions
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const BookingForm = () => {
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pickup: "",
      drop: "",
      pickupTime: "",
      isRoundTrip: false, // Boolean value for round-trip
      returnPickupTime: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      mobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      pickup: Yup.string().required("Pickup location is required"),
      drop: Yup.string().required("Drop location is required"),
      pickupTime: Yup.string().required("Pickup time is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        // Save data to Firestore
        await addDoc(collection(db, "bookings"), values);
        alert("Submit Successfully, You will get a call");
        resetForm();
      } catch (error) {
        console.error("Error adding document: ", error.message);
        alert("Failed to submit booking. Please try again.");
      }
    },
  });

  return (
    <div className="mx-auto">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-bold title-font  text-gray-900"  style={{

                                    color: "#00326b",
                                }}>
              Know your ride
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="space-y-4 pb-10">
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div>
                 
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Your Name"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div>
                    <input
                      id="mobile"
                      name="mobile"
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Phone"
                    />
                    {formik.touched.mobile && formik.errors.mobile ? (
                      <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div>
                    <input
                      id="pickup"
                      name="pickup"
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formik.values.pickup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Pickup Location"
                    />
                    {formik.touched.pickup && formik.errors.pickup ? (
                      <div className="text-red-500 text-sm">{formik.errors.pickup}</div>
                    ) : null}
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div>
                    <input
                      id="drop"
                      name="drop"
                      type="text"
                      className="w-full p-2 border rounded"
                      value={formik.values.drop}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Drop Location"
                    />
                    {formik.touched.drop && formik.errors.drop ? (
                      <div className="text-red-500 text-sm">{formik.errors.drop}</div>
                    ) : null}
                  </div>
                </div>

                {/* Round Trip Toggle */}
                
                <div className="p-2 w-full flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    {/* One Way Option */}
                    <div>
                      <input
                        type="radio"
                        id="oneWay"
                        name="isRoundTrip"
                        value="false"
                        checked={!formik.values.isRoundTrip}
                        onChange={() => formik.setFieldValue("isRoundTrip", false)}
                        className="hidden"
                      />
                      <label
                        htmlFor="oneWay"
                        className={`cursor-pointer py-2 px-6 rounded-full border ${
                          !formik.values.isRoundTrip ? "border-blue-500 text-blue-500" : "border-black text-black"
                        }`}
                      >
                        One Way
                      </label>
                    </div>

                    {/* Round Trip Option */}
                    <div>
                      <input
                        type="radio"
                        id="roundTrip"
                        name="isRoundTrip"
                        value="true"
                        checked={formik.values.isRoundTrip}
                        onChange={() => formik.setFieldValue("isRoundTrip", true)}
                        className="hidden"
                      />
                      <label
                        htmlFor="roundTrip"
                        className={`cursor-pointer py-2 px-6 rounded-full border ${
                          formik.values.isRoundTrip ? "border-blue-500 text-blue-500" : "border-black text-black"
                        }`}
                      >
                        Round Trip
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pickup Time */}
                <div className="p-2 w-1/2">
                  <div>
                    <label htmlFor="pickupTime" className="block font-medium  text-left">
                      Pickup Time
                    </label>
                    <input
                      id="pickupTime"
                      name="pickupTime"
                      type="time"
                      className="w-full p-2 border rounded"
                      value={formik.values.pickupTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Pickup Time"
                    />
                    {formik.touched.pickupTime && formik.errors.pickupTime ? (
                      <div className="text-red-500 text-sm">{formik.errors.pickupTime}</div>
                    ) : null}
                  </div>
                </div>

                {/* Return Pickup Time (conditionally shown for round trip) */}
                {formik.values.isRoundTrip && (
                  <div className="p-2 w-1/2">
                    <div>
                      <label htmlFor="returnPickupTime" className="text-left block font-medium">
                        Return Pickup Time
                      </label>
                      <input
                        id="returnPickupTime"
                        name="returnPickupTime"
                        type="time"
                        className="w-full p-2 border rounded"
                        value={formik.values.returnPickupTime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Return Pickup Time"
                      />
                      {formik.touched.returnPickupTime && formik.errors.returnPickupTime ? (
                        <div className="text-red-500 text-sm">{formik.errors.returnPickupTime}</div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="w-full mt-8 bg-blue-500 text-white font-bold py-2 rounded-full"   style={{ backgroundColor: "#0ccda6" }}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BookingForm;
