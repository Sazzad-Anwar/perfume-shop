import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "./Loader";

const Protected = ({ children, className }) => {

    const authentication = useSession();
    const router = useRouter();

    useEffect(() => {
        if (authentication && authentication.status === 'unauthenticated') {
            router.push(`/login?to=${router.pathname}`)
        }
    }, [router, authentication])

    return (
        <div>
            {authentication &&
                <div className={className}>
                    {children}
                </div>
            }
        </div>
    )
}

export default Protected
