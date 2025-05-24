// ===== TIPI BASE PER VIDEOGIOCHI =====

type TypeVideogameShort = {
    title: string;
    category: string;
    id: number;
    createdAt: string;
    updatedAt: string;
}

type TypeVideogameLong = TypeVideogameShort & {
    price: number;
    platform: string[];
    multiplayer: boolean;
    year: string;
    company: string;
    vote: number;
    img: string;
    pegi: string;
};

type ArrayVideoGamesShort = TypeVideogameShort[];

type DetailVideogames = {
    success: boolean;
    videogame: TypeVideogameLong;
}

// ===== TIPI PER PROP DEI COMPONENTI =====

type GameCardProps = {
    game: TypeVideogameShort;
}

type GameListProps = {
    videogames: TypeVideogameShort[] | null;
}

type CompareButtonProps = {
    game: TypeVideogameLong;
    variant?: 'card' | 'detail';
}

// ===== TIPI PER CONTESTI =====

interface FavoritesContextType {
    favorites: TypeVideogameShort[];
    addFavorite: (game: TypeVideogameShort) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

interface CompareContextType {
    compareList: (TypeVideogameLong | null)[];
    addToCompare: (game: TypeVideogameLong) => void;
    removeFromCompare: (id: number) => void;
    isInCompare: (id: number) => boolean;
    clearCompare: () => void;
    canAddMore: () => boolean;
}

// ===== TIPI PER HOOK =====

interface UseVideoGamesReturn {
    videogame: TypeVideogameShort[] | null;
    searchVideogames: () => Promise<void>;
    searchRef: React.RefObject<HTMLInputElement>;
    inputSearch: string;
    setInputSearch: React.Dispatch<React.SetStateAction<string>>;
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    sortOption: string;
    setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

interface UseVideoGameDetailReturn {
    videogameDetail: TypeVideogameLong | null;
    isLoading: boolean;
    error: string | null;
    fetchVideoGameDetail: (id: number) => Promise<TypeVideogameLong | null>;
}

// ===== TIPI PER ORDINAMENTO =====

type SortOption = "title_asc" | "title_desc" | "category_asc" | "category_desc" | "";

// ===== TYPE GUARDS =====

function isVideogameShort(data: unknown): data is TypeVideogameShort {
    return (
        data !== null &&
        typeof data === "object" &&
        "title" in data &&
        typeof data.title === "string" &&
        "category" in data &&
        typeof data.category === "string" &&
        "id" in data &&
        typeof data.id === "number" &&
        "createdAt" in data &&
        typeof data.createdAt === "string" &&
        "updatedAt" in data &&
        typeof data.updatedAt === "string"
    )
}

function isVideogameLong(data: unknown): data is TypeVideogameLong {
    return (
        data !== null &&
        typeof data === "object" &&
        "title" in data &&
        typeof data.title === "string" &&
        "category" in data &&
        typeof data.category === "string" &&
        "year" in data &&
        typeof data.year === "string" &&
        "company" in data &&
        typeof data.company === "string" &&
        "img" in data &&
        typeof data.img === "string" &&
        "pegi" in data &&
        typeof data.pegi === "string" &&
        "createdAt" in data &&
        typeof data.createdAt === "string" &&
        "updatedAt" in data &&
        typeof data.updatedAt === "string" &&
        "price" in data &&
        typeof data.price === "number" &&
        "id" in data &&
        typeof data.id === "number" &&
        "multiplayer" in data &&
        typeof data.multiplayer === "boolean" &&
        "platform" in data &&
        Array.isArray(data.platform) &&
        data.platform.length > 0 &&
        data.platform.every(curElem => typeof curElem === "string")
    )
}

function isArrayVideogames(data: unknown): data is ArrayVideoGamesShort {
    return (
        data !== null &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.every(curElem => isVideogameShort(curElem))
    )
}

function isDetailVideogams(data: unknown): data is DetailVideogames {
    return (
        data !== null &&
        typeof data === "object" &&
        "success" in data &&
        typeof data.success === "boolean" &&
        "videogame" in data &&
        isVideogameLong(data.videogame)
    )
}

// ===== ESPORTAZIONI =====

// Tipi base
export type { 
    TypeVideogameShort, 
    TypeVideogameLong, 
    ArrayVideoGamesShort, 
    DetailVideogames 
};

// Tipi per prop dei componenti
export type { 
    GameCardProps, 
    GameListProps, 
    CompareButtonProps 
};

// Tipi per contesti
export type { 
    FavoritesContextType, 
    CompareContextType 
};

// Tipi per hook
export type { 
    UseVideoGamesReturn, 
    UseVideoGameDetailReturn 
};

// Tipi per ordinamento
export type { SortOption };

// Type guards
export { 
    isVideogameShort, 
    isVideogameLong, 
    isArrayVideogames, 
    isDetailVideogams 
};