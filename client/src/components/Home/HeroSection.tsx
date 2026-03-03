import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkle } from "lucide-react";

function HeroSection() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      <div className="absolute top-20 left-10 hidden lg:block transform -rotate-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-32 h-32 bg-teal-500 border-4 border-black rounded-full flex items-center justify-center"
        >
          <span className="text-white">
            <GraduationCap size={60} />
          </span>
        </motion.div>
      </div>
      <div className="absolute bottom-60 right-10 hidden lg:block transform rotate-12">
        <motion.div
          initial={{ rotate: 45 }}
          animate={{ rotate: 180 }}
          className="w-24 h-24 bg-secondary border-4 border-black flex items-center justify-center"
        >
          <span className="">
            <Sparkle size={60} />
          </span>
        </motion.div>
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block bg-primary text-white font-bold px-4 py-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 transform -rotate-2">
          Student First v2
        </div>
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="overflow-hidden h-fit w-fit"
        >
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tight">
            Stop Guessing. <br />
            <span className="text-primary relative inline-block">
              Start Mastering.
              <svg
                className="absolute -bottom-4 w-full h-4 left-0 text-black"
                fill="none"
                viewBox="0 0 200 9"
              >
                <path
                  d="M2.00026 6.99997C2.00026 6.99997 45.0003 3.00003 99.0003 3.00003C153.001 3.00003 197.001 7 197.001 7"
                  stroke="black"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
            </span>
          </h1>
        </motion.div>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl mx-auto font-medium">
          Transform any 5-word topic into a deep-dive assessment. Whether it's
          Organic Chemistry or ES6 Closures, Brainio builds the path to 100%
          accuracy.
        </p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="bg-primary box shadow-[5px_5px_0px_var(--color-text)] transition-all duration-200 hover:tranlate-[3px] hover:shadow-[2px_2px_0px_var(--color-text)] inline-flex items-center gap-3 px-10 py-5 text-2xl font-black rounded-lg uppercase tracking-wider group"
          href="/generator"
        >
          Create My Test <ArrowRight />
        </motion.a>
        <p className="mt-4 font-mono text-gray-500 text-lg rotate-1">
          No signup required to try!
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
