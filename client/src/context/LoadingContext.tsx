import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export type AlertInfo = {
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
} | null;

type LoadingState = {
  alert: AlertInfo;
  showAlert: (alertInfo: AlertInfo) => void;
  progress: number;
  setProgress: (progress: number) => void;
};

const LoadingContext = createContext<LoadingState | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('Loading context error.');
  }
  return context;
}

type LoadingContextProviderProps = {
  children: ReactNode;
};

export function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [alert, setAlert] = useState<AlertInfo>(null);
  const [progress, setProgress] = useState(0);

  const showAlert = useCallback((alertInfo: AlertInfo) => {
    setAlert(alertInfo);
  }, []);

  return (
    <LoadingContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ alert, showAlert, progress, setProgress }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
