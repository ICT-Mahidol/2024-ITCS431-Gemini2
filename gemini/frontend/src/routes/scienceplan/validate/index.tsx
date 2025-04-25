import { CookieHelper } from "@/lib/cookie_helper";
import { Role } from "@/lib/enums";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/scienceplan/validate/")({
  component: RouteComponent,
  // REF: https://tanstack.com/router/latest/docs/framework/react/guide/authenticated-routes
  beforeLoad: async ({ location }) => {
    const authCookie = new CookieHelper(import.meta.env.VITE_AUTH_COOKIE); // NOTE: change cookie name

    if (authCookie.role !== Role.SCIENCE_OBSERVER) {
      throw redirect({
        to: "/scienceplan",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  // TODO: validate ui
  return <div>Hello "/science_plan/validate/"!</div>;
}
