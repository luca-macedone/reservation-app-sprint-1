import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";

const MenuView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant";
      await axios
        .get(baseUrl)
        .then((response) => {
          console.log(response.data);
          setRestaurants(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    };
    setIsLoading(true);
    fetchData();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2">
      <div>
        <h2>Your Restaurants</h2>
        <div>
          {isLoading ? (
            <LoadingComp />
          ) : (
            restaurants.map((rest) => {
              return <div key={rest.id}>{rest.name}</div>;
            })
          )}
        </div>
      </div>
      <div>menu of the restaurant</div>
    </div>
  );
};

export default MenuView;
