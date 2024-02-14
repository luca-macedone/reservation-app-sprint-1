import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagePreviewComp from "../../components/MessagePreviewComp";
import ReviewPreviewComp from "../../components/ReviewPreviewComp";
import OrderPreviewComp from "../../components/OrderPreviewComp";

const DashboardCondensedView = () => {
  const [data, setData] = useState({
    isLoading: true,
    messages: [],
    reviews: [],
    orders: [],
  });

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
      } finally {
        // setData({ ...data, isLoading: false });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 lg:pb-5 lg:h-full">
        <div className="w-full text-end border-secondary col-span-2 lg:col-span-2 px-8 pt-5">
          <h2 className="font-special text-3xl text-secondary">Summary</h2>
        </div>
        <section className="lg:col-span-2 grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 px-3 py-5 overflow-y-auto">
          <article className="h-[100%] max-h-[100%] bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3">
              Bookings
            </h2>

            <div className="flex flex-col items-start justify-start gap-3 w-full h-96 overflow-y-auto px-2 py-1">
              {!data.isLoading ? (
                data.messages.map((msg) => {
                  return <MessagePreviewComp data={msg} />;
                })
              ) : (
                <>Loading</>
              )}
            </div>
          </article>
          <article className="h-[100%] max-h-[100%] bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3">
              Reviews
            </h2>

            <div className="flex flex-col items-start justify-start gap-3 w-full h-96 overflow-y-auto px-2 py-1">
              {!data.isLoading ? (
                data.reviews.map((rev) => {
                  return <ReviewPreviewComp data={rev} />;
                })
              ) : (
                <>Loading</>
              )}
            </div>
          </article>
          <article className="h-[100%] max-h-[100%] col-span-1 lg:col-span-2 bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3">
              Orders
            </h2>

            <div className="flex flex-col items-start justify-start gap-3 w-full h-48 overflow-y-auto px-2 py-1">
              {!data.isLoading ? (
                data.orders.map((ord) => {
                  return <OrderPreviewComp data={ord} />;
                })
              ) : (
                <>Loading</>
              )}
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default DashboardCondensedView;
