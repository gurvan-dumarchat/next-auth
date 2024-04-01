"use client"

import axios, { AxiosError } from "axios";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

interface UserResponse{
    user: string | null,
    error: AxiosError | null
}

export default function Layout({children}:{children : React.ReactNode}){

    const router = useRouter();
    const getUser = async() : Promise<UserResponse>=>{
        try {
            const {data} = await axios.get("/api/auth/me");
            return{
                user:data,
                error:null,
            }
        }catch (e) {
            const error = e as AxiosError;
            return {
                user:null,
                error:error,
            }
        }
    }
    useEffect(()=>{
        (async ()=>{
            const {user,error} = await getUser();
            if(error){
                router.push("/");
                return;
            }
        })();
    },[])
    return(
        <main>
            {children}
        </main>
    )


}