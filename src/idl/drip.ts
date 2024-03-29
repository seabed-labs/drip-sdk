export type Drip = {
  version: '0.1.0';
  name: 'drip';
  instructions: [
    {
      name: 'initVaultProtoConfig';
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vaultProtoConfig';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitializeVaultProtoConfigParams';
          };
        }
      ];
    },
    {
      name: 'initVaultPeriod';
      accounts: [
        {
          name: 'vaultPeriod';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vault';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitializeVaultPeriodParams';
          };
        }
      ];
    },
    {
      name: 'deposit';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'depositor';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultPeriodEnd';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPosition';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPositionNftMint';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'userPositionNftAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'referrer';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'associatedTokenProgram';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'rent';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'systemProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'DepositParams';
          };
        }
      ];
    },
    {
      name: 'depositWithMetadata';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'depositor';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultPeriodEnd';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPosition';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPositionNftMint';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'userPositionNftAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'referrer';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'associatedTokenProgram';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'rent';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'systemProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: 'positionMetadataAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'metadataProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'DepositParams';
          };
        }
      ];
    },
    {
      name: 'withdrawB';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'withdrawer';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultProtoConfig';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'vaultPeriodI';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'vaultPeriodJ';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'userPosition';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPositionNftAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTreasuryTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'referrer';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        }
      ];
      args: [];
    },
    {
      name: 'closePosition';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'withdrawer';
              isMut: true;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultProtoConfig';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'vaultPeriodI';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'vaultPeriodJ';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'userPosition';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userPositionNftAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTreasuryTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'userTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'referrer';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: 'vaultPeriodUserExpiry';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vaultTokenAAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userTokenAAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userPositionNftMint';
          isMut: true;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'dripSplTokenSwap';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'dripTriggerSource';
              isMut: false;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultProtoConfig';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'lastVaultPeriod';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'currentVaultPeriod';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'swapTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'swapTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'dripFeeTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: 'swap';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'swapTokenMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'swapFeeAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'swapAuthority';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenSwapProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'dripOrcaWhirlpool';
      accounts: [
        {
          name: 'common';
          accounts: [
            {
              name: 'dripTriggerSource';
              isMut: false;
              isSigner: true;
            },
            {
              name: 'vault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultProtoConfig';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'lastVaultPeriod';
              isMut: false;
              isSigner: false;
            },
            {
              name: 'currentVaultPeriod';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'swapTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'swapTokenBAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'dripFeeTokenAAccount';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'tokenProgram';
              isMut: false;
              isSigner: false;
            }
          ];
        },
        {
          name: 'whirlpool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tickArray0';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tickArray1';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tickArray2';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'oracle';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'whirlpoolProgram';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: 'initVault';
      accounts: [
        {
          name: 'creator';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vaultProtoConfig';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenAAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenBAccount';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'treasuryTokenBAccount';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenAMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenBMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'InitializeVaultParams';
          };
        }
      ];
    },
    {
      name: 'setVaultSwapWhitelist';
      accounts: [
        {
          name: 'admin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'vault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'vaultProtoConfig';
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: 'params';
          type: {
            defined: 'UpdateVaultWhitelistedSwapsParams';
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'position';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'vault';
            type: 'publicKey';
          },
          {
            name: 'positionAuthority';
            type: 'publicKey';
          },
          {
            name: 'referrer';
            type: 'publicKey';
          },
          {
            name: 'depositedTokenAAmount';
            type: 'u64';
          },
          {
            name: 'withdrawnTokenBAmount';
            type: 'u64';
          },
          {
            name: 'depositTimestamp';
            type: 'i64';
          },
          {
            name: 'dripPeriodIdBeforeDeposit';
            type: 'u64';
          },
          {
            name: 'numberOfSwaps';
            type: 'u64';
          },
          {
            name: 'periodicDripAmount';
            type: 'u64';
          },
          {
            name: 'isClosed';
            type: 'bool';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'vaultPeriod';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'vault';
            type: 'publicKey';
          },
          {
            name: 'periodId';
            type: 'u64';
          },
          {
            name: 'dar';
            type: 'u64';
          },
          {
            name: 'twap';
            type: 'u128';
          },
          {
            name: 'dripTimestamp';
            type: 'i64';
          },
          {
            name: 'bump';
            type: 'u8';
          }
        ];
      };
    },
    {
      name: 'vaultProtoConfig';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'granularity';
            type: 'u64';
          },
          {
            name: 'tokenADripTriggerSpread';
            type: 'u16';
          },
          {
            name: 'tokenBWithdrawalSpread';
            type: 'u16';
          },
          {
            name: 'tokenBReferralSpread';
            type: 'u16';
          },
          {
            name: 'admin';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'vault';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'protoConfig';
            type: 'publicKey';
          },
          {
            name: 'tokenAMint';
            type: 'publicKey';
          },
          {
            name: 'tokenBMint';
            type: 'publicKey';
          },
          {
            name: 'tokenAAccount';
            type: 'publicKey';
          },
          {
            name: 'tokenBAccount';
            type: 'publicKey';
          },
          {
            name: 'treasuryTokenBAccount';
            type: 'publicKey';
          },
          {
            name: 'whitelistedSwaps';
            type: {
              array: ['publicKey', 5];
            };
          },
          {
            name: 'lastDripPeriod';
            type: 'u64';
          },
          {
            name: 'dripAmount';
            type: 'u64';
          },
          {
            name: 'dripActivationTimestamp';
            type: 'i64';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'limitSwaps';
            type: 'bool';
          },
          {
            name: 'maxSlippageBps';
            type: 'u16';
          }
        ];
      };
    }
  ];
  types: [
    {
      name: 'InitializeVaultParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'maxSlippageBps';
            type: 'u16';
          },
          {
            name: 'whitelistedSwaps';
            type: {
              vec: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'UpdateVaultWhitelistedSwapsParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'whitelistedSwaps';
            type: {
              vec: 'publicKey';
            };
          }
        ];
      };
    },
    {
      name: 'DepositParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'tokenADepositAmount';
            type: 'u64';
          },
          {
            name: 'numberOfSwaps';
            type: 'u64';
          }
        ];
      };
    },
    {
      name: 'InitializeVaultProtoConfigParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'granularity';
            type: 'u64';
          },
          {
            name: 'tokenADripTriggerSpread';
            type: 'u16';
          },
          {
            name: 'tokenBWithdrawalSpread';
            type: 'u16';
          },
          {
            name: 'tokenBReferralSpread';
            type: 'u16';
          },
          {
            name: 'admin';
            type: 'publicKey';
          }
        ];
      };
    },
    {
      name: 'InitializeVaultPeriodParams';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'periodId';
            type: 'u64';
          }
        ];
      };
    }
  ];
  events: [
    {
      name: 'Log';
      fields: [
        {
          name: 'data';
          type: {
            option: 'u64';
          };
          index: false;
        },
        {
          name: 'message';
          type: 'string';
          index: true;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: 'CannotGetPositionBump';
      msg: 'Cannot get position bump';
    },
    {
      code: 6001;
      name: 'CannotGetVaultBump';
      msg: 'Cannot get vault bump';
    },
    {
      code: 6002;
      name: 'CannotGetVaultPeriodBump';
      msg: 'Cannot get vault_period bump';
    },
    {
      code: 6003;
      name: 'DuplicateDripError';
      msg: 'Drip already triggered for the current period';
    },
    {
      code: 6004;
      name: 'IncompleteSwapError';
      msg: 'Swap did not complete, either received token_b is 0';
    },
    {
      code: 6005;
      name: 'InvalidGranularity';
      msg: 'Granularity must be an integer larger than 0';
    },
    {
      code: 6006;
      name: 'InvalidMint';
      msg: 'Token mint does not match expected value';
    },
    {
      code: 6007;
      name: 'InvalidSpread';
      msg: 'Spread must be >=0 and <5000';
    },
    {
      code: 6008;
      name: 'InvalidSwapAccount';
      msg: 'Token Swap is Not Whitelisted';
    },
    {
      code: 6009;
      name: 'InvalidNumSwaps';
      msg: 'A Vault May Whitelist a Maximum of 5 Swap Accounts';
    },
    {
      code: 6010;
      name: 'InvalidVaultProtoConfigReference';
      msg: 'Provided account references the wrong vault-proto-config';
    },
    {
      code: 6011;
      name: 'InvalidVaultPeriod';
      msg: 'Invalid vault-period';
    },
    {
      code: 6012;
      name: 'InvalidVaultReference';
      msg: 'Provided account references the wrong vault';
    },
    {
      code: 6013;
      name: 'OnlyAdminCanInitVault';
      msg: 'Only admin can init vault';
    },
    {
      code: 6014;
      name: 'PeriodicDripAmountIsZero';
      msg: 'Periodic drip amount == 0';
    },
    {
      code: 6015;
      name: 'PositionAlreadyClosed';
      msg: 'Position is already closed';
    },
    {
      code: 6016;
      name: 'WithdrawableAmountIsZero';
      msg: 'Withdrawable amount is zero';
    },
    {
      code: 6017;
      name: 'CannotInitializeVaultPeriodLessThanVaultCurrentPeriod';
      msg: "Cannot initialize a vault period lesser than vault's current period";
    },
    {
      code: 6018;
      name: 'InvalidVaultMaxSlippage';
      msg: 'Invalid value for vault.max_slippage_bps';
    },
    {
      code: 6019;
      name: 'SwappedMoreThanVaultDripAmount';
      msg: "Swapped more than vault's drip amount";
    },
    {
      code: 6020;
      name: 'NumSwapsIsZero';
      msg: 'Number of swaps is zero';
    },
    {
      code: 6021;
      name: 'SignerIsNotAdmin';
      msg: 'Signer is not admin';
    },
    {
      code: 6022;
      name: 'IncorrectVaultTokenAccount';
      msg: 'Incorrect vault token account passed in';
    },
    {
      code: 6023;
      name: 'InvalidOwner';
      msg: 'Account is owned by the wrong account';
    },
    {
      code: 6024;
      name: 'PositionBalanceIsZero';
      msg: 'Position token account balance is empty';
    },
    {
      code: 6025;
      name: 'InvalidReferrer';
      msg: 'Referrer does not match position referrer';
    }
  ];
};

export const IDL: Drip = {
  version: '0.1.0',
  name: 'drip',
  instructions: [
    {
      name: 'initVaultProtoConfig',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vaultProtoConfig',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitializeVaultProtoConfigParams',
          },
        },
      ],
    },
    {
      name: 'initVaultPeriod',
      accounts: [
        {
          name: 'vaultPeriod',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vault',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitializeVaultPeriodParams',
          },
        },
      ],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'depositor',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultPeriodEnd',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPosition',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPositionNftMint',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'userPositionNftAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'referrer',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'associatedTokenProgram',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'rent',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'systemProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'DepositParams',
          },
        },
      ],
    },
    {
      name: 'depositWithMetadata',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'depositor',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultPeriodEnd',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPosition',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPositionNftMint',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'userPositionNftAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'referrer',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'associatedTokenProgram',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'rent',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'systemProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'positionMetadataAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'metadataProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'DepositParams',
          },
        },
      ],
    },
    {
      name: 'withdrawB',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'withdrawer',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultProtoConfig',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'vaultPeriodI',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'vaultPeriodJ',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'userPosition',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPositionNftAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTreasuryTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'referrer',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
      ],
      args: [],
    },
    {
      name: 'closePosition',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'withdrawer',
              isMut: true,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultProtoConfig',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'vaultPeriodI',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'vaultPeriodJ',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'userPosition',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userPositionNftAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTreasuryTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'userTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'referrer',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'vaultPeriodUserExpiry',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultTokenAAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userTokenAAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userPositionNftMint',
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'dripSplTokenSwap',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'dripTriggerSource',
              isMut: false,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultProtoConfig',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'lastVaultPeriod',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'currentVaultPeriod',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'swapTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'swapTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'dripFeeTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'swap',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'swapTokenMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'swapFeeAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'swapAuthority',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenSwapProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'dripOrcaWhirlpool',
      accounts: [
        {
          name: 'common',
          accounts: [
            {
              name: 'dripTriggerSource',
              isMut: false,
              isSigner: true,
            },
            {
              name: 'vault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultProtoConfig',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'lastVaultPeriod',
              isMut: false,
              isSigner: false,
            },
            {
              name: 'currentVaultPeriod',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'swapTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'swapTokenBAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'dripFeeTokenAAccount',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'tokenProgram',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'whirlpool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tickArray0',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tickArray1',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tickArray2',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'oracle',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'whirlpoolProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'initVault',
      accounts: [
        {
          name: 'creator',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultProtoConfig',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenAAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenBAccount',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'treasuryTokenBAccount',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenAMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenBMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'InitializeVaultParams',
          },
        },
      ],
    },
    {
      name: 'setVaultSwapWhitelist',
      accounts: [
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'vault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'vaultProtoConfig',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'params',
          type: {
            defined: 'UpdateVaultWhitelistedSwapsParams',
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'position',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'vault',
            type: 'publicKey',
          },
          {
            name: 'positionAuthority',
            type: 'publicKey',
          },
          {
            name: 'referrer',
            type: 'publicKey',
          },
          {
            name: 'depositedTokenAAmount',
            type: 'u64',
          },
          {
            name: 'withdrawnTokenBAmount',
            type: 'u64',
          },
          {
            name: 'depositTimestamp',
            type: 'i64',
          },
          {
            name: 'dripPeriodIdBeforeDeposit',
            type: 'u64',
          },
          {
            name: 'numberOfSwaps',
            type: 'u64',
          },
          {
            name: 'periodicDripAmount',
            type: 'u64',
          },
          {
            name: 'isClosed',
            type: 'bool',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'vaultPeriod',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'vault',
            type: 'publicKey',
          },
          {
            name: 'periodId',
            type: 'u64',
          },
          {
            name: 'dar',
            type: 'u64',
          },
          {
            name: 'twap',
            type: 'u128',
          },
          {
            name: 'dripTimestamp',
            type: 'i64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'vaultProtoConfig',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'granularity',
            type: 'u64',
          },
          {
            name: 'tokenADripTriggerSpread',
            type: 'u16',
          },
          {
            name: 'tokenBWithdrawalSpread',
            type: 'u16',
          },
          {
            name: 'tokenBReferralSpread',
            type: 'u16',
          },
          {
            name: 'admin',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'vault',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'protoConfig',
            type: 'publicKey',
          },
          {
            name: 'tokenAMint',
            type: 'publicKey',
          },
          {
            name: 'tokenBMint',
            type: 'publicKey',
          },
          {
            name: 'tokenAAccount',
            type: 'publicKey',
          },
          {
            name: 'tokenBAccount',
            type: 'publicKey',
          },
          {
            name: 'treasuryTokenBAccount',
            type: 'publicKey',
          },
          {
            name: 'whitelistedSwaps',
            type: {
              array: ['publicKey', 5],
            },
          },
          {
            name: 'lastDripPeriod',
            type: 'u64',
          },
          {
            name: 'dripAmount',
            type: 'u64',
          },
          {
            name: 'dripActivationTimestamp',
            type: 'i64',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'limitSwaps',
            type: 'bool',
          },
          {
            name: 'maxSlippageBps',
            type: 'u16',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'InitializeVaultParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'maxSlippageBps',
            type: 'u16',
          },
          {
            name: 'whitelistedSwaps',
            type: {
              vec: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'UpdateVaultWhitelistedSwapsParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'whitelistedSwaps',
            type: {
              vec: 'publicKey',
            },
          },
        ],
      },
    },
    {
      name: 'DepositParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tokenADepositAmount',
            type: 'u64',
          },
          {
            name: 'numberOfSwaps',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'InitializeVaultProtoConfigParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'granularity',
            type: 'u64',
          },
          {
            name: 'tokenADripTriggerSpread',
            type: 'u16',
          },
          {
            name: 'tokenBWithdrawalSpread',
            type: 'u16',
          },
          {
            name: 'tokenBReferralSpread',
            type: 'u16',
          },
          {
            name: 'admin',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'InitializeVaultPeriodParams',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'periodId',
            type: 'u64',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'Log',
      fields: [
        {
          name: 'data',
          type: {
            option: 'u64',
          },
          index: false,
        },
        {
          name: 'message',
          type: 'string',
          index: true,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'CannotGetPositionBump',
      msg: 'Cannot get position bump',
    },
    {
      code: 6001,
      name: 'CannotGetVaultBump',
      msg: 'Cannot get vault bump',
    },
    {
      code: 6002,
      name: 'CannotGetVaultPeriodBump',
      msg: 'Cannot get vault_period bump',
    },
    {
      code: 6003,
      name: 'DuplicateDripError',
      msg: 'Drip already triggered for the current period',
    },
    {
      code: 6004,
      name: 'IncompleteSwapError',
      msg: 'Swap did not complete, either received token_b is 0',
    },
    {
      code: 6005,
      name: 'InvalidGranularity',
      msg: 'Granularity must be an integer larger than 0',
    },
    {
      code: 6006,
      name: 'InvalidMint',
      msg: 'Token mint does not match expected value',
    },
    {
      code: 6007,
      name: 'InvalidSpread',
      msg: 'Spread must be >=0 and <5000',
    },
    {
      code: 6008,
      name: 'InvalidSwapAccount',
      msg: 'Token Swap is Not Whitelisted',
    },
    {
      code: 6009,
      name: 'InvalidNumSwaps',
      msg: 'A Vault May Whitelist a Maximum of 5 Swap Accounts',
    },
    {
      code: 6010,
      name: 'InvalidVaultProtoConfigReference',
      msg: 'Provided account references the wrong vault-proto-config',
    },
    {
      code: 6011,
      name: 'InvalidVaultPeriod',
      msg: 'Invalid vault-period',
    },
    {
      code: 6012,
      name: 'InvalidVaultReference',
      msg: 'Provided account references the wrong vault',
    },
    {
      code: 6013,
      name: 'OnlyAdminCanInitVault',
      msg: 'Only admin can init vault',
    },
    {
      code: 6014,
      name: 'PeriodicDripAmountIsZero',
      msg: 'Periodic drip amount == 0',
    },
    {
      code: 6015,
      name: 'PositionAlreadyClosed',
      msg: 'Position is already closed',
    },
    {
      code: 6016,
      name: 'WithdrawableAmountIsZero',
      msg: 'Withdrawable amount is zero',
    },
    {
      code: 6017,
      name: 'CannotInitializeVaultPeriodLessThanVaultCurrentPeriod',
      msg: "Cannot initialize a vault period lesser than vault's current period",
    },
    {
      code: 6018,
      name: 'InvalidVaultMaxSlippage',
      msg: 'Invalid value for vault.max_slippage_bps',
    },
    {
      code: 6019,
      name: 'SwappedMoreThanVaultDripAmount',
      msg: "Swapped more than vault's drip amount",
    },
    {
      code: 6020,
      name: 'NumSwapsIsZero',
      msg: 'Number of swaps is zero',
    },
    {
      code: 6021,
      name: 'SignerIsNotAdmin',
      msg: 'Signer is not admin',
    },
    {
      code: 6022,
      name: 'IncorrectVaultTokenAccount',
      msg: 'Incorrect vault token account passed in',
    },
    {
      code: 6023,
      name: 'InvalidOwner',
      msg: 'Account is owned by the wrong account',
    },
    {
      code: 6024,
      name: 'PositionBalanceIsZero',
      msg: 'Position token account balance is empty',
    },
    {
      code: 6025,
      name: 'InvalidReferrer',
      msg: 'Referrer does not match position referrer',
    },
  ],
};
