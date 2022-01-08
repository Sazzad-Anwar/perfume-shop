import Protected from "../components/Protected"
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router";
import Layout from './../components/Layout';

const Profile = () => {

    const authentication = useSession();
    const router = useRouter();

    return (
        <Layout>
            <Protected className="h-screen bg-slate-300 flex flex-col justify-center items-center">
                <div className="w-96 p-5 border rounded-xl shadow-lg text-center bg-white">
                    <h1 className="text-2xl py-5 font-semibold">{authentication?.data?.user?.name} Welcome to dashboard</h1>
                    <button onClick={() => {
                        signOut();
                        router.push('/login');
                    }} className="w-80 border rounded-lg bg-gray-700 hover:bg-gray-900 text-white py-3 my-1 normal-transition">Sign Out</button>
                </div>
            </Protected>
        </Layout>
    )
}

export default Profile
