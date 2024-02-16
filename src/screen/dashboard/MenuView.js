import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const MenuView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menuWindow, setMenuWindow] = useState({
    loading: false,
    open: false,
  });
  const [restaurants, setRestaurants] = useState([]);
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant";
      await axios
        .get(baseUrl)
        .then((response) => {
          // console.log(response.data);
          setRestaurants(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });
    };

    setMenu({
      loading: false,
      open: false,
    });
    setIsLoading(true);
    fetchData();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
      <section className="h-full overflow-hidden">
        <h2 className="font-special text-secondary text-3xl mb-3">
          Your Restaurants
        </h2>
        <div className="px-5 py-2 bg-tertiary border-t-2 border-secondary h-full">
          <div className="h-full overflow-y-auto flex flex-col items-start justify-start gap-4">
            {isLoading ? (
              <LoadingComp />
            ) : (
              restaurants.map((rest) => {
                return (
                  <div
                    key={rest.id}
                    className="bg-light px-5 py-3 rounded-3xl w-full flex items-center justify-start gap-3"
                  >
                    <div
                      className="min-w-10 md:w-16  aspect-square rounded-full overflow-hidden ring ring-secondary"
                      style={{
                        backgroundImage: `url(${rest.profile_img.src})`,
                        backgroundPosition: `center`,
                        backgroundSize: `cover`,
                      }}
                    />
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <h5 className="border-b-2 border-secondary w-max px-2">
                          {rest.name}
                        </h5>
                        <small className="text-wrap px-2">
                          {rest.address +
                            ", " +
                            rest.city +
                            ", " +
                            rest.country}
                        </small>
                      </div>
                      <button className="bg-accent text-light px-5 py-2 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <section>
        <h2 className="font-special text-secondary text-3xl mb-3">Menu</h2>
        <div className="border-t-2 border-secondary">
          {!menuWindow.open ? <h2>Choose the restaurant.</h2> : <></>}
        </div>
      </section>
    </div>
  );
};

export default MenuView;
