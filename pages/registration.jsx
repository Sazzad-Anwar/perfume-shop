import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Layout from './../components/Layout';
import { motion } from 'framer-motion'
import { message, Form, Input, Button, Checkbox, Row, Col } from 'antd';
import Image from 'next/image';
import Link from 'next/link';

const Index = () => {

    const authentication = useSession();
    const router = useRouter();

    const onFinish = async (values) => {
        let { email, password, name, phoneNumber, invitationCode, confirmPassword } = values;
        if (email !== '' && password !== '' && name !== '' && phoneNumber !== '' && password !== '' && confirmPassword !== '') {

            if (password !== confirmPassword) {
                message.error('Passwords not matched')
            } else {

                let { error } = await signIn('credentials', {
                    email: email,
                    password: password,
                    redirect: false
                })

                if (error) {
                    message.error('Invalid email or password');
                }
            }

        }
    };

    useEffect(() => {
        if (authentication && authentication.status === 'authenticated') {
            router.push('/profile')
        }
    }, [router, authentication])

    return (
        <Layout>
            <Head>
                <title>Perfume Shop - Create Account</title>
            </Head>
            {authentication && (authentication.status === 'loading' || authentication.data) ? <Loader fullScreen={true} /> :
                <div className="lg:py-10 container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 rounded-lg shadow-lg overflow-hidden">
                        <div className="hidden lg:block">
                            <Image height={647} width={755} src="/perfume-1.jpg" layout="responsive" alt="login-img" />
                        </div>
                        <motion.div
                            animate={{ scale: 1 }}
                            initial={{ scale: 0 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full flex justify-center items-center"
                        >
                            <Form
                                name="registration"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                autoComplete="off"
                                className="w-4/5 mx-auto"
                            >
                                <h1 className="text-center text-3xl font-semibold text-purple-800 mt-10 mb-10 lg:mt-0">Create Account</h1>
                                <Row gutter={[15, 10]}>
                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="name"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input className="w-full" placeholder="Name" size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="email"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input className="w-full" placeholder="Email" size="large" type="email" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="phoneNumber"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input className="w-full" placeholder="Phone Number" size="large" type="tel" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="invitationCode"
                                            className="mb-4"
                                            rules={[{ required: false, }]}
                                        >
                                            <Input className="w-full" type="number" placeholder="Invitation Code" size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="password"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password placeholder="Password" size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item
                                            name="confirmPassword"
                                            className="mb-4"
                                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                                        >
                                            <Input.Password placeholder="Confirm Password" size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24}>
                                        <Form.Item name="remember" className="mb-0" valuePropName="checked">
                                            <Checkbox className="text-gray-400">By signing up you agree to our User Agreement, Privacy Policy and Draw Terms & Conditions</Checkbox>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item className="mb-0">
                                            <Button type="primary" htmlType="submit" className="w-full" size="large">
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} sm={24} lg={12}>
                                        <Form.Item className="text-center lg:text-right">
                                            <Link href="/login">
                                                <a className="text-purple-800 hover:text-purple-600 text-base">Already registered? <span className="font-semibold">Login</span></a>
                                            </Link>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </motion.div>
                    </div>
                </div>
            }
        </Layout>
    )
}

export default Index;