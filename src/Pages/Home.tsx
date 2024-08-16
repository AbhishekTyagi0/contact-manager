import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">
        Welcome to Contact Manager
      </h1>
      <p className="text-lg mb-8 text-gray-700 text-center max-w-xl">
        Manage your contacts effortlessly and visualize important data with our
        powerful tools. Start by adding your contacts or exploring the charts
        and maps for insightful data.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/contacts"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go to Contacts
        </Link>
        <Link
          to="/charts-and-maps"
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        >
          Go to Charts and Maps
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
