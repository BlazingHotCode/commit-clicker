type ResourceItemProps = {
  label: string;
  value: string | number;
};

export function ResourceItem({ label, value }: ResourceItemProps) {
  return (
    <div className="resource-item">
      <strong>{label}: </strong>
      <span>{value}</span>
    </div>
  );
}
