import * as React from 'react';
import 'styles/components/shared/ul.scss';

type ChildElems = (JSX.Element | null) | (JSX.Element | null)[]

export default function GlassCard ({ children }:{ children: ChildElems }) {

    return (
        <article 
        className="glassCard__container">
           {children}
        </article>
    )
}
