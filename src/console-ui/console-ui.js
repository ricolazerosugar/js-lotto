import {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
  lottosComponent,
} from "./component/index.js";

import lotto from "../lotto/lotto.js";

async function drawLottoUI(store) {
  await purchaseAmountComponent(store);
  const lottos = new lotto.LottoStore(lotto.LOTTO_PRICE, lotto.Lotto).buyLottos(
    store.get("purchaseAmount")
  );
  store.set("lottos", lottos);
  await lottosComponent(store);
  await winningLottoNumberComponent(store);
  await bonusNumberComponent(store);
}

async function drawLottoOutputUI(store) {
  await winningReportComponent(store);
}

export { drawLottoUI, drawLottoOutputUI };
