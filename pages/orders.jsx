import React, { useState } from 'react';
import { getSession } from "next-auth/react";
import Layout from '../components/Layout';
import Head from 'next/head';
import ProfileMenu from '../components/ProfileMenu';
import { motion } from 'framer-motion';
import Protected from '../components/Protected';
import BreadCrumb from '../components/BreadCrumb';
import axios from 'axios';
import { Button, Tag } from 'antd';
import Image from 'next/image';
import { useGlobalContext } from '../Context/GlobalContext';


export const getServerSideProps = async (context) => {
    const { data } = await axios.get('https://reqres.in/api/users/2');
    const session = await getSession(context);
    let { name, email } = session;

    console.log({ name, email })

    return {
        props: {
            session: await getSession(context),
            user: data.data
        },
    }
}

const Index = ({ user }) => {

    const [orderType, setOrderType] = useState('currentOrder');
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
                            name: 'Home',
                            isLink: true,
                            link: '/'
                        },
                        {
                            name: 'Profile',
                            isLink: true,
                            link: '/profile'
                        },
                        {
                            name: 'Orders',
                            isLink: false,
                        },

                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 items-start mt-10">
                    <ProfileMenu user={user} />
                    <motion.div
                        animate={{ scale: 1 }}
                        initial={{ scale: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-2"
                    >
                        <div>
                            <h1 className="text-lg lg:text-3xl text-center text-purple-800 font-semibold">Orders</h1>
                            <div className='flex justify-center items-center mb-5'>
                                <Button size="large" className='mx-5' onClick={() => setOrderType('currentOrder')} type={orderType === 'currentOrder' ? 'primary' : 'default'}>Current Order</Button>
                                <Button size="large" className='mx-5' onClick={() => setOrderType('previousOrder')} type={orderType === 'previousOrder' ? 'primary' : 'default'}>Previous Order</Button>
                            </div>

                            {orderType === 'currentOrder' && (
                                <motion.div
                                    animate={{ scale: 1 }}
                                    initial={{ scale: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="md:mx-20 md:h-[35rem] overflow-auto"
                                >
                                    {cart && cart.map((cartItem, index) => (

                                        <div key={cartItem.name.split(' ').join('-') + '-' + index} className="flex my-3 w-full border rounded-sm shadow shadow-purple-300 px-3 py-5 justify-between">
                                            <div className='flex'>
                                                <div className="w-24 flex justify-center items-center mr-2">
                                                    <Image className="ml-auto" src={cartItem.images[0]} height={80} width={80} alt={cartItem.name} />
                                                </div>
                                                <div className='flex justify-between flex-col'>
                                                    <h1 className="text-base text-left line-clamp-2 mr-2">{cartItem.name}</h1>
                                                    <p className="text-base font-semibold text-purple-700 mb-0">
                                                        Price: {cartItem.price} x {cartItem.quantity} = <span className='text-lg'>{cartItem.price * cartItem.quantity}</span> <sup>BDT</sup>
                                                    </p>
                                                    <p className="text-base font-semibold text-purple-700 mb-0">
                                                        Shipping Charge: <span className='text-lg'>{cartItem.shippingCharge}</span> <sup>BDT</sup>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col justify-between items-end mb-0">
                                                <div className="float-right">
                                                    <Tag color="green">Processing</Tag>
                                                </div>
                                                <p className="text-base font-semibold text-gray-400 mb-0">
                                                    Shipping Charge: <span className='text-purple-800'> #123456</span>
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
    )
}

export default Index;