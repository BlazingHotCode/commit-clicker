type GameLayoutProps = {
  children: React.ReactNode;
};

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <main>
      <header className="game-header">
        <h1>Commit Clicker</h1>
        <p>Write code. Create bugs. Gain reputation.</p>
      </header>

      {children}
    </main>
  );
}
