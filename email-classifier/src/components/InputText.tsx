import { HoverMessages } from "@/helpers/hoverMessages";
import { HoverComponent } from "./HoverComponent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  avatarImage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputText = ({ avatarImage, onChange }: Props) => {
  return (
    <HoverComponent message={HoverMessages.input} avatarImage={avatarImage}>
      <Input
        type="text"
        className="bg-slate-800 w-14 cursor-pointer"
        onChange={onChange}
      />
    </HoverComponent>
  );
};
