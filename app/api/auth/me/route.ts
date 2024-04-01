import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {verify} from "jsonwebtoken";

export async function GET(){
    const cookieStore = cookies();
    const token = cookieStore.get("OutSiteJWT");
    if (!token?.value){
        return NextResponse.json("Invalid credentials",{status : 401})
    }
    const secret = process.env.JWT_SECRET || "";
    try {
        verify(token.value,secret);
        return NextResponse.json({user : token.value},{status:200});
    }
    catch (e){
        return NextResponse.json("Invalid credentials",{status : 401})
    }
}