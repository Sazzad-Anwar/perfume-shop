import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Layout from "./../components/Layout";
import { motion } from "framer-motion";
import { message, Form, Input, Button, Checkbox, Row, Col } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const authentication = useSession();
  const router = useRouter();

  const onFinish = async (values) => {
    let { email, password } = values;
    if (email !== "" && password !== "") {
      let { error } = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (error) {
        message.error("Invalid email or password");
      }
    }
  };

  useEffect(() => {
    if (authentication && authentication.status === "authenticated") {
      router.push(router.query.to ?? "/profile");
    }
  }, [router, authentication]);

  return (
    <Layout>
      <Head>
        <title>Perfume Shop - Login</title>
      </Head>
      {authentication && (
        <div className="container mx-auto lg:py-10">
          <div className="grid grid-cols-1 overflow-hidden rounded-lg shadow-lg lg:grid-cols-2">
            <div className="hidden lg:block">
              <Image
                height={647}
                width={755}
                src="/perfume-3.jpg"
                layout="responsive"
                alt="login-img"
              />
            </div>
            <motion.div
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              className="flex w-full items-center justify-center"
            >
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="mx-auto w-4/5 lg:w-1/2"
              >
                <h1 className="mt-10 text-center text-3xl font-semibold text-purple-800 lg:mt-0">
                  Login
                </h1>
                <Form.Item
                  name="username"
                  wrapperCol={{ span: 24 }}
                  className="mb-4"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input className="w-full" placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item
                  name="password"
                  className="mb-4"
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <div className="flex items-center justify-between">
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="text-base">Remember me</Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Link href="/forgot-password">
                      <a className="text-base text-purple-800 hover:text-purple-600">
                        Forgot Password?
                      </a>
                    </Link>
                  </Form.Item>
                </div>

                <Row gutter={[15, 10]}>
                  <Col xs={24}>
                    <Form.Item className="mb-0">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full"
                        size="large"
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item className="mt-0 text-center">
                      <Link href="/registration">
                        <a className="text-base text-purple-800 hover:text-purple-600">
                          Already have account?{" "}
                          <span className="font-semibold">Register</span>
                        </a>
                      </Link>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </motion.div>
          </div>
        </div>
      )}
    </Layout>
  );
}
