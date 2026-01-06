// Type declarations to fix react-helmet-async JSX compatibility
import 'react-helmet-async';

declare module 'react-helmet-async' {
    import { ReactNode } from 'react';

    export interface HelmetProps {
        children?: ReactNode;
    }
}

// Extend JSX IntrinsicElements to recognize title within Helmet context
declare global {
    namespace JSX {
        interface IntrinsicElements {
            title: React.DetailedHTMLProps<React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
        }
    }
}

export { };
