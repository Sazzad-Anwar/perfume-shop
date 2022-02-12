import Protected from "../components/Protected"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import Layout from './../components/Layout';
import axios from "axios";
import Head from 'next/head'
import BreadCrumb from "../components/BreadCrumb";
import ProfileMenu from "../components/ProfileMenu";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Input, Row, Upload, message } from 'antd';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

export const getServerSideProps = async (ctx) => {
    const { data } = await axios.get('https://reqres.in/api/users/2');
    return {
        props: {
            user: data.data
        }
    }
}

const Profile = ({ user }) => {

    const authentication = useSession();
    const router = useRouter();

    const onFinish = async (values) => {
        console.log(values)
    }

    // photo upload props
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {

            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Layout>
            <Head>
                <title>Profile - {user.first_name} {user.last_name}</title>
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
                            name: user.first_name + ' ' + user.last_name,
                            isLink: false,
                            link: ''
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
                            <h1 className="text-lg lg:text-3xl text-center text-purple-800 font-semibold">My Profile</h1>
                            <Form
                                name="registration"
                                initialValues={{
                                    name: user.first_name + ' ' + user.last_name,
                                    email: user.email,
                                    phone: '01712123456',
                                }}
                                onFinish={onFinish}
                                layout="vertical"
                                autoComplete="off"
                                className="w-4/5 mx-auto"
                            >
                                <Row gutter={[15, 10]}>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Name</h1>}
                                            name="name"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input allowClear className="w-full" placeholder="Name" size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Email</h1>}
                                            name="email"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input allowClear type={"email"} className="w-full" placeholder="Name" size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Phone Number</h1>}
                                            name="phone"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input allowClear type={"tel"} className="w-full" placeholder="Name" size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Upload Image</h1>}
                                            className="mb-4 customUpload"
                                        >
                                            <Upload {...props} className="flex items-center justify-between flex-row-reverse border pl-3">
                                                <Button size="large" icon={<UploadOutlined />}>Select Image</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Password</h1>}
                                            name="password"
                                            className="mb-4"
                                        >
                                            <Input.Password allowClear className="w-full" placeholder="******" size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            label={<h1 className="text-base font-semibold mb-0">Confirm Password</h1>}
                                            name="confirmPassword"
                                            className="mb-4"
                                        >
                                            <Input.Password allowClear className="w-full" placeholder="******" size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} lg={12} />
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item className="mb-4">
                                            <Button type="primary" htmlType="submit" className="text-right float-right" size="large">
                                                Update Profile
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </motion.div>
                </div>
            </Protected>
        </Layout>
    )
}

export default Profile
