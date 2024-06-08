import { EmailDialog } from "./EmailDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  title: string;
  content: string;
  category: string;
  openModal: () => void;
}
export const EmailMessageCard = ({
  title,
  content,
  category,
  openModal,
}: Props) => {
  if (content.length > 0) {
    content = content
      .substring(0, Math.min(content.length - 1, 100))
      .concat(".....");
  } else {
    content = "No Data Content";
  }
  return (
    <>
      <Card className="bg-[#333333] border border-white">
        <CardHeader className="flex justify-between">
          <div className="flex justify-between items-center">
            <CardTitle>
              {title.replaceAll('"', "").replaceAll("//", "")}
            </CardTitle>
            <div className="flex justify-center gap-5">
              <Button variant="outline" onClick={openModal}>
                View Email
              </Button>
              <Badge variant="outline" className="text-md px-10">
                {category}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="w-full h-auto break-words">{content}</p>
        </CardContent>
      </Card>
    </>
  );
};
