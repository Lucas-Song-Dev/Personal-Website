/**
 * Single source for palette commands, help text, and command resolution.
 */

export interface CommandDef {
  cmd: string;
  syntax: string;
  description: string;
}

export const COMMANDS: CommandDef[] = [
  { cmd: "projects", syntax: "ls ~/projects/", description: "view my projects" },
  { cmd: "work", syntax: "ls ~/work/", description: "work experience" },
  { cmd: "skills", syntax: "cat ~/.skills", description: "skills & tools" },
  { cmd: "contact", syntax: 'mail -s "hello" lucas@', description: "get in touch" },
  { cmd: "resume", syntax: "cat resume.pdf", description: "download resume" },
  { cmd: "whoami", syntax: "whoami", description: "about lucas" },
  { cmd: "clear", syntax: "clear", description: "clear terminal" },
  { cmd: "help", syntax: "help", description: "show this list" },
];

/** Maps normalized user input to canonical command id (matches `cmd` or special keys like `about`). */
const COMMAND_LOOKUP: Record<string, string> = (() => {
  const map: Record<string, string> = {
    projects: "projects",
    "ls ~/projects/": "projects",
    "ls ~/projects": "projects",
    work: "work",
    "ls ~/work/": "work",
    "ls ~/work": "work",
    skills: "skills",
    "cat ~/.skills": "skills",
    contact: "contact",
    'mail -s "hello" lucas@': "contact",
    mail: "contact",
    resume: "resume",
    "cat resume.pdf": "resume",
    whoami: "whoami",
    "cat about.txt": "about",
    ls: "help",
    help: "help",
    clear: "clear",
  };
  for (const c of COMMANDS) {
    map[c.cmd] = c.cmd;
  }
  return map;
})();

export function resolveCommand(raw: string): string | null {
  const key = raw.trim().toLowerCase();
  return COMMAND_LOOKUP[key] ?? null;
}

/** Commands whose output is a large in-terminal section (heavier backdrop blur). */
export const SECTION_OUTPUT_COMMANDS = new Set([
  "projects",
  "work",
  "skills",
  "contact",
  "resume",
]);
