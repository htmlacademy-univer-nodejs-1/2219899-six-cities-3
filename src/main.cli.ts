#!/usr/bin/env tsx

import {CLIApplication} from './cli/cli.application';
import {CommandHelp} from './cli/commands/command.help';
import {CommandVersion} from './cli/commands/command.version';
import {Command} from './cli/commands/command.interface';
import {CommandImport} from './cli/commands/command.import';
import {CommandGenerate} from './cli/commands/command.generate';

function main(): void {
  const defaultCommand: Command = new CommandHelp();
  const app = new CLIApplication(defaultCommand);
  const commands: Command[] = [
    defaultCommand,
    new CommandVersion(),
    new CommandImport(),
    new CommandGenerate()
  ];
  app.includeCommands(...commands);
  app.processCommand(process.argv);
}

main();
