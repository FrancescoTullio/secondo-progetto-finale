import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FavoritesBar from "../Components/FavoritesBar";
import CompareView from "../Components/CompareView";
import { FavoritesProvider } from "../Contex/FavoritesContext";
import { CompareProvider } from "../Contex/CompareContext";

export default function Layout() {
    return (
        <FavoritesProvider>
            <CompareProvider>
                <div className="d-flex flex-column min-vh-100">
                    <Header />                    
                    <FavoritesBar />
                    <main className="flex-grow-1">
                        <div className="container py-4">
                            <CompareView />
                            <Outlet />
                        </div>
                    </main>
                    <Footer />
                </div>
            </CompareProvider>
        </FavoritesProvider>
    );
}