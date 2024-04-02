import { Route, Routes } from "react-router-dom";

import routes from "./constants/routes";
import views from "./views";

export default function App() {
  return (
    <div className="min-h-svh bg-gradient-to-t from-black/60 to-black/60 text-slate-100">
      <Routes>
        <Route path={routes.Home} element={<views.Home />} />
        <Route path={routes.Spatial} element={<views.Spatial />} />
        <Route path={routes.Tabular} element={<views.Tabular />} />
      </Routes>
    </div>
  );
}
