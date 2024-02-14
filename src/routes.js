import React from "react";

import HomeView from "./screen/HomeView";
import RestaurantsView from "./screen/RestaurantsView";
import SingleRestaurantView from "./screen/SingleRestaurantView";
import DashboardView from "./screen/dashboard/DashboardView";
import ErrorView from "./screen/ErrorView";
import MeView from "./screen/dashboard/MeView";
import MenuView from "./screen/dashboard/MenuView";
import BookingsView from "./screen/dashboard/BookingsView";
import ReviewView from "./screen/dashboard/ReviewView";
import OrdersView from "./screen/dashboard/OrdersView";
import HelpView from "./screen/dashboard/HelpView";
import DashboardCondensedView from "./screen/dashboard/DashboardCondensedView";

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
    path: "/restaurants/:id",
    element: <SingleRestaurantView />,
  },
  {
    path: "/dashboard",
    element: <DashboardView />,
    children: [
      {
        path: "",
        element: <DashboardCondensedView />,
      },
      {
        path: "me",
        element: <MeView />,
      },
      {
        path: "menu",
        element: <MenuView />,
      },
      {
        path: "bookings",
        element: <BookingsView />,
      },
      {
        path: "reviews",
        element: <ReviewView />,
      },
      {
        path: "orders",
        element: <OrdersView />,
      },
      {
        path: "help",
        element: <HelpView />,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorView />,
  },
];

export default routes;
