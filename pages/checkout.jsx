import Head from "next/head"
import Link from "next/link"
import Layout from "../components/Layout"
import Protected from "../components/Protected"
import { useEffect, useState } from 'react';
import { Modal, Form, Row, Button, Select, Col, Input, Radio, InputNumber, message, Result } from 'antd';
import { districts, divisions } from "../components/JSONdata";
const { Option } = Select;
import { nanoid } from 'nanoid'
import Image from "next/image";
import { useGlobalContext } from "../Context/GlobalContext";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import axios from "axios";

export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get('/carts');

    if (!data.length) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            cart: data
        },

    }
}

const Index = ({ cart }) => {

    const router = useRouter();
    // const { cart } = useGlobalContext();
    const [selectedAddress, setSelectedAddress] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [districtsOfDivision, setDistrictsOfDivision] = useState(districts);
    const [modalTitle, setModalTitle] = useState('Add New Address');
    const [isLoading, setIsLoading] = useState(false);
    const subTotal = (cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0))
    const shippingCharge = (cart && cart.reduce((acc, item) => acc + item.shippingCharge * item.quantity, 0))
    const [total, setTotal] = useState(subTotal + shippingCharge)
    const [address, setAddress] = useState([
        {
            id: nanoid(),
            address: `G3, New City Build, Ground Floor, Jumera Lake Lower`,
            addressType: "home",
            district: "Dhaka",
            division: "Dhaka",
            email: "johndoe@mail.com",
            name: "John Dane",
            phoneNumber: "01721123456"
        },
        {
            id: nanoid(),
            address: "G3, New City Build, Ground Floor, Jumera Lake Lower",
            addressType: "office",
            district: "Dhaka",
            division: "Dhaka",
            email: "johndoe@mail.com",
            name: "John Dane",
            phoneNumber: "01721654321"
        },
    ])

    const selectAddressHandler = (e) => {
        setSelectedAddress(e.target.value)
    }

    const saveNewAddress = async (values) => {

        setIsModalVisible(false);

        if (address.find(singleAddress => singleAddress.id === values.id)) {
            const index = address.findIndex(singleAddress => singleAddress.id === values.id);
            address[index] = values;
            setAddress([...address]);
        } else {

            values.id = nanoid();
            setAddress([...address, values]);
        }

    }

    const changeDivisionHandler = (value) => {
        let selectedDivision = divisions.find(division => division.name === value);
        setDistrictsOfDivision(districts.filter(district => district.division_id === selectedDivision.id));
    }

    let getDiscountAmountHandler = value => {
        if (isNaN(value)) {
            message.error('Please enter a valid number')
            value = 0;
        } else {
            let discountValue = (total * (value / 100)).toFixed(2);
            setDiscountAmount(discountValue)
            setTotal(((subTotal + shippingCharge) - (discountValue)).toFixed(2))
        }
    }

    let payNowHandler = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsPaymentModalOpen(true);
        }, 3000);
    }

    return (
        <Protected>
            <Layout>
                <Head>
                    <title>Perfume Shop - Checkout</title>
                </Head>

                {/* add new address */}
                <Modal
                    title={<h1 className="mb-0 text-2xl text-purple-800 font-semibold">{modalTitle}</h1>}
                    onCancel={() => setIsModalVisible(false)}
                    visible={isModalVisible}
                    footer={null}>
                    <Form
                        name="basic"
                        onFinish={saveNewAddress}
                        initialValues={Object.keys(selectedAddress).length > 0 ? selectedAddress : {
                            id: nanoid(),
                        }}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Row gutter={[5, 5]}>

                            <Form.Item
                                name="id"
                                hidden
                                className="mb-4"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input className="w-full" placeholder="Name" size="large" />
                            </Form.Item>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Name</h1>}
                                    name="name"
                                    className="mb-4"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input className="w-full" placeholder="Name" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Email</h1>}
                                    name="email"
                                    className="mb-4"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                >
                                    <Input className="w-full" placeholder="Email" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Phone Number</h1>}
                                    name="phoneNumber"
                                    className="mb-4"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input className="w-full" placeholder="Phone Number" size="large" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Address Type</h1>}
                                    name="addressType"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Select address type"
                                        allowClear
                                    >
                                        <Option value="home">Home</Option>
                                        <Option value="office">Office</Option>
                                        <Option value="others">others</Option>
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Division</h1>}
                                    name="division"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your division!'
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Select division"
                                        onChange={changeDivisionHandler}
                                        allowClear
                                    >
                                        {divisions.map((division, index) => (
                                            <Option key={division.name} value={division.name}>{division.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">District</h1>}
                                    name="district"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your district!'
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Select district"
                                        allowClear
                                    >
                                        {districtsOfDivision.map((district, index) => (
                                            <Option key={district.name} value={district.name}>{district.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <Form.Item
                                    label={<h1 className="text-base mb-0">Address</h1>}
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your address!'
                                        },
                                    ]}
                                >
                                    <Input.TextArea size="large" placeholder="Address" autoSize={{ minRows: 2, maxRows: 6 }} />
                                </Form.Item>
                            </Col>

                            <Col xs={24}>
                                <div className="flex justify-end items-center">
                                    <Button type="default" className="mr-5" onClick={() => setIsModalVisible(false)} size="large">
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit" size="large">
                                        Save
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal>

                {/* payment modal */}
                <Modal
                    title={<h1 className="mb-0 text-2xl text-purple-800 font-semibold">Payment Success</h1>}
                    onCancel={() => router.push('/')}
                    visible={isPaymentModalOpen}
                    footer={null}
                >
                    <Result
                        status="success"
                        title={
                            <div className="text-center">
                                <h1 className="text-lg lg:text-3xl font-bold text-purple-800">Thank You</h1>
                            </div>
                        }
                        subTitle={
                            <div className="text-center">
                                <p className="text-sm text-gray-400">Your order has been placed</p>
                                <p className="text-lg text-black font-bold">Invoice Number:  <span className="bg-purple-800 p-1 text-white">#SC124535</span> </p>
                            </div>
                        }
                        extra={[
                            <Button type="primary" key="console">
                                Back to homepage
                            </Button>,
                            <Button key="buy">Track your order</Button>,
                        ]}
                    />
                </Modal>

                <div className="container mx-auto py-5 xl:py-10">
                    <div className="flex items-center text-base font-semibold">
                        <Link href="/">
                            <a className=" text-gray-500 hover:text-black normal-transition">
                                Home
                            </a>
                        </Link>
                        <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
                        <p className=" text-gray-500 truncate mb-0">Cart</p>
                        <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
                        <p className=" text-purple-800 truncate mb-0">Checkout</p>
                    </div>

                    <h1 className="text-lg lg:text-3xl text-center text-purple-800 font-semibold">Checkout</h1>

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="col-span-2">
                            <div className="flex items-center justify-between mb-5">
                                <h1 className="text-2xl font-semibold text-purple-800 mb-0">Shipping To</h1>
                                <i className="bi bi-plus-square-fill text-purple-800 cursor-pointer text-2xl hover:text-purple-600 normal-transition"
                                    onClick={() => {
                                        setIsModalVisible(!isModalVisible);
                                        setSelectedAddress({});
                                        setModalTitle('Add New Address');
                                    }}></i>
                            </div>
                            <Radio.Group onChange={selectAddressHandler} className="w-full">
                                {address.map((singleAddress) => (
                                    <Radio key={singleAddress.id} onClick={() => setSelectedAddress(singleAddress)} value={singleAddress} className={`border relative rounded-md w-full p-5 mb-5 ${selectedAddress.id === singleAddress.id ? 'shadow-lg bg-gray-100' : ''}`}>
                                        <div className="grid grid-cols-1 lg:grid-cols-3">
                                            <div>
                                                <h1 className="text-xl font-semibold text-purple-800 mb-0">{singleAddress.addressType.toUpperCase()}</h1>
                                                <h2 className="text-lg mb-0">{singleAddress.name}</h2>
                                                <div className="flex  mt-1 items-start justify-between w-full">
                                                    <Image className="w-full" src="/location-icon-black.png" width={22} height={25} alt="location-img" />
                                                    <address className="text-sm text-gray-400 ml-1 -mt-1 font-semibold ">
                                                        <i>
                                                            {singleAddress.address}, {singleAddress.division}, {singleAddress.district}
                                                        </i>
                                                    </address>
                                                </div>
                                            </div>
                                            <div className="flex items-center text-center w-full">
                                                <Image height={15} width={15} src="/call-icon-black.png" alt="call" />
                                                <a href={`tel:${singleAddress.phoneNumber}`} className="text-sm text-gray-400 font-semibold ml-1">
                                                    {singleAddress.phoneNumber}
                                                </a>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setIsModalVisible(true)
                                                    setModalTitle('Update selected address')
                                                }}
                                                className="absolute top-4 right-4">
                                                <i className="bi bi-pencil-square px-2 py-1.5 hover:text-white text-lg rounded-full bg-white hover:bg-purple-400 normal-transition"></i>
                                            </div>
                                        </div>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>

                        <div>
                            <div className="border rounded-lg shadow">
                                <div className="my-5 mx-8">
                                    <h1 className="mb-4 text-bold text-purple-800 text-2xl">Summary</h1>
                                    <hr className="bg-purple-500 mb-4" />
                                    <div className="flex justify-between items-center">
                                        <p className="text-base text-gray-500 font-semibold mb-1">Subtotal</p>
                                        <p className="text-lg lg:text-2xl text-purple-800 mb-1">
                                            <span className="font-semibold">
                                                {subTotal}
                                            </span>
                                            <sup className="text-xs font-normal ml-1">BDT</sup>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-base text-gray-500 font-semibold mb-1">Shipping Charges</p>
                                        <p className="text-lg lg:text-2xl text-purple-800 mb-1">
                                            <span className="font-semibold">
                                                {shippingCharge}
                                            </span>
                                            <sup className="text-xs font-normal ml-1">BDT</sup>
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 items-end gap-4">
                                        <div className="col-span-2">
                                            <p className="text-base text-gray-500 font-semibold mb-1">Discount</p>
                                            <div className="flex items-center justify-between">
                                                <InputNumber size="large" className="w-3/4" min={0} defaultValue={0} onChange={getDiscountAmountHandler} />
                                                {/* <Button size="large" className="ml-2" type="primary" onClick={discountHandler}>Apply</Button> */}
                                            </div>
                                        </div>
                                        <p className="text-lg lg:text-2xl text-purple-800 mb-1 text-right">
                                            <span className="font-semibold">
                                                {discountAmount}
                                            </span>
                                            <sup className="text-xs font-normal ml-1">BDT</sup>
                                        </p>
                                    </div>

                                </div>

                                <div className="py-5 px-8 bg-gray-100">
                                    <div className="flex justify-between items-center">
                                        <p className="text-xl text-gray-500 font-semibold mb-1">Total payable amount</p>
                                        <p className="text-lg lg:text-2xl text-purple-800 mb-1">
                                            <span className="font-semibold">
                                                {total}
                                            </span>
                                            <sup className="text-xs font-normal ml-1">BDT</sup>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-5 px-8 border rounded-lg shadow mt-3">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-semibold">Payment Method</h1>
                                    <a href="#">
                                        <Button type="primary" size="large">Add Card</Button>
                                    </a>
                                </div>
                                <hr className="bg-gray-200 my-3" />
                                <Radio.Group name="radiogroup" defaultValue={1}>
                                    <Radio value={'masterCard'} className="text-base ml-2 mb-2 font-medium cursor-pointer">
                                        Master Card - XXXX- 2345
                                    </Radio>
                                    <Radio value={'visa'} className="text-base ml-2 mb-2 font-medium cursor-pointer">
                                        Visa Card - XXXX- 2345
                                    </Radio>
                                </Radio.Group>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-5">
                                <Button type="primary" size="large" loading={isLoading} onClick={payNowHandler} className="w-full">Pay Now</Button>
                                <Button type="default" size="large" className="w-full">Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </Protected>
    )

}

export default Index