import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  IconClipboardFilled,
  IconFileCheckFilled,
  IconLockFilled,
} from "@tabler/icons-react";
import { Role } from "@/lib/enums";

export function MainSidebar({
  userName,
  role,
}: Readonly<{
  userName: string;
  role: string;
}>) {
  const router = useRouterState();
  const isSciencePlan =
    router.location.pathname === "/scienceplan" ||
    /^\/scienceplan\/\d+$/.test(router.location.pathname);
  const isValidatePlan = router.location.pathname === "/scienceplan/validate";
  const isScienceObserver = role === Role.SCIENCE_OBSERVER;

  return (
    <Sidebar>
      <SidebarHeader className="bg-white items-center p-4 pb-0">
        <div className="font-bold text-[44px] bg-gradient-to-r from-teal-300 to-indigo-600 bg-clip-text text-transparent drop-shadow-md">
          Gemini-2
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup className="items-center text-start font-medium flex-col gap-5 p-8">
          <Link
            to="/scienceplan"
            className={`text-base text-black w-full inline-flex gap-2 justify-start ${isSciencePlan ? "bg-gray-100" : ""} p-4 rounded-2xl`}
          >
            <IconClipboardFilled />
            View Plans
          </Link>
          <Link
            to="/scienceplan/validate"
            className={`text-base text-black w-full inline-flex gap-2 justify-start  ${isValidatePlan ? "bg-gray-50" : ""} p-4 rounded-2xl ${isScienceObserver ? "cursor-pointer" : "cursor-not-allowed text-gray-500"}`}
            disabled={!isScienceObserver}
          >
            {isScienceObserver ? (
              <IconFileCheckFilled />
            ) : (
              <IconLockFilled color="grey" />
            )}
            Validate Plans
          </Link>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-white text-center">
        <div className="text-xl text-black pb-4">
          <p className="font-semibold text-lg">{userName ?? "Yobubble"}</p>
          <p className="font-light text-sm">{role ?? "Astronomer"}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
