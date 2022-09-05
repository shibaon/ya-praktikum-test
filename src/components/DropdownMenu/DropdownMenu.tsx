import React, {
  FC,
  memo,
  PropsWithChildren,
  useCallback,
  useEffect, MouseEvent,
  useRef, useState,
} from 'react';
import { cn } from './utils/cn';
import { Portal } from './Portal';
import { ReactComponent as MenuVerticalIcon } from './icons/menu-vertical-icon.svg';

import styles from './styles.module.css';

type Props = PropsWithChildren<{
  className?: string;
  showOnHover?: boolean;
  triggerComponent?: FC,
  isOpened?: boolean;
  onOpenedChange?: (value: boolean) => void;
  closeOnChildrenClick?: boolean;
}>;

export const DropdownMenu: FC<Props> = memo(({
  className,
  isOpened: isOpenedProp,
  showOnHover,
  triggerComponent: TriggerComponent,
  onOpenedChange,
  closeOnChildrenClick,
  children,
}) => {
  const [isOpened, setIsOpened] = useState(!!isOpenedProp);
  const toggleIsOpened = useCallback(() => {
    setIsOpened((prevValue) => {
      if (!prevValue) {
        const prevPortal =
          document.body.querySelector('[data-ya-component=ya-dropdown-menu-portal]') as HTMLElement | null;
        if (prevPortal) {
          prevPortal.dispatchEvent(new Event('click'));
        }
      }
      return !prevValue;
    });
  }, [isOpened]);
  const onMouseClick = useCallback((e: MouseEvent) => {
    e.nativeEvent.preventDefault();
    e.nativeEvent.stopPropagation();
    if (closeOnChildrenClick) {
      toggleIsOpened();
    }
  }, [closeOnChildrenClick]);
  const onTriggerHover = useCallback(() => {
    if (showOnHover) {
      const prevPortal =
        document.body.querySelector('[data-ya-component=ya-dropdown-menu-portal]') as HTMLElement | null;
      if (prevPortal) {
        prevPortal.dispatchEvent(new Event('click'));
      }
      setIsOpened(true);
    }
  }, [showOnHover]);

  const onOpenedChangeRef = useRef(onOpenedChange);
  onOpenedChangeRef.current = onOpenedChange;

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupElementRef = useRef<HTMLDivElement>(null);

  const changePopupPosition = useCallback(() => {
    const triggerElt = triggerRef.current;
    if (!triggerElt) throw new Error('There is no trigger elt');
    const popup = popupElementRef.current;
    if (!popup) return;

    const triggerRect = triggerElt.getBoundingClientRect();

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const horizontalInvisible = triggerRect.right < 0 || triggerRect.left > vw;
    const verticalInvisible = triggerRect.bottom < 0 || triggerRect.top > vh;

    if (horizontalInvisible || verticalInvisible) {
      popup.style.display = 'none';
      return;
    } else {
      popup.style.display = 'block';
    }
    popup.style.left = '0';
    popup.style.top = '0';

    const popupRect = popup.getBoundingClientRect();

    let left = triggerRect.left > vw - triggerRect.right
      ? triggerRect.left + triggerRect.width - popupRect.width
      : triggerRect.left;
    let top = triggerRect.top > vh - triggerRect.top
      ? triggerRect.top - popupRect.height
      : triggerRect.bottom;

    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        setIsOpened(false);
      }
    };

    window.addEventListener('scroll', changePopupPosition);
    window.addEventListener('resize', changePopupPosition);
    window.addEventListener('keydown', onEscape);

    return () => {
      window.removeEventListener('scroll', changePopupPosition);
      window.removeEventListener('resize', changePopupPosition);
      window.removeEventListener('keydown', onEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpenedProp !== undefined) {
      if (isOpenedProp !== isOpened) {
        setIsOpened(isOpenedProp);
      }
    }
  }, [isOpenedProp]);

  useEffect(() => {
    if (onOpenedChangeRef.current) {
      onOpenedChangeRef.current(isOpened);
    }
  }, [isOpened]);

  return (
    <>
      <div
        className={cn(styles.trigger, className)}
        ref={triggerRef}
        onClick={toggleIsOpened}
        onMouseEnter={onTriggerHover}
      >
        {TriggerComponent ? (
          <TriggerComponent />
        ) : (
          <button className={styles.defaultTriggerButton}>
            <MenuVerticalIcon />
          </button>
        )}
      </div>
      {isOpened ? (
        <Portal onClick={toggleIsOpened} onMount={changePopupPosition}>
          <div className={styles.popup} ref={popupElementRef} onClick={onMouseClick}>
            {children}
          </div>
        </Portal>
      ) : null}
    </>
  );
});
