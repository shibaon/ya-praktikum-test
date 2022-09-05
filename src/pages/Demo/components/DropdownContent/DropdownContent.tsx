import { FC, memo } from 'react';

import styles from './styles.module.css';
import { ReactComponent as ShareIcon } from '../../icons/share-icon.svg';
import { ReactComponent as EditIcon } from '../../icons/edit-icon.svg';
import { ReactComponent as TrashIcon } from '../../icons/trash-icon.svg';

const Items = [
  { title: 'Поделиться в социальных сетях', icon: ShareIcon, onClick: () => console.log('Поделились') },
  { title: 'Редактировать страницу', icon: EditIcon, onClick: () => console.log('Редактируем') },
  { title: 'Удалить страницу', icon: TrashIcon, onClick: () => console.log('Удаляем') },
];

export const DropdownContent: FC = memo(() => {
  return (
    <ul className={styles.popup}>
      {Items.map((i, key) => (
        <li className={styles.popupItem} key={`${i.title}${key}`} onClick={i.onClick}>
          <span>{i.title}</span>
          {i.icon ? <i.icon /> : null}
        </li>
      ))}
    </ul>
  );
});
