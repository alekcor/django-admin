import { ChildrenProps } from "../types/types";

export function Background({ children }: ChildrenProps) {
  return (
    <div
      className="site-layout-background"
      style={{ padding: 24 }}
    >
      {children}
    </div>
  );
}
