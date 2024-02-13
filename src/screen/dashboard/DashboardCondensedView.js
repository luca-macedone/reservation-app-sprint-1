import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="w-full text-end border-b-[3px] pb-4 border-secondary">
        <h2 className="font-special text-3xl text-secondary">Summary</h2>
      </div>
      <main className="grid grid-flow-row-dense grid-cols-1 lg:grid-cols-2 gap-5 max-h-full py-5">
        <section className="h-full bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
          <h2>Messages</h2>

          <div className="overflow-y-auto h-full">
            {!data.isLoading ? (
              data.messages.map((msg) => {
                return <div key={msg.id}>{msg.name}</div>;
              })
            ) : (
              <>Loading</>
            )}
          </div>
        </section>
        <section className="h-full bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
          <h2>Reviews</h2>

          <div className="overflow-y-auto h-full">
            {!data.isLoading ? (
              data.reviews.map((rev) => {
                return <div key={rev.id}>{rev.name}</div>;
              })
            ) : (
              <>Loading</>
            )}
          </div>
        </section>
        <section className="col-span-1 lg:col-span-2 h-full bg-tertiary shadow-lg rounded-2xl p-3 lg:p-5">
          <h2>Orders</h2>

          <div className="overflow-y-auto h-full">
            {!data.isLoading ? (
              data.orders.map((ord) => {
                return <div key={ord.id}>{ord.name}</div>;
              })
            ) : (
              <>Loading</>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardCondensedView;
