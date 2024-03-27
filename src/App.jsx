import { Route, Routes } from "react-router-dom";

import { Navigation } from "./components";
import routes from "./constants/routes";
import views from "./views";

export default function App() {
  return (
    <div className="flex h-svh flex-col">
      <Navigation
        navs={[
          {
            to: routes.Home,
            text: "Beranda",
          },
          {
            to: routes.Spatial,
            text: "Data Spasial",
          },
          {
            to: routes.Tabular,
            text: "Data Tabular",
          },
        ]}
      />

      <div className="flex-1 overflow-auto bg-gradient-to-t from-black/60 to-black/60 text-slate-100">
        <Routes>
          <Route path={routes.Home} element={<views.Home />} />
          <Route path={routes.Spatial} element={<views.Spatial />} />
          <Route path={routes.Tabular} element={<views.Tabular />} />
        </Routes>
      </div>
    </div>
  );
}
