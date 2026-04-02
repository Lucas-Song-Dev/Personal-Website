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
import CommandPopup from "./CommandPopup";
import { SshBootBlock } from "@/components/terminal/SshBootBlock";
import { SshBootTyping } from "@/components/terminal/SshBootTyping";
import {
  whoamiOutputNode,
  aboutOutputNode,
  buildOutput,
} from "@/components/terminal/terminalCommands";
import { TERMINAL_CMD_CLASS, TERMINAL_OUT_CLASS } from "@/components/terminal/terminalLineClasses";
import {
  CMD_PALETTE_SEEN_KEY,
  DEFAULT_IDLE_DISCONNECT_MS,
  getIdleDisconnectMs,
  SSH_HOST,
  TERMINAL_PROMPT,
} from "@/lib/terminalConstants";
import {
  resolveCommand,
  SECTION_OUTPUT_COMMANDS,
  COMMANDS,
} from "@/lib/terminalCommandRegistry";
import { useIdleSshKick } from "@/hooks/useIdleSshKick";

export interface TerminalShellHandle {
  runCommand: (command: string) => void;
}

interface HistoryEntry {
  id: number;
  command: string;
  output: React.ReactNode;
  skipAnimation?: boolean;
  outputOnly?: boolean;
}

const TerminalShell = forwardRef<TerminalShellHandle, object>((_, ref) => {
  const [sshBootComplete, setSshBootComplete] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupHighlight, setPopupHighlight] = useState(0);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [isIdleDisconnecting, setIsIdleDisconnecting] = useState(false);

  const isKickingIdleRef = useRef(false);
  const idleMsRef = useRef(DEFAULT_IDLE_DISCONNECT_MS);
  const sshBootCompleteRef = useRef(false);

  useEffect(() => {
    sshBootCompleteRef.current = sshBootComplete;
  }, [sshBootComplete]);

  useEffect(() => {
    idleMsRef.current = getIdleDisconnectMs();
  }, []);

  const getIdleMs = useCallback(() => idleMsRef.current, []);

  const outputRef = useRef<HTMLDivElement>(null);
  const lastEntryRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounterRef = useRef(0);
  const skipInitialScrollRef = useRef(true);
  const suppressNextScrollIntoViewRef = useRef(false);

  const nextId = () => ++idCounterRef.current;

  const kickIdleSession = useCallback(() => {
    if (isKickingIdleRef.current || !sshBootCompleteRef.current) return;
    isKickingIdleRef.current = true;
    setIsIdleDisconnecting(true);
    inputRef.current?.blur();

    const disconnectOutput = (
      <div className={`font-terminal ${TERMINAL_OUT_CLASS} text-red-400/90`}>
        <p>Symptom: Connection reset by peer after sitting idle for a while.</p>
        <p className="text-gray-500 mt-2">Connection to {SSH_HOST} closed.</p>
      </div>
    );

    setHistory((prev) => [
      ...prev,
      {
        id: ++idCounterRef.current,
        command: "",
        output: disconnectOutput,
        skipAnimation: true,
        outputOnly: true,
      },
    ]);

    window.setTimeout(() => {
      setSshBootComplete(false);
      setHistory([]);
      setInputValue("");
      setCmdHistory([]);
      setCmdHistoryIdx(-1);
      idCounterRef.current = 0;
      skipInitialScrollRef.current = true;
      suppressNextScrollIntoViewRef.current = true;
      setIsIdleDisconnecting(false);
      isKickingIdleRef.current = false;
    }, 2_500);
  }, []);

  useIdleSshKick({
    enabled: sshBootComplete,
    getIdleMs,
    outputRef,
    onKick: kickIdleSession,
    isKickingRef: isKickingIdleRef,
  });

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

  const asciiBackdropHeavyBlur = useMemo(
    () =>
      history.some((entry) => {
        const c = resolveCommand(entry.command);
        return c !== null && SECTION_OUTPUT_COMMANDS.has(c);
      }),
    [history]
  );

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
        {
          id: 1,
          command: "whoami",
          output: whoamiOutputNode(),
          skipAnimation: true,
        },
        {
          id: 2,
          command: "cat about.txt",
          output: aboutOutputNode(),
          skipAnimation: true,
        },
      ];
    });
  }, [sshBootComplete]);

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
      <div
        className={`absolute inset-0 z-0 pointer-events-none opacity-30 bg-gradient-to-b from-background/35 via-background/20 to-background/45 ${
          asciiBackdropHeavyBlur ? "blur-[16px]" : "blur-[2px]"
        }`}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [1, 0.3, 0, 0.3, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ASCIIText text="FULLSTACK" enableWaves={false} asciiFontSize={8} />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: [0, 0.5, 1, 0.5, 0] }}
          transition={{
            duration: 5,
            delay: 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ASCIIText text="DEVELOPER" enableWaves={false} asciiFontSize={8} />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-[2] flex min-h-0 min-w-0 flex-col font-terminal px-4 md:px-20 2xl:px-40 overflow-x-hidden">
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
                  {!entry.outputOnly && (
                    <div
                      className={`flex gap-2 items-baseline flex-wrap ${TERMINAL_CMD_CLASS}`}
                    >
                      <span className="text-green-400 shrink-0">{TERMINAL_PROMPT}</span>
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
                  )}

                  <div className="pl-0 mt-1">{entry.output}</div>
                </div>
              ))}
            </>
          )}

          <div className="h-6" />
        </div>

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
            className={`flex gap-2 items-center ${isIdleDisconnecting ? "pointer-events-none opacity-60" : "cursor-text"}`}
            onClick={() => {
              if (isIdleDisconnecting) return;
              inputRef.current?.focus();
              setPopupOpen(true);
            }}
          >
            <span className={`text-green-400 shrink-0 ${TERMINAL_CMD_CLASS}`}>
              {TERMINAL_PROMPT}
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
              disabled={isIdleDisconnecting}
              className={`bg-transparent outline-none text-secondary placeholder:text-gray-600 placeholder:italic flex-1 caret-secondary min-w-0 disabled:opacity-50 disabled:cursor-not-allowed ${TERMINAL_CMD_CLASS}`}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-label="terminal command input"
            />
            {inputValue === "" && !isIdleDisconnecting && (
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
