
export interface AppInterface {
  id: string;
  name: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  onOpen?: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
}
