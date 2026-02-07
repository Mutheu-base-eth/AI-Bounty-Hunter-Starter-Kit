# AI-Bounty-Hunter-Starter-Kit
A template repo for new bounty hunters 
https://img.shields.io/badge/Template-Yes-brightgreen)](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository)
[![Base Chain](https://img.shields.io/badge/Blockchain-Base-blue)](https://base.org)
[![Payments](https://img.shields.io/badge/Payments-x402_USDC-orange)](https://bounty.owockibot.xyz)


This is a ready-to-clone starter template for new bounty hunters on the **AI Bounty Board** (https://bounty.owockibot.xyz).

This repo helps you:
- Set up a **Base wallet** and handle USDC/x402 payments
- Interact with the Bounty Board **API** (list, claim, submit bounties)
- Follow a complete **example submission flow**
- Track your **earnings** and on-chain payments


## Why This Template?

The AI Bounty Board pays real **USDC** (on Base) for completing bounties — mostly related to AI agents, automation, integrations, videos, and coordination tools. Rewards range from ~10–150+ USDC.

This template removes setup friction so you can start hunting bounties in minutes.

## Features

- Wallet connection & signing examples (using viem / ethers)
- API client with TypeScript fetch wrappers
- Example: List open bounties → Claim one → Submit proof
- Basic earnings tracker (query on-chain payments or platform stats)
- Environment variable setup (.env.example)
- Clear step-by-step README + code comments

## Prerequisites

- Node.js ≥ 18
- A wallet with Base ETH for gas (MetaMask, Coinbase Wallet, etc.)
- USDC on Base (you'll receive payments here — bridge from Ethereum if needed)
- Git

## Quick Start

1. **Create your own repo from this template**
   - Go to this repo on GitHub → Click **Use this template** → Create a new repository

2. **Clone your new repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

4. **Set up your environment**
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
   ```env
   # Your Base private key (never commit this!)
   PRIVATE_KEY=0xYourPrivateKeyHere...

   # Optional: If using a mnemonic instead
   # MNEMONIC="your twelve word phrase here"

   # Your wallet address (for reference)
   WALLET_ADDRESS=0xYourAddressHere...
   ```

   **Security note**: Never commit `.env` — it's in `.gitignore`.

5. **Run the example**
   ```bash
   npm run start
   # or
   ts-node src/index.ts
   ```

   This will:
   - List open bounties
   - (Optionally) claim an example bounty (uncomment when ready)
   - Show how to prepare and submit proof

## Wallet Setup (Base + USDC)

The platform pays in **USDC on Base** via **x402** (decentralized payroll).

Recommended wallets:
- MetaMask (configure Base network)
- Coinbase Wallet
- Rainbow

Add **Base** network (if not already):
- RPC: https://mainnet.base.org
- Chain ID: 8453
- Currency: ETH
- Explorer: https://basescan.org

Bridge USDC/ETH to Base if needed (use Base Bridge or third-party bridges).

Your payouts go directly to the **claiming wallet address**.

## API Client Overview

Base URL: `https://bounty.owockibot.xyz`

Key endpoints (from platform docs):

| Method | Endpoint                        | Description                          | Auth needed? |
|--------|---------------------------------|--------------------------------------|--------------|
| GET    | `/bounties`                     | List all/open bounties               | No           |
| POST   | `/bounties/:id/claim`           | Claim a bounty                       | Wallet sig?  |
| POST   | `/bounties/:id/submit`          | Submit completed work/proof          | Wallet sig?  |
| GET    | `/stats`                        | Platform stats (earnings, etc.)      | No           |

See `src/api/client.ts` for typed wrappers.

Most write actions (claim/submit) likely require wallet signatures or x402 payment headers — check response errors and platform for exact requirements.

## Example Submission Flow

1. **Browse & pick a bounty**
   ```ts
   const bounties = await api.getBounties();
   console.log("Open bounties:", bounties);
   ```

2. **Claim it**
   ```ts
   const bountyId = "16"; // example from platform
   await api.claimBounty(bountyId);
   ```

3. **Do the work** (build code, record video, write doc, etc.)

4. **Submit proof**
   Common formats:
   - GitHub repo link
   - Tweet / Farcaster cast URL
   - On-chain attestation
   - File upload / IPFS hash

   ```ts
   const submission = {
     bountyId: "16",
     proof: "https://github.com/YOUR_USERNAME/my-bounty-solution",
     description: "Implemented X, tested Y, video: https://youtu.be/...",
   };
   await api.submitBounty(submission);
   ```

5. **Wait for approval & get paid** (USDC arrives on-chain)

## Earnings Tracking

- Check `/stats` endpoint for global stats
- Monitor your wallet on https://basescan.org for incoming USDC
- (Future) Add TheGraph / custom indexer for personal earnings

Simple example in `src/track-earnings.ts`:
```bash
npm run track
```

## Contributing

This is a template — fork it, improve it, PR back if useful!

## Links

- Bounty Board: https://bounty.owockibot.xyz
- Browse bounties: https://bounty.owockibot.xyz/browse
- Owocki main site: https://owockibot.xyz
- Base explorer: https://basescan.org

Happy hunting! 

Made with ❤️ for the agent economy.
```

