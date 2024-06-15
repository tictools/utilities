const VALUE = 5;

const FACTOR = 10;

const ITEM_WEIGHT = {
  CI: 5,
  CD: 5,
  TEST: 10,
  FUNC: 40,
  CODE: 40,
};

function calculateItemAverageWithFactor(factor: number) {
  return function (value: string, weigth: number) {
    return (parseInt(value, 10) / factor) * weigth;
  };
}

function calculateAverage() {
  const [, , ci, cd, test, func, code] = process.argv;

  const ciAverage = calculateItemAverageWithFactor(VALUE)(ci, ITEM_WEIGHT.CI);
  const cdAverage = calculateItemAverageWithFactor(VALUE)(cd, ITEM_WEIGHT.CD);
  const testAverage = calculateItemAverageWithFactor(VALUE)(
    test,
    ITEM_WEIGHT.TEST
  );
  const funcAverage = calculateItemAverageWithFactor(VALUE)(
    func,
    ITEM_WEIGHT.FUNC
  );
  const codeAverage = calculateItemAverageWithFactor(VALUE)(
    code,
    ITEM_WEIGHT.CODE
  );

  const notaFinal =
    (ciAverage + cdAverage + testAverage + funcAverage + codeAverage) / FACTOR;

  return notaFinal;
}

calculateAverage();
console.log("🚀 AVERAGE :: " + calculateAverage());
