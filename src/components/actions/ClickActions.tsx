type ClickActionsProps = {
  bugs: number;
  onWriteCode: () => void;
  onFixBug: () => void;
};

export function ClickActions({
  bugs,
  onWriteCode,
  onFixBug,
}: ClickActionsProps) {
  return (
    <section>
      <h2>Actions</h2>

      <button onClick={onWriteCode}>Write Code</button>

      <button onClick={onFixBug} disabled={bugs <= 0}>
        Fix Bug
      </button>
    </section>
  );
}
