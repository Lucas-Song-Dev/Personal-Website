import {
  useEffect,
  useCallback,
  useRef,
  type RefObject,
  type MutableRefObject,
} from "react";

export function useIdleSshKick({
  enabled,
  getIdleMs,
  outputRef,
  onKick,
  isKickingRef,
}: {
  enabled: boolean;
  getIdleMs: () => number;
  outputRef: RefObject<HTMLDivElement | null>;
  onKick: () => void;
  isKickingRef: MutableRefObject<boolean>;
}) {
  const onKickRef = useRef(onKick);
  onKickRef.current = onKick;

  const kick = useCallback(() => {
    onKickRef.current();
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let timeoutId: number | undefined;

    const arm = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      if (document.visibilityState !== "visible") return;
      if (isKickingRef.current) return;
      timeoutId = window.setTimeout(() => {
        kick();
      }, getIdleMs()) as number;
    };

    const onActivity = () => {
      if (isKickingRef.current) return;
      arm();
    };

    const opts = { capture: true, passive: true } as const;

    window.addEventListener("keydown", onActivity, opts);
    window.addEventListener("mousedown", onActivity, opts);
    window.addEventListener("touchstart", onActivity, opts);
    window.addEventListener("wheel", onActivity, opts);

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        if (timeoutId !== undefined) clearTimeout(timeoutId);
      } else {
        arm();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    const scrollEl = outputRef.current;
    scrollEl?.addEventListener("scroll", onActivity, opts);

    arm();

    return () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      window.removeEventListener("keydown", onActivity, opts);
      window.removeEventListener("mousedown", onActivity, opts);
      window.removeEventListener("touchstart", onActivity, opts);
      window.removeEventListener("wheel", onActivity, opts);
      document.removeEventListener("visibilitychange", onVis);
      scrollEl?.removeEventListener("scroll", onActivity, opts);
    };
  }, [enabled, getIdleMs, kick, outputRef, isKickingRef]);
}
