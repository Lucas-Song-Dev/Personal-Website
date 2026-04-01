"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import ASCIIText from "./ui/ASCIIText";
import CommandPopup, { COMMANDS } from "./CommandPopup";
import ProjectsSection from "./ProjectsSection";
import WorkSection from "./WorkSection";
import SkillsSection from "./SkillsSection";
import ContactSection from "./ContactSection";
import ResumeSection from "./ResumeSection";

const PROMPT = "[ec2-user@ip-172-31-14-88 ~]$";

/** Monospace command lines (prompt + typed command) — one size everywhere. */
const TERMINAL_CMD_CLASS = "text-sm";
/** Plain command output (responses, SSH banner text, errors). */
const TERMINAL_OUT_CLASS = "text-sm";

/** Once set, the command palette is not auto-opened on load again. */
const CMD_PALETTE_SEEN_KEY = "personal-site-terminal-cmd-palette-seen";

const SSH_HOST =
  "ec2-54-213-42-101.us-west-2.compute.amazonaws.com";

export interface TerminalShellHandle {
  runCommand: (command: string) => void;
}

interface HistoryEntry {
  id: number;
  command: string;
  output: React.ReactNode;
  /** When true, command line renders instantly (bootstrap history). */
  skipAnimation?: boolean;
}

function SshBootBlock() {
  return (
    <div
      className={`flex flex-col gap-2 mb-2 border-b border-secondary/20 pb-4 font-terminal ${TERMINAL_OUT_CLASS}`}
    >
      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-gray-500">$</span>
        <span className="text-secondary break-all">
          ssh -i &quot;~/.ssh/lucas-key.pem&quot; ec2-user@{SSH_HOST}
        </span>
      </div>
      <span className="whitespace-pre-wrap text-gray-400">
        {`The authenticity of host '${SSH_HOST}' cannot be established.
ED25519 key fingerprint is SHA256:dLucasSong/xK9mZ3HvQpR2wN7cBfYtUe.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes`}
      </span>
      <span className="text-gray-400">
        {`Warning: Permanently added '${SSH_HOST}' (ED25519) to the list of known hosts.`}
      </span>
      <span className="whitespace-pre-wrap text-gray-400">
        {`
       __|  __|_  )
       _|  (     /   Amazon Linux 2
      ___|\\__|___|  

https://aws.amazon.com/amazon-linux-2/
`}
      </span>
      <span className="text-gray-400">
        Last login: Wed Mar 25 10:42:03 2026 from 68.174.55.203
      </span>
      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-green-400 shrink-0">{PROMPT}</span>
        <span className="text-secondary">./portfolio.sh</span>
      </div>
      <span className="text-gray-400">
        Loading Lucas Song&apos;s portfolio... done.
      </span>
    </div>
  );
}

