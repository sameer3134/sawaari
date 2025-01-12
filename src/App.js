
import "./App.css";
import Header from "./components/header.js";

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;


// <form onSubmit={formik.handleSubmit} className="space-y-4">
// {/* Name */}
// <div>
//   <label htmlFor="name" className="block font-medium">
//     Name
//   </label>
//   <input
//     id="name"
//     name="name"
//     type="text"
//     className="w-full p-2 border rounded"
//     value={formik.values.name}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//   />
//   {formik.touched.name && formik.errors.name ? (
//     <div className="text-red-500 text-sm">{formik.errors.name}</div>
//   ) : null}
// </div>

// {/* Mobile */}
// <div>
//   <label htmlFor="mobile" className="block font-medium">
//     Mobile Number
//   </label>
//   <input
//     id="mobile"
//     name="mobile"
//     type="text"
//     className="w-full p-2 border rounded"
//     value={formik.values.mobile}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//   />
//   {formik.touched.mobile && formik.errors.mobile ? (
//     <div className="text-red-500 text-sm">{formik.errors.mobile}</div>
//   ) : null}
// </div>

// {/* Pickup Location */}
// <div>
//   <label htmlFor="pickup" className="block font-medium">
//     Pickup Location
//   </label>
//   <input
//     id="pickup"
//     name="pickup"
//     type="text"
//     className="w-full p-2 border rounded"
//     value={formik.values.pickup}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//   />
//   {formik.touched.pickup && formik.errors.pickup ? (
//     <div className="text-red-500 text-sm">{formik.errors.pickup}</div>
//   ) : null}
// </div>

// {/* Drop Location */}
// <div>
//   <label htmlFor="drop" className="block font-medium">
//     Drop Location
//   </label>
//   <input
//     id="drop"
//     name="drop"
//     type="text"
//     className="w-full p-2 border rounded"
//     value={formik.values.drop}
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//   />
//   {formik.touched.drop && formik.errors.drop ? (
//     <div className="text-red-500 text-sm">{formik.errors.drop}</div>
//   ) : null}
// </div>

// {/* Submit Button */}
// <button
//   type="submit"
//   className="w-full bg-blue-500 text-white py-2 rounded"
// >
//   Submit
// </button>
// </form>