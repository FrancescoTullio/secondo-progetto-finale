import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Layout from "./Layout/Layout";
import GameDetailPage from "./Pages/GameDetailPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="game/:id" element={<GameDetailPage />} />
            
            {/* Rotte per le pagine future, reindirizzano alla 404 */}
            <Route path="categories" element={<NotFoundPage />} />
            <Route path="new-releases" element={<NotFoundPage />} />
            <Route path="top-rated" element={<NotFoundPage />} />
            <Route path="about" element={<NotFoundPage />} />
            <Route path="contact" element={<NotFoundPage />} />
            <Route path="privacy" element={<NotFoundPage />} />
            <Route path="terms" element={<NotFoundPage />} />
            
            {/* Catch-all per tutte le rotte non gestite */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;