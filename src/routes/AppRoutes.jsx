import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import HomePage from "../pages/Home/HomePage";
import ListPetPage from "../pages/ListPet/ListPetPage";
import LitterDetailsPage from "../pages/ListPet/LitterDetailsPage";
import PetsDetail from "../pages/ListPet/PetsDetail";
import OwnerDetailsPage from "../pages/ListPet/OwnerDetailsPage";
import ManualDetail from "../pages/ListPet/ManualDetail";
import ReviewSubmit from "../pages/ListPet/ReviewSubmit";
import OwnerSearchResults from "../pages/ListPet/OwnerSearchResults";
import EditLitterDetails from "../pages/ListPet/EditLitterDetails";
import ListingSuccess from "../pages/ListPet/ListingSuccess";
import EditDetails from "../pages/ListPet/EditDetails";
import PetDetails from "../pages/IndividualType/PetDetails";
import PetDetailsSummary from "../pages/MultiplePets/PetDetailsSummary";
import MultiplePetsDetails from "../pages/MultiplePets/MultiplePetsDetails";

function PlaceholderPage({ title }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-[#332a23]">{title}</h1>

      <p className="mt-2 text-sm text-[#75695e]">
        This page is under development.
      </p>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route
        path="/home"
        element={
          <DashboardLayout>
            <HomePage />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet"
        element={
          <DashboardLayout>
            <ListPetPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter"
        element={
          <DashboardLayout>
            <LitterDetailsPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/pets-detail"
        element={
          <DashboardLayout>
            <PetsDetail />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/owner-detail"
        element={
          <DashboardLayout>
            <OwnerDetailsPage />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/owner-result"
        element={
          <DashboardLayout>
            <OwnerSearchResults />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/manual-detail"
        element={
          <DashboardLayout>
            <ManualDetail />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/reviewsubmit"
        element={
          <DashboardLayout>
            <ReviewSubmit />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/editLitter"
        element={
          <DashboardLayout>
            <EditLitterDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/listingsuccess"
        element={
          <DashboardLayout>
            <ListingSuccess />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/litter/editDetails"
        element={
          <DashboardLayout>
            <EditDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/individual"
        element={
          <DashboardLayout>
            <PetDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/multiple"
        element={
          <DashboardLayout>
            <MultiplePetsDetails />
          </DashboardLayout>
        }
      />

      <Route
        path="/list-pet/multiple/petdetailssummary"
        element={
          <DashboardLayout>
            <PetDetailsSummary />
          </DashboardLayout>
        }
      />

      <Route
        path="/search-history"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Search History" />
          </DashboardLayout>
        }
      />

      <Route
        path="/follow-ups"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Follow-ups" />
          </DashboardLayout>
        }
      />

      <Route
        path="/pets"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Pets" />
          </DashboardLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Profile" />
          </DashboardLayout>
        }
      />

      <Route
        path="/buy-microchips"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Buy Microchips" />
          </DashboardLayout>
        }
      />

      <Route
        path="/lost-pet-hub"
        element={
          <DashboardLayout>
            <PlaceholderPage title="Lost Pet Hub" />
          </DashboardLayout>
        }
      />

      <Route
        path="/faq"
        element={
          <DashboardLayout>
            <PlaceholderPage title="FAQ" />
          </DashboardLayout>
        }
      />

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
