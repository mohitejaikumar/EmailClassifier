// "use client";
import axios from "axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
// import React, { useEffect } from "react";

export default async function Page() {
  //   const { data: session } = getSession();

  //   const refreshAccessToken = async () => {
  //     await signIn("google", { callbackUrl: "/dashboard" });
  //   };

  //   useEffect(() => {
  //     const getMails = async () => {
  //       try {
  //         // get mails
  //         console.log(session);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };

  //     if (session?.user?.email) {
  //       getMails();
  //     } else {
  //       //  Forcefully re signIn
  //       //   refreshAccessToken();
  //     }
  //   }, [session]);
  const session = await getServerSession(authOptions);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/email/getEmail`,
      {
        refreshToken: session.refreshToken,
      }
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }

  return <div>{JSON.stringify(session)}</div>;
}
