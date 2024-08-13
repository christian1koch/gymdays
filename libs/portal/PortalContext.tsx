import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PortalContextType {
  gates: { [key: string]: JSX.Element };
  teleport: (gateName: string, element: JSX.Element) => void;
}

export const PortalContext = createContext<PortalContextType>({
  gates: {},
  teleport: (gateName: string, element: JSX.Element) => {
    return;
  },
});

const usePortalContext = () => {
  const portalContext = useContext(PortalContext);

  if (!portalContext) {
    throw new Error(
      "portalContext has to be used within <PortalContext.Provider>"
    );
  }

  return portalContext;
};

export const CustomPortalProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [gates, setGates] = useState<{ [key: string]: JSX.Element }>({});
  const teleport = useCallback((gateName: string, element: JSX.Element) => {
    setGates((gates) => {
      return {
        ...gates,
        [gateName]: element,
      };
    });
  }, []);
  return (
    <PortalContext.Provider value={{ gates, teleport }}>
      {children}
    </PortalContext.Provider>
  );
};

interface PortalGateProps {
  name: string;
  children?: JSX.Element;
  isEntry?: boolean;
}

export const PortalGate = ({ name, children, isEntry }: PortalGateProps) => {
  const { gates, teleport } = usePortalContext();

  useEffect(() => {
    if (children && isEntry) {
      teleport(name, children);
    }
  }, [children, isEntry, name, teleport]);

  if (isEntry) {
    return null;
  }
  return <>{gates[name]}</>;
};
