import { FC, MutableRefObject, PropsWithChildren, Ref, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

type Props = PropsWithChildren<{
  onClick: () => void;
  onMount: (element: HTMLElement) => void;
}>;

export const Portal: FC<Props> = ({ onClick, onMount, children }) => {
  const onClickRef = useRef<typeof onClick>();
  onClickRef.current = onClick;

  const container = useMemo(() => {
    const elt = document.createElement('div');
    elt.style.position = 'fixed';
    elt.style.left = '0';
    elt.style.top = '0';
    elt.style.right = '0';
    elt.style.bottom = '0';
    elt.style.zIndex = '999';
    elt.dataset.yaComponent = 'ya-dropdown-menu-portal';
    elt.addEventListener('click', (e) => {
      if (e.target === elt && onClickRef.current) {
        onClickRef.current();
      }
    });
    document.body.append(elt);

    return elt;
  }, []);

  useEffect(() => {
    if (onMount) {
      onMount(container);
    }
    return () => container.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(children, container);
};
