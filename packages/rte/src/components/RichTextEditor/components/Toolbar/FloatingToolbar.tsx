/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FloatingToolbarState, useFloatingToolbar, useFloatingToolbarState } from '@udecode/plate-floating';
import { useComposedRef } from '@udecode/react-utils';
import { type ReactNode, forwardRef } from 'react';

import { zIndexLayers } from '@components/RichTextEditor/helpers/zIndexLayers';
import { merge } from '@utilities/merge';

import { ToolbarWrapper } from './ToolbarWrapper';
import { createPortal } from 'react-dom';

export const FloatingToolbar = forwardRef<
    HTMLDivElement,
    {
        state?: FloatingToolbarState;
        className: string;
        children: ReactNode;
    }
>(({ state, children, className, ...props }, componentRef) => {
    const floatingToolbarState = useFloatingToolbarState({
        ...state,
        floatingOptions: {
            placement: 'top',
            ...state?.floatingOptions,
        },
    });

    const { ref: floatingRef, props: rootProps, hidden } = useFloatingToolbar(floatingToolbarState);

    const ref = useComposedRef<HTMLDivElement>(componentRef, floatingRef);

    if (hidden) {
        return null;
    }

    return createPortal(
        <ToolbarWrapper
            ref={ref}
            style={{
                ...rootProps.style,
                zIndex: zIndexLayers.floatingToolbar,
            }}
            className={merge([
                className,
                "tw-relative tw-flex tw-select-none tw-items-center tw-gap-1",
            ])}
            {...props}
        >
            {children}
        </ToolbarWrapper>,
        document.body,
    );
});

FloatingToolbar.displayName = 'FloatingToolbar';
