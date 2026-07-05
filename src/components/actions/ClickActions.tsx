type ClickActionsProps = {
  bugs: number;
  reputation: number;
  onWriteCode: () => void;
  onFixBug: () => void;
  onRefactorCode: () => void;
};

export function ClickActions({
  bugs,
  reputation,
  onWriteCode,
  onFixBug,
  onRefactorCode,
}: ClickActionsProps) {
  return (
    <section>
      <h2>Actions</h2>

      <div className="actions">
        <button onClick={onWriteCode}>Write Code</button>

        <button onClick={onFixBug} disabled={bugs <= 0}>
          Fix Bug
        </button>

        <button onClick={onRefactorCode} disabled={bugs <= 0 || reputation < 5}>
          Refactor Code
        </button>
      </div>
    </section>
  );
}
