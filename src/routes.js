import React from "react";

import HomeView from "./screen/HomeView";
import RestaurantsView from "./screen/RestaurantsView";
import SingleRestaurantView from "./screen/SingleRestaurantView";
import DashboardView from "./screen/DashboardView";
import ErrorView from "./screen/ErrorView";

const routes = [
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/restaurants",
    element: <RestaurantsView />,
  },
  {
    path: "/restaurant/:id",
    element: <SingleRestaurantView />,
  },
  {
    path: "/me",
    element: <DashboardView />,
  },
  {
    path: "/*",
    element: <ErrorView />,
  },
];

export default routes;
