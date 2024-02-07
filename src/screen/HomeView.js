import React from "react";
import HeroComp from "../components/HeroComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigator = useNavigate();
  return (
    <>
      <HeroComp />
      <section className="container mx-auto px-3 py-10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-5">
          <div className="flex flex-col items-center  gap-8">
            <div className="flex flex-col items-center gap-5">
              <FontAwesomeIcon
                icon={faMap}
                className="h-12 text-primary text-center"
              />
              <h2 className="text-2xl text-primary font-special">
                Discover new restaurants
              </h2>
            </div>
            <p className="max-w-96 text-center w-max">
              Embark on a culinary quest. Your next favorite dish is just a
              search away.
            </p>
            <div className="w-full flex items-center justify-center mt-5">
              <button
                type="button"
                onClick={() => navigator("/restaurants")}
                className="bg-accent px-5 py-2 rounded-lg text-light shadow-lg"
              >
                Your next experience is here
              </button>
            </div>
          </div>
          <picture>
            <img
              sizes="(max-width: 500px) 100vw, 500px"
              srcset="
            /images/food-example/food-example_z0l0l6_c_scale,w_200.webp 200w,
            /images/food-example/food-example_z0l0l6_c_scale,w_492.webp 492w,
            /images/food-example/food-example_z0l0l6_c_scale,w_500.webp 500w"
              src="/images/food-example/food-example_z0l0l6_c_scale,w_500.webp"
              alt="Your next favorite dish example"
              className="max-h-96 max-w-96 object-contain rounded-xl shadow-lg"
            />
          </picture>
        </div>
      </section>
      {/* TODO Aggiungere una selezione di ristoranti così da incuriosire il cliente */}
      <section className="container mx-auto px-3 py-10 mt-10">
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 md:gap-5">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-5 w-full">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="h-12 text-primary text-center"
              />
              <h2 className="text-2xl text-primary font-special">
                Quick book your table
              </h2>
            </div>
            <p className="max-w-96 text-center">
              Seize the moment, reserve your spot. Because the best
              conversations happen around the table.
            </p>
          </div>
          {/* <picture>
            <img
              sizes="(max-width: 1125px) 100vw, 1125px"
              srcset="
              /images/guys-at-the-table/guys-at-the-table_panj2g_c_scale,w_200.webp 200w,
              /images/guys-at-the-table/guys-at-the-table_panj2g_c_scale,w_719.webp 719w,
              /images/guys-at-the-table/guys-at-the-table_panj2g_c_scale,w_1109.webp 1109w,
              /images/guys-at-the-table/guys-at-the-table_panj2g_c_scale,w_1125.webp 1125w"
              src="/images/guys-at-the-table/guys-at-the-table_panj2g_c_scale,w_1125.webp"
              alt="Conversation's around the table"
              className="max-h-96 max-w-96 object-contain rounded-xl shadow-lg"
            />
          </picture> */}
          <picture>
            <img
              sizes="(max-width: 1400px) 100vw, 1400px"
              srcset="
            /images/tables/tables_u77kfd_c_scale,w_200.jpg 200w,
            /images/tables/tables_u77kfd_c_scale,w_352.jpg 352w,
            /images/tables/tables_u77kfd_c_scale,w_470.jpg 470w,
            /images/tables/tables_u77kfd_c_scale,w_658.jpg 658w,
            /images/tables/tables_u77kfd_c_scale,w_773.jpg 773w,
            /images/tables/tables_u77kfd_c_scale,w_849.jpg 849w,
            /images/tables/tables_u77kfd_c_scale,w_927.jpg 927w,
            /images/tables/tables_u77kfd_c_scale,w_998.jpg 998w,
            /images/tables/tables_u77kfd_c_scale,w_1056.jpg 1056w,
            /images/tables/tables_u77kfd_c_scale,w_1182.jpg 1182w,
            /images/tables/tables_u77kfd_c_scale,w_1244.jpg 1244w,
            /images/tables/tables_u77kfd_c_scale,w_1323.jpg 1323w,
            /images/tables/tables_u77kfd_c_scale,w_1390.jpg 1390w,
            /images/tables/tables_u77kfd_c_scale,w_1394.jpg 1394w,
            /images/tables/tables_u77kfd_c_scale,w_1400.jpg 1400w"
              src="/images/tables/tables_u77kfd_c_scale,w_1400.jpg"
              alt="Restaurant's tables"
              className="max-h-96 max-w-96 object-contain rounded-xl shadow-lg"
            />
          </picture>
        </div>
      </section>
    </>
  );
};

export default HomeView;
