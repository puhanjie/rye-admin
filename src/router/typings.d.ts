declare type RouteConfig = {
  path?: string;
  name?: string;
  component?: React.FC;
  meta?: {
    icon?: React.ReactNode;
    access?: string;
  };
  children?: RouteConfig[];
};
