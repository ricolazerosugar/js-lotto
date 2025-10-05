import {
  purchaseAmountValidator,
  lottoNumberValidator,
  restartCommandValidator,
} from "../validator/index.js";
import { ValidateError } from "../errors/index.js";
import lotto from "../../lotto/lotto.js";
import { inputStringWithPlaceholder } from "../input/index.js";

const componentErrorHandler = (fn) => {
  return async (args) => {
    while (true) {
      try {
        await fn(args);
        return;
      } catch (error) {
        console.log(error.message);
        if (!(error instanceof ValidateError)) {
          throw error;
        }
      }
    }
  };
};

const purchaseAmountComponent = async (store) => {
  return await componentErrorHandler(async (store) => {
    const purchaseAmountString = await inputStringWithPlaceholder(
      "> 구입금액을 입력해 주세요. "
    );
    const purchaseAmount = purchaseAmountValidator(purchaseAmountString);
    store.set("purchaseAmount", purchaseAmount);
  })(store);
};

const winningLottoNumberComponent = async (store) => {
  return await componentErrorHandler(async (store) => {
    console.log("");
    const winningLottoNumberString = await inputStringWithPlaceholder(
      "> 당첨 번호를 입력해 주세요. "
    );
    const winningLottoNumber = lottoNumberValidator(winningLottoNumberString);
    store.set("winningLottoNumber", winningLottoNumber);
  })(store);
};

const bonusNumberComponent = async (store) => {
  await componentErrorHandler(async (store) => {
    console.log("");
    const bonusNumberString = await inputStringWithPlaceholder(
      "> 보너스 번호를 입력해 주세요. "
    );
    const bonusNumber = lottoNumberValidator(bonusNumberString);
    store.set("bonusNumber", bonusNumber);
  })(store);
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
  return await componentErrorHandler(async (store) => {
    const restartCommandString = await inputStringWithPlaceholder(
      "> 다시 시작하시겠습니까? (y/n) "
    );
    const restartCommand = restartCommandValidator(restartCommandString);
    store.set("restartCommand", restartCommand);
  })(store);
};

export {
  purchaseAmountComponent,
  winningLottoNumberComponent,
  bonusNumberComponent,
  winningReportComponent,
  lottosComponent,
  restartCommandComponent,
  componentErrorHandler,
};
