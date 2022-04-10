import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import Protected from "../components/Protected";
import { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Row,
  Button,
  Select,
  Col,
  Input,
  Radio,
  InputNumber,
  message,
  Result,
} from "antd";
import { districts, divisions } from "../components/JSONdata";
const { Option } = Select;
import { nanoid } from "nanoid";
import Image from "next/image";
import { useGlobalContext } from "../Context/GlobalContext";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import axios from "axios";
import { CLEAR_CART } from "../Context/Constants/CartConstants";

export const getServerSideProps = async () => {
  const { data } = await axios.get("/carts");

  if (!data.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      // cart: data
    },
  };
};

const Index = ({}) => {
  const router = useRouter();
  const { cart, cartDispatch } = useGlobalContext();
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [districtsOfDivision, setDistrictsOfDivision] = useState(districts);
  const [modalTitle, setModalTitle] = useState("Add New Address");
  const [isLoading, setIsLoading] = useState(false);
  const subTotal =
    cart && cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharge =
    cart &&
    cart.reduce((acc, item) => acc + item.shippingCharge * item.quantity, 0);
  const [total, setTotal] = useState(subTotal + shippingCharge);
  const [address, setAddress] = useState([
    {
      id: nanoid(),
      address: `G3, New City Build, Ground Floor, Jumera Lake Lower`,
      addressType: "home",
      district: "Dhaka",
      division: "Dhaka",
      email: "johndoe@mail.com",
      name: "John Dane",
      phoneNumber: "01721123456",
    },
    {
      id: nanoid(),
      address: "G3, New City Build, Ground Floor, Jumera Lake Lower",
      addressType: "office",
      district: "Dhaka",
      division: "Dhaka",
      email: "johndoe@mail.com",
      name: "John Dane",
      phoneNumber: "01721654321",
    },
  ]);

  const selectAddressHandler = (e) => {
    setSelectedAddress(e.target.value);
  };

  const saveNewAddress = async (values) => {
    setIsModalVisible(false);

    if (address.find((singleAddress) => singleAddress.id === values.id)) {
      const index = address.findIndex(
        (singleAddress) => singleAddress.id === values.id
      );
      address[index] = values;
      setAddress([...address]);
    } else {
      values.id = nanoid();
      setAddress([...address, values]);
    }
  };

  const changeDivisionHandler = (value) => {
    let selectedDivision = divisions.find(
      (division) => division.name === value
    );
    setDistrictsOfDivision(
      districts.filter(
        (district) => district.division_id === selectedDivision.id
      )
    );
  };

  let getDiscountAmountHandler = (value) => {
    if (isNaN(value)) {
      message.error("Please enter a valid number");
      value = 0;
    } else {
      let discountValue = (total * (value / 100)).toFixed(2);
      setDiscountAmount(discountValue);
      setTotal((subTotal + shippingCharge - discountValue).toFixed(2));
    }
  };

  let payNowHandler = () => {
    setIsLoading(true);
    cartDispatch({
      type: CLEAR_CART,
    });
    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentModalOpen(true);
    }, 3000);
  };

  return (
    <Protected>
      <Layout>
        <Head>
          <title>Perfume Shop - Checkout</title>
        </Head>

        {/* add new address */}
        <Modal
          title={
            <h1 className="mb-0 text-2xl font-semibold text-purple-800">
              {modalTitle}
            </h1>
          }
          onCancel={() => setIsModalVisible(false)}
          visible={isModalVisible}
          footer={null}
        >
          <Form
            name="basic"
            onFinish={saveNewAddress}
            initialValues={
              Object.keys(selectedAddress).length > 0
                ? selectedAddress
                : {
                    id: nanoid(),
                  }
            }
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[5, 5]}>
              <Form.Item
                name="id"
                hidden
                className="mb-4"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input className="w-full" placeholder="Name" size="large" />
              </Form.Item>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">Name</h1>}
                  name="name"
                  className="mb-4"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input className="w-full" placeholder="Name" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">Email</h1>}
                  name="email"
                  className="mb-4"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="w-full" placeholder="Email" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">Phone Number</h1>}
                  name="phoneNumber"
                  className="mb-4"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    className="w-full"
                    placeholder="Phone Number"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">Address Type</h1>}
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
                  label={<h1 className="mb-0 text-base">Division</h1>}
                  name="division"
                  rules={[
                    {
                      required: true,
                      message: "Please select your division!",
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
                      <Option key={division.name} value={division.name}>
                        {division.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">District</h1>}
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Please select your district!",
                    },
                  ]}
                >
                  <Select size="large" placeholder="Select district" allowClear>
                    {districtsOfDivision.map((district, index) => (
                      <Option key={district.name} value={district.name}>
                        {district.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label={<h1 className="mb-0 text-base">Address</h1>}
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please input your address!",
                    },
                  ]}
                >
                  <Input.TextArea
                    size="large"
                    placeholder="Address"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <div className="flex items-center justify-end">
                  <Button
                    type="default"
                    className="mr-5"
                    onClick={() => setIsModalVisible(false)}
                    size="large"
                  >
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
          title={
            <h1 className="mb-0 text-2xl font-semibold text-purple-800">
              Payment Success
            </h1>
          }
          onCancel={() => router.push("/")}
          visible={isPaymentModalOpen}
          footer={null}
        >
          <Result
            status="success"
            title={
              <div className="text-center">
                <h1 className="text-lg font-bold text-purple-800 lg:text-3xl">
                  Thank You
                </h1>
              </div>
            }
            subTitle={
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Your order has been placed
                </p>
                <p className="text-lg font-bold text-black">
                  Invoice Number:{" "}
                  <span className="bg-purple-800 p-1 text-white">
                    #SC124535
                  </span>{" "}
                </p>
              </div>
            }
            extra={[
              <Link key="backToHome" href="/">
                <a>
                  <Button type="primary">Back to homepage</Button>
                </a>
              </Link>,
              <Link key="trackOrder" href="/track-order">
                <a>
                  <Button type="default">Track your order</Button>
                </a>
              </Link>,
            ]}
          />
        </Modal>

        <div className="container mx-auto py-5 xl:py-10">
          <div className="flex items-center text-base font-semibold">
            <Link href="/">
              <a className=" normal-transition text-gray-500 hover:text-black">
                Home
              </a>
            </Link>
            <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
            <p className=" mb-0 truncate text-gray-500">Cart</p>
            <i className="bi bi-chevron-compact-right mx-3 text-gray-500"></i>
            <p className=" mb-0 truncate text-purple-800">Checkout</p>
          </div>

          <h1 className="text-center text-lg font-semibold text-purple-800 lg:text-3xl">
            Checkout
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <h1 className="mb-0 text-2xl font-semibold text-purple-800">
                  Shipping To
                </h1>
                <i
                  className="bi bi-plus-square-fill normal-transition cursor-pointer text-2xl text-purple-800 hover:text-purple-600"
                  onClick={() => {
                    setIsModalVisible(!isModalVisible);
                    setSelectedAddress({});
                    setModalTitle("Add New Address");
                  }}
                ></i>
              </div>
              <Radio.Group onChange={selectAddressHandler} className="w-full">
                {address.map((singleAddress) => (
                  <Radio
                    key={singleAddress.id}
                    onClick={() => setSelectedAddress(singleAddress)}
                    value={singleAddress}
                    className={`relative mb-5 w-full rounded-md border p-5 ${
                      selectedAddress.id === singleAddress.id
                        ? "bg-gray-100 shadow-lg"
                        : ""
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      <div>
                        <h1 className="mb-0 text-xl font-semibold text-purple-800">
                          {singleAddress.addressType.toUpperCase()}
                        </h1>
                        <h2 className="mb-0 text-lg">{singleAddress.name}</h2>
                        <div className="mt-1  flex w-full items-start justify-between">
                          <Image
                            className="w-full"
                            src="/location-icon-black.png"
                            width={22}
                            height={25}
                            alt="location-img"
                          />
                          <address className="ml-1 -mt-1 text-sm font-semibold text-gray-400 ">
                            <i>
                              {singleAddress.address}, {singleAddress.division},{" "}
                              {singleAddress.district}
                            </i>
                          </address>
                        </div>
                      </div>
                      <div className="flex w-full items-center text-center">
                        <Image
                          height={15}
                          width={15}
                          src="/call-icon-black.png"
                          alt="call"
                        />
                        <a
                          href={`tel:${singleAddress.phoneNumber}`}
                          className="ml-1 text-sm font-semibold text-gray-400"
                        >
                          {singleAddress.phoneNumber}
                        </a>
                      </div>
                      <div
                        onClick={() => {
                          setIsModalVisible(true);
                          setModalTitle("Update selected address");
                        }}
                        className="absolute top-4 right-4"
                      >
                        <i className="bi bi-pencil-square normal-transition rounded-full bg-white px-2 py-1.5 text-lg hover:bg-purple-400 hover:text-white"></i>
                      </div>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <div>
              <div className="rounded-lg border shadow">
                <div className="my-5 mx-8">
                  <h1 className="text-bold mb-4 text-2xl text-purple-800">
                    Summary
                  </h1>
                  <hr className="mb-4 bg-purple-500" />
                  <div className="flex items-center justify-between">
                    <p className="mb-1 text-base font-semibold text-gray-500">
                      Subtotal
                    </p>
                    <p className="mb-1 text-lg text-purple-800 lg:text-2xl">
                      <span className="font-semibold">{subTotal}</span>
                      <sup className="ml-1 text-xs font-normal">BDT</sup>
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="mb-1 text-base font-semibold text-gray-500">
                      Shipping Charges
                    </p>
                    <p className="mb-1 text-lg text-purple-800 lg:text-2xl">
                      <span className="font-semibold">{shippingCharge}</span>
                      <sup className="ml-1 text-xs font-normal">BDT</sup>
                    </p>
                  </div>
                  <div className="grid grid-cols-3 items-end gap-4">
                    <div className="col-span-2">
                      <p className="mb-1 text-base font-semibold text-gray-500">
                        Discount
                      </p>
                      <div className="flex items-center justify-between">
                        <InputNumber
                          size="large"
                          className="w-3/4"
                          min={0}
                          defaultValue={0}
                          onChange={getDiscountAmountHandler}
                        />
                        {/* <Button size="large" className="ml-2" type="primary" onClick={discountHandler}>Apply</Button> */}
                      </div>
                    </div>
                    <p className="mb-1 text-right text-lg text-purple-800 lg:text-2xl">
                      <span className="font-semibold">{discountAmount}</span>
                      <sup className="ml-1 text-xs font-normal">BDT</sup>
                    </p>
                  </div>
                </div>

                <div className="bg-gray-100 py-5 px-8">
                  <div className="flex items-center justify-between">
                    <p className="mb-1 text-xl font-semibold text-gray-500">
                      Total payable amount
                    </p>
                    <p className="mb-1 text-lg text-purple-800 lg:text-2xl">
                      <span className="font-semibold">{total}</span>
                      <sup className="ml-1 text-xs font-normal">BDT</sup>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-lg border py-5 px-8 shadow">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-semibold">Payment Method</h1>
                  <a href="#">
                    <Button type="primary" size="large">
                      Add Card
                    </Button>
                  </a>
                </div>
                <hr className="my-3 bg-gray-200" />
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio
                    value={"masterCard"}
                    className="ml-2 mb-2 cursor-pointer text-base font-medium"
                  >
                    Master Card - XXXX- 2345
                  </Radio>
                  <Radio
                    value={"visa"}
                    className="ml-2 mb-2 cursor-pointer text-base font-medium"
                  >
                    Visa Card - XXXX- 2345
                  </Radio>
                </Radio.Group>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <Button
                  type="primary"
                  size="large"
                  loading={isLoading}
                  onClick={payNowHandler}
                  className="w-full"
                >
                  Pay Now
                </Button>
                <Button type="default" size="large" className="w-full">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Protected>
  );
};

export default Index;
