import { api } from './api/client.js';
import chalk from 'chalk';

async function track() {
  try {
    const stats = await api.getStats();
    console.log(chalk.blue('=== Bounty Board Stats ==='));
    console.log('Total bounties:', stats.totalBounties);
    console.log('Completed:', stats.completed);
    console.log('Open:', stats.open);
    console.log('Total paid out:', stats.totalPaidOut || 'N/A');

    console.log(chalk.yellow('\nPersonal earnings:'));
    console.log('Check your wallet on https://basescan.org/address/' + process.env.WALLET_ADDRESS);
    console.log('(Platform may add /agents or /earnings endpoint later)');
  } catch (err) {
    console.error(chalk.red(err));
  }
}

track();