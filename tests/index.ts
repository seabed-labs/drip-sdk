import { Provider } from '@project-serum/anchor';
import { Drip } from '../src';
import { Network } from '../src/models';

describe('Drip SDK', () => {
  it('Withdrawable Token A Amount', async () => {
    const drip = new Drip(Network.Devnet, Provider.local('https://api.devnet.solana.com'));
    const positions = await drip.querier.getAllPositions(
      '8XHtH5q5TyuFCcSkVjKW7jqE26ta2e7rXDnSLEHAgjD2'
    );

    const position = Object.keys(positions)[1];
    const dripPosition = await drip.getPosition(position);
    const closePositionPreview = await dripPosition.getClosePositionPreview();
    console.log('Close Position Preview:', {
      tokenA: closePositionPreview.tokenAAmountBeingWithdrawn.toString(),
      tokenB: closePositionPreview.tokenBAmountBeingWithdrawn.toString(),
    });
  });
});
