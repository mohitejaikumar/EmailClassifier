import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  title: string;
  content: string;
  date: string;
  subject: string;
  closeModal: () => void;
}
export const EmailDialog = ({
  title,
  content,
  closeModal,
  subject,
  date,
}: Props) => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-md">
      <div className=" bg-[#333333] fixed top-[5%] left-[20%] w-[60rem] h-[40rem] rounded-2xl border-2 border-gray-500 overflow-y-scroll custom-scrollbar">
        <div className=" mx-5 my-5 flex justify-between">
          <div className="text-2xl font-semibold">
            {title.replaceAll('"', "")}
          </div>
          <div
            className="cursor-pointer py-1 rounded-lg px-2 bg-[#16151A]"
            onClick={closeModal}>
            Cancel
          </div>
        </div>
        <div className="mx-5">Date:</div>
        <div className="text-lg mx-5 my-6">{date.replaceAll('"', "")}</div>
        <div className="mx-5">Subject:</div>
        <div className="text-lg mx-5 my-6">{subject.replaceAll('"', "")}</div>
        <div className="mx-5">Body:</div>
        <div
          className="text-lg mx-5 my-6"
          dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};
