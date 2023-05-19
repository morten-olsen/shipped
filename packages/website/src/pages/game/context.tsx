import { createContext, useCallback, useEffect, useMemo, useState } from "react";

type GameContextValue = {
  all: Record<string, string>
  selected?: string;
  setSelected: (name: string) => void;
  value?: string;
  setValue: (value: string) => void;
  create: (name: string, value: string) => void;
  remove: (name: string) => void;
}

type GameProviderProps = {
  children: React.ReactNode;
};

const GameContext = createContext<GameContextValue>(undefined as any);

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [all, setAll] = useState<Record<string, string>>(
    JSON.parse(localStorage.getItem('ai') || '{}'),
  );
  const [selected, setSelected] = useState<string>();

  const create = useCallback((name: string, value: string) => {
    setAll((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelected(name);
  }, [setAll]);

  const remove = useCallback((name: string) => {
    setAll((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, [setAll]);

  const setValue= useCallback((value: string) => {
    if (!selected) return;
    setAll((prev) => ({
      ...prev,
      [selected]: value,
    }));
  }, [selected, setAll]);

  const value = useMemo(() => {
    if (!selected) return;
    return all[selected];
  }, [selected, all]);

  useEffect(() => {
    localStorage.setItem('ai', JSON.stringify(all));
  }, [all]);

  return (
    <GameContext.Provider
      value={{
        create,
        selected,
        setSelected,
        value,
        setValue,
        all,
        remove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };