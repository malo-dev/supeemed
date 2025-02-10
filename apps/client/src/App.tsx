import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/plannings/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import React from 'react';
import SinglePlanning from './pages/plannings/SinglePlanning';
import MesHeuresDeTravail from './pages/heuresdetravail/MesHeuresDeTravail';
import FormulairedeDemandedeConge from './pages/demandesdeconge/FormulairedeDemandedeConge';
import Remplacement from './pages/remplacements/Remplacement';
import Mapresence from './pages/presences/Mapresence';
import Plannings from './pages/plannings/Plannings';
import AddPlanning from './pages/plannings/AddPlanning';
import TouslesEmployees from './pages/employees/TouslesEmployees';
import AjouterUnEmploye from './pages/employees/AjouterUnEmploye';
import Residences from './pages/residences/Residences';
import AjouterResidence from './pages/residences/AjouterResidence';
import Horaires from './pages/heuresdetravail/Horaires';
import Conges from './pages/demandesdeconge/Conges';
import TouslesRemplacements from './pages/remplacements/TouslesRemplacements';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserManagement from './pages/user';
import Login from './pages/Dashboard/Login'
import LoginPage from './pages/Dashboard/Login';
import ResidenceManagementE from './pages/residences/ResidenceE';
import MapresenceResidence from './pages/presences/presenceReisdence';
import EmployeeManagementRes from './pages/employees/ResEmp';
import Replacementskk from './pages/remplacements/rempEmp';

const queryClient = new QueryClient();

// Vérification de l'authentification
const isAuthenticated = () => {
  return localStorage.getItem("token") !== null; // Vérifie si un token existe
};

// Composant pour protéger les routes
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/signin" />;
};

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/auth/signin" element={<LoginPage/>} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
             
                <Routes>
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/remplace" element={<Replacementskk />} />
                  
                  <Route path="/emplRes" element={<EmployeeManagementRes />} />
                  <Route path="/presres" element={<MapresenceResidence />} />
                  <Route path="/resident" element={<ResidenceManagementE/>} />
                  <Route path="/UserManagement" element={<UserManagement />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/forms/form-elements" element={<FormElements />} />
                  <Route path="/forms/form-layout" element={<FormLayout />} />
                  <Route path="/tables" element={<Tables />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/chart" element={<Chart />} />
                  <Route path="/ui/alerts" element={<Alerts />} />
                  <Route path="/ui/buttons" element={<Buttons />} />
                  <Route path="/mes-plannings" element={<SinglePlanning />} />
                  <Route path="/mes-heures-de-travail" element={<MesHeuresDeTravail />} />
                  <Route path="/demande-de-conge" element={<FormulairedeDemandedeConge />} />
                  <Route path="/ajouter-un-employe" element={<AjouterUnEmploye />} />
                  <Route path="/remplacement" element={<Remplacement />} />
                  <Route path="/presences" element={<Mapresence />} />
                  <Route path="/tous-les-plannings" element={<Plannings />} />
                  <Route path="/plannings" element={<Plannings />} />
                  <Route path="/add-planning" element={<AddPlanning />} />
                  <Route path="/employees" element={<TouslesEmployees />} />
                  <Route path="/residences" element={<Residences />} />
                  <Route path="/ajouter-residence" element={<AjouterResidence />} />
                  <Route path="/horaires" element={<Horaires />} />
                  <Route path="/conges" element={<Conges />} />
                  <Route path="/tous-les-remplacements" element={<TouslesRemplacements />} />
                </Routes>
              
            </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
