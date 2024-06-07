"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const Page = () => {
  const { toast } = useToast();

  const onSubmit = async () => {
    try {
      const res = await signIn("google", { callbackUrl: "/dashboard" });

      toast({
        title: (
          <span className="text-green-500 flex gap-2 items-center">
            <FaCircleCheck /> Succesfull
          </span>
        ) as any,
        description: "SignIn Succesfully",
        className: "bg-white text-lg text-gray-800 ",
      });
    } catch (err) {
      toast({
        title: (
          <span className=" text-red-500 flex gap-2 items-center">
            <FaCircleXmark /> Error
          </span>
        ) as any,
        description: `Please SignIn Again`,
        className: "bg-white text-lg text-gray-800 ",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className=" h-screen w-screen flex justify-center flex-col gap-6 items-center text-black bg-gradient-to-tl from-black to-gray-800">
        <div className=" w-[25rem] border-[1px] border-white p-8 rounded-2xl">
          <LoginWithGoogle onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};

export default Page;
