import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import FavoritesBar from "../Components/FavoritesBar";
import { FavoritesProvider } from "../Contex/FavoritesContext";

export default function Layout() {
    return (
        <FavoritesProvider>
            <div className="d-flex flex-column vh-100">
                <Header />
                <main className="flex-grow-1">
                    <div className="container py-4">
                        <Outlet />
                    </div>
                </main>
                <FavoritesBar />
                <Footer />
            </div>
        </FavoritesProvider>
    );
}