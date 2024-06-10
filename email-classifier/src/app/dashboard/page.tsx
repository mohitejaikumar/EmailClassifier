"use client";

import axios from "axios";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { EmailMessageCard } from "@/components/EmailMessageCard";
import { Classify } from "@/components/Classify";
import { InputText } from "@/components/InputText";
import { EmailMessages } from "@/types/interfaces";
import DashBoardLoader from "../../../public/loaders/DashBoardLoader";
import { EmailMessageLoader } from "../../../public/loaders/EmailMessageLoader";
import { EmailDialog } from "@/components/EmailDialog";
import { toast } from "@/components/ui/use-toast";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

export default function Page() {
  const { data: session } = useSession();
  const [emailMessages, setEmailMessages] = useState<EmailMessages[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numberOfMessagesToClassify, setNumberOfMessagesToClassify] =
    useState<number>(0);
  const [selectedEmail, setSelectedEmail] = useState<EmailMessages | null>(
    null
  );

  const handleClassify = async () => {
    if (numberOfMessagesToClassify > 0) {
      // Check weather key exist
      const apiKey = localStorage.getItem("openAIAPIKey");
      if (!apiKey) {
        toast({
          title: (
            <span className=" text-red-500 flex gap-2 items-center">
              <FaCircleXmark /> Error
            </span>
          ) as any,
          description: `Please provide your OpenAI API Key `,
          className: "bg-white text-lg text-gray-800 ",
          variant: "destructive",
        });
        return;
      }
      try {
        // send Request
        setLoading(() => true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/email/getEmail`,
          {
            // @ts-ignore
            refreshToken: session?.refreshToken,
            numberOfMessages: numberOfMessagesToClassify,
            openAPIKey: apiKey,
          }
        );
        setLoading(() => false);
        setEmailMessages(() => response.data.messages);
        toast({
          title: (
            <span className="text-green-500 flex gap-2 items-center">
              <FaCircleCheck /> Succesfull
            </span>
          ) as any,
          description: `Successfully classified ${numberOfMessagesToClassify} emails `,
          className: "bg-white text-lg text-gray-800 ",
        });
      } catch (err) {
        // SERVER ERROR
        setLoading(() => false);
        toast({
          title: (
            <span className=" text-red-500 flex gap-2 items-center">
              <FaCircleXmark /> Error
            </span>
          ) as any,
          description: `Server Error , Please Login Again `,
          className: "bg-white text-lg text-gray-800 ",
          variant: "destructive",
        });
      }
    } else {
      // No messages to classify
      toast({
        title: (
          <span className=" text-red-500 flex gap-2 items-center">
            <FaCircleXmark /> Error
          </span>
        ) as any,
        description: `Zero messages to classify `,
        className: "bg-white text-lg text-gray-800 ",
        variant: "destructive",
      });
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setNumberOfMessagesToClassify(parseInt(e.target.value));
  };
  const closeModal = () => {
    setOpenModal(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  if (!session?.user?.email) {
    return (
      <>
        <DashBoardLoader />
      </>
    );
  }

  return (
    <>
      <div className="bg-[#1a1a1a] min-h-screen p-8 text-white px-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar>
              <img src={session?.user?.image || ""} alt="Profile_Image" />
            </Avatar>
            <div>
              <div>{session.user.email}</div>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-white border-white"
            onClick={handleLogout}>
            Login/Logout
          </Button>
        </div>
        <div className="flex items-center justify-between mb-6 mt-20">
          <InputText
            avatarImage={session?.user?.image || ""}
            onChange={handleInputChange}
          />
          <Classify
            avatarImage={session?.user?.image || ""}
            onClick={handleClassify}
          />
        </div>
        <div className="space-y-4 ">
          {loading ? (
            <EmailMessageLoader />
          ) : (
            emailMessages.length > 0 &&
            emailMessages.map((iteam, index) => {
              return (
                <>
                  <EmailMessageCard
                    key={index}
                    title={iteam.header}
                    content={iteam.message}
                    subject={iteam.subject}
                    date={iteam.date}
                    category={iteam.category}
                    openModal={() => {
                      setOpenModal(true);
                      setSelectedEmail(iteam);
                    }}
                  />
                </>
              );
            })
          )}
        </div>
        {openModal && selectedEmail && (
          <EmailDialog
            title={selectedEmail.header}
            content={selectedEmail.message}
            date={selectedEmail.date}
            subject={selectedEmail.subject}
            closeModal={closeModal}
          />
        )}
      </div>
    </>
  );
}
