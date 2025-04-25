import { useSidebar } from "@/components/ui/sidebar";
import { IconLayoutSidebarFilled } from "@tabler/icons-react";

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="inline-flex gap-2 m-4 hover:bg-gray-100 p-2 rounded-xl active:bg-gray-200"
    >
      <IconLayoutSidebarFilled size={25} color="black" />
    </button>
  );
}
