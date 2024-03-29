import React, { useEffect, useState } from "react";
import axios from "axios";
import MessagePreviewComp from "../../components/MessagePreviewComp";
import ReviewPreviewComp from "../../components/ReviewPreviewComp";
import { Link } from "react-router-dom";

const DashboardCondensedView = () => {
  const [data, setData] = useState({
    isLoading: true,
    messages: [],
    reviews: [],
    // orders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const url = new URL("https://65c3642539055e7482c0c4ba.mockapi.io/api/v1");
      try {
        const [res1, res2] = await Promise.all([
          axios.get(`${url}/message`),
          axios.get(`${url}/review`),
          // axios.get(`${url}/order`),
        ]);

        const latestMessages = res1.data.slice(0, 15);
        const latestReviews = res2.data.slice(0, 15);
        // const latestOrders = res3.data.slice(0, 15);

        setData({
          messages: [...latestMessages],
          reviews: [...latestReviews],
          // orders: [...latestOrders],
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
          <h2 className="font-special text-3xl text-secondary mt-8 lg:mt-0">
            Summary
          </h2>
        </div>
        <section className="lg:col-span-2 grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 px-3 py-5 overflow-hidden h-full">
          <article className="h-full overflow-hidden flex flex-col bg-tertiary rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3 px-2">
              Bookings
            </h2>
            <div className="h-full overflow-hidden">
              <div className="flex flex-col items-start justify-start gap-3 w-full h-full overflow-y-auto px-2 py-1">
                {!data.isLoading ? (
                  data.messages.length > 0 ? (
                    data.messages.map((msg) => {
                      return (
                        <MessagePreviewComp
                          key={msg.id}
                          data={msg}
                        />
                      );
                    })
                  ) : (
                    <h6 className="text-center px-5 py-3.5 text-lg font-bold bg-light w-full rounded-xl text-danger">
                      No messages here yet.
                    </h6>
                  )
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
            <Link
              to="/dashboard/bookings"
              className="px-3 py-2 text-accent underline underline-offset-2 hover:text-secondary transition-colors ease-in-out duration-200 w-max"
            >
              See more
            </Link>
          </article>
          <article className="h-full overflow-hidden flex flex-col bg-tertiary rounded-2xl p-3 lg:p-5">
            <h2 className="font-special text-3xl text-secondary mb-3 px-2 h-max">
              Reviews
            </h2>
            <div className="h-full overflow-hidden">
              <div className="flex flex-col items-start justify-start gap-3 w-full h-full overflow-y-auto px-2 py-1">
                {!data.isLoading ? (
                  data.reviews.length > 0 ? (
                    data.reviews.map((rev) => {
                      return (
                        <ReviewPreviewComp
                          key={rev.id}
                          data={rev}
                        />
                      );
                    })
                  ) : (
                    <h6 className="text-center px-5 py-3.5 text-lg font-bold bg-light w-full rounded-xl text-danger">
                      No reviews here yet.
                    </h6>
                  )
                ) : (
                  <>Loading</>
                )}
              </div>
            </div>
            <Link
              to="/dashboard/reviews"
              className="px-3 py-2 text-accent underline underline-offset-2 hover:text-secondary transition-colors ease-in-out duration-200 w-max"
            >
              See more
            </Link>
          </article>
        </section>
      </main>
    </>
  );
};

export default DashboardCondensedView;
