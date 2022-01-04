import React, { FC, useState, useEffect, useCallback } from 'react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';

export const Minter: FC = () => {
  const { connection } = useConnection();
  const obj = useAnchorWallet();

  
  return(
    <div>
      <button disabled={!!obj} onClick={() => console.log(obj)}>Press</button>
    </div>
  );
}