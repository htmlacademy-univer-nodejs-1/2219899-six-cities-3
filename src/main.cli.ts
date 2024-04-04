#!/usr/bin/env tsx

import {CLIApplication} from './cli/cli.application';
import {Command, CommandGenerate, CommandHelp, CommandImport, CommandVersion} from './cli/commands';

async function main(): Promise<void> {
  const defaultCommand: Command = new CommandHelp();
  const app = new CLIApplication(defaultCommand);
  const commands: Command[] = [
    defaultCommand,
    new CommandVersion(),
    new CommandImport(),
    new CommandGenerate()
  ];
  app.includeCommands(...commands);
  await app.processCommand(process.argv);
}

await main();
