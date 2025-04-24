import { AppSidebar } from "@/components/app_sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CookieHelper } from "@/lib/cookie_helper";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/science_plan")({
  component: RouteComponent,
  // REF: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
  beforeLoad: async ({ location }) => {
    const authCookie = new CookieHelper("token"); // NOTE: change cookie name

    // NOTE: check if cookie exist, right now comment out for testing purpose
    // if (!authCookie.exists) {
    //   throw redirect({
    //     to: "/",
    //     search: {
    //       // Use the current location to power a redirect after login
    //       // (Do not use `router.state.resolvedLocation` as it can
    //       // potentially lag behind the actual current location)
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
