import {NextResponse} from "next/server";
import {sign} from "jsonwebtoken";
import {serialize} from "cookie";
import {headers} from "next/headers";

export async function POST(request : Request){
    const body = await request.json();
    const {username,password} = body;

    if(username !== "admin" || password !== "admin"){
        return NextResponse.json("Invalid credentials",{status : 401})
    }

    const secret = process.env.JWT_SECRET || "";
    const token = sign(
        {
            username
        },secret,
        {
            expiresIn: 60*60*24*30
        }
    )

    const serialized = serialize("OutSiteJWT",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict",
        path : "/",
        maxAge:60*60*24*30
    })

    return new Response("authenticated",{
        status:200,
        headers : {"Set-Cookie":serialized}
    });
}