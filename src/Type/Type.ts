type TypeVideogameShort = {
    title: string;
    category: string;
    id: number;
    createdAt: string;
    updatedAt: string
}

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


type ArrayVideoGamesShort = TypeVideogameShort[]





type DetailVideogames = {
    success: boolean;
    videogame: TypeVideogameLong
}


function isArrayVideogames(data: unknown): data is ArrayVideoGamesShort {
    return (
        data !== null &&
        Array.isArray(data) &&
        data.length > 0 &&
        data.every(curElem => isVideogameShort(curElem))
    )
}

export type { TypeVideogameShort, TypeVideogameLong, ArrayVideoGamesShort, DetailVideogames }

export { isVideogameShort, isVideogameLong, isArrayVideogames }