import { Search, ZapIcon } from "lucide-react";

function InputSection() {
  return (
    <section className="box box-shadow px-6 py-10">
      <h2 className="text-lg font-semibold text-center mb-6">
        What do you want to be tested on?
      </h2>
      <div className="flex justify-center gap-2 items-center max-sm:flex-col">
        {/* input box  */}
        <div className="flex flex-1 items-center gap-3 p-2 border border-text shadow-[2px_2px_var(--color-text)] w-full max-w-lg">
          <span className="text-gray-500">
            <Search size={16} />
          </span>
          <span className="flex-1 inline-block">
            <input
              type="text"
              placeholder="E.g.. Photosynthesis, Python Basic, World War etc."
              className="outline-none w-full"
            />
          </span>
        </div>
        {/* input box  */}
        <button className="select-none flex box items-center justify-center p-2 bg-primary gap-2 cursor-pointer shadow-[2px_2px_var(--color-text)] transition-shadow hover:shadow-none duration-300">
          <span className="text-base text-white font-medium">
            Generate Test
          </span>
          <span>
            <ZapIcon className="fill-white text-white" size={16} />
          </span>
        </button>
      </div>
    </section>
  );
}

export default InputSection;
