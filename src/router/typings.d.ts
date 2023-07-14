declare type RouteConfig = {
  path?: string;
  name?: string;
  component?: React.FC;
  meta?: {
    auth?: boolean;
    icon?: React.ReactNode;
    access?: string;
  };
  children?: RouteConfig[];
};
