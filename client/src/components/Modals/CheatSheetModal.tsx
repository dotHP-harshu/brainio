import { Copy, Download, Plus, Check, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateCheatSheetApi } from "../../service/serverApi";
import BanterLoader from "../BanterLoader";

interface CheatSheetModalProps {
  topic: string;
  difficulty: string;
  hideModal: () => void;
}

function CheatSheetModal({
  topic,
  difficulty,
  hideModal,
}: CheatSheetModalProps) {
  const [cheatSheet, setCheatSheet] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCheatSheet = async () => {
      const { data, error } = await generateCheatSheetApi(topic, difficulty);
      if (data) {
        setCheatSheet((data as { cheatSheet: string }).cheatSheet);
      }
      setLoading(false);
    };
    fetchCheatSheet();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return;
    const box = modalRef.current.querySelector("#cheatsheet-box") as HTMLDivElement;

    const hideOnClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !box.contains(e.target as Node)) {
        hideModal();
      }
    };
    modalRef.current.addEventListener("click", hideOnClickOutside);

    return () => {
      if (!modalRef.current) return;
      modalRef.current.removeEventListener("click", hideOnClickOutside);
    };
  }, [hideModal]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cheatSheet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([cheatSheet], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}-cheatsheet.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center z-30 bg-[#ffffff42] backdrop-blur-md p-6 w-screen h-screen"
    >
      <div
        id="cheatsheet-box"
        className="relative box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-lg bg-secondary/80 pt-10"
      >
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 outline-none cursor-pointer"
        >
          <Plus className="rotate-45" size={20} />
        </button>
        <div className="w-full flex justify-center items-start flex-col gap-4">
          <div className="w-fit h-fit">
            <FileText strokeWidth={2} />
          </div>
          {loading ? (
            <div className="w-full flex justify-center py-4">
              <BanterLoader para="Generating cheat sheet" />
            </div>
          ) : (
            <>
              <div className="w-full max-h-80 overflow-y-auto font-sans text-sm leading-relaxed bg-white p-4 box">
                <div className="markdown"><ReactMarkdown>{cheatSheet}</ReactMarkdown></div>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleCopy}
                  className="flex-1 box box-shadow bg-primary text-white px-4 py-2 flex items-center justify-center gap-2 font-bold text-sm uppercase cursor-pointer"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 box box-shadow bg-white text-black px-4 py-2 flex items-center justify-center gap-2 font-bold text-sm uppercase cursor-pointer"
                >
                  <Download size={16} /> Download .md
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CheatSheetModal;
