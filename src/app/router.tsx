import { createBrowserRouter } from "react-router-dom";
import { SiteLayout } from "../components/layout/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { ConsolePage } from "../pages/ConsolePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrivacyPage } from "../pages/PrivacyPage";
import { SupportPage } from "../pages/SupportPage";
import { TermsPage } from "../pages/TermsPage";
import { ServerRulesPage } from "../pages/ServerRulesPage";
export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/console", element: <ConsolePage /> },
      { path: "/support", element: <SupportPage /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "/servers/:slug/rules", element: <ServerRulesPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
