import {
  purchaseAmountValidator,
  lottoNumberValidator,
  restartCommandValidator,
  ValidateError,
} from "../validator/index.js";
import lotto from "../../lotto/lotto.js";
import { inputStringWithPlaceholder } from "../input/index.js";

const purchaseAmountComponent = async (store) => {
  while (true) {
    try {
      const purchaseAmountString = await inputStringWithPlaceholder(
        "> 구입금액을 입력해 주세요. "
      );
      const purchaseAmount = purchaseAmountValidator(purchaseAmountString);
      store.set("purchaseAmount", purchaseAmount);
      return;
    } catch (error) {
      console.log(error.message);
      if (!(error instanceof ValidateError)) {
        throw error;
      }
    }
  }
};

const winningLottoNumberComponent = async (store) => {
  while (true) {
    try {
      console.log("");
      const winningLottoNumberString = await inputStringWithPlaceholder(
        "> 당첨 번호를 입력해 주세요. "
      );
      const winningLottoNumber = lottoNumberValidator(winningLottoNumberString);
      store.set("winningLottoNumber", winningLottoNumber);
      return;
    } catch (error) {
      console.log("winningLottoNumber Component error");
      console.log(error.message);
      if (!(error instanceof ValidateError)) {
        throw error;
      }
    }
  }
};

const bonusNumberComponent = async (store) => {
  while (true) {
    try {
      console.log("");
      const bonusNumberString = await inputStringWithPlaceholder(
        "> 보너스 번호를 입력해 주세요. "
      );
      const bonusNumber = lottoNumberValidator(bonusNumberString);
      store.set("bonusNumber", bonusNumber);
      return;
    } catch (error) {
      console.log("bonusNumber Component error");
      console.log(error.message);
      if (!(error instanceof ValidateError)) {
        throw error;
      }
    }
  }
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

const restartCommandComponent = async (store) => {
  while (true) {
    try {
      const restartCommandString = await inputStringWithPlaceholder(
        "> 다시 시작하시겠습니까? (y/n) "
      );
      const restartCommand = restartCommandValidator(restartCommandString);
      store.set("restartCommand", restartCommand);
      return;
    } catch (error) {
      console.log(error.message);
      if (!(error instanceof ValidateError)) {
        throw error;
      }
    }
  }
};

export {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
  lottosComponent,
  restartCommandComponent,
};
