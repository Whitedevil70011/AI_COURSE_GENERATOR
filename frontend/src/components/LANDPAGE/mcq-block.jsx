"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check, X, Sparkles, RefreshCw, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

type Question = {
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

const questions: Question[] = [
  {
    prompt: "Which technique helps a neural network avoid overfitting during training?",
    options: ["Increasing the learning rate", "Dropout regularization", "Removing the validation set", "Using a single epoch"],
    answer: 1,
    explanation: "Dropout randomly disables neurons during training, forcing the network to learn redundant, more general features.",
  },
  {
    prompt: "In supervised learning, what does the 'label' represent?",
    options: ["The model's architecture", "The known correct output for an example", "The number of layers", "The training duration"],
    answer: 1,
    explanation: "Labels are the ground-truth outputs the model learns to predict from the input features.",
  },
  {
    prompt: "What is the primary purpose of a learning rate?",
    options: ["To count training samples", "To control step size during optimization", "To label the data", "To split the dataset"],
    answer: 1,
    explanation: "The learning rate scales how much weights are adjusted on each optimization step — too high overshoots, too low is slow.",
  },
]

export function McqBlock() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[index]
  const answered = selected !== null

  function handleSelect(i: number) {
    if (answered) return
    setSelected(i)
    if (i === question.answer) setScore((s) => s + 1)
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  function handleReset() {
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <section id="quiz" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute right-1/4 top-1/2 size-[24rem] rounded-full bg-accent/8 blur-[130px]" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
            <Sparkles className="size-4" />
            AI-generated assessments
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Try a sample quiz
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Every course ships with interactive multiple-choice questions and instant explanations. Here&apos;s a live
            preview generated from a machine-learning module.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-border/70 bg-card/60 p-6 shadow-xl backdrop-blur-sm sm:p-8"
        >
          <AnimatePresence mode="wait">
            {finished ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <span className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Trophy className="size-8" />
                </span>
                <h3 className="mt-5 font-heading text-2xl font-bold">
                  You scored {score} / {questions.length}
                </h3>
                <p className="mt-2 max-w-sm leading-relaxed text-muted-foreground">
                  Imagine this tailored to any subject you choose — that&apos;s what every generated course includes.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/70"
                >
                  <RefreshCw className="size-4" />
                  Try again
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    Question {index + 1} of {questions.length}
                  </span>
                  <span className="font-mono text-xs text-accent">Score {score}</span>
                </div>
                {/* progress bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={false}
                    animate={{ width: `${((index + (answered ? 1 : 0)) / questions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h3 className="mt-6 font-heading text-lg font-semibold text-balance sm:text-xl">{question.prompt}</h3>

                <div className="mt-5 flex flex-col gap-3">
                  {question.options.map((option, i) => {
                    const isCorrect = i === question.answer
                    const isSelected = i === selected
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleSelect(i)}
                        disabled={answered}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-4 py-3.5 text-left text-sm transition-colors",
                          !answered && "hover:border-primary/50 hover:bg-secondary/50",
                          answered && isCorrect && "border-accent/60 bg-accent/10",
                          answered && isSelected && !isCorrect && "border-destructive/60 bg-destructive/10",
                        )}
                      >
                        <span className={cn(answered && isCorrect && "text-accent")}>{option}</span>
                        {answered && isCorrect && <Check className="size-5 shrink-0 text-accent" />}
                        {answered && isSelected && !isCorrect && <X className="size-5 shrink-0 text-destructive" />}
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {answered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 rounded-xl border border-border/70 bg-secondary/40 p-4">
                        <p className="text-xs font-medium text-primary">Explanation</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{question.explanation}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="mt-5 w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                      >
                        {index + 1 >= questions.length ? "See results" : "Next question"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
