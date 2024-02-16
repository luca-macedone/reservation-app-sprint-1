import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagePreviewComp from "../../components/MessagePreviewComp";
import ReviewPreviewComp from "../../components/ReviewPreviewComp";
// import OrderPreviewComp from "../../components/OrderPreviewComp";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";

const DashboardCondensedView = () => {
  const [data, setData] = useState({
    isLoading: true,
    messages: [],
    reviews: [],
    orders: [],
  });

  // const checkOrderStatus = () => {
  //   let counter = 0;
  //   data.orders.forEach((order) => {
  //     if (!order.done) {
  //       counter++;
  //     }
  //   });

  //   return counter;
  // };

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL("https://65c3642539055e7482c0c4ba.mockapi.io/api/v1");
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get(`${url}/message`),
          axios.get(`${url}/review`),
          axios.get(`${url}/order`),
        ]);

        const latestMessages = res1.data.slice(0, 15);
        const latestReviews = res2.data.slice(0, 15);
        const latestOrders = res3.data.slice(0, 15);

        setData({
          messages: [...latestMessages],
          reviews: [...latestReviews],
          orders: [...latestOrders],
          isLoading: false,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="lg:pb-5 lg:h-full">
        <div className="w-full text-end border-secondary px-8">
          <h2 className="font-special text-3xl text-secondary">Summary</h2>
        </div>
        <section className="lg:col-span-2 grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 px-3 py-5 overflow-hidden h-full">
          <article className="h-full overflow-hidden flex flex-col bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3 px-2">
              Bookings
            </h2>
            <div className="h-full overflow-hidden">
              <div className="flex flex-col items-start justify-start gap-3 w-full h-full overflow-y-auto px-2 py-1">
                {!data.isLoading ? (
                  data.messages.map((msg) => {
                    return <MessagePreviewComp data={msg} />;
                  })
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
          </article>
          <article className="h-full overflow-hidden flex flex-col bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3 px-2 h-max">
              Reviews
            </h2>
            <div className="h-full overflow-hidden">
              <div className="flex flex-col items-start justify-start gap-3 w-full h-full overflow-y-auto px-2 py-1">
                {!data.isLoading ? (
                  data.reviews.map((rev) => {
                    return <ReviewPreviewComp data={rev} />;
                  })
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
          </article>
          {/* <article className="h-[100%] max-h-[100%] col-span-1 lg:col-span-2 bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <div className="mb-3 w-full flex items-end justify-between px-2">
              <h2 className="font-special text-3xl text-secondary w-max">
                Orders
              </h2>
              <div className="flex items-center">
                <strong className="hidden lg:inline-block">Delivering:</strong>
                <FontAwesomeIcon
                  icon={faHourglassHalf}
                  className="text-2xl text-secondary lg:hidden"
                />
                <span className="text-3xl font-bold ms-4">
                  {checkOrderStatus()}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start gap-3 w-full h-48 overflow-y-auto px-2 py-1">
              {!data.isLoading ? (
                data.orders.map((ord) => {
                  return <OrderPreviewComp data={ord} />;
                })
              ) : (
                <>Loading</>
              )}
            </div>
          </article> */}
        </section>
      </main>
    </>
  );
};

export default DashboardCondensedView;
