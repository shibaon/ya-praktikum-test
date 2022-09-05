import React, { memo, useCallback, useState } from 'react';
import { DropdownMenu } from '../../components/DropdownMenu';

import styles from './styles.module.css';
import { DropdownContent } from './components/DropdownContent';

export const DemoPage = memo(() => {
  return (
    <>
      <div className={styles.firstScreen}>
        <div className={styles.menuDemoLocation}>
          <DropdownMenu showOnHover closeOnChildrenClick>
            <DropdownContent />
          </DropdownMenu>
        </div>
        <div className={styles.menuDemoLocation + ' ' + styles.menuRight}>
          <DropdownMenu showOnHover closeOnChildrenClick>
            <DropdownContent />
          </DropdownMenu>
        </div>
        <div className={styles.menuDemoLocation + ' ' + styles.menuBottom}>
          <DropdownMenu showOnHover closeOnChildrenClick>
            <DropdownContent />
          </DropdownMenu>
        </div>
        <div className={styles.menuDemoLocation + ' ' + styles.menuRight + ' ' + styles.menuBottom}>
          <DropdownMenu showOnHover closeOnChildrenClick>
            <DropdownContent />
          </DropdownMenu>
        </div>
      </div>
      <div className={styles.secondScreen}>

      </div>
    </>
  );
});
