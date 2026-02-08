import { ZapIcon } from "lucide-react";
import { usePromptContext } from "../../hooks/usePromptContext";
import { generateTestApi } from "../../service/serverApi";

const MAX_INPUT_WORDS = 5;

interface InputSectionProps {
  generateTest:()=>void
}

function InputSection({generateTest}: InputSectionProps) {
  const { prompt, changeUserQuery, resetPrompt } = usePromptContext();

  // const errorBox = useRef<HTMLDivElement>(null);

  const wordCount =
    prompt.userQuery.trim() === ""
      ? 0
      : prompt.userQuery.trim().split(/\s+/).length;

  const handleUserQuery = (query: string) => {
    const words = query.trim().split(/\s+/);

    if (query.trim() === "") {
      changeUserQuery("");
      return;
    }

    if (words.length <= MAX_INPUT_WORDS) {
      changeUserQuery(query);
    }
  };

  

  return (
    <>
      <section className="box box-shadow px-6 py-10">
        <h2 className="text-lg font-semibold text-center mb-6">
          What do you want to be tested on?
        </h2>
        <div className="flex justify-center gap-2 items-center flex-col border border-text p-4 shadow-[2px_2px_var(--color-text)]">
          {/* input box  */}
          <textarea
            placeholder="E.g.. Photosynthesis, Python Basic, World War etc."
            className="outline-none w-full resize-none"
            rows={6}
            value={prompt.userQuery}
            onChange={(e) => handleUserQuery(e.target.value)}
          ></textarea>
          {/* input box  */}
          <div className="flex self-end items-center gap-6">
            <span className="text-base ">
              {wordCount}/{MAX_INPUT_WORDS}
            </span>
            <button
              onClick={generateTest}
              className="select-none flex box items-center justify-center p-2 bg-primary gap-2 cursor-pointer shadow-[2px_2px_var(--color-text)] transition-shadow hover:shadow-none duration-300"
            >
              <span className="text-base text-white font-medium">
                Generate Test
              </span>
              <span>
                <ZapIcon className="fill-white text-white" size={16} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default InputSection;
