import { createWalletClient, http, parseEther } from 'viem';
import { base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import dotenv from 'dotenv';
import chalk from 'chalk';

dotenv.config();

const API_BASE = process.env.API_BASE_URL || 'https://bounty.owockibot.xyz';

if (!process.env.PRIVATE_KEY && !process.env.MNEMONIC) {
  console.error(chalk.red('Error: Set PRIVATE_KEY or MNEMONIC in .env'));
  process.exit(1);
}

const account = process.env.PRIVATE_KEY
  ? privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
  : // Add mnemonic logic if preferred (viem supports it via HDAccount)
    privateKeyToAccount('0x0000000000000000000000000000000000000000000000000000000000000000'); // placeholder

const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http('https://mainnet.base.org'),
});

export const api = {
  async getBounties(): Promise<any[]> {
    const res = await fetch(`${API_BASE}/bounties`);
    if (!res.ok) throw new Error(`GET /bounties failed: ${res.status}`);
    return res.json();
  },

  async getStats(): Promise<any> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error(`GET /stats failed: ${res.status}`);
    return res.json();
  },

  async claimBounty(bountyId: string | number): Promise<any> {
    console.log(chalk.yellow(`Attempting to claim bounty #${bountyId}...`));

    // TODO: Most likely needs x402 payment header or signed message
    // Inspect browser network tab when clicking "Claim" on site to see exact headers/body
    const body = {
      // claimedBy: account.address,  // sometimes sent
      // signature?: string          // if EIP-712
    };

    const res = await fetch(`\( {API_BASE}/bounties/ \){bountyId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'x402-payment': '...',     // placeholder - add real x402 logic if needed
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Claim failed: ${res.status} - ${err}`);
    }

    return res.json();
  },

  async submitBounty(bountyId: string | number, proof: any): Promise<any> {
    console.log(chalk.yellow(`Submitting proof for bounty #${bountyId}...`));

    const payload = {
      proof, // e.g. { github: "https://...", tweet: "https://...", description: "..." }
      // submittedBy: account.address,
      // signature?: string
    };

    const res = await fetch(`\( {API_BASE}/bounties/ \){bountyId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Submit failed: ${res.status} - ${err}`);
    }

    return res.json();
  },
};

// Optional: helper to sign typed data (if platform uses EIP-712 for auth)
export async function signMessage(message: string) {
  return walletClient.signMessage({ message });
}