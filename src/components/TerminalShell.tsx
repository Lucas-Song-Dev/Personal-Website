"use client";

import React, {
  useState,
  useEffect,
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

export interface TerminalShellHandle {
  runCommand: (command: string) => void;
}

interface HistoryEntry {
  id: number;
  command: string;
  output: React.ReactNode;
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
      return fade(<span className="text-gray-200 font-terminal">Lucas Song</span>);

    case "about":
      return fade(
        <div className="flex flex-col gap-1 font-terminal">
          <span className="text-gray-300 text-responsive-h6 opacity-90">
            Computer Engineering @ UBC
          </span>
          <h2 className="text-responsive-h1 font-terminal text-white">
            FULL STACK DEVELOPER
          </h2>
        </div>
      );

    case "help":
      return fade(
        <div className="font-terminal text-sm">
          <div className="text-gray-400 mb-3">Available commands:</div>
          <div className="grid gap-2">
            {COMMANDS.map((c) => (
              <div key={c.cmd} className="flex gap-4 items-baseline">
                <span className="text-secondary w-20 shrink-0">{c.cmd}</span>
                <span className="text-gray-500 w-40 shrink-0 hidden sm:block text-xs">
                  {c.syntax}
                </span>
                <span className="text-gray-400 text-xs">{c.description}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-gray-600 text-xs">
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
        <span className="text-red-400 font-terminal text-sm">
          bash: {raw}: command not found
        </span>
      );
  }
}

const TerminalShell = forwardRef<TerminalShellHandle, {}>((_, ref) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupHighlight, setPopupHighlight] = useState(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);

  const outputRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounterRef = useRef(0);
  const initDoneRef = useRef(false);

  const nextId = () => ++idCounterRef.current;

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

  // Scroll so the top of the newest entry is visible when history changes
  useEffect(() => {
    if (lastEntryRef.current) {
      lastEntryRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }, [history]);

  // Initial auto-run: whoami then cat about.txt
  useEffect(() => {
    if (initDoneRef.current) return;
    initDoneRef.current = true;
    const t1 = setTimeout(() => executeCommandRef.current("whoami"), 400);
    const t2 = setTimeout(() => executeCommandRef.current("cat about.txt"), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handlePopupSelect = (cmd: string) => {
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
        setPopupOpen(false);
      }
    } else {
      setInputValue("");
      setPopupOpen(false);
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
        setPopupOpen(false);
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
      {/* ASCII background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ASCIIText text="Lucas_Song   " enableWaves={true} asciiFontSize={8} />
      </div>

      {/* Haze layer */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background/60 via-background/40 to-background/70 backdrop-blur-[2px]" />

      {/* Terminal UI */}
      <div className="absolute inset-0 z-[2] flex flex-col h-full font-terminal px-4 md:px-20 2xl:px-40">
        {/* Scrollable history */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto py-8 flex flex-col gap-4"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(100,200,100,0.2) transparent",
          }}
        >
          {history.map((entry, index) => (
            <div
              key={entry.id}
              ref={index === history.length - 1 ? lastEntryRef : null}
              className="flex flex-col gap-1"
            >
              {/* Prompt + typed command */}
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-green-400 text-sm md:text-base shrink-0">
                  {PROMPT}
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="overflow-hidden whitespace-nowrap text-secondary"
                >
                  {entry.command}
                </motion.span>
              </div>

              {/* Command output */}
              <div className="pl-0 mt-1">{entry.output}</div>
            </div>
          ))}

          {/* Bottom spacer so last entry isn't hidden behind sticky input */}
          <div className="h-6" />
        </div>

        {/* Sticky input area */}
        <div className="flex-none border-t border-secondary/20 py-3 relative bg-background/30 backdrop-blur-sm">
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
            <span className="text-green-400 text-sm md:text-base shrink-0">
              {PROMPT}
            </span>
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setPopupHighlight(0);
              }}
              onFocus={() => setPopupOpen(true)}
              onBlur={() => setTimeout(() => setPopupOpen(false), 150)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-secondary flex-1 caret-secondary text-sm md:text-base min-w-0"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal input"
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
});

TerminalShell.displayName = "TerminalShell";
export default TerminalShell;
