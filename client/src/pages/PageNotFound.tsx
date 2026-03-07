import HelmetSeo from "../components/HelmetSeo";

const notFoundMetadata = {
  title: "404 - Page Not Found - Brainio",
  description:
    "The page you're looking for does not exist. Please check the URL and try again.",
  keywords: "404 error, page not found, Brainio",
};
function PageNotFound() {
  return (
    <>
      <HelmetSeo title={notFoundMetadata.title} description={notFoundMetadata.description} keywords={notFoundMetadata.keywords} />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
        {/* 404 Number  */}
        <div className="relative mb-12">
          <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none">
            404
          </h1>
          <div className="absolute -top-6 right-6 md:right-0 rotate-12 bg-secondary border-4 border-black w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-[6px_6px_0px_0px_black]">
            <span className="text-3xl">🎓</span>
          </div>
        </div>

        {/* Text  */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          WHOOPS! THIS PAGE
        </h2>

        <div className="bg-primary border-4 border-black shadow-[6px_6px_0px_0px_black] inline-block px-6 py-2 mb-6">
          <span className="text-3xl md:text-4xl font-extrabold">
            SKIPPED CLASS.
          </span>
        </div>

        <p className="max-w-xl text-gray-700 text-lg mb-10">
          It looks like the page you’re looking for doesn’t exist
        </p>

        {/* Buttons  */}
        <div className="flex flex-col sm:flex-row gap-6">
          <a
            href="/"
            className="bg-primary px-8 py-3 border-4 border-black shadow-[6px_6px_0px_0px_black] font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            GO BACK HOME
          </a>
          <a
            href="/generator"
            className="bg-white px-8 py-3 border-4 border-black shadow-[6px_6px_0px_0px_black] font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            GENERATE A TEST
          </a>
        </div>
      </main>
    </>
  );
}

export default PageNotFound;
