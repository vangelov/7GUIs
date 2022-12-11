import { User } from './state';

type Props = {
  user: User;
  index: number;
  isSelected: boolean;
  onSelect: (index: number) => void;
};

function UserItem({ user, isSelected, index, onSelect }: Props) {
  function onClick() {
    onSelect(index);
  }

  return (
    <div
      style={{
        cursor: 'pointer',
        padding: '10px',
        backgroundColor: isSelected ? 'var(--background)' : undefined
      }}
      onClick={onClick}
    >
      {user.surname}, {user.name}
    </div>
  );
}

export { UserItem };
