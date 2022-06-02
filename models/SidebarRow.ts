import { Dispatch, SetStateAction, SVGProps } from 'react';

export interface SidebarRow {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    rowText: string;
    rowLink: string;
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
}
