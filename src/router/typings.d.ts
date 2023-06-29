declare type RouteConfig = {
  path?: string;
  name?: string;
  component?: React.FC;
  meta?: {
    auth?: boolean;
    title?: string;
    icon?: React.ReactNode;
    access?: string;
  };
  children?: RouteConfig[];
};
