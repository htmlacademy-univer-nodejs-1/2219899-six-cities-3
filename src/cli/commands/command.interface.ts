/**
 * Interface of Command in command line interface
 */
interface Command {
  /**
   * Returns command name
   */
  getName(): string;

  /**
   * Processing the command
   */
  process(..._params: string[]): void;
}

export {Command};
