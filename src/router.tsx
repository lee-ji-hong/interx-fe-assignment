import { createBrowserRouter } from "react-router";

import RootLayout from "./layouts/RootLayout";
import Recruit from "./pages/RecruitPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Recruit /> }],
  },
]);

export default router;
