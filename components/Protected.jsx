import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "./Loader";

const Protected = ({ children, className }) => {

    const authentication = useSession();
    const router = useRouter();

    useEffect(() => {
        if (authentication && authentication.status === 'unauthenticated') {
            router.push('/login')
        }
    }, [router, authentication])

    return (
        <div>
            {authentication && (authentication.status ==='loading' || !authentication.data) ? <Loader /> :
                <div className={className}>
                    {children}
                </div>
            }

        </div>
    )
}

export default Protected
