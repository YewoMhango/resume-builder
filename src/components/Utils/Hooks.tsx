import { useState, useCallback } from "react";

export function useDebouncedAction() {
  let [lastAction, setLastAction] = useState<{
    timeOutId: number;
  } | null>(null);

  let delayAction = useCallback(
    (performAction: () => void, timeDelay: number) => {
      if (lastAction !== null) {
        clearTimeout(lastAction.timeOutId);
      }
      setLastAction({
        timeOutId: setTimeout(() => {
          setLastAction(null);
          performAction();
        }, timeDelay),
      });
    },
    [lastAction]
  );

  return delayAction;
}
