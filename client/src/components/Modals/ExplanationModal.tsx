import { Plus, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { explainMistakeApi } from "../../service/serverApi";
import BanterLoader from "../BanterLoader";

interface ExplanationModalProps {
  question: string;
  correctAnswer: string;
  userAnswer: string;
  hideModal: () => void;
}

function ExplanationModal({
  question,
  correctAnswer,
  userAnswer,
  hideModal,
}: ExplanationModalProps) {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchExplanation = async () => {
      const { data } = await explainMistakeApi(
        question,
        correctAnswer,
        userAnswer,
      );
      if (data) {
        setExplanation((data as { explanation: string }).explanation);
      }
      setLoading(false);
    };
    fetchExplanation();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return;
    const box = modalRef.current.querySelector("#explanation-box") as HTMLDivElement;

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

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex items-center justify-center z-30 bg-[#ffffff42] backdrop-blur-md p-6 w-screen h-screen"
    >
      <div
        id="explanation-box"
        className="relative box box-shadow p-6 flex justify-center items-center flex-col gap-6 w-full max-w-md bg-secondary/80 pt-10"
      >
        <button
          onClick={hideModal}
          className="absolute top-4 right-4 outline-none cursor-pointer"
        >
          <Plus className="rotate-45" size={20} />
        </button>
        <div className="w-full flex justify-center items-start flex-col gap-4">
          <div className="w-fit h-fit">
            <Sparkles strokeWidth={2} className="fill-error" />
          </div>
          {loading ? (
            <div className="w-full flex justify-center py-4">
              <BanterLoader para="Analyzing your mistake" />
            </div>
          ) : (
            <div className="w-full max-h-80 overflow-y-auto font-sans text-sm leading-relaxed bg-white p-4 box">
              <div className="markdown"><ReactMarkdown>{explanation}</ReactMarkdown></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplanationModal;
