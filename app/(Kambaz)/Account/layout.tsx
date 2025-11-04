import type { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td valign="top"><AccountNavigation /></td>
            <td valign="top" width="100%">{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
