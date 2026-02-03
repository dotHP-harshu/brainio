const HOW_IT_WORKS_STEPS = [
  "Enter your topic or paste your study notes.",
  "AI generates a custom quiz based on settings.",
  "Get instant results and explanations.",
];

function HowItWorks() {
  return (
    <aside className="bg-secondary/40 box box-shadow p-4 space-y-4 h-fit">
      <h2 className="text-base font-semibold tracking-tight">How it Works</h2>
      <ul className="space-y-2">
        {
            HOW_IT_WORKS_STEPS.map((step, index)=>(
                <li key={step} className="flex justify-start items-start gap-2">
                    <span className="text-secondary bg-primary aspect-square p-1 rounded-full h-5 w-5 flex justify-center items-center">{index+1}</span>
                    <p className="text-base leading-none ">{step}</p>

                </li>
            ))
        }
      </ul>
    </aside>
  );
}

export default HowItWorks;
