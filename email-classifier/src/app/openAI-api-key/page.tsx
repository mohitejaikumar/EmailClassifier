"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Page() {
  const router = useRouter();
  const [apikey, setApiKey] = useState("");

  const handleSubmit = () => {
    if (apikey.length == 0) {
      toast({
        title: (
          <span className=" text-red-500 flex gap-2 items-center">
            <FaCircleXmark /> Error
          </span>
        ) as any,
        description: `Please provide your OpenAI API Key`,
        className: "bg-white text-lg text-gray-800 ",
        variant: "destructive",
      });
    } else {
      localStorage.setItem("openAIAPIKey", apikey);
      toast({
        title: (
          <span className="text-green-500 flex gap-2 items-center">
            <FaCircleCheck /> Succesfull
          </span>
        ) as any,
        description: "Successfull got your OpenAI API Key",
        className: "bg-white text-lg text-gray-800 ",
      });
      router.push("/dashboard");
    }
  };
  const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(() => e.target.value);
  };

  return (
    <>
      <div className=" h-screen w-screen flex justify-center flex-col gap-6 items-center text-black bg-gradient-to-tl from-black to-gray-800">
        <div className=" w-[50rem] border-[1px] border-white p-8 rounded-2xl flex justify-between gap-2 items-center">
          <Input
            name="email"
            placeholder="Enter your OpenAI API Key"
            className="bg-slate-700 text-white w-full h-12 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onChange={handleonChange}
          />
          <Button className="py-3" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
