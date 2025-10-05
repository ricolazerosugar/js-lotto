import lotto from "../../lotto/lotto.js";
import { ValidateError } from "../errors/index.js";

const positiveIntegerValidator = (inputString) => {
  try {
    const validatedValue = parseInt(inputString);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new ValidateError("invalid value: 올바르지 않은 값 입니다.");
    }
    return validatedValue;
  } catch (error) {
    throw error;
  }
};

const lottoNumberValidator = (inputString) => {
  try {
    const validatedValue = inputString
      .split(",")
      .map((number) => parseInt(number));
    if (validatedValue.some((number) => isNaN(number))) {
      throw new ValidateError("invalid value: 올바르지 않은 값 입니다.");
    }

    if (!lotto.Lotto.validateLottoNumbers(validatedValue)) {
      throw new ValidateError("invalid value: 올바르지 않은 로또 번호 입니다.");
    }

    return validatedValue;
  } catch (error) {
    throw error;
  }
};

const purchaseAmountValidator = (inputString) => {
  try {
    const purchaseAmount = parseInt(inputString);
    if (isNaN(purchaseAmount) || purchaseAmount <= 0) {
      throw new ValidateError("유효하지 않은 구입 금액입니다.");
    }
    return purchaseAmount;
  } catch (error) {
    throw error;
  }
};

const restartCommandValidator = (inputString) => {
  if (inputString !== "y" && inputString !== "n") {
    throw new ValidateError("유효하지 않은 재시작 여부입니다.");
  }
  return inputString;
};

export {
  positiveIntegerValidator,
  lottoNumberValidator,
  purchaseAmountValidator,
  restartCommandValidator,
  ValidateError,
};
