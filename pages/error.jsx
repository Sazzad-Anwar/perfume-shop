import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

export default function Error() {

    const router = useRouter()

    console.log(router)

    return (
        <div>
            <h1>Error</h1>
        </div>

    )

}