const options = [
  "print('Hello, World!')",
  "System.out.println('Hello, World!')",
  "console.log('Hello, World!')",
  "echo 'Hello, World!'",
];

const OPTION_LABELS = ["A", "B", "C", "D"];

function ObjectiveQuestion() {
  return (
    <>
      {/* Question  */}
      <h3 className="font-bold text-2xl max-xs:text-xl leading-none">
        Describe the main differences between UX and UI design in a few
        sentences.
      </h3>
      {/* Question  */}
      {/* options  */}
      <div className="grid grid-cols-2 gap-2 max-xs:grid-cols-1">
        {options.map((opt, index) => (
          <label
            key={"opt" + index}
            className="box flex p-2 gap-2 items-center justify-start cursor-pointer has-checked:bg-secondary group"
          >
            <input
              type="radio"
              name={"opt"}
              value={opt}
              id={"opt" + index}
              className="appearance-none peer"
            />
            <p className="border border-text px-1 font-sans font-bold peer-checked:bg-primary group-hover:bg-text group-hover:text-white peer-checked:group-hover:text-text">
              {OPTION_LABELS[index]}
            </p>
            <p className="text-base font-bold tracking-tight">{opt}</p>
          </label>
        ))}
      </div>
      {/* options  */}
    </>
  );
}

export default ObjectiveQuestion;
