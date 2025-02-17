import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleItem from "./item";
import { useSearchParams } from "react-router-dom";

let baseurl = "https://67b04cd6dffcd88a6788d8b6.mockapi.io/Products";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchparam, setSearchParam] = useSearchParams({ page: 1 });

  // Ensure page is a valid number
  const page = searchparam.get("page") ? parseInt(searchparam.get("page")) : 1;
  const limit = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: newData } = await axios.get(baseurl);
        if (Array.isArray(newData)) {
          setData((prevData) => [...prevData, ...newData.slice((page - 1) * limit, page * limit)]);
        }
      } catch (error) {
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Fetch data when page changes

  const handleLoadMore = () => {
    setSearchParam({ page: page + 1 });
  };

  return (
    <div className="p-6 bg-[#f8f9fa] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.length > 0 ? (
            data.map((value) => <SingleItem key={value.id} {...value} />)
          ) : (
            <p className="text-center text-gray-500">No items available.</p>
          )}
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
            {Array.from({ length: limit }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="w-full sm:w-auto px-6 py-3 bg-[#FFBE1E] hover:bg-[#ffbf1ec5] text-white rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? "Loading..." : "Show 5 more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

 
