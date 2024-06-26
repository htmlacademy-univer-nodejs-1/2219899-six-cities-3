#!/usr/bin/env node

import 'reflect-metadata';
import {CLIApplication} from './cli/cli.application.js';
import {
  Command,
  CommandGenerate,
  CommandHelp,
  CommandImport,
  CommandVersion
} from './cli/commands/index.js';

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
