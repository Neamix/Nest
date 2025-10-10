
import { ProfileMenu } from "@/components/blocks/Menu/ProfileMenu";
import { Card } from "@/components/ui/card";


export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-[20px]">
        <Card className="md-container h-full font-lato my-[20px]">
            <div className="header border-b border-border pb-3 mb-6 ">
                <h1 className="text-[28px] font-bold mb-0">Settings</h1>
                <p className="text-muted-foreground text-base">
                    Manage your account settings and preferences.
                </p>
            </div>
            <div className="flex gap-6 grid-cols-2">
                <ProfileMenu />
                <div className="flex-1">{children}</div>
            </div>      
        </Card>
    </div>
  );
}