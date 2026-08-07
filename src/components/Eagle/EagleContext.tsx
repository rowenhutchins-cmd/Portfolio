"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type EagleState = "idle" | "flying" | "perched";

interface EagleContextValue {
  state: EagleState;
  flightId: number;
  treeVisible: boolean;
  trigger: () => void;
  dismiss: () => void;
  completeLanding: () => void;
  setTreeVisible: (visible: boolean) => void;
}

const EagleContext = createContext<EagleContextValue | null>(null);

export const EagleProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<EagleState>("idle");
  const [flightId, setFlightId] = useState(0);
  const [treeVisible, setTreeVisible] = useState(true);

  const trigger = useCallback(() => {
    setState("flying");
    setFlightId((id) => id + 1);
  }, []);

  const dismiss = useCallback(() => {
    setState("idle");
  }, []);

  const completeLanding = useCallback(() => {
    setState((current) => (current === "flying" ? "perched" : current));
  }, []);

  return (
    <EagleContext.Provider
      value={{
        state,
        flightId,
        treeVisible,
        trigger,
        dismiss,
        completeLanding,
        setTreeVisible,
      }}
    >
      {children}
    </EagleContext.Provider>
  );
};

export const useEagle = () => {
  const ctx = useContext(EagleContext);
  if (!ctx) {
    throw new Error("useEagle must be used within an EagleProvider");
  }
  return ctx;
};
