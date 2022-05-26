import { SVGProps } from "react";

export interface SidebarRow {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    rowText: string;
    rowLink: string;
}
