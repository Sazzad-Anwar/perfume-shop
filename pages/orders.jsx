import React, { useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Head from "next/head";
import ProfileMenu from "../components/ProfileMenu";
import { motion } from "framer-motion";
import Protected from "../components/Protected";
import BreadCrumb from "../components/BreadCrumb";
import axios from "axios";
import { Button, Tag } from "antd";
import Image from "next/image";
import { useGlobalContext } from "../Context/GlobalContext";

export const getServerSideProps = async (context) => {
  const { data } = await axios.get("https://reqres.in/api/users/2");
  const session = await getSession(context);
  let { name, email } = session;

  console.log({ name, email });

  return {
    props: {
      session: await getSession(context),
      user: data.data,
    },
  };
};

const Index = ({ user }) => {
  const [orderType, setOrderType] = useState("currentOrder");
  const { cart } = useGlobalContext();

  return (
    <Layout>
      <Head>
        <title>Perfume Shop - Orders</title>
      </Head>
      <Protected className="container mx-auto py-5 xl:py-10">
        <BreadCrumb
          breadCrumbs={[
            {
              name: "Home",
              isLink: true,
              link: "/",
            },
            {
              name: "Profile",
              isLink: true,
              link: "/profile",
            },
            {
              name: "Orders",
              isLink: false,
            },
          ]}
        />

        <div className="mt-10 grid grid-cols-1 items-start lg:grid-cols-3">
          <ProfileMenu user={user} />
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2"
          >
            <div>
              <h1 className="text-center text-lg font-semibold text-purple-800 lg:text-3xl">
                Orders
              </h1>
              <div className="mb-5 flex items-center justify-center">
                <Button
                  size="large"
                  className="mx-5"
                  onClick={() => setOrderType("currentOrder")}
                  type={orderType === "currentOrder" ? "primary" : "default"}
                >
                  Current Order
                </Button>
                <Button
                  size="large"
                  className="mx-5"
                  onClick={() => setOrderType("previousOrder")}
                  type={orderType === "previousOrder" ? "primary" : "default"}
                >
                  Previous Order
                </Button>
              </div>

              {orderType === "currentOrder" && (
                <motion.div
                  animate={{ scale: 1 }}
                  initial={{ scale: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-auto md:mx-20 md:h-[35rem]"
                >
                  {cart &&
                    cart.map((cartItem, index) => (
                      <div
                        key={cartItem.name.split(" ").join("-") + "-" + index}
                        className="my-3 flex w-full justify-between rounded-sm border px-3 py-5 shadow shadow-purple-300"
                      >
                        <div className="flex">
                          <div className="mr-2 flex w-24 items-center justify-center">
                            <Image
                              className="ml-auto"
                              src={cartItem.images[0]}
                              height={80}
                              width={80}
                              alt={cartItem.name}
                            />
                          </div>
                          <div className="flex flex-col justify-between">
                            <h1 className="mr-2 text-left text-base line-clamp-2">
                              {cartItem.name}
                            </h1>
                            <p className="mb-0 text-base font-semibold text-purple-700">
                              Price: {cartItem.price} x {cartItem.quantity} ={" "}
                              <span className="text-lg">
                                {cartItem.price * cartItem.quantity}
                              </span>{" "}
                              <sup>BDT</sup>
                            </p>
                            <p className="mb-0 text-base font-semibold text-purple-700">
                              Shipping Charge:{" "}
                              <span className="text-lg">
                                {cartItem.shippingCharge}
                              </span>{" "}
                              <sup>BDT</sup>
                            </p>
                          </div>
                        </div>

                        <div className="mb-0 flex flex-col items-end justify-between">
                          <div className="float-right">
                            <Tag color="green">Processing</Tag>
                          </div>
                          <p className="mb-0 text-base font-semibold text-gray-400">
                            Shipping Charge:{" "}
                            <span className="text-purple-800"> #123456</span>
                          </p>
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </Protected>
    </Layout>
  );
};

export default Index;
