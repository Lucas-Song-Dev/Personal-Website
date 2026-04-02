/** Shown in section headings and as the green prompt in the terminal shell. */
export const TERMINAL_PROMPT_DISPLAY = "[ec2-user@ip-172-31-14-88 ~]$";

/** Same string as the interactive shell prompt (kept in sync with TERMINAL_PROMPT_DISPLAY). */
export const TERMINAL_PROMPT = TERMINAL_PROMPT_DISPLAY;

export const SSH_HOST =
  "ec2-54-213-42-101.us-west-2.compute.amazonaws.com";

export const CMD_PALETTE_SEEN_KEY = "personal-site-terminal-cmd-palette-seen";

export const DEFAULT_IDLE_DISCONNECT_MS = 120_000;

export function getIdleDisconnectMs(): number {
  if (typeof window === "undefined") return DEFAULT_IDLE_DISCONNECT_MS;
  const raw = new URLSearchParams(window.location.search).get("idleKickMs");
  if (raw == null) return DEFAULT_IDLE_DISCONNECT_MS;
  const n = parseInt(raw, 10);
  if (Number.isFinite(n) && n >= 5_000 && n <= 600_000) return n;
  return DEFAULT_IDLE_DISCONNECT_MS;
}
