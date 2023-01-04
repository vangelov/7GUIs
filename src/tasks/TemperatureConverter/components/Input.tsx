type Props = {
  value: string;
  label: string;
  onChange: (value: string) => void;
};

function Input({ value, label, onChange }: Props) {
  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

export { Input };
