import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousal from "@/components/HeroCarousal"

const Home = () => {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between relative">

          {/* Text Section */}
          <div className="flex flex-col justify-center flex-1">
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

            <h1 className="text-5xl font-extrabold text-gray-900">
              Unleash the power of
              <br />
              <span className="text-red-600">PriceTracker</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage,
              and retain more.
            </p>

            <Searchbar />
          </div>

          {/* Arrow */}
          <div className="relative w-full xl:w-[400px]">
            <HeroCarousal />
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
      </section>

      {/* Trending Section */}
      <section className="Trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Apple Iphone 15', 'Book', 'Sneakers'].map((product) => (
            <div key={product}>{product}</div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