/** SSH boot sequence that types on the home terminal (replaces the old full-screen loading page). */
function SshBootTyping({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  const terminalSteps = useMemo(
    () => [
      {
        text: `ssh -i "~/.ssh/lucas-key.pem" ec2-user@${SSH_HOST}`,
        delay: 1200,
        isCommand: true,
      },
      {
        text: `The authenticity of host '${SSH_HOST}' cannot be established.\nED25519 key fingerprint is SHA256:dLucasSong/xK9mZ3HvQpR2wN7cBfYtUe.\nThis key is not known by any other names.\nAre you sure you want to continue connecting (yes/no/[fingerprint])? yes`,
        delay: 1400,
        isCommand: false,
      },
      {
        text: `Warning: Permanently added '${SSH_HOST}' (ED25519) to the list of known hosts.`,
        delay: 800,
        isCommand: false,
      },
      {
        text: `\n       __|  __|_  )\n       _|  (     /   Amazon Linux 2\n      ___|\\__|___|  \n\nhttps://aws.amazon.com/amazon-linux-2/\n`,
        delay: 1000,
        isCommand: false,
      },
      {
        text: `Last login: Wed Mar 25 10:42:03 2026 from 68.174.55.203`,
        delay: 600,
        isCommand: false,
      },
      { text: `./portfolio.sh`, delay: 1000, isCommand: true },
      { text: "Loading Lucas Song's portfolio... done.", delay: 700, isCommand: false },
    ],
    []
  );

  useEffect(() => {
    if (currentStep < terminalSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);

        if (currentStep === terminalSteps.length - 1) {
          setTimeout(() => {
            onComplete();
          }, 600);
        }
      }, terminalSteps[currentStep].delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, terminalSteps, onComplete]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div
      className={`relative mb-2 border-b border-secondary/20 pb-4 font-terminal ${TERMINAL_OUT_CLASS}`}
    >
      <button
        type="button"
        onClick={handleSkip}
        className={`absolute bottom-0 right-0 z-10 ${TERMINAL_CMD_CLASS} text-gray-500 opacity-60 hover:opacity-100 transition-opacity`}
      >
        Skip
      </button>

      <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
        <span className="text-gray-500">$</span>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "auto" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="overflow-hidden whitespace-nowrap text-secondary"
        >
          {terminalSteps[0].text}
        </motion.div>
      </div>

      {terminalSteps.slice(1).map((step, i) => {
        const stepIndex = i + 1;
        return (
          <AnimatePresence key={stepIndex}>
            {currentStep >= stepIndex && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="whitespace-pre-wrap text-gray-400"
              >
                {step.isCommand ? (
                  <div className={`flex gap-2 flex-wrap items-baseline ${TERMINAL_CMD_CLASS}`}>
                    <span className="text-green-400 shrink-0">{PROMPT}</span>
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: "auto" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="overflow-hidden whitespace-nowrap text-secondary"
                    >
                      {step.text}
                    </motion.span>
                  </div>
                ) : (
                  <span>{step.text}</span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {currentStep >= terminalSteps.length && (
        <div className={`flex gap-2 items-baseline mt-1 ${TERMINAL_CMD_CLASS}`}>
          <span className="text-green-400 shrink-0">{PROMPT}</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="inline-block w-2 h-[1.1em] bg-secondary align-middle"
          />
        </div>
      )}
    </div>
  );
}

function staticWhoamiOutput(): React.ReactNode {
  return (
    <span className={`text-gray-200 font-terminal ${TERMINAL_OUT_CLASS}`}>
      Lucas Song
    </span>
  );
}

function staticAboutOutput(): React.ReactNode {
  return (
    <div className="flex flex-col gap-1 font-terminal">
      <span className={`text-gray-400 opacity-90 ${TERMINAL_OUT_CLASS}`}>
        Computer Engineering @ UBC
      </span>
    </div>
  );
}

function resolveCommand(raw: string): string | null {
  const s = raw.trim().toLowerCase();
  const map: Record<string, string> = {
    projects:               "projects",
    "ls ~/projects/":       "projects",
    "ls ~/projects":        "projects",
    work:                   "work",
    "ls ~/work/":           "work",
    "ls ~/work":            "work",
    skills:                 "skills",
    "cat ~/.skills":        "skills",
    contact:                "contact",
    'mail -s "hello" lucas@': "contact",
    mail:                   "contact",
    resume:                 "resume",
    "cat resume.pdf":       "resume",
    whoami:                 "whoami",
    "cat about.txt":        "about",
    ls:                     "help",
    help:                   "help",
    clear:                  "clear",
  };
  return map[s] ?? null;
}

function buildOutput(canonical: string | null, raw: string): React.ReactNode {
  const fade = (children: React.ReactNode, delay = 0.3) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      {children}
    </motion.div>
  );

  switch (canonical) {
    case "whoami":
      return fade(
        <span className={`text-gray-200 font-terminal ${TERMINAL_OUT_CLASS}`}>
          Lucas Song
        </span>
      );

    case "about":
      return fade(
        <div className="flex flex-col gap-1 font-terminal">
          <span className={`text-gray-400 opacity-90 ${TERMINAL_OUT_CLASS}`}>
            Computer Engineering @ UBC
          </span>
        </div>
      );

    case "help":
      return fade(
        <div className={`font-terminal ${TERMINAL_OUT_CLASS}`}>
          <div className="text-gray-400 mb-3">Available commands:</div>
          <div className="grid gap-2">
            {COMMANDS.map((c) => (
              <div key={c.cmd} className="flex gap-4 items-baseline">
                <span className="text-secondary w-20 shrink-0">{c.cmd}</span>
                <span className="text-gray-500 w-40 shrink-0 hidden sm:block">
                  {c.syntax}
                </span>
                <span className="text-gray-400">{c.description}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-gray-600">
            tip: click the prompt or press Tab to open the command picker
          </div>
        </div>
      );

    case "projects":
      return <ProjectsSection inTerminal />;
    case "work":
      return <WorkSection inTerminal />;
    case "skills":
      return <SkillsSection inTerminal />;
    case "contact":
      return <ContactSection inTerminal />;
    case "resume":
      return <ResumeSection inTerminal />;

    default:
      return fade(
        <span className={`text-red-400 font-terminal ${TERMINAL_OUT_CLASS}`}>
          bash: {raw}: command not found
        </span>
      );
  }
}

const TerminalShell = forwardRef<TerminalShellHandle, object>(
  (_, ref) => {
  const [sshBootComplete, setSshBootComplete] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupHighlight, setPopupHighlight] = useState(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);

  const markPaletteSeen = useCallback(() => {
    try {
      localStorage.setItem(CMD_PALETTE_SEEN_KEY, "1");
    } catch {
      /* private mode / quota */
    }
  }, []);

  const dismissPopup = useCallback(() => {
    setPopupOpen(false);
    markPaletteSeen();
  }, [markPaletteSeen]);

  const outputRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounterRef = useRef(0);
  const skipInitialScrollRef = useRef(true);
  const suppressNextScrollIntoViewRef = useRef(false);

  const nextId = () => ++idCounterRef.current;

  const handleSshBootComplete = useCallback(() => {
    setSshBootComplete(true);
  }, []);

  const filteredCommands = inputValue
    ? COMMANDS.filter(
        (c) =>
          c.cmd.startsWith(inputValue.toLowerCase()) ||
          c.syntax.startsWith(inputValue.toLowerCase())
      )
    : COMMANDS;

  const executeCommand = useCallback((rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const canonical = resolveCommand(trimmed);

    if (canonical === "clear") {
      setHistory([]);
      return;
    }

    const output = buildOutput(canonical, trimmed);
    const entry: HistoryEntry = { id: nextId(), command: trimmed, output };

    setHistory((prev) => [...prev, entry]);
    setCmdHistory((prev) => [trimmed, ...prev.slice(0, 49)]);
    setCmdHistoryIdx(-1);
  }, []);

  // Keep a ref so useImperativeHandle always has the latest version
  const executeCommandRef = useRef(executeCommand);
  executeCommandRef.current = executeCommand;

  useImperativeHandle(ref, () => ({
    runCommand: (cmd: string) => executeCommandRef.current(cmd),
  }));

  useEffect(() => {
    if (!sshBootComplete) return;
    setHistory((prev) => {
      if (prev.length > 0) return prev;
      idCounterRef.current = 2;
      suppressNextScrollIntoViewRef.current = true;
      return [
        { id: 1, command: "whoami", output: staticWhoamiOutput(), skipAnimation: true },
        { id: 2, command: "cat about.txt", output: staticAboutOutput(), skipAnimation: true },
      ];
    });
  }, [sshBootComplete]);

  /** First visit only: open the command palette after boot so users see available commands. */
  useEffect(() => {
    if (!sshBootComplete) return;
    let seen = true;
    try {
      seen = localStorage.getItem(CMD_PALETTE_SEEN_KEY) === "1";
    } catch {
      seen = true;
    }
    if (seen) return;
    const t = window.setTimeout(() => {
      setPopupOpen(true);
      inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(t);
  }, [sshBootComplete]);

  // After bootstrap, scroll new entries into view; first paint stays at top (SSH + session)
  useEffect(() => {
    if (suppressNextScrollIntoViewRef.current) {
      suppressNextScrollIntoViewRef.current = false;
      requestAnimationFrame(() => {
        outputRef.current?.scrollTo({ top: 0, behavior: "instant" });
      });
      return;
    }
    if (skipInitialScrollRef.current) {
      skipInitialScrollRef.current = false;
      if (outputRef.current) {
        outputRef.current.scrollTop = 0;
      }
      return;
    }
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [history]);

  const handlePopupSelect = (cmd: string) => {
    markPaletteSeen();
    executeCommand(cmd);
    setInputValue("");
    setPopupOpen(false);
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    const cmd = inputValue.trim();
    if (cmd) {
      if (popupOpen && filteredCommands.length > 0) {
        const safeIdx = Math.min(popupHighlight, filteredCommands.length - 1);
        handlePopupSelect(filteredCommands[safeIdx].cmd);
      } else {
        executeCommand(cmd);
        setInputValue("");
        dismissPopup();
      }
    } else {
      setInputValue("");
      dismissPopup();
    }
    setCmdHistoryIdx(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        handleSubmit();
        break;

      case "Escape":
        dismissPopup();
        break;

      case "Tab":
        e.preventDefault();
        setPopupOpen(true);
        break;

      case "ArrowUp":
        e.preventDefault();
        if (popupOpen) {
          setPopupHighlight((i) => Math.max(0, i - 1));
        } else {
          const nextIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
          setCmdHistoryIdx(nextIdx);
          if (cmdHistory[nextIdx] !== undefined) setInputValue(cmdHistory[nextIdx]);
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (popupOpen) {
          setPopupHighlight((i) => Math.min(i + 1, filteredCommands.length - 1));
        } else {
          if (cmdHistoryIdx <= 0) {
            setCmdHistoryIdx(-1);
            setInputValue("");
          } else {
            const nextIdx = cmdHistoryIdx - 1;
            setCmdHistoryIdx(nextIdx);
            if (cmdHistory[nextIdx] !== undefined) setInputValue(cmdHistory[nextIdx]);
          }
        }
        break;
    }
  };

    return (
    <div className="fixed inset-0">
      {/* ASCII background badge */}
      <motion.div
        className="absolute top-4 right-12 z-[1] h-80 w-160 md:h-[28rem] md:w-[32rem] pointer-events-none overflow-hidden rounded-md blur-[1px] opacity-80"
        animate={{ rotate: [0, -50, 50, -50] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <ASCIIText text="Lucas" enableWaves={true} asciiFontSize={12} />
      </motion.div>

      {/* Haze layer */}
      {/* <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background/60 via-background/40 to-background/70" /> */}

      {/* Terminal UI */}
      <div className="absolute inset-0 z-[2] flex min-h-0 min-w-0 flex-col font-terminal px-4 md:px-20 2xl:px-40 overflow-x-hidden ">
        {/* Scrollable history — keep below the input bar + popup */}
        <div
          ref={outputRef}
          className="relative z-0 min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden py-8 flex flex-col gap-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(100,200,100,0.2) transparent",
          }}
        >
          {!sshBootComplete ? (
            <SshBootTyping onComplete={handleSshBootComplete} />
          ) : (
            <>
              <SshBootBlock />
              {history.map((entry, index) => (
                <div
                  key={entry.id}
                  ref={index === history.length - 1 ? lastEntryRef : null}
                  className="flex flex-col gap-1"
                >
                  {/* Prompt + typed command */}
                  <div
                    className={`flex gap-2 items-baseline flex-wrap ${TERMINAL_CMD_CLASS}`}
                  >
                    <span className="text-green-400 shrink-0">{PROMPT}</span>
                    {entry.skipAnimation ? (
                      <span className="text-secondary break-all">{entry.command}</span>
                    ) : (
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="overflow-hidden whitespace-nowrap text-secondary"
                      >
                        {entry.command}
                      </motion.span>
                    )}
                  </div>

                  {/* Command output */}
                  <div className="pl-0 mt-1">{entry.output}</div>
                </div>
              ))}
            </>
          )}

          {/* Bottom spacer so last entry isn't hidden behind sticky input */}
          <div className="h-6" />
        </div>

        {/* Sticky input + command palette — high z-index so popup sits above project images */}
        <div className="relative z-[200] isolate flex-none border-t border-secondary/20 bg-background/85 py-3 shadow-[0_-12px_32px_rgba(0,0,0,0.45)] backdrop-blur-md">
          <AnimatePresence>
            {popupOpen && (
              <CommandPopup
                highlightIndex={popupHighlight}
                onSelect={handlePopupSelect}
                filter={inputValue}
              />
            )}
          </AnimatePresence>

          <div
            className="flex gap-2 items-center cursor-text"
            onClick={() => {
              inputRef.current?.focus();
              setPopupOpen(true);
            }}
          >
            <span className={`text-green-400 shrink-0 ${TERMINAL_CMD_CLASS}`}>
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              value={inputValue}
              placeholder="Type a command (e.g. projects, help)…"
              onChange={(e) => {
                setInputValue(e.target.value);
                setPopupHighlight(0);
              }}
              onFocus={() => setPopupOpen(true)}
              onBlur={() => setTimeout(() => dismissPopup(), 150)}
              onKeyDown={handleKeyDown}
              className={`bg-transparent outline-none text-secondary placeholder:text-gray-600 placeholder:italic flex-1 caret-secondary min-w-0 ${TERMINAL_CMD_CLASS}`}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal command input"
            />
            {/* Blinking block cursor shown when input is empty */}
            {inputValue === "" && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-[9px] h-[1.1em] bg-secondary align-middle pointer-events-none"
              />
            )}
          </div>
        </div>
      </div>
    </div>
    );
  }
);

TerminalShell.displayName = "TerminalShell";
export default TerminalShell;
