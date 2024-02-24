import {Command} from './commands/command.interface';
import chalk from 'chalk';

type OptionalCommand = Command | undefined;

export class CLIApplication {
  private readonly commandsMapping: Record<string, Command>;
  private readonly defaultCommand: Command;

  public constructor(defaultCommand: Command) {
    this.commandsMapping = {};
    this.defaultCommand = defaultCommand;
  }

  public includeCommand(command: Command): void {
    if (Object.hasOwn(this.commandsMapping, command.getName())) {
      return;
    }
    this.commandsMapping[command.getName()] = command;
  }

  public includeCommands(...commands: Command[]): void {
    commands.forEach((command: Command) => {
      this.includeCommand(command);
    });
  }

  public processCommand(argv: string[]): void {
    const [commandName, ...params] = argv.slice(2);
    const command: OptionalCommand = this.commandsMapping[commandName];
    if (command === undefined) {
      this.processUndefinedCommandMessage();
      return;
    }
    command.process(...params);
  }

  private processUndefinedCommandMessage(): void {
    console.log(chalk.red('Entered unknown command'));
    this.defaultCommand.process();
  }
}
