import { HoverMessages } from "@/helpers/hoverMessages";
import { HoverComponent } from "./HoverComponent";
import { Button } from "./ui/button";

interface Props {
  avatarImage: string;
  onClick: () => void;
}

export const Classify = ({ avatarImage, onClick }: Props) => {
  return (
    <HoverComponent message={HoverMessages.classify} avatarImage={avatarImage}>
      <Button
        variant="outline"
        className="text-white border-white"
        onClick={onClick}>
        Classify
      </Button>
    </HoverComponent>
  );
};
