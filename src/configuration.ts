import type { LogLevel } from './log-level.js';

/**
 * Logger configuration. Every field is optional.
 */
export interface ConfigurationInterface {
  /**
   * Timestamp format. Supported tokens: `YYYY`, `YY`, `MM`, `M`, `DD`, `D`,
   * `HH`, `H`, `mm`, `m`, `ss`, `s` and `SSS`. Text between square brackets is
   * kept as is, e.g. `[at] HH:mm`.
   * Defaults to `YYYY-MM-DD HH:mm:ss`.
   */
  timestampFormat?: string;

  /**
   * Most verbose level to emit. Defaults to `info`.
   */
  level?: LogLevel | `${LogLevel}`;

  /**
   * Color the lines by level. Defaults to `true`, unless the `NO_COLOR`
   * environment variable is set.
   */
  colorize?: boolean;
}
