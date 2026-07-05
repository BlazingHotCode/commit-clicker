type ResourceItemProps = {
  label: string;
  value: string | number;
};

export function ResourceItem({ label, value }: ResourceItemProps) {
  return (
    <div>
      <strong>{label}: </strong>
      <span>{value}</span>
    </div>
  );
}
