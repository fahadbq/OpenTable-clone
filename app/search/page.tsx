import { PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}

// Fetching from db
const fetchRestaurantByCity = (searchParams: SearchParams) => {
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        equals: searchParams.city.toLowerCase(),
      },
    };

    where.location = location;
  }
  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase(),
      },
    };

    where.cuisine = cuisine;
  }
  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };

    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    price: true,
    cuisine: true,
    location: true,
    slug: true,
    reviews: true,
  };

  return prisma.restaurant.findMany({
    where,
    select,
  });
};
// Fetching from db
const fetchLocations = async () => {
  return prisma.location.findMany();
};
// Fetching from db
const fetchCuisines = async () => {
  return prisma.cuisine.findMany();
};

const Search = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurantByCity(searchParams);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 1 ? (
            <>
              {restaurants.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} key={restaurant.id} />
              ))}
            </>
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
