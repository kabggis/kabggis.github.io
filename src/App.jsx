import { Route, Routes } from "react-router-dom";

import { NavLink } from "./components";
import routes from "./constants/routes";
import views from "./views";

export default function App() {
  return (
    <div className="flex h-svh flex-col">
      <nav className="flex items-center justify-center bg-slate-100">
        <ul className="flex list-none">
          <li>
            <NavLink to={routes.Home}>Beranda</NavLink>
          </li>
          <li>
            <NavLink to={routes.Spatial}>Data Spasial</NavLink>
          </li>
          <li>
            <NavLink to={routes.Tabular}>Data Tabular</NavLink>
          </li>
        </ul>
      </nav>

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
