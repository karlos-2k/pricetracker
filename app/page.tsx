import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousal from "@/components/HeroCarousal"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts(); // Fetching all products from the API
  return (
    <>
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
        {/* Main content container with responsive layout */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between relative">

          {/* Left side: Text and Search Section */}
          <div className="flex flex-col justify-center flex-1">
            {/* Header tag line with arrow icon */}
            <p className="small-text text-red-700">
              Smart Shopping Starts Here:
              <Image
                className="inline-block"
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            {/* Main heading with branded highlight */}
            <h1 className="text-5xl font-extrabold text-gray-900">
              Unleash the power of
              <br />
              <span className="text-red-600">PriceTracker</span>
            </h1>

            {/* Subheading description */}
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage,
              and retain more.
            </p>

            {/* Search component for product lookup */}
            <Searchbar />
          </div>

          {/* Right side: Hero Carousel and Decorative Arrow */}
          <div className="relative w-full xl:w-[400px]">
            {/* Carousel component for featured items */}
            <HeroCarousal />
            {/* Decorative arrow image - hidden on smaller screens */}
            <Image
              src="/assets/icons/hand-drawn-arrow.svg"
              alt="arrow"
              style={{height: "auto" }}
              width={130}
              height={175}
              className="max-xl:hidden absolute -left-[20%] -bottom-[-2%] z-0"
            />
          </div>
        </div>

        {/* Trending Products Section */}
        <section className="flex flex-col gap-10 px-6 md:px-20 py-24">
          <h2 className="text-secondary text-[32px] font-semibold">Trending</h2>
          {/* Grid layout for trending products */}
          <div className="flex flex-wrap gap-x-8 gap-y-16">
            {/* Temporary product list - to be replaced with dynamic data */}
            {allProducts?.map((product) => (   // Mapping through all products 
              <ProductCard key={product._id} product={product}/>  // Displaying product titles 
            ))}
          </div>
        </section>
      </section>
    </>
  )
}

export default Home
