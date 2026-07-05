import { achievements } from "../../game/data/achievements";
import type { GameState } from "../../game/state/types";

type AchievementPanelProps = {
  state: GameState;
};

export function AchievementPanel({ state }: AchievementPanelProps) {
  return (
    <section>
      <h2>Achievements</h2>

      <div className="achievement-grid">
        {achievements.map((achievement) => {
          const unlocked = achievement.isUnlocked(state);

          return (
            <article key={achievement.id}>
              <h3>
                {unlocked ? "V " : "X "}
                {achievement.name}
              </h3>

              <p>{achievement.description}</p>
              <p>
                <strong>Bonus: </strong>
                {achievement.bonusLabel}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
