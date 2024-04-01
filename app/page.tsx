"use client"

import axios from "axios";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();

    const handleSubmit = async(event : React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const payload = {
            username : event.currentTarget.username.value,
            password : event.currentTarget.password.value
        }
        try {
            const {data} = await axios.post("/api/auth/login",payload);
            alert(data);
            router.push("/dashboard");
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <main>
            <h1>Nextjs authentication JWT verify http cookie only</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className={"text-black"}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className={"text-black"}
                    />
                </div>
                <button
                    type="submit"
                    className={"p-2 bg-orange-600 text-white w-fit rounded"}
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
