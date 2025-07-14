import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { useState } from "react";

export default async function Dashboard(){
    const authObj = await auth();
    const userObj = await currentUser();
    console.log({authObj, userObj});
    redirect("/home");
    return null;
}