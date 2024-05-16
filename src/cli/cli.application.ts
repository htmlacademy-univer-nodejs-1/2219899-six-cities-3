import {Command} from './commands/index.js';
import chalk from 'chalk';

type OptionalCommand = Command | undefined;

export class CLIApplication {
  private readonly unknownCommandMessage: string = 'Entered unknown command';
  private readonly commandsMapping: Map<string, Command>;
  private readonly defaultCommand: Command;

  public constructor(defaultCommand: Command) {
    this.commandsMapping = new Map<string, Command>();
    this.defaultCommand = defaultCommand;
  }

  public includeCommand(command: Command): void {
    if (this.commandsMapping.has(command.getName())) {
      return;
    }
    this.commandsMapping.set(command.getName(), command);
  }

  public includeCommands(...commands: Command[]): void {
    commands.forEach((command: Command) => {
      this.includeCommand(command);
    });
  }

  public processCommand(argv: string[]): void {
    const [commandName, ...params] = argv.slice(2);
    const command: OptionalCommand = this.commandsMapping.get(commandName);
    if (command === undefined) {
      this.processDefaultCommand();
      return;
    }
    command.process(...params);
  }

  private processDefaultCommand(): void {
    console.log(chalk.red(this.unknownCommandMessage));
    this.defaultCommand.process();
  }
}
