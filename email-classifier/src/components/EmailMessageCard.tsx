import { EmailDialog } from "./EmailDialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Props {
  title: string;
  content: string;
  category: string;
  openModal: () => void;
  date: string;
  subject: string;
}
export const EmailMessageCard = ({
  title,
  category,
  openModal,
  subject,
}: Props) => {
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
          <p className="w-full h-auto break-words">
            {subject.replaceAll('"', "")}
          </p>
        </CardContent>
      </Card>
    </>
  );
};
