import {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
  lottosComponent,
  restartCommandComponent,
  componentErrorHandler,
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

async function restartCommandUI(store) {
  await restartCommandComponent(store);
}

export { drawLottoUI, drawLottoOutputUI, restartCommandUI };
