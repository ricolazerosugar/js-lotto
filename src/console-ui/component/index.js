import {
  purchaseAmountValidator,
  lottoNumberValidator,
} from "../validator/index.js";
import lotto from "../../lotto/lotto.js";
import { inputStringWithPlaceholder } from "../input/index.js";

const purchaseAmountComponent = async (store) => {
  const purchaseAmountString = await inputStringWithPlaceholder(
    "> 구입금액을 입력해 주세요. "
  );
  const purchaseAmount = purchaseAmountValidator(purchaseAmountString);

  store.set("purchaseAmount", purchaseAmount);
};

const winningLottoNumberComponent = async (store) => {
  console.log("");
  const winningLottoNumberString = await inputStringWithPlaceholder(
    "> 당첨 번호를 입력해 주세요. "
  );
  const winningLottoNumber = lottoNumberValidator(winningLottoNumberString);
  store.set("winningLottoNumber", winningLottoNumber);
};

const bonusNumberComponent = async (store) => {
  console.log("");
  const bonusNumberString = await inputStringWithPlaceholder(
    "> 보너스 번호를 입력해 주세요. "
  );
  const bonusNumber = lottoNumberValidator(bonusNumberString);
  store.set("bonusNumber", bonusNumber);
};

const lottosComponent = async (store) => {
  const lottos = store.get("lottos");
  console.log(`${lottos.length}개를 구매했습니다.`);
  console.log("구입한 로또 번호:");
  lottos.forEach((lotto) => {
    console.log(lotto.getNumbers());
  });
};

const winningReportComponent = async (store) => {
  const reportInfo = store.get("winningReport");
  const prizeList = store.get("prizeList");

  console.log("");
  console.log("당첨 통계");
  console.log("--------------------");

  prizeList.forEach((prizeTarget) => {
    const { matchedNumberCount, matchedBonusNumberCount, prize } = prizeTarget;
    console.log(
      `${matchedNumberCount}개 일치${
        matchedBonusNumberCount > 0 ? ", 보너스 볼 일치" : ""
      } (${prize}원) - ${reportInfo.matched.get(prizeTarget) || 0}개`
    );
  });

  console.log(`총 수익률은 ${reportInfo.winningRate}%입니다.`);
};

export {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
  lottosComponent,
};
