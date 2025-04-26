import { CustomSidebarTrigger } from "@/components/sidebar/customer_sidebar_trigger";
import { MainSidebar } from "@/components/sidebar/main_sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CookieHelper } from "@/lib/cookie_helper";
import { Payload } from "@/lib/interfaces";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scienceplan")({
  component: RouteComponent,
  // REF: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
  beforeLoad: async ({ location }) => {
    const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE); // NOTE: change cookie name

    if (!authCookie.exists) {
      throw redirect({
        to: "/",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  loader: () => {
    const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE);
    const payload = {
      userName: authCookie.userName,
      role: authCookie.role,
    };
    return payload as Payload;
  },
});

function RouteComponent() {
  const payload = Route.useLoaderData();

  return (
    <SidebarProvider>
      <MainSidebar userName={payload.userName} role={payload.role} />
      <main>
        <CustomSidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
