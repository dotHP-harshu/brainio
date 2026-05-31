import { Bot, Mic, MicOff } from "lucide-react";
import type {
  AnswerActionInterface,
  SubjectiveQuestionInterface,
} from "../../types/types";
import { useEffect, useRef, useState } from "react";
import HintModal from "../Modals/HintModal";

interface SubjectiveQuestionProps {
  question: SubjectiveQuestionInterface;
  answerDispatch: (action: AnswerActionInterface) => void;
  answer: string;
}

function SubjectiveQuestion({
  question,
  answerDispatch,
  answer,
}: SubjectiveQuestionProps) {
  const [isShowingHint, setIsShowingHint] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceUnsupported, setVoiceUnsupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceUnsupported(true);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      answerDispatch({
        type: "SET_ANSWER",
        payload: { ans: transcript, id: question.id },
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {isShowingHint && (
        <HintModal
          hint={question.hint}
          hideModal={() => setIsShowingHint(false)}
        />
      )}
      {/* Question  */}
      <h3 className="font-bold font-sans text-2xl max-xs:text-xl leading-none ">
        {question.question}
      </h3>
      {/* Question  */}
      {/* answer box */}
      <div className="w-full border border-text  ">
        <textarea
          value={answer}
          onChange={(e) =>
            answerDispatch({
              type: "SET_ANSWER",
              payload: { ans: e.target.value, id: question.id },
            })
          }
          placeholder="Type your answer here...."
          className="placeholder:text-text-muted w-full resize-none outline-none p-4 placeholder:font-semibold placeholder:font-sans max-xs:p-2"
          rows={8}
        ></textarea>
        <div className="flex items-center justify-end gap-2 m-4">
          {voiceUnsupported && (
            <span className="text-xs text-text-muted font-medium">
              Voice input works best in Chrome/Edge
            </span>
          )}
          {!voiceUnsupported && (
            <button
              onClick={toggleListening}
              className={`flex justify-center items-center outline-none border border-text shadow-[2px_2px_var(--color-text)] px-4 py-2 gap-4 cursor-pointer ${
                isListening ? "bg-primary text-white" : ""
              }`}
            >
              <span>
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </span>
              <span className="font-bold tracking-tight uppercase max-xs:hidden text-sm">
                {isListening ? "stop recording" : "voice input"}
              </span>
            </button>
          )}
          <button
            onClick={() => setIsShowingHint(true)}
            className="flex justify-center items-center outline-none border border-text shadow-[2px_2px_var(--color-text)] px-4 py-2 gap-4 cursor-pointer"
          >
            <span>
              <Bot />
            </span>
            <span className="font-bold tracking-tight uppercase max-xs:hidden text-sm">
              ai assistant hint
            </span>
          </button>
        </div>
      </div>
      {/* answer box */}
    </>
  );
}

export default SubjectiveQuestion;
