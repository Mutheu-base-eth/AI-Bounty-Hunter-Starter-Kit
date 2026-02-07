import { api } from '../api/client.js';
import chalk from 'chalk';

async function main() {
  try {
    console.log(chalk.blue('=== Owocki Bounty Hunter Example ===\n'));

    // 1. List open bounties
    const bounties = await api.getBounties();
    console.log(chalk.green('Open Bounties:'), bounties.length);
    console.log('Sample:', bounties.slice(0, 3).map((b: any) => ({
      id: b.id,
      title: b.title,
      reward: b.reward,
      status: b.status
    })));

    // 2. Get platform stats (earnings overview)
    const stats = await api.getStats();
    console.log(chalk.cyan('\nPlatform Stats:'), stats);

    // 3. Example: Claim & Submit (UNCOMMENT CAREFULLY - use real small/test bounty!)
    // const exampleId = '43'; // e.g. "Create AI Agent Bounty Hunter Tutorial (Video)"
    // await api.claimBounty(exampleId);
    // console.log(chalk.green(`Claimed #${exampleId}`));

    // Then after doing work:
    // await api.submitBounty(exampleId, {
    //   github: 'https://github.com/yourusername/my-tutorial',
    //   video: 'https://youtube.com/...',
    //   description: 'Full walkthrough video + code repo'
    // });
    // console.log(chalk.green('Submitted!'));

    console.log(chalk.blue('\nNext: Pick a bounty ID from above, do the work, then submit proof.'));
  } catch (err) {
    console.error(chalk.red('Error:'), err);
  }
}

main();