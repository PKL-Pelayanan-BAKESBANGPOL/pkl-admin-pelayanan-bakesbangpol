import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import AdminProfil from "./pages/AdminProfil";\
import DaftarAjuanMagang from "./pages/DaftarAjuanMagang";
import DaftarAjuanSkripsi from "./pages/DaftarAjuanSkripsi";
import DetailAjuanSkripsi from "./pages/DetailAjuanSkripsi";
import DetailAjuanMagang from "./pages/DetailAjuanMagang";
import Protected from "./assets/components/Protected";
import CekValidasi from "./assets/components/CekValidasi";
import TidakDitemukan from "./assets/components/TidakDitemukan";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <CekValidasi />
                  <Login />
                </div>
              }
            />
            <Route
              path="/beranda"
              element={
                <div>
                  <Protected />
                  <Dashboard />
                </div>
              }
            />
            {/* <Route
              path="/admin-profil"
              element={
                <div>
                  <Protected />
                  <AdminProfil />
                </div>
              }
            /> */}
            <Route
              path="/daftar-ajuan-magang/pkl/kkn"
              element={
                <div>
                  <Protected />
                  <DaftarAjuanMagang />
                </div>
              }
            />
            <Route
              path="/daftar-ajuan-penelitian/tesis/skripsi"
              element={
                <div>
                  <Protected />
                  <DaftarAjuanSkripsi />
                </div>
              }
            />
            <Route
              path="/detail-ajuan-penelitian/tesis/skripsi"
              element={
                <div>
                  <Protected />
                  <DetailAjuanSkripsi />
                </div>
              }
            />
            <Route
              path="/detail-ajuan-magang/pkl/kkn"
              element={
                <div>
                  <Protected />
                  <DetailAjuanMagang />
                </div>
              }
            />
            <Route path="*" element={<TidakDitemukan />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
