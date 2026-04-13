/**
 * matrices.js
 * 고1 공통수학1 - 행렬
 * 1차 재구축: 기초(Lv1) OX 정적 20 + 동적 5
 */
(function () {
  if (typeof HIGH_OX_BANK === "undefined") globalThis.HIGH_OX_BANK = {};
  if (typeof HIGH_BANK === "undefined") globalThis.HIGH_BANK = {};
  if (typeof HIGH_RAND_GENS === "undefined") globalThis.HIGH_RAND_GENS = {};
  if (typeof HIGH_GRADE_UNITS === "undefined") globalThis.HIGH_GRADE_UNITS = {};

  const G = "고1";
  const U = "행렬";
  const riSafe = (typeof ri === "function")
    ? ri
    : function (a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; };

  const STD_S15 = "[12공수1-15] 행렬의 뜻과 연산(덧셈, 뺄셈, 실수배)을 이해하고, 이를 계산할 수 있다.";
  const STD_S16 = "[12공수1-16] 행렬의 연산 성질을 이해하고, 성질을 활용하여 문제를 해결할 수 있다.";
  const STD_S17 = "[12공수1-17] 행렬의 곱셈의 뜻과 계산 원리를 이해하고, 관련 문제를 해결할 수 있다.";

  function makeOxStatic(q, ans, sol, hint, terms, std) {
            return {
      q: q,
      ans: ans,
      exp: sol,
      hint: hint,
      terms: terms,
      std: std
    };
  }
  function makeMc(q, choices, ci, ans, sa, sol, hints, terms, std) {
    return {
      type: ["객관식"],
      q: q,
      choices: choices,
      ci: ci,
      ans: ans,
      sa: sa,
      sol: sol,
      hints: hints,
      terms: terms,
      std: std
    };
  }
  function makeSa(q, ans, sa, sol, hints, terms, std) {
    return {
      type: ["단답형"],
      q: q,
      choices: [],
      ci: -1,
      ans: ans,
      sa: sa,
      sol: sol,
      hints: hints,
      terms: terms,
      std: std
    };
  }
  function makeEs(q, ans, sa, sol, hints, terms, std) {
    return {
      type: ["서술형"],
      q: q,
      choices: [],
      ci: -1,
      ans: ans,
      sa: sa,
      sol: sol,
      hints: hints,
      terms: terms,
      std: std
    };
  }

  // 기초(Lv1) OX 정적 20문항
  const matOXLv1Static = [
    makeOxStatic(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$에서 제1행 제2열의 성분은 $2$이다.",
      "O",
      "행렬의 성분은 행 번호와 열 번호로 찾는다. 제1행 제2열 위치의 값은 $2$이므로 참이다.",
      "제1행과 제2열이 만나는 칸의 값을 직접 확인한다.",
      "행렬의 성분",
      STD_S15
    ),
    makeOxStatic(
      "행렬 $\\begin{pmatrix}1&0\\end{pmatrix}$의 크기는 $2\\times1$이다.",
      "X",
      "크기는 (행의 수) $\\times$ (열의 수)로 쓴다. 이 행렬은 행 1개, 열 2개이므로 $1\\times2$이고 제시문은 거짓이다.",
      "행 수와 열 수를 각각 세어 크기를 쓴다.",
      "행렬의 크기",
      STD_S15
    ),
    makeOxStatic(
      "모든 성분이 $0$인 행렬을 영행렬이라고 한다.",
      "O",
      "영행렬의 정의는 모든 성분이 0인 행렬이다. 정의와 일치하므로 참이다.",
      "영행렬의 정의를 그대로 적용한다.",
      "영행렬",
      STD_S15
    ),
    makeOxStatic(
      "두 행렬의 크기가 달라도 덧셈을 할 수 있다.",
      "X",
      "행렬의 덧셈은 대응 성분끼리 더하므로 두 행렬의 크기가 같아야 한다. 크기가 다르면 덧셈이 정의되지 않으므로 거짓이다.",
      "덧셈 가능 조건이 '같은 크기'인지 먼저 확인한다.",
      "행렬의 덧셈 조건",
      STD_S15
    ),
    makeOxStatic(
      "행렬 $A$와 실수 $k$에 대하여 $kA$는 $A$의 각 성분에 $k$를 곱해 만든다.",
      "O",
      "실수배의 정의에 따라 각 성분에 같은 실수 $k$를 곱한다. 따라서 제시문은 참이다.",
      "실수배는 '각 성분 전체에 동일하게 곱함'을 적용한다.",
      "실수배",
      STD_S15
    ),
    makeOxStatic(
      "행렬의 뺄셈 $A-B$는 $A+(-1)B$와 같다.",
      "O",
      "뺄셈은 덧셈의 역원으로 바꿔 계산할 수 있다. 즉 $A-B=A+(-B)=A+(-1)B$이므로 참이다.",
      "뺄셈을 음수배 덧셈으로 바꿔 본다.",
      "행렬의 뺄셈",
      STD_S16
    ),
    makeOxStatic(
      "서로 같은 두 행렬은 크기만 같으면 된다.",
      "X",
      "같은 행렬의 조건은 크기가 같고 대응 성분이 모두 같아야 한다. 크기만 같다고 같은 행렬이 되는 것은 아니므로 거짓이다.",
      "크기 조건 외에 '대응 성분 일치' 조건을 함께 확인한다.",
      "서로 같은 행렬",
      STD_S15
    ),
    makeOxStatic(
      "행렬 덧셈에 대해 $A+B=B+A$는 성립한다.",
      "O",
      "행렬 덧셈은 대응 성분의 실수 덧셈으로 이루어진다. 실수 덧셈은 교환법칙이 성립하므로 행렬 덧셈에서도 성립한다.",
      "대응 성분의 실수 덧셈으로 바꿔 교환법칙을 확인한다.",
      "덧셈의 교환법칙",
      STD_S16
    ),
    makeOxStatic(
      "행렬 덧셈에 대해 $(A+B)+C=A+(B+C)$는 성립하지 않는다.",
      "X",
      "행렬 덧셈은 대응 성분의 실수 덧셈과 동일하게 계산되므로 결합법칙이 성립한다. 따라서 제시문은 거짓이다.",
      "대응 성분 단위로 결합법칙 성립 여부를 점검한다.",
      "덧셈의 결합법칙",
      STD_S16
    ),
    makeOxStatic(
      "영행렬 $O$에 대하여 $A+O=A$가 성립한다.",
      "O",
      "영행렬의 각 성분은 0이므로 대응 성분을 더해도 값이 변하지 않는다. 따라서 $A+O=A$이다.",
      "영행렬을 더했을 때 각 성분이 유지되는지 본다.",
      "덧셈 항등원",
      STD_S16
    ),
    makeOxStatic(
      "행렬 곱셈은 항상 교환법칙 $AB=BA$가 성립한다.",
      "X",
      "행렬 곱셈은 일반적으로 교환법칙이 성립하지 않는다. 같은 크기의 정사각행렬이어도 $AB$와 $BA$가 다른 경우가 많으므로 거짓이다.",
      "행렬곱은 일반적으로 순서에 민감하다는 점을 적용한다.",
      "행렬 곱셈의 성질",
      STD_S17
    ),
    makeOxStatic(
      "행렬 곱셈에서 $(AB)C=A(BC)$는 성립한다.",
      "O",
      "행렬 곱셈은 곱의 순서를 유지하면 결합법칙이 성립한다. 따라서 제시문은 참이다.",
      "곱의 묶는 위치만 바뀌고 순서는 유지되는지 확인한다.",
      "곱셈의 결합법칙",
      STD_S17
    ),
    makeOxStatic(
      "행렬 곱셈 $AB$가 가능하려면 $A$의 열의 수와 $B$의 행의 수가 같아야 한다.",
      "O",
      "행렬 곱셈의 정의 조건이다. 이 조건이 맞을 때만 내적 계산이 가능하다.",
      "곱셈 정의 조건인 '열=행'을 먼저 점검한다.",
      "행렬 곱셈 조건",
      STD_S17
    ),
    makeOxStatic(
      "단위행렬 $E$에 대하여 $AE=EA=A$가 성립한다.",
      "O",
      "단위행렬은 곱셈의 항등원이다. 왼쪽, 오른쪽에서 곱해도 원래 행렬이 유지되므로 참이다.",
      "단위행렬이 곱셈 항등원인지 적용한다.",
      "단위행렬",
      STD_S17
    ),
    makeOxStatic(
      "분배법칙 $A(B+C)=AB+AC$는 성립한다.",
      "O",
      "행렬 곱셈은 덧셈에 대해 왼쪽 분배법칙이 성립한다. 따라서 참이다.",
      "왼쪽 분배법칙 형태인지 확인한다.",
      "분배법칙",
      STD_S17
    ),
    makeOxStatic(
      "분배법칙 $(A+B)C=AC+BC$는 성립한다.",
      "O",
      "행렬 곱셈은 덧셈에 대해 오른쪽 분배법칙도 성립한다. 따라서 참이다.",
      "오른쪽 분배법칙 형태인지 확인한다.",
      "분배법칙",
      STD_S17
    ),
    makeOxStatic(
      "정사각행렬 $A$에 대하여 $A^2$는 $A\\cdot A$를 의미한다.",
      "O",
      "행렬의 거듭제곱은 같은 행렬의 반복 곱으로 정의한다. 따라서 $A^2=A\\cdot A$가 맞다.",
      "거듭제곱의 정의를 적용한다.",
      "행렬의 거듭제곱",
      STD_S17
    ),
    makeOxStatic(
      "$AB=O$이면 반드시 $A=O$ 또는 $B=O$이다.",
      "X",
      "행렬에는 영인자가 존재할 수 있어 $A,B$가 모두 영행렬이 아니어도 곱이 영행렬이 될 수 있다. 따라서 거짓이다.",
      "영인자 존재 가능성을 적용해 판단한다.",
      "영인자",
      STD_S17
    ),
    makeOxStatic(
      "행렬 $\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$의 제곱은 $\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$이다.",
      "O",
      "직접 곱하면 우상단 성분은 $1\\cdot1+1\\cdot1=2$가 되고 나머지 성분도 계산하면 제시된 결과와 일치한다.",
      "직접 곱해 우상단 성분을 먼저 계산한다.",
      "행렬 곱셈 계산",
      STD_S17
    ),
    makeOxStatic(
      "실수 $0$을 임의의 행렬 $A$에 곱하면 영행렬이 된다.",
      "O",
      "각 성분에 0을 곱하면 모두 0이 된다. 따라서 결과는 영행렬이다.",
      "각 성분에 0을 곱한 결과를 확인한다.",
      "실수배와 영행렬",
      STD_S15
    )
  ];

  // 기초(Lv1) OX 동적 생성기 5개
  const matOXLv1Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const askValue = Math.random() < 0.5 ? c : riSafe(1, 4);
        const tf = askValue === c ? "O" : "X";
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 제2행 제1열의 성분은 $" + askValue + "$이다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "제2행 제1열 성분은 왼쪽 아래 칸의 값으로 $" + c + "$이다. 제시된 값 $" + askValue + "$과 비교하면 참거짓이 결정된다.",
          hints: ["제2행 제1열 위치(왼쪽 아래 칸)의 값을 직접 확인한다."],
          terms: "행렬의 성분",
          std: STD_S15
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const r = riSafe(2, 4);
        let c = riSafe(2, 4);
        while (c === r) c = riSafe(2, 4);
        const askCorrect = Math.random() < 0.5;
        const shownR = askCorrect ? r : c;
        const shownC = askCorrect ? c : r;
        const tf = askCorrect ? "O" : "X";
        return {
          type: ["OX형"],
          q: "행이 " + r + "개, 열이 " + c + "개인 행렬의 크기를 $" + shownR + "\\times" + shownC + "$라고 한다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "행렬의 크기는 (행의 수) $\\times$ (열의 수)로 표기한다. 올바른 표기는 $" + r + "\\times" + c + "$이며, 제시 표기 $" + shownR + "\\times" + shownC + "$와 비교하여 참거짓을 판단한다.",
          hints: ["행렬 크기 표기 순서를 '(행)×(열)'로 적용한다."],
          terms: "행렬의 크기",
          std: STD_S15
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5);
        const wrong = Math.random() < 0.5;
        const shown = wrong ? (k + 1) : k;
        const tf = shown === k ? "O" : "X";
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}1&-2\\\\3&0\\end{pmatrix}$에 대하여 $" + k + "A$는 각 성분에 $" + shown + "$를 곱해 구한다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "행렬의 실수배는 계수와 같은 수를 모든 성분에 곱한다. $" + k + "A$에서는 각 성분에 $" + k + "$를 곱해야 하므로 제시 수 $" + shown + "$과 비교해 참거짓을 판단한다.",
          hints: ["실수배 정의: 모든 성분에 같은 실수를 곱한다."],
          terms: "실수배",
          std: STD_S15
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const tf = det === 0 ? "O" : "X";
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식은 $0$이다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "2×2 행렬식은 $ad-bc$이다. 계산하면 $" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이므로 제시문의 참거짓이 결정된다.",
          hints: ["2×2 행렬식 공식 $ad-bc$를 계산해 0인지 확인한다."],
          terms: "행렬식",
          std: STD_S17
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 3), b = riSafe(1, 3), c = riSafe(1, 3), d = riSafe(1, 3);
        const e = riSafe(1, 3), f = riSafe(1, 3), g2 = riSafe(1, 3), h = riSafe(1, 3);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const tf = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22) ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB=BA$가 성립한다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "$AB=\\begin{pmatrix}" + ab11 + "&" + ab12 + "\\\\" + ab21 + "&" + ab22 + "\\end{pmatrix}$, $BA=\\begin{pmatrix}" + ba11 + "&" + ba12 + "\\\\" + ba21 + "&" + ba22 + "\\end{pmatrix}$를 계산하여 비교한다. 두 결과가 같으면 참, 다르면 거짓이다.",
          hints: ["$AB$와 $BA$를 각각 계산해 대응 성분이 모두 같은지 확인한다."],
          terms: "행렬 곱셈의 교환법칙",
          std: STD_S17
        };
      };
      g._types = ["OX형"];
      return g;
    })()
  ];

  // 기본(Lv2) OX 정적 20문항
  const matOXLv2Static = [
    makeOxStatic("행렬 덧셈에서 $A+B=B+A$는 항상 성립한다.", "O", "행렬 덧셈은 대응 성분의 실수 덧셈으로 계산되므로 교환법칙이 성립한다.", "대응 성분 덧셈의 교환법칙을 적용한다.", "덧셈의 교환법칙", STD_S16),
    makeOxStatic("행렬 덧셈에서 $(A+B)+C=A+(B+C)$는 항상 성립한다.", "O", "행렬 덧셈은 대응 성분 단위로 계산되므로 결합법칙이 성립한다.", "대응 성분 단위 결합법칙을 적용한다.", "덧셈의 결합법칙", STD_S16),
    makeOxStatic("행렬 $A$에 대해 $A+O=A$가 성립하며, 여기서 $O$는 영행렬이다.", "O", "영행렬의 모든 성분이 0이므로 더해도 값이 변하지 않는다.", "영행렬을 더해도 성분이 유지되는지 확인한다.", "덧셈 항등원", STD_S16),
    makeOxStatic("행렬 $A$에 대해 $A+(-A)=A$가 성립한다.", "X", "$A+(-A)=O$가 성립한다. 결과는 원행렬이 아니라 영행렬이다.", "덧셈 역원의 결과가 영행렬인지 확인한다.", "덧셈 역원", STD_S16),
    makeOxStatic("실수 $k$와 행렬 $A,B$에 대해 $k(A+B)=kA+kB$가 성립한다.", "O", "실수배는 행렬 덧셈에 대해 분배법칙이 성립한다.", "실수배 분배법칙을 적용한다.", "실수배의 분배법칙", STD_S16),
    makeOxStatic("실수 $k,l$와 행렬 $A$에 대해 $(k+l)A=kA+lA$가 성립한다.", "O", "스칼라 합에 대한 분배법칙이 성립한다.", "스칼라 합 분배법칙을 적용한다.", "실수배 성질", STD_S16),
    makeOxStatic("실수 $k,l$와 행렬 $A$에 대해 $(kl)A=k(lA)$가 성립한다.", "O", "실수배의 결합법칙으로 성립한다.", "실수배 결합법칙을 적용한다.", "실수배 결합법칙", STD_S16),
    makeOxStatic("행렬 뺄셈에서 $A-B=B-A$는 항상 성립한다.", "X", "일반적으로 $A-B=-(B-A)$이며 항상 같지 않다.", "뺄셈 교환 여부를 간단한 수치 예로 점검한다.", "행렬의 뺄셈", STD_S16),
    makeOxStatic("$2A-A=A$가 항상 성립한다.", "O", "$(2-1)A=A$로 계산된다.", "계수를 먼저 계산해 본다.", "실수배와 뺄셈", STD_S16),
    makeOxStatic("$A-B=A+(-1)B$는 성립한다.", "O", "행렬 뺄셈의 정의에 따라 성립한다.", "뺄셈을 음수배 덧셈으로 변환한다.", "행렬의 뺄셈 정의", STD_S16),
    makeOxStatic("행렬곱 $AB$가 가능하면 항상 $BA$도 가능하다.", "X", "$AB$ 가능 조건과 $BA$ 가능 조건은 다르므로 항상 성립하지 않는다.", "곱셈 가능 조건을 각각 따로 확인한다.", "행렬 곱셈 조건", STD_S17),
    makeOxStatic("행렬곱이 가능할 때 결과 행렬의 크기는 (앞 행렬의 행 수)×(뒤 행렬의 열 수)이다.", "O", "행렬곱의 결과 크기 규칙이다.", "결과 크기 규칙을 적용한다.", "행렬 곱셈 결과 크기", STD_S17),
    makeOxStatic("정사각행렬 $A$에 대해 $A^2$는 항상 정의된다.", "O", "정사각행렬은 같은 크기끼리 곱할 수 있으므로 $A\\cdot A$가 정의된다.", "거듭제곱 정의 가능 조건을 확인한다.", "행렬의 거듭제곱", STD_S17),
    makeOxStatic("정사각행렬 $A$에 대해 $A^2=A+A$가 항상 성립한다.", "X", "$A^2$는 곱셈, $A+A$는 덧셈이므로 일반적으로 다르다.", "곱셈과 덧셈 연산을 구분한다.", "연산 구분", STD_S17),
    makeOxStatic("단위행렬 $E$에 대해 $EA=A$가 성립한다.", "O", "단위행렬은 왼쪽에서도 곱셈 항등원이다.", "단위행렬 항등원 성질을 적용한다.", "단위행렬", STD_S17),
    makeOxStatic("단위행렬 $E$에 대해 $AE=E$가 항상 성립한다.", "X", "올바른 식은 $AE=A$이다. 일반적으로 $A$와 $E$는 다르다.", "항등원 성질의 결과가 어떤 행렬인지 확인한다.", "단위행렬", STD_S17),
    makeOxStatic("분배법칙 $A(B+C)=AB+AC$는 성립한다.", "O", "행렬곱의 왼쪽 분배법칙이다.", "왼쪽 분배법칙을 적용한다.", "분배법칙", STD_S17),
    makeOxStatic("분배법칙 $(A+B)C=AC+BC$는 성립한다.", "O", "행렬곱의 오른쪽 분배법칙이다.", "오른쪽 분배법칙을 적용한다.", "분배법칙", STD_S17),
    makeOxStatic("$AB=O$이면 반드시 $A=O$ 또는 $B=O$이다.", "X", "영인자 반례가 존재하므로 일반적으로 거짓이다.", "영인자 존재 가능성을 적용한다.", "영인자", STD_S17),
    makeOxStatic("행렬곱에서 일반적으로 $AB\\neq BA$이므로 교환법칙은 성립하지 않는다.", "O", "행렬곱은 순서에 민감하여 일반적으로 교환법칙이 성립하지 않는다.", "교환법칙 일반 불성립을 적용한다.", "행렬 곱셈의 교환법칙", STD_S17)
  ];

  // 기본(Lv2) OX 동적 생성기 5개
  const matOXLv2Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const askCorrect = Math.random() < 0.5;
        const ans11 = a + e;
        const shown11 = askCorrect ? ans11 : ans11 + (ans11 === 0 ? 1 : -1);
        const tf = shown11 === ans11 ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $(A+B)$의 제1행 제1열 성분은 $" + shown11 + "$이다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "$(A+B)$의 제1행 제1열 성분은 $" + a + "+" + e + "=" + ans11 + "$이다. 제시값 $" + shown11 + "$과 비교해 참거짓을 판단한다.",
          hints: ["덧셈은 대응 성분끼리 더해 제1행 제1열부터 확인한다."],
          terms: "행렬의 덧셈",
          std: STD_S16
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5);
        const askCorrect = Math.random() < 0.5;
        const shown = askCorrect ? k : k + 1;
        const tf = shown === k ? "O" : "X";
        return {
          type: ["OX형"],
          q: "임의의 행렬 $A$에 대하여 $" + k + "A$는 각 성분에 $" + shown + "$를 곱해 계산한다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "실수배 $" + k + "A$는 각 성분에 $" + k + "$를 곱한다. 제시 수 $" + shown + "$과 비교해 참거짓이 결정된다.",
          hints: ["실수배의 계수와 각 성분에 곱하는 수가 같은지 확인한다."],
          terms: "실수배",
          std: STD_S16
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        const askCorrect = Math.random() < 0.5;
        const shownLeft = askCorrect ? n : n + 1;
        const tf = shownLeft === n ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + shownLeft + "\\times" + p + "$일 때 $AB$는 정의된다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "$AB$가 정의되려면 앞 행렬의 열 수와 뒤 행렬의 행 수가 같아야 한다. 즉 $" + n + "$와 $" + shownLeft + "$를 비교해 참거짓을 판단한다.",
          hints: ["곱셈 가능 조건 '앞 열 수 = 뒤 행 수'를 직접 대입한다."],
          terms: "행렬 곱셈 조건",
          std: STD_S17
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 3), b = riSafe(1, 3), c = riSafe(1, 3), d = riSafe(1, 3);
        const ab11 = a * a + b * c;
        const ab12 = a * b + b * d;
        const ab21 = c * a + d * c;
        const ab22 = c * b + d * d;
        const shown11 = Math.random() < 0.5 ? ab11 : ab11 + 1;
        const tf = shown11 === ab11 ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$일 때 $A^2=\\begin{pmatrix}" + shown11 + "&" + ab12 + "\\\\" + ab21 + "&" + ab22 + "\\end{pmatrix}$이다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "$A^2=AA$를 직접 계산한다. 제1행 제1열은 $" + a + "\\cdot" + a + "+" + b + "\\cdot" + c + "=" + ab11 + "$이므로 제시행렬과 비교해 판단한다.",
          hints: ["$A^2=AA$에서 제1행 제1열 성분을 먼저 계산해 일치 여부를 본다."],
          terms: "행렬의 거듭제곱",
          std: STD_S17
        };
      };
      g._types = ["OX형"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 3), b = riSafe(1, 3), c = riSafe(1, 3), d = riSafe(1, 3);
        const e = riSafe(1, 3), f = riSafe(1, 3), g2 = riSafe(1, 3), h = riSafe(1, 3);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const tf = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22) ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB=BA$가 성립한다.",
          choices: ["O", "X"],
          ci: tf === "O" ? 0 : 1,
          ans: tf,
          sa: tf,
          sol: "$AB=\\begin{pmatrix}" + ab11 + "&" + ab12 + "\\\\" + ab21 + "&" + ab22 + "\\end{pmatrix}$, $BA=\\begin{pmatrix}" + ba11 + "&" + ba12 + "\\\\" + ba21 + "&" + ba22 + "\\end{pmatrix}$를 계산해 비교한다.",
          hints: ["$AB$와 $BA$를 각각 계산하여 모든 대응 성분이 같은지 확인한다."],
          terms: "행렬 곱셈의 교환법칙",
          std: STD_S17
        };
      };
      g._types = ["OX형"];
      return g;
    })()
  ];

  // 표준(Lv3) OX 정적 20문항
  const matOXLv3Static = [
    makeOxStatic("행렬곱에서 일반적으로 $AB=BA$는 성립하지 않는다.", "O", "행렬곱은 순서에 따라 결과가 달라질 수 있으므로 일반적으로 교환법칙이 성립하지 않는다.", "교환법칙 성립 여부를 일반 성질로 판단한다.", "교환법칙", STD_S17),
    makeOxStatic("행렬곱에서 $(AB)C=A(BC)$는 성립한다.", "O", "행렬곱의 결합법칙은 성립한다.", "곱의 순서를 유지한 결합법칙인지 확인한다.", "결합법칙", STD_S17),
    makeOxStatic("분배법칙 $A(B+C)=AB+AC$는 성립한다.", "O", "왼쪽 분배법칙이 성립한다.", "왼쪽 분배법칙 형태를 확인한다.", "분배법칙", STD_S17),
    makeOxStatic("분배법칙 $(A+B)C=AC+BC$는 성립한다.", "O", "오른쪽 분배법칙이 성립한다.", "오른쪽 분배법칙 형태를 확인한다.", "분배법칙", STD_S17),
    makeOxStatic("$AB=O$이면 반드시 $A=O$ 또는 $B=O$이다.", "X", "영인자 반례가 있으므로 일반적으로 거짓이다.", "영인자 가능성을 적용한다.", "영인자", STD_S17),
    makeOxStatic("단위행렬 $E$에 대해 임의의 정사각행렬 $A$는 $AE=EA=A$를 만족한다.", "O", "단위행렬은 곱셈 항등원이다.", "곱셈 항등원 성질을 적용한다.", "단위행렬", STD_S17),
    makeOxStatic("정사각행렬 $A$에 대해 $A^2=A+A$가 항상 성립한다.", "X", "$A^2$는 곱셈, $A+A$는 덧셈이므로 일반적으로 다르다.", "연산 종류를 구분한다.", "연산 구분", STD_S17),
    makeOxStatic("$A^2=O$이면 반드시 $A=O$이다.", "X", "멱영행렬 반례가 존재하므로 거짓이다.", "멱영행렬 반례를 떠올린다.", "멱영행렬", STD_S17),
    makeOxStatic("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$에 대해 $A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$이다.", "O", "직접 곱하면 우상단이 2가 되어 제시식이 성립한다.", "직접 곱으로 우상단 성분을 계산한다.", "행렬곱 계산", STD_S17),
    makeOxStatic("행렬곱 $AB$의 결과 크기는 (앞 행렬의 행 수)×(뒤 행렬의 열 수)이다.", "O", "행렬곱 결과 크기 규칙이다.", "결과 크기 규칙을 적용한다.", "결과 크기", STD_S17),
    makeOxStatic("행렬곱이 가능하려면 앞 행렬의 행 수와 뒤 행렬의 열 수가 같아야 한다.", "X", "올바른 조건은 앞 행렬의 열 수와 뒤 행렬의 행 수가 같다.", "곱셈 가능 조건의 위치를 정확히 대입한다.", "곱셈 조건", STD_S17),
    makeOxStatic("정사각행렬 $A,B$에 대해 $(AB)^T=A^TB^T$가 성립한다.", "X", "정답은 $(AB)^T=B^TA^T$이다.", "전치행렬 곱의 순서가 바뀌는지 확인한다.", "전치행렬", STD_S17),
    makeOxStatic("정사각행렬 $A,B$에 대해 $(AB)^T=B^TA^T$가 성립한다.", "O", "전치행렬의 곱 성질에 의해 성립한다.", "전치행렬 곱 성질을 적용한다.", "전치행렬", STD_S17),
    makeOxStatic("$\\det(AB)=\\det(A)\\det(B)$가 성립한다.", "O", "행렬식의 곱 성질이다.", "행렬식 곱 성질을 적용한다.", "행렬식", STD_S17),
    makeOxStatic("$\\det(AB)=\\det(A)+\\det(B)$가 성립한다.", "X", "행렬식은 덧셈이 아니라 곱셈 성질을 따른다.", "덧셈인지 곱셈인지 성질을 구분한다.", "행렬식", STD_S17),
    makeOxStatic("$\\det(A)=0$이면 $A$는 가역행렬이다.", "X", "가역행렬이 되려면 행렬식이 0이 아니어야 한다.", "가역성 판정 조건을 적용한다.", "가역성", STD_S17),
    makeOxStatic("$\\det(A)\\neq0$이면 $A$는 가역행렬이다.", "O", "가역성의 필요충분조건이다.", "행렬식과 가역성의 동치조건을 적용한다.", "가역성", STD_S17),
    makeOxStatic("가역행렬 $A,B$에 대해 $(AB)^{-1}=B^{-1}A^{-1}$가 성립한다.", "O", "곱의 역행렬은 역순으로 계산한다.", "역행렬 곱 공식을 적용한다.", "역행렬", STD_S17),
    makeOxStatic("가역행렬 $A,B$에 대해 $(AB)^{-1}=A^{-1}B^{-1}$가 성립한다.", "X", "순서가 바뀌어야 하므로 거짓이다.", "역행렬 곱의 순서를 확인한다.", "역행렬", STD_S17),
    makeOxStatic("가역행렬 $A$에 대해 $AB=AC$이면 $B=C$가 성립한다.", "O", "좌측에서 $A^{-1}$을 곱해 소거하면 $B=C$를 얻는다.", "좌소거법칙을 적용한다.", "소거법칙", STD_S17)
  ];

  // 표준(Lv3) OX 동적 생성기 5개
  const matOXLv3Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const tf = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22) ? "O" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB=BA$가 성립한다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$AB=\\begin{pmatrix}" + ab11 + "&" + ab12 + "\\\\" + ab21 + "&" + ab22 + "\\end{pmatrix}$, $BA=\\begin{pmatrix}" + ba11 + "&" + ba12 + "\\\\" + ba21 + "&" + ba22 + "\\end{pmatrix}$를 계산해 비교한다.",
          hints: ["$AB$와 $BA$를 각각 계산해 대응 성분이 모두 같은지 확인한다."],
          terms: "교환법칙", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const askZero = Math.random() < 0.5;
        const tf = askZero ? (det === 0 ? "O" : "X") : (det !== 0 ? "O" : "X");
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대하여 $\\det(A)" + (askZero ? "=0" : "\\neq0") + "$이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$를 계산하여 제시 조건과 비교한다.",
          hints: ["$ad-bc$를 계산한 뒤 제시된 등식/부등식과 비교한다."],
          terms: "행렬식", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const claimInv = Math.random() < 0.5;
        const tf = claimInv ? (det !== 0 ? "O" : "X") : (det === 0 ? "O" : "X");
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$는 " + (claimInv ? "가역행렬" : "비가역행렬") + "이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "가역성 판정은 $\\det(A)\\neq0$ 여부로 한다. $\\det(A)=" + det + "$이므로 제시문 참거짓이 결정된다.",
          hints: ["가역성은 행렬식의 0 여부로 판정한다."],
          terms: "가역성 판정", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const detA = a * d - b * c, detB = e * h - f * g2;
        const left = (a * e + b * g2) * (c * f + d * h) - (a * f + b * h) * (c * e + d * g2);
        const right = detA * detB;
        const askEqual = Math.random() < 0.5;
        const tf = askEqual ? (left === right ? "O" : "X") : (left !== right ? "O" : "X");
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $\\det(AB)" + (askEqual ? "=" : "\\neq") + "\\det(A)\\det(B)$이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(AB)$와 $\\det(A)\\det(B)$를 각각 계산하면 " + left + "와 " + right + "이다. 이를 비교해 참거짓을 판단한다.",
          hints: ["$\\det(AB)=\\det(A)\\det(B)$ 성질을 기준으로 계산값을 비교한다."],
          terms: "행렬식의 성질", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const canCancel = det !== 0;
        const claim = Math.random() < 0.5 ? "AB=AC이면 B=C가 성립한다" : "AB=AC이어도 B\\neq C인 경우가 존재한다";
        const tf = claim.includes("B=C") ? (canCancel ? "O" : "X") : (canCancel ? "X" : "O");
        return {
          type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대하여 " + claim + ".",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(A)=" + det + "$이므로 " + (canCancel ? "가역행렬이다. 이때는 좌소거가 가능하여 $AB=AC\\Rightarrow B=C$가 성립한다." : "비가역행렬이다. 이때는 좌소거가 일반적으로 성립하지 않는다."),
          hints: ["$\\det(A)$로 가역 여부를 먼저 판단한 뒤 좌소거 가능 여부를 결정한다."],
          terms: "좌소거법칙", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })()
  ];

  // 심화(Lv4) OX 정적 20문항 (실생활 맥락 포함)
  const matOXLv4Static = [
    makeOxStatic("학교 매점의 일주일 판매량을 행렬로 정리할 때, 같은 품목·같은 요일의 판매량은 같은 위치 성분으로 비교한다.", "O", "행렬의 각 성분은 행·열로 정해진 동일한 의미를 가지므로 대응 성분 비교가 가능하다.", "행·열이 나타내는 항목 의미를 먼저 고정한다.", "행렬의 성분 해석", STD_S15),
    makeOxStatic("두 반의 과목별 평균 점수를 행렬 $A,B$로 나타낼 때, 과목 순서가 다르더라도 $A+B$로 평균을 합칠 수 있다.", "X", "행렬 덧셈은 대응 성분끼리만 가능하다. 과목 순서가 다르면 대응 의미가 달라져 덧셈이 부적절하다.", "덧셈 전에 행·열의 항목 순서 일치 여부를 확인한다.", "데이터 정렬과 행렬 덧셈", STD_S16),
    makeOxStatic("버스 노선 연결을 인접행렬 $M$로 나타낼 때, $M^2$의 성분은 두 정류장을 2단계로 이동하는 경로 수를 나타낼 수 있다.", "O", "인접행렬의 곱은 중간 정점을 거치는 경로 수를 합산하므로 2단계 경로 수 해석이 가능하다.", "인접행렬 곱의 성분 의미를 적용한다.", "인접행렬", STD_S17),
    makeOxStatic("입고량 행렬 $A$와 출고량 행렬 $B$가 같은 크기일 때, 재고 변화량을 $A-B$로 계산할 수 있다.", "O", "같은 항목 체계의 동일 크기 행렬이면 대응 성분 차로 변화량을 계산한다.", "같은 크기/같은 항목인지 먼저 점검한다.", "행렬의 뺄셈 활용", STD_S15),
    makeOxStatic("영상 밝기 보정에서 픽셀 행렬 $A$에 상수 $k$를 곱할 때 일부 성분만 $k$배 해도 $kA$가 된다.", "X", "$kA$는 모든 성분에 동일하게 $k$를 곱한 결과여야 한다.", "실수배가 전체 성분에 동일 적용되는지 확인한다.", "실수배", STD_S15),
    makeOxStatic("두 생산 공정의 변환행렬 $A,B$를 순서대로 적용할 때 전체 변환은 일반적으로 $AB$와 $BA$가 다를 수 있다.", "O", "행렬곱은 적용 순서를 반영하므로 순서가 바뀌면 결과가 달라질 수 있다.", "연산 순서가 결과에 미치는 영향을 확인한다.", "교환법칙 불성립", STD_S17),
    makeOxStatic("네트워크 연결행렬 $M$에서 $M^2=O$이면 반드시 $M=O$이다.", "X", "영이 아닌 멱영행렬이 존재하므로 $M^2=O$라도 $M\\neq O$일 수 있다.", "멱영행렬 반례 가능성을 적용한다.", "멱영행렬", STD_S17),
    makeOxStatic("프로젝트 인원배치 행렬에서 행·열의 의미를 바꾸면 원래 행렬과 같은 정보라고 볼 수 있다.", "X", "행·열 의미를 바꾸면 성분의 해석이 바뀌므로 같은 데이터 표현이라고 볼 수 없다.", "행/열 축의 의미 고정 여부를 점검한다.", "행렬 표현의 의미", STD_S15),
    makeOxStatic("물류센터 A→B 이동 비용행렬과 B→C 이동 비용행렬의 곱은 단계별 누적 비용 계산 모델로 활용될 수 있다.", "O", "행렬곱은 중간 경로를 합산하는 구조이므로 단계 결합 모델에 활용 가능하다.", "중간 단계 합산 구조를 떠올린다.", "행렬곱 모델링", STD_S17),
    makeOxStatic("정사각행렬 $A$가 가역이면 데이터 복원 과정에서 역변환 $A^{-1}$을 적용할 수 있다.", "O", "가역행렬은 역행렬이 존재하므로 원복(역변환)이 가능하다.", "가역성과 역변환 가능성을 연결한다.", "가역행렬", STD_S17),
    makeOxStatic("정사각행렬 $A$의 행렬식이 0이면 항상 역변환이 가능하다.", "X", "$\\det(A)=0$이면 비가역행렬이므로 역행렬이 존재하지 않는다.", "행렬식 0 여부로 가역성을 판정한다.", "행렬식과 가역성", STD_S17),
    makeOxStatic("광고 채널-상품 반응 데이터를 행렬로 둘 때, 차원(크기)이 맞지 않으면 행렬곱으로 반응 예측을 결합할 수 없다.", "O", "행렬곱은 앞 열 수와 뒤 행 수가 같아야 계산 가능하다.", "곱셈 가능 조건을 차원에 대입한다.", "행렬곱 가능 조건", STD_S17),
    makeOxStatic("행렬 모델에서 단위행렬 $E$를 곱하면 시스템 상태가 변하지 않는다.", "O", "단위행렬은 곱셈 항등원으로 상태를 유지한다.", "항등원 성질을 적용한다.", "단위행렬", STD_S17),
    makeOxStatic("관계행렬 분석에서 $(AB)^T=A^TB^T$가 성립한다.", "X", "전치행렬 곱의 올바른 성질은 $(AB)^T=B^TA^T$이다.", "전치 시 곱 순서가 뒤집히는지 확인한다.", "전치행렬", STD_S17),
    makeOxStatic("관계행렬 분석에서 $(AB)^T=B^TA^T$가 성립한다.", "O", "전치행렬의 곱 성질에 의해 성립한다.", "전치행렬 곱 공식 그대로 적용한다.", "전치행렬", STD_S17),
    makeOxStatic("두 변환행렬 $A,B$가 모두 가역이면 복합변환 $AB$도 가역이다.", "O", "가역행렬의 곱은 가역이며 역행렬은 $(AB)^{-1}=B^{-1}A^{-1}$이다.", "가역행렬 곱의 성질을 적용한다.", "가역행렬의 곱", STD_S17),
    makeOxStatic("인접행렬 $M$에서 $M^2$의 대각성분은 길이 2 순환 경로 해석에 활용될 수 있다.", "O", "대각성분은 시작점으로 되돌아오는 2단계 경로 수 정보를 담을 수 있다.", "대각성분의 경로 의미를 적용한다.", "인접행렬 해석", STD_S17),
    makeOxStatic("데이터 행렬에서 열 순서를 임의로 섞어도 이전 모델 행렬과의 곱 결과는 항상 동일하다.", "X", "열 순서 변경은 성분 대응을 바꿔 곱 결과를 바꿀 수 있다.", "열 순서가 곱 결과에 미치는 영향을 점검한다.", "데이터 정렬", STD_S17),
    makeOxStatic("연립 선형모형 $AX=b$에서 $A$가 가역이면 해는 $X=A^{-1}b$로 유일하다.", "O", "가역행렬이면 역행렬을 곱해 유일해를 얻는다.", "가역성으로 해의 유일성을 판정한다.", "선형모형", STD_S17),
    makeOxStatic("연립 선형모형 $AX=b$에서 $A$가 비가역이어도 해는 항상 유일하다.", "X", "비가역이면 해가 없거나 무수히 많을 수 있어 유일성이 보장되지 않는다.", "비가역 시 해의 경우를 구분한다.", "해의 유일성", STD_S17)
  ];

  // 심화(Lv4) OX 동적 생성기 5개 (실생활 맥락)
  const matOXLv4Dyn = [
    (function () {
      const g = function () {
        const m = riSafe(2, 4), n = riSafe(2, 4), p = riSafe(2, 4);
        const ok = Math.random() < 0.5;
        const leftCols = n;
        const rightRows = ok ? n : (n % 4) + 1;
        const tf = leftCols === rightRows ? "O" : "X";
        return {
          type: ["OX형"],
          q: "광고 채널-타깃 데이터 행렬 $A$가 $" + m + "\\times" + n + "$, 전환률 행렬 $B$가 $" + rightRows + "\\times" + p + "$일 때, 결합 모델 $AB$를 계산할 수 있다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$AB$가 가능하려면 앞 행렬의 열 수(" + leftCols + ")와 뒤 행렬의 행 수(" + rightRows + ")가 같아야 한다. 이를 비교해 참거짓을 판단한다.",
          hints: ["앞 행렬 열 수와 뒤 행렬 행 수가 같은지 먼저 확인한다."],
          terms: "행렬곱 가능 조건", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const claimInv = Math.random() < 0.5;
        const tf = claimInv ? (det !== 0 ? "O" : "X") : (det === 0 ? "O" : "X");
        return {
          type: ["OX형"],
          q: "암호화 선형변환 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$는 " + (claimInv ? "복호화 가능한 가역행렬" : "복호화가 불가능한 비가역행렬") + "이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "복호화 가능 여부는 가역성으로 판단한다. $\\det(A)=" + det + "$이므로 $\\det(A)\\neq0$이면 가역, $=0$이면 비가역이다.",
          hints: ["가역성은 행렬식이 0인지 아닌지로 판단한다."],
          terms: "행렬식과 가역성", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const tf = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22) ? "O" : "X";
        return {
          type: ["OX형"],
          q: "공정 변환행렬 $A,B$를 순서대로 적용할 때 $AB$와 $BA$의 결과가 동일하다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$AB=\\begin{pmatrix}" + ab11 + "&" + ab12 + "\\\\" + ab21 + "&" + ab22 + "\\end{pmatrix}$, $BA=\\begin{pmatrix}" + ba11 + "&" + ba12 + "\\\\" + ba21 + "&" + ba22 + "\\end{pmatrix}$를 비교해 동일 여부를 판단한다.",
          hints: ["$AB$와 $BA$를 각각 계산해 성분별로 비교한다."],
          terms: "교환법칙", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(0, 1), y = riSafe(0, 1), z = riSafe(0, 1), w = riSafe(0, 1);
        const M = [[x, y], [z, w]];
        const m2 = [
          [x * x + y * z, x * y + y * w],
          [z * x + w * z, z * y + w * w]
        ];
        const claim = Math.random() < 0.5 ? m2[0][0] : m2[0][0] + 1;
        const tf = claim === m2[0][0] ? "O" : "X";
        return {
          type: ["OX형"],
          q: "교통 연결 인접행렬 $M=\\begin{pmatrix}" + x + "&" + y + "\\\\" + z + "&" + w + "\\end{pmatrix}$에서 $M^2$의 제1행 제1열 성분은 $" + claim + "$이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$M^2$의 제1행 제1열은 제1행과 제1열의 내적으로 $" + x + "\\cdot" + x + "+" + y + "\\cdot" + z + "=" + m2[0][0] + "$이다. 제시값과 비교해 판단한다.",
          hints: ["제1행·제1열 내적으로 $M^2$의 제1행 제1열을 계산한다."],
          terms: "인접행렬", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const claim = Math.random() < 0.5;
        const tf = claim ? (det !== 0 ? "O" : "X") : (det === 0 ? "O" : "X");
        return {
          type: ["OX형"],
          q: "데이터 보정 선형모형 $AX=b$에서 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$일 때 해는 " + (claim ? "항상 유일" : "유일하지 않을 수 있다") + ".",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(A)=" + det + "$이다. $\\det(A)\\neq0$이면 유일해, $\\det(A)=0$이면 유일성이 보장되지 않는다. 이를 기준으로 참거짓을 판정한다.",
          hints: ["행렬식으로 가역성(유일해 여부)을 먼저 판단한다."],
          terms: "선형모형 해의 유일성", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })()
  ];

  // 최고(Lv5) OX 정적 20문항 (역추론/다단계 + 실생활 맥락)
  const matOXLv5Static = [
    makeOxStatic("암호화 행렬 $A$와 복호화 행렬 $B$가 $AB=E$를 만족하면, 정사각행렬 조건에서 $BA=E$도 성립한다.", "O", "정사각행렬에서 한쪽 역행렬이 존재하면 양쪽 역행렬이 일치한다. 따라서 $AB=E$이면 $B=A^{-1}$이고 $BA=E$가 성립한다.", "한쪽 역행렬 존재 시 양쪽 역행렬로 확장되는지 확인한다.", "역행렬의 동치성", STD_S17),
    makeOxStatic("정사각행렬 $A$가 $A^2=E$를 만족하면 $(E+A)(E-A)=O$가 성립한다.", "O", "전개하면 $(E+A)(E-A)=E-A^2$이다. $A^2=E$이므로 결과는 $O$이다.", "곱셈공식을 전개한 뒤 $A^2=E$를 대입한다.", "행렬 곱셈공식", STD_S17),
    makeOxStatic("정사각행렬 $A,B$에 대해 $AB=BA$이면 $(A+B)^2=A^2+2AB+B^2$가 성립한다.", "O", "$(A+B)^2=A^2+AB+BA+B^2$인데 $AB=BA$이면 $A^2+2AB+B^2$로 정리된다.", "먼저 전개 후 교환조건 $AB=BA$를 대입한다.", "교환조건과 전개", STD_S17),
    makeOxStatic("정사각행렬 $A,B$에 대해 $AB=BA$가 아니어도 $(A+B)^2=A^2+2AB+B^2$가 항상 성립한다.", "X", "교환이 없으면 일반식은 $A^2+AB+BA+B^2$이며 $2AB$로 합칠 수 없다.", "$AB$와 $BA$를 같은 항으로 합칠 수 있는지 확인한다.", "비가환 전개", STD_S17),
    makeOxStatic("인접행렬 $M$에서 $(M^3)_{ij}$는 길이 3 경로 수 해석에 활용될 수 있다.", "O", "인접행렬 거듭제곱 성분은 단계 수에 해당하는 경로 개수를 나타낸다.", "거듭제곱의 단계 수 해석을 적용한다.", "인접행렬 거듭제곱", STD_S17),
    makeOxStatic("수요-공급 연쇄모형에서 변환행렬을 하루 단위로 누적하면 상태는 $A^n$ 형태로 표현될 수 있다.", "O", "같은 선형변환을 반복 적용하면 행렬 거듭제곱으로 누적 효과를 표현한다.", "반복 변환을 행렬 거듭제곱으로 모델링한다.", "반복 선형변환", STD_S17),
    makeOxStatic("$\\det(A)=0$이고 $AB=AC$이면 항상 $B=C$이다.", "X", "$A$가 비가역이면 좌소거가 일반적으로 성립하지 않으므로 $B\\neq C$일 수 있다.", "좌소거 가능 여부를 가역성으로 판단한다.", "좌소거 조건", STD_S17),
    makeOxStatic("$\\det(A)\\neq0$이고 $AB=AC$이면 $B=C$가 성립한다.", "O", "$A$가 가역이므로 양변 좌측에 $A^{-1}$을 곱해 $B=C$를 얻는다.", "가역이면 좌소거 가능함을 적용한다.", "좌소거법칙", STD_S17),
    makeOxStatic("정사각행렬 $A$가 가역이면 $A^T$도 가역이다.", "O", "$(A^T)^{-1}=(A^{-1})^T$가 성립하므로 $A^T$도 가역이다.", "전치와 역행렬의 결합 성질을 적용한다.", "전치와 가역성", STD_S17),
    makeOxStatic("정사각행렬 $A$가 비가역이면 $A^T$는 항상 가역이다.", "X", "$\\det(A^T)=\\det(A)$이므로 $A$가 비가역이면 $A^T$도 비가역이다.", "전치 시 행렬식 보존 성질을 적용한다.", "행렬식 보존", STD_S17),
    makeOxStatic("행렬식이 같은 두 행렬은 항상 같은 행렬이다.", "X", "행렬식 값이 같아도 행렬 자체는 다를 수 있다.", "행렬식은 동치의 충분조건이 아님을 확인한다.", "행렬식의 한계", STD_S17),
    makeOxStatic("모델 행렬 $A$가 대각행렬이면 $A^n$도 대각행렬이며 대각성분은 각각 거듭제곱된다.", "O", "대각행렬 곱은 대각성분끼리 곱해지므로 거듭제곱에서도 같은 구조를 유지한다.", "대각행렬 곱 성질을 적용한다.", "대각행렬", STD_S17),
    makeOxStatic("대칭행렬 $A$와 $B$의 곱 $AB$는 항상 대칭행렬이다.", "X", "일반적으로 $AB$가 대칭이 되려면 추가 조건(예: $AB=BA$)이 필요하다.", "대칭성 유지의 추가 조건을 확인한다.", "대칭행렬", STD_S17),
    makeOxStatic("대칭행렬 $A,B$가 서로 가환하면 $AB$는 대칭행렬이다.", "O", "$(AB)^T=B^TA^T=BA=AB$이므로 대칭이다.", "전치 성질과 가환 조건을 함께 적용한다.", "대칭행렬의 곱", STD_S17),
    makeOxStatic("마코프 전이행렬처럼 각 행의 합이 1인 행렬은 두 개를 곱해도 각 행의 합이 1이다.", "O", "행확률행렬의 곱도 행확률행렬 성질을 유지한다.", "행합 보존 성질을 적용한다.", "전이행렬", STD_S17),
    makeOxStatic("행렬 모델에서 열 순서를 바꾸는 퍼뮤테이션을 적용해도 예측 결과가 항상 동일하다.", "X", "열 순서 변경은 변수 대응을 바꿔 결과를 바꿀 수 있다.", "변수 대응 순서 변화가 결과에 미치는 영향을 확인한다.", "퍼뮤테이션", STD_S17),
    makeOxStatic("데이터 정규화 스케일 행렬 $D$가 가역이면 원데이터 복원은 $D^{-1}$로 가능하다.", "O", "가역 스케일 변환은 역행렬을 통해 원상복구할 수 있다.", "스케일 변환의 역행렬 존재를 확인한다.", "스케일 변환", STD_S17),
    makeOxStatic("정사각행렬 $A$에 대해 $A^3=O$이면 반드시 $A=O$이다.", "X", "$A\\neq O$이면서 $A^3=O$인 멱영행렬이 존재한다.", "멱영행렬 반례 가능성을 적용한다.", "멱영지수", STD_S17),
    makeOxStatic("행렬식 성질에 의해 $\\det(A^{-1})=1/\\det(A)$가 성립한다. (단, $A$ 가역)", "O", "$AA^{-1}=E$에서 행렬식을 취하면 $\\det(A)\\det(A^{-1})=1$이므로 성립한다.", "양변 행렬식 계산으로 역행렬식을 유도한다.", "역행렬식", STD_S17),
    makeOxStatic("실무 모델에서 $AB=AC$이면 언제나 $B=C$로 두어도 안전하다.", "X", "이 결론은 $A$가 가역일 때만 안전하다. 비가역이면 오류가 발생할 수 있다.", "결론 적용 전 가역 조건을 먼저 점검한다.", "모델링 검증", STD_S17)
  ];

  // 최고(Lv5) OX 동적 생성기 5개
  const matOXLv5Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const claimCancelable = Math.random() < 0.5;
        const tf = claimCancelable ? (det !== 0 ? "O" : "X") : (det === 0 ? "O" : "X");
            return {
                type: ["OX형"],
          q: "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$이면 " + (claimCancelable ? "항상 $B=C$" : "$B\\neq C$인 경우가 존재") + "한다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(A)=" + det + "이다. $\\det(A)\\neq0$이면 좌소거가 가능하여 $B=C$, $\\det(A)=0$이면 좌소거가 일반적으로 성립하지 않는다.",
          hints: ["먼저 $\\det(A)$를 계산해 가역 여부를 판단한 뒤 좌소거 가능성을 결정한다."],
          terms: "좌소거법칙", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 3), b = riSafe(1, 3), c = riSafe(1, 3), d = riSafe(1, 3);
        const e = riSafe(1, 3), f = riSafe(1, 3), g2 = riSafe(1, 3), h = riSafe(1, 3);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const commute = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22);
        const lhs11 = (a + e) * (a + e) + (b + f) * (c + g2);
        const lhs12 = (a + e) * (b + f) + (b + f) * (d + h);
        const lhs21 = (c + g2) * (a + e) + (d + h) * (c + g2);
        const lhs22 = (c + g2) * (b + f) + (d + h) * (d + h);
        const rhs11 = a * a + b * c + 2 * (a * e + b * g2) + e * e + f * g2;
        const rhs12 = a * b + b * d + 2 * (a * f + b * h) + e * f + f * h;
        const rhs21 = c * a + d * c + 2 * (c * e + d * g2) + g2 * e + h * g2;
        const rhs22 = c * b + d * d + 2 * (c * f + d * h) + g2 * f + h * h;
        const identityHolds = lhs11 === rhs11 && lhs12 === rhs12 && lhs21 === rhs21 && lhs22 === rhs22;
        const tf = commute ? identityHolds ? "O" : "X" : "X";
        return {
          type: ["OX형"],
          q: "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에서 $(A+B)^2=A^2+2AB+B^2$가 성립한다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "행렬에서는 $(A+B)^2=A^2+AB+BA+B^2$가 기본식이다. 따라서 $AB=BA$일 때만 $A^2+2AB+B^2$로 정리된다. 주어진 $A,B$에서 가환 여부를 확인해 판정한다.",
          hints: ["먼저 $AB$와 $BA$가 같은지 확인한 뒤 전개식을 적용한다."],
          terms: "비가환 전개", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const M2 = [
          [p * p + q * r, p * q + q * s],
          [r * p + s * r, r * q + s * s]
        ];
        const M3 = [
          [M2[0][0] * p + M2[0][1] * r, M2[0][0] * q + M2[0][1] * s],
          [M2[1][0] * p + M2[1][1] * r, M2[1][0] * q + M2[1][1] * s]
        ];
        const shown = Math.random() < 0.5 ? M3[0][1] : M3[0][1] + 1;
        const tf = shown === M3[0][1] ? "O" : "X";
        return {
          type: ["OX형"],
          q: "인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분은 $" + shown + "$이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$M^3=M^2M$를 계산한다. 제1행 제2열은 길이 3 경로 수 해석과 동일하며 계산값은 $" + M3[0][1] + "$이다. 제시값과 비교해 판정한다.",
          hints: ["$M^2$를 먼저 구한 뒤 $M^3=M^2M$의 제1행 제2열을 계산한다."],
          terms: "인접행렬 거듭제곱", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const claim = Math.random() < 0.5;
        const shown = claim ? ("1/(" + det + ")") : ("1/(" + (det + 1) + ")");
        const tf = det !== 0 && claim ? "O" : (det !== 0 && !claim ? "X" : "X");
        return {
          type: ["OX형"],
          q: "가역행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대해 $\\det(A^{-1})=" + shown + "$이다.",
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "$\\det(A)=" + det + "$이고, 가역이면 $\\det(A^{-1})=1/\\det(A)$이다. 제시식과 일치 여부로 참거짓을 판단한다.",
          hints: ["$\\det(A^{-1})=1/\\det(A)$ 공식을 그대로 적용해 비교한다."],
          terms: "역행렬식", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(0, 1), b = riSafe(0, 1), c = riSafe(0, 1), d = riSafe(0, 1);
        const e = riSafe(0, 1), f = riSafe(0, 1), g2 = riSafe(0, 1), h = riSafe(0, 1);
        const rowSumA1 = a + b, rowSumA2 = c + d, rowSumB1 = e + f, rowSumB2 = g2 + h;
        const isStochastic = rowSumA1 === 1 && rowSumA2 === 1 && rowSumB1 === 1 && rowSumB2 === 1;
        const claim = Math.random() < 0.5;
        const tf = claim ? (isStochastic ? "O" : "X") : (isStochastic ? "X" : "O");
        return {
          type: ["OX형"],
          q: "전이행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에 대해 " + (claim ? "$AB$는 행합이 1인 행렬이다." : "$AB$는 행합이 1이 아닐 수 있다."),
          choices: ["O", "X"], ci: tf === "O" ? 0 : 1, ans: tf, sa: tf,
          sol: "행합이 1인 전이행렬 성질은 입력 행렬이 모두 전이행렬일 때 곱에서도 유지된다. 각 행합 조건을 먼저 확인한 뒤 제시문 참거짓을 판정한다.",
          hints: ["먼저 각 행렬의 모든 행합이 1인지 확인하고, 그다음 곱의 성질을 적용한다."],
          terms: "전이행렬", std: STD_S17
        };
      }; g._types = ["OX형"]; return g;
    })()
  ];

  // 기초(Lv1) 객관식 정적 10문항
  const matMCLv1Static = [
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$에서 제1행 제2열의 성분을 고르시오.",
      ["$2$", "$1$", "$3$", "$4$", "$0$"],
      0,
      "$2$",
      "2",
      "제1행 제2열 위치의 성분은 $2$이다.",
      ["제1행과 제2열이 만나는 칸을 찾는다.", "행렬에서 위쪽 행과 오른쪽 열의 교차 칸 값을 확인한다."],
      "행렬의 성분",
      STD_S15
    ),
    makeMc(
      "행렬 $\\begin{pmatrix}1&0\\end{pmatrix}$의 크기를 고르시오.",
      ["$1\\times2$", "$2\\times1$", "$2\\times2$", "$1\\times1$", "$0\\times2$"],
      0,
      "$1\\times2$",
      "1x2",
      "행렬의 크기는 (행의 수)$\\times$(열의 수)이다. 이 행렬은 행 1개, 열 2개이므로 $1\\times2$이다.",
      ["행 개수와 열 개수를 각각 센다.", "크기 표기 순서를 '(행)×(열)'로 적용한다."],
                "행렬의 크기",
      STD_S15
    ),
    makeMc(
      "다음 중 영행렬의 정의로 옳은 것을 고르시오.",
      ["모든 성분이 $0$인 행렬", "대각성분만 $0$인 행렬", "행과 열의 수가 같은 행렬", "모든 성분이 $1$인 행렬", "역행렬이 없는 행렬"],
      0,
      "모든 성분이 $0$인 행렬",
      "모든 성분이 0인 행렬",
      "영행렬은 모든 성분이 0인 행렬로 정의한다.",
      ["정의를 그대로 확인한다."],
      "영행렬",
      STD_S15
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$일 때 $A+B$를 고르시오.",
      ["$\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$", "$\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$", "$\\begin{pmatrix}4&4\\\\4&4\\end{pmatrix}$", "$\\begin{pmatrix}6&8\\\\8&6\\end{pmatrix}$", "$\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$",
      "(6,8;10,12)",
      "대응 성분끼리 더하면 $\\begin{pmatrix}1+5&2+6\\\\3+7&4+8\\end{pmatrix}=\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$이다.",
      ["대응 위치 성분끼리 더한다.", "네 칸 모두 같은 방식으로 계산한다."],
      "행렬의 덧셈",
      STD_S15
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$에 대하여 $2A$를 고르시오.",
      ["$\\begin{pmatrix}2&4\\\\6&8\\end{pmatrix}$", "$\\begin{pmatrix}1&4\\\\3&8\\end{pmatrix}$", "$\\begin{pmatrix}3&4\\\\5&6\\end{pmatrix}$", "$\\begin{pmatrix}2&2\\\\2&2\\end{pmatrix}$", "$\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}2&4\\\\6&8\\end{pmatrix}$",
      "(2,4;6,8)",
      "실수배는 모든 성분에 같은 수를 곱한다. 따라서 $2A=\\begin{pmatrix}2&4\\\\6&8\\end{pmatrix}$이다.",
      ["실수배는 모든 성분에 동일하게 곱한다.", "각 칸에 2를 곱해 계산한다."],
      "실수배",
      STD_S15
    ),
    makeMc(
      "행렬 뺄셈 $A-B$와 항상 같은 식을 고르시오.",
      ["$A+(-1)B$", "$A+B$", "$(-1)A+B$", "$AB$", "$BA$"],
      0,
      "$A+(-1)B$",
      "A+(-1)B",
      "행렬 뺄셈은 반대행렬을 더하는 연산이므로 $A-B=A+(-1)B$이다.",
      ["뺄셈을 덧셈으로 바꾸어 표현한다."],
      "행렬의 뺄셈",
      STD_S16
    ),
    makeMc(
      "행렬곱 $AB$가 정의되기 위한 조건을 고르시오.",
      ["$A$의 열 수 = $B$의 행 수", "$A$의 행 수 = $B$의 열 수", "$A,B$는 항상 정사각행렬", "$A$의 행 수 = $B$의 행 수", "$A$의 열 수 = $B$의 열 수"],
      0,
      "$A$의 열 수 = $B$의 행 수",
      "A의 열 수 = B의 행 수",
      "행렬곱은 앞 행렬의 열 수와 뒤 행렬의 행 수가 같을 때만 정의된다.",
      ["곱셈 가능 조건은 '앞 열=뒤 행'이다.", "두 행렬의 맞닿는 차원을 비교한다."],
      "행렬 곱셈 조건",
      STD_S17
    ),
    makeMc(
      "단위행렬 $E$와 행렬 $A$에 대해 항상 성립하는 식을 고르시오.",
      ["$AE=EA=A$", "$AE=E$", "$EA=E$", "$AE=O$", "$EA=O$"],
      0,
      "$AE=EA=A$",
      "AE=EA=A",
      "단위행렬은 곱셈 항등원이므로 좌우에서 곱해도 원행렬 $A$가 유지된다.",
      ["단위행렬의 역할이 곱셈 항등원인지 확인한다."],
      "단위행렬",
      STD_S17
    ),
    makeMc(
      "분배법칙으로 옳은 식을 고르시오.",
      ["$A(B+C)=AB+AC$", "$A(B+C)=AB+BC$", "$(A+B)C=AB+BC+AC$", "$(A+B)C=A+B+C$", "$A(B+C)=A+B+C$"],
      0,
      "$A(B+C)=AB+AC$",
      "A(B+C)=AB+AC",
      "행렬곱은 덧셈에 대해 분배법칙이 성립하며 왼쪽 분배는 $A(B+C)=AB+AC$이다.",
      ["분배 시 $A$가 각각 $B,C$에 곱해지는지 확인한다.", "곱셈 순서를 유지한 채 전개한다."],
      "분배법칙",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$에 대해 $A^2$의 의미로 옳은 것을 고르시오.",
      ["$A\\cdot A$", "$A+A$", "$2A$", "$A^{-1}$", "$A^T$"],
      0,
      "$A\\cdot A$",
      "A·A",
      "행렬의 제곱은 같은 행렬을 두 번 곱한 연산이다.",
      ["거듭제곱의 정의를 확인한다."],
      "행렬의 거듭제곱",
      STD_S17
    )
  ];

  // 기초(Lv1) 객관식 동적 생성기 5개
  const matMCLv1Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const ans = c;
        return makeMc(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 제2행 제1열의 성분을 고르시오.",
          ["$" + ans + "$", "$" + a + "$", "$" + b + "$", "$" + d + "$", "$0$"],
          0,
          "$" + ans + "$",
          String(ans),
          "제2행 제1열은 왼쪽 아래 칸의 성분이므로 $" + ans + "$이다.",
          ["제2행 제1열 위치를 정확히 찾는다.", "행·열 위치와 칸을 일치시켜 확인한다."],
                "행렬의 성분",
          STD_S15
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const r = riSafe(2, 4), c = riSafe(2, 4);
        return makeMc(
          "행이 " + r + "개, 열이 " + c + "개인 행렬의 크기를 고르시오.",
          ["$" + r + "\\times" + c + "$", "$" + c + "\\times" + r + "$", "$" + r + "\\times" + r + "$", "$" + c + "\\times" + c + "$", "$1\\times1$"],
          0,
          "$" + r + "\\times" + c + "$",
          r + "x" + c,
          "행렬의 크기는 (행의 수)$\\times$(열의 수)이므로 $" + r + "\\times" + c + "$이다.",
          ["행 수와 열 수를 각각 센다.", "표기 순서를 '(행)×(열)'로 적용한다."],
          "행렬의 크기",
          STD_S15
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a + e, x12 = b + f, x21 = c + g2, x22 = d + h;
        return makeMc(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A+B$를 고르시오.",
          [
            "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (a - e) + "&" + (b - f) + "\\\\" + (c - g2) + "&" + (d - h) + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (x11 + 1) + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$"
          ],
          0,
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분끼리 더하면 $A+B=\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$이다.",
          ["대응 성분끼리 더한다.", "제1행 제1열부터 순서대로 계산한다."],
                "행렬의 덧셈",
          STD_S15
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5), a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const y11 = k * a, y12 = k * b, y21 = k * c, y22 = k * d;
        return makeMc(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대하여 $" + k + "A$를 고르시오.",
          [
            "$\\begin{pmatrix}" + y11 + "&" + y12 + "\\\\" + y21 + "&" + y22 + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (a + k) + "&" + (b + k) + "\\\\" + (c + k) + "&" + (d + k) + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (-y11) + "&" + (-y12) + "\\\\" + (-y21) + "&" + (-y22) + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + y11 + "&" + y21 + "\\\\" + y12 + "&" + y22 + "\\end{pmatrix}$"
          ],
          0,
          "$\\begin{pmatrix}" + y11 + "&" + y12 + "\\\\" + y21 + "&" + y22 + "\\end{pmatrix}$",
          "(" + y11 + "," + y12 + ";" + y21 + "," + y22 + ")",
          "실수배는 모든 성분에 같은 수를 곱하므로 $" + k + "A=\\begin{pmatrix}" + y11 + "&" + y12 + "\\\\" + y21 + "&" + y22 + "\\end{pmatrix}$이다.",
          ["모든 성분에 같은 계수 " + k + "를 곱한다.", "성분 하나만이 아니라 네 칸 모두 계산한다."],
          "실수배",
          STD_S15
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeMc(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 고르시오.",
          ["$" + m + "\\times" + p + "$", "$" + n + "\\times" + m + "$", "$" + p + "\\times" + m + "$", "$" + n + "\\times" + p + "$", "$" + m + "\\times" + n + "$"],
          0,
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "행렬곱 결과 크기는 (앞 행렬의 행 수)$\\times$(뒤 행렬의 열 수)이므로 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건부터 확인한다.", "결과 크기는 '앞 행 수, 뒤 열 수'로 쓴다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      };
      g._types = ["객관식"];
      return g;
    })()
  ];

  // 기본(Lv2) 객관식 정적 10문항
  const matMCLv2Static = [
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}2&-1\\\\0&5\\end{pmatrix}$일 때 $A-B$를 고르시오.",
      ["$\\begin{pmatrix}-1&3\\\\3&-1\\end{pmatrix}$", "$\\begin{pmatrix}3&1\\\\3&9\\end{pmatrix}$", "$\\begin{pmatrix}1&-2\\\\3&-4\\end{pmatrix}$", "$\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}-1&1\\\\3&-1\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}-1&3\\\\3&-1\\end{pmatrix}$",
      "(-1,3;3,-1)",
      "대응 성분끼리 빼면 $A-B=\\begin{pmatrix}1-2&2-(-1)\\\\3-0&4-5\\end{pmatrix}=\\begin{pmatrix}-1&3\\\\3&-1\\end{pmatrix}$이다.",
      ["대응 성분끼리 뺀다.", "음수 부호 처리(예: $2-(-1)$)를 정확히 계산한다."],
      "행렬의 뺄셈",
      STD_S16
    ),
    makeMc(
      "실수 $k=3$일 때 $3(A+B)$와 항상 같은 식을 고르시오.",
      ["$3A+3B$", "$3A+B$", "$A+3B$", "$3AB$", "$A+B+3$"],
      0,
      "$3A+3B$",
      "3A+3B",
      "실수배의 분배법칙에 의해 $k(A+B)=kA+kB$가 성립한다.",
      ["실수배 분배법칙을 적용한다."],
      "실수배 분배법칙",
      STD_S16
    ),
    makeMc(
      "실수 $k,l$와 행렬 $A$에 대해 항상 성립하는 식을 고르시오.",
      ["$(k+l)A=kA+lA$", "$(k+l)A=klA$", "$(k+l)A=A+k+l$", "$(k+l)A=kA-lA$", "$(k+l)A=A$"],
      0,
      "$(k+l)A=kA+lA$",
      "(k+l)A=kA+lA",
      "실수 합에 대한 행렬 실수배의 분배법칙이 성립한다.",
      ["실수 합 분배법칙을 그대로 적용한다."],
      "실수배 성질",
      STD_S16
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}2&0\\\\0&2\\end{pmatrix},\\ B=\\begin{pmatrix}1&3\\\\4&5\\end{pmatrix}$일 때 $A+B$를 고르시오.",
      ["$\\begin{pmatrix}3&3\\\\4&7\\end{pmatrix}$", "$\\begin{pmatrix}2&3\\\\4&5\\end{pmatrix}$", "$\\begin{pmatrix}1&3\\\\4&5\\end{pmatrix}$", "$\\begin{pmatrix}3&0\\\\0&7\\end{pmatrix}$", "$\\begin{pmatrix}1&1\\\\1&1\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}3&3\\\\4&7\\end{pmatrix}$",
      "(3,3;4,7)",
      "대응 성분 합으로 $\\begin{pmatrix}2+1&0+3\\\\0+4&2+5\\end{pmatrix}=\\begin{pmatrix}3&3\\\\4&7\\end{pmatrix}$이다.",
      ["덧셈은 대응 성분끼리 수행한다.", "각 성분을 순서대로 계산해 완성한다."],
      "행렬의 덧셈",
      STD_S15
    ),
    makeMc(
      "다음 중 항상 참인 식을 고르시오.",
      ["$A-B=A+(-1)B$", "$A-B=B-A$", "$A+B=AB$", "$A^2=A+A$", "$A+O=O$"],
      0,
      "$A-B=A+(-1)B$",
      "A-B=A+(-1)B",
      "행렬 뺄셈은 반대행렬을 더하는 연산으로 정의한다.",
      ["뺄셈의 정의를 덧셈 형태로 바꿔 확인한다."],
      "행렬의 뺄셈 정의",
      STD_S16
    ),
    makeMc(
      "행렬 $A$가 $2\\times3$, $B$가 $3\\times4$일 때 $AB$의 크기를 고르시오.",
      ["$2\\times4$", "$3\\times2$", "$4\\times2$", "$3\\times4$", "$2\\times3$"],
      0,
      "$2\\times4$",
      "2x4",
      "행렬곱 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times4$이다.",
      ["결과 크기 규칙을 적용한다.", "앞 행 수와 뒤 열 수를 그대로 쓴다."],
      "행렬곱 결과 크기",
      STD_S17
    ),
    makeMc(
      "행렬곱에서 일반적으로 성립하지 않는 법칙을 고르시오.",
      ["교환법칙", "결합법칙", "왼쪽 분배법칙", "오른쪽 분배법칙", "곱셈 항등원 성질"],
      0,
      "교환법칙",
      "교환법칙",
      "행렬곱은 일반적으로 $AB\\neq BA$이므로 교환법칙이 성립하지 않는다.",
      ["성립하지 않는 기본 성질을 구분한다."],
      "행렬곱 성질",
      STD_S17
    ),
    makeMc(
      "단위행렬 $E$와 행렬 $A$에 대해 참인 식을 고르시오.",
      ["$AE=EA=A$", "$AE=E$", "$EA=E$", "$AE=O$", "$EA=O$"],
      0,
      "$AE=EA=A$",
      "AE=EA=A",
      "단위행렬은 곱셈 항등원이므로 좌우에서 곱해도 $A$가 유지된다.",
      ["단위행렬의 항등원 성질을 적용한다."],
      "단위행렬",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$를 고르시오.",
      ["$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}2&1\\\\0&2\\end{pmatrix}$", "$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}2&2\\\\0&2\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$",
      "(1,2;0,1)",
      "$A^2=AA$를 계산하면 우상단 성분은 $1\\cdot1+1\\cdot1=2$가 되어 $\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$이다.",
      ["$A^2=AA$로 직접 곱한다.", "제1행 제2열 성분을 먼저 계산해 확인한다."],
      "행렬의 거듭제곱",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}, B=\\begin{pmatrix}2&0\\\\1&2\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 고르시오.",
      ["$4$", "$2$", "$5$", "$7$", "$8$"],
      0,
      "$4$",
      "4",
      "$AB$의 제1행 제1열은 $1\\cdot2+2\\cdot1=4$이다.",
      ["제1행과 제1열의 내적을 계산한다.", "해당 두 곱의 합으로 성분을 구한다."],
      "행렬곱 성분 계산",
      STD_S17
    )
  ];

  // 기본(Lv2) 객관식 동적 생성기 5개
  const matMCLv2Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a - e, x12 = b - f, x21 = c - g2, x22 = d - h;
        return makeMc(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A-B$를 고르시오.",
          [
            "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (a + e) + "&" + (b + f) + "\\\\" + (c + g2) + "&" + (d + h) + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (x11 + 1) + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$"
          ],
          0,
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분 차로 계산하면 정답 행렬이 된다.",
          ["대응 성분끼리 뺀다.", "음수 부호를 정확히 처리한다."],
          "행렬의 뺄셈",
          STD_S16
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5), l = riSafe(1, 4);
        return makeMc(
          "실수 $k=" + k + ",\\ l=" + l + "$일 때 $(k+l)A$와 같은 식을 고르시오.",
          ["$" + k + "A+" + l + "A$", "$" + (k * l) + "A$", "$A+" + (k + l) + "$", "$" + k + "A-" + l + "A$", "$A$"],
          0,
          "$" + k + "A+" + l + "A$",
          k + "A+" + l + "A",
          "실수 합 분배법칙에 의해 $(k+l)A=kA+lA$이다.",
          ["실수 합 분배법칙을 적용한다."],
          "실수배 성질",
          STD_S16
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeMc(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 고르시오.",
          ["$" + m + "\\times" + p + "$", "$" + n + "\\times" + m + "$", "$" + p + "\\times" + n + "$", "$" + n + "\\times" + p + "$", "$" + m + "\\times" + n + "$"],
          0,
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "결과 크기 규칙에 따라 $AB$의 크기는 $" + m + "\\times" + p + "$이다.",
          ["앞 행렬의 행 수와 뒤 행렬의 열 수를 선택한다.", "곱셈 가능 조건도 함께 점검한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2;
        return makeMc(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 고르시오.",
          ["$" + ab11 + "$", "$" + (a * e) + "$", "$" + (b * g2) + "$", "$" + (a + e) + "$", "$" + (ab11 + 1) + "$"],
          0,
          "$" + ab11 + "$",
          String(ab11),
          "제1행·제1열 내적은 $" + a + "\\cdot" + e + "+" + b + "\\cdot" + g2 + "=" + ab11 + "$이다.",
          ["제1행과 제1열의 내적을 계산한다.", "곱의 합 형태를 정확히 적용한다."],
          "행렬곱 성분 계산",
          STD_S17
        );
      };
      g._types = ["객관식"];
      return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 4);
        return makeMc(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 고르시오.",
          ["$" + (2 * x) + "$", "$" + x + "$", "$0$", "$" + (x * x) + "$", "$" + (2 * x + 1) + "$"],
          0,
          "$" + (2 * x) + "$",
          String(2 * x),
          "$A^2=AA$에서 제1행 제2열은 $1\\cdot" + x + "+" + x + "\\cdot1=" + (2 * x) + "$이다.",
          ["$A^2=AA$로 계산한다.", "제1행 제2열 성분만 먼저 계산해도 정답을 찾을 수 있다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      };
      g._types = ["객관식"];
      return g;
    })()
  ];

  // 표준(Lv3) 객관식 정적 10문항
  const matMCLv3Static = [
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$의 행렬식을 고르시오.",
      ["$-2$", "$2$", "$0$", "$4$", "$-4$"],
      0,
      "$-2$",
      "-2",
      "2×2 행렬식은 $ad-bc$이므로 $1\\cdot4-2\\cdot3=-2$이다.",
      ["$ad-bc$를 적용한다.", "곱의 차를 정확히 계산한다."],
      "행렬식",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 가역 여부를 고르시오.",
      ["가역", "비가역", "판단 불가", "항상 가역", "항상 비가역"],
      0,
      "가역",
      "가역",
      "$\\det(A)=2\\cdot1-1\\cdot1=1\\neq0$이므로 가역이다.",
      ["행렬식이 0인지 먼저 확인한다.", "$\\det(A)\\neq0$이면 가역이다."],
      "가역성 판정",
      STD_S17
    ),
    makeMc(
      "가역행렬 $A,B$에 대해 항상 성립하는 식을 고르시오.",
      ["$(AB)^{-1}=B^{-1}A^{-1}$", "$(AB)^{-1}=A^{-1}B^{-1}$", "$(AB)^{-1}=AB$", "$(AB)^{-1}=A^{-1}+B^{-1}$", "$(AB)^{-1}=BA$"],
      0,
      "$(AB)^{-1}=B^{-1}A^{-1}$",
      "(AB)^-1=B^-1A^-1",
      "곱의 역행렬은 역순으로 계산하므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.",
      ["역행렬 곱의 순서를 점검한다.", "원래 곱의 순서를 뒤집어 쓴다."],
      "역행렬 성질",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A,B$에 대해 $(AB)^T$와 같은 식을 고르시오.",
      ["$B^TA^T$", "$A^TB^T$", "$(A+B)^T$", "$AB$", "$BA$"],
      0,
      "$B^TA^T$",
      "B^TA^T",
      "전치행렬의 곱은 순서가 바뀌어 $(AB)^T=B^TA^T$가 된다.",
      ["전치 시 곱의 순서가 바뀌는지 확인한다."],
      "전치행렬",
      STD_S17
    ),
    makeMc(
      "$\\det(AB)$와 항상 같은 식을 고르시오.",
      ["$\\det(A)\\det(B)$", "$\\det(A)+\\det(B)$", "$\\det(A)-\\det(B)$", "$\\det(A/B)$", "$\\det(B)\\det(A)^2$"],
      0,
      "$\\det(A)\\det(B)$",
      "det(A)det(B)",
      "행렬식의 곱 성질에 의해 $\\det(AB)=\\det(A)\\det(B)$이다.",
      ["행렬식의 곱 성질을 적용한다."],
      "행렬식 성질",
      STD_S17
    ),
    makeMc(
      "행렬 $A$가 가역일 때 $AB=AC$에서 도출되는 결론을 고르시오.",
      ["$B=C$", "$A=B$", "$A=C$", "$B=A^{-1}C$", "항상 결론 없음"],
      0,
      "$B=C$",
      "B=C",
      "좌측에서 $A^{-1}$을 곱하면 $A^{-1}AB=A^{-1}AC$이고 $B=C$를 얻는다.",
      ["가역이면 좌소거가 가능한지 확인한다.", "양변에 $A^{-1}$을 곱해 정리한다."],
      "좌소거법칙",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&0&0\\\\0&2&0\\\\0&0&3\\end{pmatrix}$의 대각합을 고르시오.",
      ["$6$", "$5$", "$3$", "$9$", "$0$"],
      0,
      "$6$",
      "6",
      "대각합은 주대각 성분의 합이므로 $1+2+3=6$이다.",
      ["주대각 성분만 더한다.", "비대각 성분은 합에 포함하지 않는다."],
      "대각합",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$에 대해 $A^2$를 고르시오.",
      ["$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$", "$\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$", "$\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$", "$\\begin{pmatrix}0&0\\\\1&0\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$",
      "(0,0;0,0)",
      "$A^2=AA$를 계산하면 모든 성분이 0이 되어 영행렬이 된다.",
      ["$A^2=AA$를 직접 계산한다."],
      "멱영행렬",
      STD_S17
    ),
    makeMc(
      "다음 중 참인 명제를 고르시오.",
      ["$\\det(A)\\neq0\\Rightarrow A$는 가역", "$\\det(A)=0\\Rightarrow A$는 가역", "$AB=BA$는 항상 성립", "$A^2=A+A$는 항상 성립", "$A+B=AB$는 항상 성립"],
      0,
      "$\\det(A)\\neq0\\Rightarrow A$는 가역",
      "det(A)!=0 => 가역",
      "가역성 판정은 $\\det(A)\\neq0$와 동치이다.",
      ["가역성과 행렬식 조건을 연결한다."],
      "가역성",
      STD_S17
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}1&0\\\\3&1\\end{pmatrix}$일 때 $AB$의 제1행 제2열 성분을 고르시오.",
      ["$2$", "$1$", "$5$", "$0$", "$3$"],
      0,
      "$2$",
      "2",
      "제1행 제2열은 $1\\cdot0+2\\cdot1=2$이다.",
      ["제1행과 제2열 내적을 계산한다.", "해당 위치의 두 곱을 더한다."],
      "행렬곱 성분 계산",
      STD_S17
    )
  ];

  // 표준(Lv3) 객관식 동적 생성기 5개
  const matMCLv3Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        return makeMc(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 고르시오.",
          ["$" + det + "$", "$" + (a * d + b * c) + "$", "$" + (b * c - a * d) + "$", "$" + (a + d) + "$", "$0$"],
          0,
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$를 적용한다.", "두 곱의 차로 계산한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가역" : "비가역";
        return makeMc(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 가역 여부를 고르시오.",
          [ans, ans === "가역" ? "비가역" : "가역", "판단 불가", "항상 가역", "항상 비가역"],
          0,
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역" : "비가역") + "이다.",
          ["행렬식 0 여부를 먼저 확인한다.", "$\\det(A)\\neq0$이면 가역, $=0$이면 비가역이다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        return makeMc(
          "다음 중 항상 성립하는 식을 고르시오.",
          ["$(AB)^{-1}=B^{-1}A^{-1}$", "$(AB)^{-1}=A^{-1}B^{-1}$", "$(AB)^{-1}=AB$", "$(AB)^{-1}=A^{-1}+B^{-1}$", "$(AB)^{-1}=BA$"],
          0,
          "$(AB)^{-1}=B^{-1}A^{-1}$",
          "(AB)^-1=B^-1A^-1",
          "역행렬 곱은 역순으로 계산한다.",
          ["역행렬 곱은 순서를 뒤집어 쓴다."],
          "역행렬 성질",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const commute = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22);
        return makeMc(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에서 $AB$와 $BA$의 관계를 고르시오.",
          [commute ? "$AB=BA$" : "$AB\\neq BA$", commute ? "$AB\\neq BA$" : "$AB=BA$", "$AB=O$", "$BA=O$", "항상 동일"],
          0,
          commute ? "$AB=BA$" : "$AB\\neq BA$",
          commute ? "AB=BA" : "AB!=BA",
          "$AB$와 $BA$를 계산해 성분을 비교하면 두 행렬의 동일 여부를 결정할 수 있다.",
          ["$AB$와 $BA$를 각각 계산한다.", "대응 성분 전체를 비교해 결론을 낸다."],
          "교환법칙",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeMc(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 고르시오.",
          ["$" + m + "\\times" + p + "$", "$" + n + "\\times" + m + "$", "$" + p + "\\times" + n + "$", "$" + n + "\\times" + p + "$", "$" + m + "\\times" + n + "$"],
          0,
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $" + m + "\\times" + p + "$이다.",
          ["결과 크기 규칙을 적용한다.", "앞 행 수와 뒤 열 수를 결합한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })()
  ];

  // 심화(Lv4) 객관식 정적 10문항 (실생활 맥락 포함)
  const matMCLv4Static = [
    makeMc(
      "물류센터 A의 출고량 행렬 $A=\\begin{pmatrix}12&8\\\\7&9\\end{pmatrix}$, 센터 B의 출고량 행렬 $B=\\begin{pmatrix}5&6\\\\4&3\\end{pmatrix}$일 때 총 출고량 $A+B$를 고르시오.",
      ["$\\begin{pmatrix}17&14\\\\11&12\\end{pmatrix}$", "$\\begin{pmatrix}7&2\\\\3&6\\end{pmatrix}$", "$\\begin{pmatrix}60&48\\\\28&27\\end{pmatrix}$", "$\\begin{pmatrix}12&8\\\\7&9\\end{pmatrix}$", "$\\begin{pmatrix}5&6\\\\4&3\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}17&14\\\\11&12\\end{pmatrix}$",
      "(17,14;11,12)",
      "총 출고량은 대응 성분 합으로 계산한다. 따라서 $A+B=\\begin{pmatrix}12+5&8+6\\\\7+4&9+3\\end{pmatrix}=\\begin{pmatrix}17&14\\\\11&12\\end{pmatrix}$이다.",
      ["대응 성분끼리 더한다.", "각 성분을 순서대로 계산해 전체 행렬을 완성한다."],
      "행렬의 덧셈 활용",
      STD_S16
    ),
    makeMc(
      "광고 채널 반응행렬 $A$가 $2\\times3$, 전환율 행렬 $B$가 $3\\times2$일 때 $AB$의 크기를 고르시오.",
      ["$2\\times2$", "$3\\times3$", "$2\\times3$", "$3\\times2$", "$1\\times2$"],
      0,
      "$2\\times2$",
      "2x2",
      "행렬곱 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times2$이다.",
      ["곱셈 가능 조건 '앞 열=뒤 행'을 먼저 확인한다.", "결과 크기는 '앞 행, 뒤 열'을 사용한다."],
      "행렬곱 결과 크기",
      STD_S17
    ),
    makeMc(
      "교통 인접행렬 $M$에서 $M^2$의 성분 의미로 옳은 것을 고르시오.",
      ["2단계 경로 수", "직접 연결 여부만", "정점 개수", "간선 가중치 평균", "행렬식 값"],
      0,
      "2단계 경로 수",
      "2단계 경로 수",
      "인접행렬의 거듭제곱 성분은 해당 단계 수 경로의 개수 해석에 사용된다.",
      ["인접행렬 곱의 성분은 중간 정점을 거치는 경로 합이다.", "제곱이면 2단계 경로 해석으로 연결한다."],
      "인접행렬 해석",
      STD_S17
    ),
    makeMc(
      "암호화 선형변환 행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 복호화 가능 여부를 고르시오.",
      ["가능", "불가능", "판단 불가", "항상 가능", "항상 불가능"],
      0,
      "가능",
      "가능",
      "$\\det(A)=2\\cdot1-1\\cdot1=1\\neq0$이므로 가역이며 복호화(역변환)가 가능하다.",
      ["행렬식을 계산한다.", "$\\det(A)\\neq0$이면 역행렬이 존재한다."],
      "가역성 판정",
      STD_S17
    ),
    makeMc(
      "프로세스 변환행렬 $A,B$를 순서대로 적용할 때 일반적으로 맞는 명제를 고르시오.",
      ["$AB\\neq BA$일 수 있다", "항상 $AB=BA$", "항상 $AB=O$", "항상 $BA=O$", "항상 $AB=A+B$"],
      0,
      "$AB\\neq BA$일 수 있다",
      "AB!=BA",
      "행렬곱은 연산 순서에 민감하므로 일반적으로 $AB$와 $BA$가 다를 수 있다.",
      ["교환법칙이 일반적으로 성립하는지 확인한다."],
      "행렬곱의 교환법칙",
      STD_S17
    ),
    makeMc(
      "데이터 복원에서 가역행렬 $A,B$의 합성변환 역행렬을 고르시오.",
      ["$(AB)^{-1}=B^{-1}A^{-1}$", "$(AB)^{-1}=A^{-1}B^{-1}$", "$(AB)^{-1}=AB$", "$(AB)^{-1}=A^{-1}+B^{-1}$", "$(AB)^{-1}=BA$"],
      0,
      "$(AB)^{-1}=B^{-1}A^{-1}$",
      "(AB)^-1=B^-1A^-1",
      "합성변환의 역행렬은 적용 순서를 반대로 하므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.",
      ["합성 순서를 반대로 추적한다.", "역행렬 곱은 역순으로 쓴다."],
      "역행렬 성질",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A,B$에 대해 $(AB)^T$와 같은 식을 고르시오.",
      ["$B^TA^T$", "$A^TB^T$", "$AB$", "$BA$", "$A^T+B^T$"],
      0,
      "$B^TA^T$",
      "B^TA^T",
      "전치 연산은 곱의 순서를 바꾸므로 $(AB)^T=B^TA^T$이다.",
      ["전치 시 곱 순서가 바뀌는지 확인한다."],
      "전치행렬",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$에 대해 $AB=AC\\Rightarrow B=C$가 항상 성립하려면 필요한 조건을 고르시오.",
      ["$A$가 가역", "$A$가 영행렬", "$A$가 대각행렬", "$B=C$를 가정", "$A$가 대칭행렬"],
      0,
      "$A$가 가역",
      "A가 가역",
      "좌소거법칙이 성립하려면 $A$가 가역이어야 한다.",
      ["좌소거 가능 조건을 먼저 확인한다.", "가역성 여부가 핵심 조건이다."],
      "좌소거법칙",
      STD_S17
    ),
    makeMc(
      "재고 변동을 나타내는 행렬 $A=\\begin{pmatrix}10&7\\\\6&9\\end{pmatrix}$, 출고행렬 $B=\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$일 때 순변동 $A-B$를 고르시오.",
      ["$\\begin{pmatrix}7&5\\\\5&5\\end{pmatrix}$", "$\\begin{pmatrix}13&9\\\\7&13\\end{pmatrix}$", "$\\begin{pmatrix}30&14\\\\6&36\\end{pmatrix}$", "$\\begin{pmatrix}10&7\\\\6&9\\end{pmatrix}$", "$\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}7&5\\\\5&5\\end{pmatrix}$",
      "(7,5;5,5)",
      "순변동은 대응 성분 차로 계산하므로 $A-B=\\begin{pmatrix}10-3&7-2\\\\6-1&9-4\\end{pmatrix}=\\begin{pmatrix}7&5\\\\5&5\\end{pmatrix}$이다.",
      ["대응 성분 차를 계산한다.", "모든 칸에서 같은 방식으로 뺀다."],
      "행렬의 뺄셈 활용",
      STD_S16
    ),
    makeMc(
      "행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}$일 때 $AB$의 제2행 제1열 성분을 고르시오.",
      ["$10$", "$7$", "$5$", "$4$", "$11$"],
      0,
      "$10$",
      "10",
      "제2행 제1열은 $3\\cdot2+4\\cdot1=10$이다.",
      ["제2행과 제1열의 내적을 계산한다.", "곱의 합으로 성분을 구한다."],
      "행렬곱 성분 계산",
      STD_S17
    )
  ];

  // 심화(Lv4) 객관식 동적 생성기 5개 (실생활 맥락 포함)
  const matMCLv4Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(8, 20), b = riSafe(8, 20), c = riSafe(8, 20), d = riSafe(8, 20);
        const e = riSafe(5, 15), f = riSafe(5, 15), g2 = riSafe(5, 15), h = riSafe(5, 15);
        const x11 = a + e, x12 = b + f, x21 = c + g2, x22 = d + h;
        return makeMc(
          "매장 A와 B의 상품별 주간 판매량 행렬을 더한 결과를 고르시오. $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$",
          [
            "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (a - e) + "&" + (b - f) + "\\\\" + (c - g2) + "&" + (d - h) + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$",
            "$\\begin{pmatrix}" + (x11 + 1) + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$"
          ],
          0,
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "총 판매량은 대응 성분 합으로 계산하므로 정답 행렬이 된다.",
          ["동일 상품·동일 주차의 대응 성분을 더한다.", "각 칸을 순서대로 더해 결과 행렬을 완성한다."],
          "행렬의 덧셈 활용",
          STD_S16
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(2, 4), n = riSafe(2, 4), p = riSafe(2, 4);
        return makeMc(
          "광고 채널 행렬 $A$가 $" + m + "\\times" + n + "$, 전환 행렬 $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 고르시오.",
          ["$" + m + "\\times" + p + "$", "$" + n + "\\times" + m + "$", "$" + p + "\\times" + n + "$", "$" + n + "\\times" + p + "$", "$" + m + "\\times" + n + "$"],
          0,
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건을 먼저 확인한다.", "결과는 '앞 행 수, 뒤 열 수' 규칙을 적용한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
            const det = a * d - b * c;
        const ans = det !== 0 ? "복호화 가능" : "복호화 불가";
        return makeMc(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 복호화 가능 여부를 고르시오.",
          [ans, ans === "복호화 가능" ? "복호화 불가" : "복호화 가능", "판단 불가", "항상 가능", "항상 불가"],
          0,
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역(복호화 가능)" : "비가역(복호화 불가)") + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)\\neq0$인지 확인해 가역성을 판정한다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(0, 1), b = riSafe(0, 1), c = riSafe(0, 1), d = riSafe(0, 1);
        const m2_11 = a * a + b * c;
        return makeMc(
          "교통 인접행렬 $M=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $M^2$의 제1행 제1열 성분을 고르시오.",
          ["$" + m2_11 + "$", "$" + (a + b) + "$", "$" + (a * b) + "$", "$" + (c + d) + "$", "$" + (m2_11 + 1) + "$"],
          0,
          "$" + m2_11 + "$",
          String(m2_11),
          "$M^2$의 제1행 제1열은 제1행과 제1열 내적으로 $" + a + "\\cdot" + a + "+" + b + "\\cdot" + c + "=" + m2_11 + "$이다.",
          ["제1행·제1열 내적을 계산한다.", "두 곱의 합이 성분 값임을 적용한다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const commute = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22);
        return makeMc(
          "공정 변환행렬 $A,B$에 대해 옳은 명제를 고르시오.",
          [commute ? "$AB=BA$" : "$AB\\neq BA$", commute ? "$AB\\neq BA$" : "$AB=BA$", "$AB=O$", "$BA=O$", "$A+B=AB$"],
          0,
          commute ? "$AB=BA$" : "$AB\\neq BA$",
          commute ? "AB=BA" : "AB!=BA",
          "$AB$와 $BA$를 계산해 비교하면 동일 여부를 판단할 수 있다.",
          ["$AB$와 $BA$를 각각 계산한다.", "모든 대응 성분이 일치하는지 비교한다."],
          "행렬곱 교환법칙",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })()
  ];

  // 최고(Lv5) 객관식 정적 10문항 (실생활 + 역추론/다단계)
  const matMCLv5Static = [
    makeMc(
      "암호화-복호화 합성에서 가역행렬 $A,B$에 대해 항상 성립하는 식을 고르시오.",
      ["$(AB)^{-1}=B^{-1}A^{-1}$", "$(AB)^{-1}=A^{-1}B^{-1}$", "$(AB)^{-1}=AB$", "$(AB)^{-1}=A^{-1}+B^{-1}$", "$(AB)^{-1}=BA$"],
      0,
      "$(AB)^{-1}=B^{-1}A^{-1}$",
      "(AB)^-1=B^-1A^-1",
      "합성변환의 역은 적용 순서를 반대로 하므로 $(AB)^{-1}=B^{-1}A^{-1}$가 성립한다.",
      ["합성 순서를 반대로 추적한다.", "역행렬 곱은 역순임을 적용한다."],
      "역행렬 성질",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$가 $A^2=E$를 만족할 때 항상 성립하는 식을 고르시오.",
      ["$(E+A)(E-A)=O$", "$(E+A)(E-A)=E$", "$(E+A)(E-A)=A$", "$(E+A)(E-A)=2E$", "$(E+A)(E-A)=A^2$"],
      0,
      "$(E+A)(E-A)=O$",
      "(E+A)(E-A)=O",
      "전개하면 $(E+A)(E-A)=E-A^2$이고, $A^2=E$를 대입하면 $O$가 된다.",
      ["곱셈공식 형태로 전개한다.", "$A^2=E$를 대입해 단순화한다."],
      "행렬 곱셈공식",
      STD_S17
    ),
    makeMc(
      "도시 연결 인접행렬 $M$에서 $M^3$의 성분 의미로 옳은 것을 고르시오.",
      ["3단계 경로 수", "직접 연결 여부", "정점 개수", "행렬식의 부호", "가중치 평균"],
      0,
      "3단계 경로 수",
      "3단계 경로 수",
      "인접행렬의 거듭제곱 성분은 해당 단계 수 경로의 개수를 해석한다.",
      ["거듭제곱 지수와 경로 단계 수를 연결한다."],
      "인접행렬 거듭제곱",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A,B$에서 $AB=BA$일 때 옳은 식을 고르시오.",
      ["$(A+B)^2=A^2+2AB+B^2$", "$(A+B)^2=A^2+B^2$", "$(A+B)^2=A^2+AB+B^2$", "$(A+B)^2=2A^2+2B^2$", "$(A+B)^2=A^2+BA+B^2$"],
      0,
      "$(A+B)^2=A^2+2AB+B^2$",
      "(A+B)^2=A^2+2AB+B^2",
      "기본 전개식은 $A^2+AB+BA+B^2$이고, $AB=BA$이면 $A^2+2AB+B^2$가 된다.",
      ["먼저 일반 전개식을 쓴다.", "가환조건 $AB=BA$를 대입해 정리한다."],
      "가환조건 전개",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$에서 $\\det(A)=0$일 때 옳은 결론을 고르시오.",
      ["$A$는 비가역", "$A$는 가역", "$A^{-1}$이 항상 존재", "$AB=AC\\Rightarrow B=C$ 항상 성립", "$A^2=E$ 항상 성립"],
      0,
      "$A$는 비가역",
      "A는 비가역",
      "행렬식이 0이면 역행렬이 존재하지 않으므로 비가역이다.",
      ["행렬식 0 여부와 가역성의 관계를 적용한다."],
      "가역성 판정",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A,B$에 대해 $(AB)^T$와 같은 식을 고르시오.",
      ["$B^TA^T$", "$A^TB^T$", "$AB$", "$BA$", "$A^T+B^T$"],
      0,
      "$B^TA^T$",
      "B^TA^T",
      "전치행렬 곱 성질에 의해 $(AB)^T=B^TA^T$이다.",
      ["전치 시 곱 순서가 뒤집히는지 확인한다."],
      "전치행렬",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$가 가역이고 $AB=AC$일 때 옳은 결론을 고르시오.",
      ["$B=C$", "$A=B$", "$A=C$", "$B=A^{-1}C$", "결론 불가"],
      0,
      "$B=C$",
      "B=C",
      "좌측에 $A^{-1}$을 곱하면 $A^{-1}AB=A^{-1}AC$에서 $B=C$를 얻는다.",
      ["좌소거 가능 조건(가역성)을 확인한다.", "양변에 $A^{-1}$을 곱해 정리한다."],
      "좌소거법칙",
      STD_S17
    ),
    makeMc(
      "확률 전이행렬(각 행의 합이 1) $P,Q$에 대해 옳은 설명을 고르시오.",
      ["$PQ$도 각 행의 합이 1인 행렬", "$PQ$의 각 행 합은 항상 2", "$PQ$는 항상 영행렬", "$PQ$는 항상 대각행렬", "$PQ$의 각 행 합은 항상 0"],
      0,
      "$PQ$도 각 행의 합이 1인 행렬",
      "PQ도 행합 1",
      "행확률행렬의 곱은 행합 1 성질을 유지한다.",
      ["행합 보존 성질을 적용한다."],
      "전이행렬",
      STD_S17
    ),
    makeMc(
      "데이터 복원에서 스케일 행렬 $D=\\begin{pmatrix}2&0\\\\0&5\\end{pmatrix}$의 역행렬을 고르시오.",
      ["$\\begin{pmatrix}\\frac12&0\\\\0&\\frac15\\end{pmatrix}$", "$\\begin{pmatrix}2&0\\\\0&5\\end{pmatrix}$", "$\\begin{pmatrix}5&0\\\\0&2\\end{pmatrix}$", "$\\begin{pmatrix}-2&0\\\\0&-5\\end{pmatrix}$", "$\\begin{pmatrix}0&\\frac12\\\\\\frac15&0\\end{pmatrix}$"],
      0,
      "$\\begin{pmatrix}\\frac12&0\\\\0&\\frac15\\end{pmatrix}$",
      "(1/2,0;0,1/5)",
      "대각행렬의 역행렬은 각 대각성분의 역수를 취한 대각행렬이다.",
      ["대각성분별로 역수를 취한다.", "비대각성분은 0으로 유지한다."],
      "대각행렬 역행렬",
      STD_S17
    ),
    makeMc(
      "정사각행렬 $A$가 비가역일 때 참인 명제를 고르시오.",
      ["$AB=AC$이면서 $B\\neq C$인 경우가 존재할 수 있다", "항상 $AB=AC\\Rightarrow B=C$", "항상 $A^{-1}$ 존재", "항상 $\\det(A)\\neq0$", "항상 $A^2=E$"],
      0,
      "$AB=AC$이면서 $B\\neq C$인 경우가 존재할 수 있다",
      "AB=AC and B!=C 가능",
      "비가역이면 좌소거가 보장되지 않아 $AB=AC$이어도 $B\\neq C$가 가능하다.",
      ["비가역이면 좌소거가 항상 가능한지 점검한다.", "가역 조건이 빠진 결론은 일반적으로 성립하지 않는다."],
      "비가역행렬과 소거",
      STD_S17
    )
  ];

  // 최고(Lv5) 객관식 동적 생성기 5개 (실생활 + 다단계)
  const matMCLv5Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "복호화 가능" : "복호화 불가";
        return makeMc(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 복호화 가능 여부를 고르시오.",
          [ans, ans === "복호화 가능" ? "복호화 불가" : "복호화 가능", "판단 불가", "항상 가능", "항상 불가"],
          0,
          ans,
          ans,
          "$\\det(A)=" + det + "이다. $\\det(A)\\neq0$이면 가역이므로 복호화 가능, $=0$이면 불가이다.",
          ["행렬식을 계산한다.", "가역성 조건($\\det\\neq0$)으로 결론을 낸다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const ab11 = a * e + b * g2, ab12 = a * f + b * h, ab21 = c * e + d * g2, ab22 = c * f + d * h;
        const ba11 = e * a + f * c, ba12 = e * b + f * d, ba21 = g2 * a + h * c, ba22 = g2 * b + h * d;
        const commute = (ab11 === ba11 && ab12 === ba12 && ab21 === ba21 && ab22 === ba22);
        return makeMc(
          "변환행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}, B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에 대해 옳은 관계를 고르시오.",
          [commute ? "$AB=BA$" : "$AB\\neq BA$", commute ? "$AB\\neq BA$" : "$AB=BA$", "$AB=O$", "$BA=O$", "$A+B=AB$"],
          0,
          commute ? "$AB=BA$" : "$AB\\neq BA$",
          commute ? "AB=BA" : "AB!=BA",
          "$AB$와 $BA$를 계산해 비교하면 교환 여부를 판정할 수 있다.",
          ["$AB$와 $BA$를 각각 계산한다.", "두 결과 행렬이 완전히 같은지 비교한다."],
          "교환법칙 판정",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const m2 = [
          [p * p + q * r, p * q + q * s],
          [r * p + s * r, r * q + s * s]
        ];
        const m3 = [
          [m2[0][0] * p + m2[0][1] * r, m2[0][0] * q + m2[0][1] * s],
          [m2[1][0] * p + m2[1][1] * r, m2[1][0] * q + m2[1][1] * s]
        ];
        const ans = m3[0][1];
        return makeMc(
          "교통 인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분을 고르시오.",
          ["$" + ans + "$", "$" + (m2[0][1]) + "$", "$" + (m2[0][0]) + "$", "$" + (ans + 1) + "$", "$0$"],
          0,
          "$" + ans + "$",
          String(ans),
          "$M^3=M^2M$를 계산하면 제1행 제2열 성분은 $" + ans + "$이다.",
          ["$M^2$를 먼저 계산한다.", "$M^3=M^2M$의 제1행 제2열을 내적으로 계산한다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
            const det = a * d - b * c;
        const isInv = det !== 0;
        return makeMc(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대해 $AB=AC\\Rightarrow B=C$의 성립 여부를 고르시오.",
          [isInv ? "항상 성립" : "항상 성립하지 않음", isInv ? "항상 성립하지 않음" : "항상 성립", "판단 불가", "항상 $B=A^{-1}C$", "항상 $A=B$"],
          0,
          isInv ? "항상 성립" : "항상 성립하지 않음",
          isInv ? "항상 성립" : "항상 성립하지 않음",
          "$\\det(A)=" + det + "이다. 가역이면 좌소거가 가능해 성립하고, 비가역이면 일반적으로 보장되지 않는다.",
          ["$\\det(A)$로 가역 여부를 판정한다.", "가역일 때만 좌소거가 항상 가능함을 적용한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(0, 1), b = 1 - a, c = riSafe(0, 1), d = 1 - c;
        const e = riSafe(0, 1), f = 1 - e, g2 = riSafe(0, 1), h = 1 - g2;
        const ans = "행합 1 유지";
        return makeMc(
          "전이행렬 $P=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}, Q=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에 대한 설명으로 옳은 것을 고르시오.",
          [ans, "행합 2가 됨", "행합 0이 됨", "항상 영행렬", "항상 대각행렬"],
          0,
          ans,
          ans,
          "각 행의 합이 1인 전이행렬의 곱도 각 행의 합이 1인 전이행렬 성질을 유지한다.",
          ["각 행의 합 조건을 먼저 확인한다.", "전이행렬 곱의 행합 보존 성질을 적용한다."],
          "전이행렬",
          STD_S17
        );
      }; g._types = ["객관식"]; return g;
    })()
  ];

  // 기초(Lv1) 단답형 정적 10문항
  const matSALv1Static = [
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$에서 제1행 제2열의 성분을 구하시오.", "$2$", "2", "제1행 제2열 위치의 성분은 $2$이다.", ["제1행과 제2열이 만나는 칸의 값을 확인한다."], "행렬의 성분", STD_S15),
    makeSa("행렬 $\\begin{pmatrix}1&0\\end{pmatrix}$의 크기를 구하시오.", "$1\\times2$", "1x2", "행렬의 크기는 (행 수)$\\times$(열 수)이다. 행 1개, 열 2개이므로 $1\\times2$이다.", ["행 수와 열 수를 각각 센다.", "표기 순서를 '(행)×(열)'로 적용한다."], "행렬의 크기", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}2&-1\\\\3&0\\end{pmatrix}$에 대하여 $2A$를 구하시오.", "$\\begin{pmatrix}4&-2\\\\6&0\\end{pmatrix}$", "(4,-2;6,0)", "실수배는 모든 성분에 2를 곱하므로 $2A=\\begin{pmatrix}4&-2\\\\6&0\\end{pmatrix}$이다.", ["모든 성분에 같은 수를 곱한다.", "각 칸에 2를 곱해 행렬을 완성한다."], "실수배", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$일 때 $A+B$를 구하시오.", "$\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$", "(6,8;10,12)", "대응 성분끼리 더하면 $\\begin{pmatrix}1+5&2+6\\\\3+7&4+8\\end{pmatrix}=\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$이다.", ["대응 성분끼리 더한다.", "네 칸을 같은 규칙으로 계산한다."], "행렬의 덧셈", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}$일 때 $A-B$를 구하시오.", "$\\begin{pmatrix}-1&1\\\\2&4\\end{pmatrix}$", "(-1,1;2,4)", "대응 성분끼리 빼면 $\\begin{pmatrix}1-2&2-1\\\\3-1&4-0\\end{pmatrix}=\\begin{pmatrix}-1&1\\\\2&4\\end{pmatrix}$이다.", ["대응 성분 차를 계산한다.", "부호를 정확히 처리한다."], "행렬의 뺄셈", STD_S16),
    makeSa("행렬 $A=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$일 때 $AB$를 구하시오.", "$\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$", "(2,-1;3,4)", "단위행렬은 곱셈 항등원이므로 $AB=B$이다.", ["단위행렬과의 곱 성질을 적용한다."], "단위행렬", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$를 구하시오.", "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "(1,2;0,1)", "$A^2=AA$를 계산하면 우상단 성분은 $1\\cdot1+1\\cdot1=2$이고 나머지도 계산하면 정답 행렬이 된다.", ["$A^2=AA$로 바꿔 계산한다.", "제1행 제2열 성분을 먼저 계산한다."], "행렬의 거듭제곱", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}3&2\\\\1&5\\end{pmatrix}$에서 제2행 제1열의 성분을 구하시오.", "$1$", "1", "제2행 제1열은 왼쪽 아래 칸이므로 값은 $1$이다.", ["제2행 제1열 위치를 정확히 찾는다."], "행렬의 성분", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}2&3\\\\4&5\\end{pmatrix}$에 대하여 $0A$를 구하시오.", "$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$", "(0,0;0,0)", "각 성분에 0을 곱하면 모두 0이 되어 영행렬이 된다.", ["각 성분에 0을 곱하면 모두 0이 되는지 확인한다."], "실수배와 영행렬", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하시오.", "$2$", "2", "제1행 제1열은 제1행과 제1열의 내적으로 $1\\cdot0+2\\cdot1=2$이다.", ["제1행과 제1열의 내적을 계산한다.", "곱의 합으로 성분을 구한다."], "행렬곱 성분 계산", STD_S17)
  ];

  // 기초(Lv1) 단답형 동적 생성기 5개
  const matSALv1Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 제2행 제1열의 성분을 구하시오.",
          "$" + c + "$",
          String(c),
          "제2행 제1열은 왼쪽 아래 칸의 성분이므로 $" + c + "$이다.",
          ["제2행 제1열 위치의 값을 직접 확인한다."],
          "행렬의 성분",
          STD_S15
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const r = riSafe(2, 4), c = riSafe(2, 4);
        return makeSa(
          "행이 " + r + "개, 열이 " + c + "개인 행렬의 크기를 구하시오.",
          "$" + r + "\\times" + c + "$",
          r + "x" + c,
          "행렬의 크기는 (행 수)$\\times$(열 수)이므로 $" + r + "\\times" + c + "$이다.",
          ["행 수와 열 수를 각각 센다.", "표기 순서를 '(행)×(열)'로 적용한다."],
          "행렬의 크기",
          STD_S15
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5), a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const y11 = k * a, y12 = k * b, y21 = k * c, y22 = k * d;
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대하여 $" + k + "A$를 구하시오.",
          "$\\begin{pmatrix}" + y11 + "&" + y12 + "\\\\" + y21 + "&" + y22 + "\\end{pmatrix}$",
          "(" + y11 + "," + y12 + ";" + y21 + "," + y22 + ")",
          "실수배는 모든 성분에 같은 수를 곱하므로 정답과 같다.",
          ["각 성분에 " + k + "를 곱한다.", "네 칸 모두 계산하여 행렬을 완성한다."],
          "실수배",
          STD_S15
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a + e, x12 = b + f, x21 = c + g2, x22 = d + h;
        return makeSa(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A+B$를 구하시오.",
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분끼리 더하면 정답 행렬이 된다.",
          ["대응 성분끼리 더한다.", "각 칸 계산값을 정리해 행렬로 쓴다."],
          "행렬의 덧셈",
          STD_S15
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeSa(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "행렬곱 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건(앞 열=뒤 행)을 확인한다.", "결과 크기는 '앞 행 수, 뒤 열 수' 규칙을 적용한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })()
  ];

  // 기본(Lv2) 단답형 정적 10문항
  const matSALv2Static = [
    makeSa("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 행렬식을 구하시오.", "$1$", "1", "$\\det(A)=2\\cdot1-1\\cdot1=1$이다.", ["$ad-bc$ 공식을 적용한다.", "각 곱을 계산한 뒤 차를 구한다."], "행렬식", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$의 가역 여부를 구하시오. (가역/비가역)", "비가역", "비가역", "$\\det(A)=1\\cdot4-2\\cdot2=0$이므로 비가역이다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 비가역이다."], "가역성 판정", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}3&-1\\\\2&0\\end{pmatrix},\\ B=\\begin{pmatrix}1&4\\\\-2&3\\end{pmatrix}$일 때 $A-B$를 구하시오.", "$\\begin{pmatrix}2&-5\\\\4&-3\\end{pmatrix}$", "(2,-5;4,-3)", "대응 성분 차로 $A-B=\\begin{pmatrix}3-1&-1-4\\\\2-(-2)&0-3\\end{pmatrix}=\\begin{pmatrix}2&-5\\\\4&-3\\end{pmatrix}$이다.", ["대응 성분끼리 뺀다.", "음수 부호를 정확히 처리한다."], "행렬의 뺄셈", STD_S16),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하시오.", "$4$", "4", "제1행 제1열은 제1행과 제1열의 내적으로 $1\\cdot2+2\\cdot1=4$이다.", ["제1행·제1열 내적을 계산한다.", "곱의 합으로 성분을 구한다."], "행렬곱 성분 계산", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하시오.", "$2$", "2", "$A^2=AA$에서 제1행 제2열은 $1\\cdot1+1\\cdot1=2$이다.", ["$A^2=AA$를 계산한다.", "제1행 제2열만 먼저 계산해도 된다."], "행렬의 거듭제곱", STD_S17),
    makeSa("실수 $k=3$과 행렬 $A=\\begin{pmatrix}1&-2\\\\4&0\\end{pmatrix}$에 대하여 $(kA)$의 제2행 제1열 성분을 구하시오.", "$12$", "12", "$3A$의 제2행 제1열은 $3\\cdot4=12$이다.", ["실수배는 각 성분에 같은 수를 곱한다.", "제2행 제1열 성분에 3을 곱한다."], "실수배", STD_S16),
    makeSa("행렬 $A$가 $2\\times3$, $B$가 $3\\times4$일 때 $AB$의 크기를 구하시오.", "$2\\times4$", "2x4", "결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times4$이다.", ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기는 '앞 행, 뒤 열'로 쓴다."], "행렬곱 결과 크기", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$일 때 $BA$를 구하시오.", "$\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$", "(3,2;1,4)", "단위행렬은 곱셈 항등원이므로 $BA=B$이다.", ["단위행렬과의 곱은 원행렬 유지임을 적용한다."], "단위행렬", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$에서 제2행 제2열 성분을 구하시오.", "$3$", "3", "제2행 제2열은 오른쪽 아래 칸의 성분으로 $3$이다.", ["제2행 제2열 위치를 정확히 찾는다."], "행렬의 성분", STD_S15),
    makeSa("행렬 $A=\\begin{pmatrix}2&0&0\\\\0&3&0\\\\0&0&4\\end{pmatrix}$의 대각합을 구하시오.", "$9$", "9", "주대각 성분 합은 $2+3+4=9$이다.", ["주대각 성분만 더한다.", "비대각 성분은 더하지 않는다."], "대각합", STD_S17)
  ];

  // 기본(Lv2) 단답형 동적 생성기 5개
  const matSALv2Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$ 공식을 적용한다.", "곱의 차를 계산한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가역" : "비가역";
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 가역 여부를 구하시오. (가역/비가역)",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역" : "비가역") + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)\\neq0$이면 가역, $=0$이면 비가역이다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a - e, x12 = b - f, x21 = c - g2, x22 = d - h;
        return makeSa(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A-B$를 구하시오.",
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분 차로 계산하면 정답 행렬이 된다.",
          ["대응 성분끼리 뺀다.", "각 성분의 부호를 정확히 계산한다."],
          "행렬의 뺄셈",
          STD_S16
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const v = a * e + b * g2;
        return makeSa(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하시오.",
          "$" + v + "$",
          String(v),
          "제1행 제1열은 제1행·제1열 내적으로 $" + a + "\\cdot" + e + "+" + b + "\\cdot" + g2 + "=" + v + "$이다.",
          ["제1행과 제1열의 내적을 계산한다.", "곱의 합을 정확히 더한다."],
          "행렬곱 성분 계산",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        const ans = 2 * x;
        return makeSa(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하시오.",
          "$" + ans + "$",
          String(ans),
          "$A^2=AA$에서 제1행 제2열은 $1\\cdot" + x + "+" + x + "\\cdot1=" + ans + "$이다.",
          ["$A^2=AA$를 계산한다.", "제1행 제2열 성분을 내적으로 구한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })()
  ];

  // 표준(Lv3) 단답형 정적 10문항
  const matSALv3Static = [
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$의 행렬식을 구하시오.", "$-2$", "-2", "$\\det(A)=1\\cdot4-2\\cdot3=-2$이다.", ["$ad-bc$ 공식을 적용한다.", "곱의 차를 계산한다."], "행렬식", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 가역 여부를 구하시오. (가역/비가역)", "가역", "가역", "$\\det(A)=2\\cdot1-1\\cdot1=1\\neq0$이므로 가역이다.", ["행렬식을 계산한다.", "$\\det(A)\\neq0$인지 확인한다."], "가역성 판정", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$의 가역 여부를 구하시오. (가역/비가역)", "비가역", "비가역", "$\\det(A)=1\\cdot4-2\\cdot2=0$이므로 비가역이다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 비가역이다."], "가역성 판정", STD_S17),
    makeSa("가역행렬 $A$에 대하여 $AB=AC$일 때 $B,C$의 관계를 구하시오.", "$B=C$", "B=C", "좌측에서 $A^{-1}$을 곱하면 $A^{-1}AB=A^{-1}AC$가 되어 $B=C$를 얻는다.", ["가역이면 좌소거 가능함을 확인한다.", "양변에 $A^{-1}$을 곱해 정리한다."], "좌소거법칙", STD_S17),
    makeSa("가역행렬 $A,B$에 대하여 $(AB)^{-1}$을 구하시오.", "$B^{-1}A^{-1}$", "B^-1A^-1", "곱의 역행렬은 역순으로 계산하므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.", ["역행렬 곱의 순서를 뒤집는다."], "역행렬 성질", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&0&0\\\\0&3&0\\\\0&0&5\\end{pmatrix}$의 대각합을 구하시오.", "$9$", "9", "주대각 성분의 합은 $1+3+5=9$이다.", ["주대각 성분만 더한다.", "비대각 성분은 제외한다."], "대각합", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$를 구하시오.", "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "(1,2;0,1)", "$A^2=AA$를 계산하면 제시된 결과를 얻는다.", ["$A^2=AA$로 계산한다.", "제1행 제2열 성분부터 계산해 검증한다."], "행렬의 거듭제곱", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix},\\ B=\\begin{pmatrix}1&4\\\\2&0\\end{pmatrix}$일 때 $AB$의 제1행 제2열 성분을 구하시오.", "$8$", "8", "제1행 제2열은 $2\\cdot4+1\\cdot0=8$이다.", ["제1행과 제2열의 내적을 계산한다.", "곱의 합으로 성분을 구한다."], "행렬곱 성분 계산", STD_S17),
    makeSa("정사각행렬 $A,B$에 대해 $(AB)^T$를 $A^T,B^T$로 나타내시오.", "$B^TA^T$", "B^TA^T", "전치행렬 곱 성질에 의해 $(AB)^T=B^TA^T$이다.", ["전치 시 곱 순서가 바뀌는지 확인한다."], "전치행렬", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$의 제곱 $A^2$를 구하시오.", "$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$", "(0,0;0,0)", "$A^2=AA$를 계산하면 모든 성분이 0이 된다.", ["직접 곱해 각 성분을 계산한다.", "모든 성분이 0인지 확인한다."], "멱영행렬", STD_S17)
  ];

  // 표준(Lv3) 단답형 동적 생성기 5개
  const matSALv3Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
            const det = a * d - b * c;
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$를 적용한다.", "곱의 차를 계산한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가역" : "비가역";
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 가역 여부를 구하시오. (가역/비가역)",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + ans + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)$의 0 여부로 가역성을 판정한다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const v = a * e + b * g2;
        return makeSa(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하시오.",
          "$" + v + "$",
          String(v),
          "제1행 제1열은 제1행·제1열 내적으로 $" + a + "\\cdot" + e + "+" + b + "\\cdot" + g2 + "=" + v + "$이다.",
          ["제1행과 제1열 내적을 계산한다.", "곱의 합으로 성분 값을 얻는다."],
          "행렬곱 성분 계산",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        return makeSa(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하시오.",
          "$" + (2 * x) + "$",
          String(2 * x),
          "$A^2=AA$에서 제1행 제2열은 $1\\cdot" + x + "+" + x + "\\cdot1=" + (2 * x) + "$이다.",
          ["$A^2=AA$를 계산한다.", "제1행 제2열 성분을 내적으로 구한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const ans = det !== 0 ? "B=C" : "항상 성립하지 않음";
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하시오. (B=C/항상 성립하지 않음)",
          ans,
          ans,
          "$\\det(A)=" + det + "이다. " + (det !== 0 ? "가역이므로 좌소거가 가능하여 $B=C$." : "비가역이면 좌소거가 일반적으로 성립하지 않는다."),
          ["먼저 $\\det(A)$를 계산해 가역 여부를 판정한다.", "가역이면 좌소거 가능, 비가역이면 일반 보장 불가를 적용한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })()
  ];

  // 심화(Lv4) 단답형 정적 10문항 (실생활 맥락 포함)
  const matSALv4Static = [
    makeSa("물류 변환행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 행렬식을 구하시오.", "$1$", "1", "$\\det(A)=2\\cdot1-1\\cdot1=1$이다.", ["$ad-bc$를 적용한다.", "곱의 차를 계산한다."], "행렬식", STD_S17),
    makeSa("암호화 행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$의 복호화 가능 여부를 구하시오. (가능/불가능)", "불가능", "불가능", "$\\det(A)=0$이므로 역행렬이 없어 복호화가 불가능하다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 역행렬이 없다."], "가역성 판정", STD_S17),
    makeSa("광고효율 결합행렬 $A$가 $2\\times3$, $B$가 $3\\times2$일 때 $AB$의 크기를 구하시오.", "$2\\times2$", "2x2", "행렬곱 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times2$이다.", ["곱셈 가능 조건(앞 열=뒤 행)을 먼저 확인한다.", "결과 크기는 '앞 행, 뒤 열' 규칙을 적용한다."], "행렬곱 결과 크기", STD_S17),
    makeSa("교통 인접행렬 $M=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$에서 $M^2$의 제1행 제2열 성분을 구하시오.", "$1$", "1", "$M^2$의 제1행 제2열은 제1행·제2열 내적으로 $0\\cdot1+1\\cdot1=1$이다.", ["제1행과 제2열의 내적을 계산한다.", "곱의 합으로 성분을 구한다."], "인접행렬 거듭제곱", STD_S17),
    makeSa("데이터 정규화 스케일 행렬 $D=\\begin{pmatrix}2&0\\\\0&5\\end{pmatrix}$의 역행렬을 구하시오.", "$\\begin{pmatrix}\\frac12&0\\\\0&\\frac15\\end{pmatrix}$", "(1/2,0;0,1/5)", "대각행렬 역행렬은 각 대각성분의 역수로 이루어진다.", ["대각성분별로 역수를 취한다.", "비대각성분은 0으로 유지한다."], "대각행렬 역행렬", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&0&0\\\\0&3&0\\\\0&0&6\\end{pmatrix}$의 대각합을 구하시오.", "$10$", "10", "주대각 성분의 합은 $1+3+6=10$이다.", ["주대각 성분만 더한다.", "비대각 성분은 제외한다."], "대각합", STD_S17),
    makeSa("가역행렬 $A$에서 $AB=AC$일 때 $B,C$의 관계를 구하시오.", "$B=C$", "B=C", "가역이므로 좌측에 $A^{-1}$을 곱해 소거하면 $B=C$이다.", ["가역이면 좌소거가 가능함을 확인한다.", "양변에 $A^{-1}$을 곱해 정리한다."], "좌소거법칙", STD_S17),
    makeSa("가역행렬 $A,B$에 대해 $(AB)^{-1}$을 구하시오.", "$B^{-1}A^{-1}$", "B^-1A^-1", "합성변환의 역은 순서를 반대로 적용하므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.", ["역행렬 곱은 역순으로 쓴다."], "역행렬 성질", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하시오.", "$2$", "2", "$A^2=AA$에서 제1행 제2열은 $1\\cdot1+1\\cdot1=2$이다.", ["$A^2=AA$를 계산한다.", "제1행 제2열 내적을 구한다."], "행렬의 거듭제곱", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}, B=\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}$일 때 $AB$의 제2행 제1열 성분을 구하시오.", "$10$", "10", "제2행 제1열은 $3\\cdot2+4\\cdot1=10$이다.", ["제2행과 제1열 내적을 계산한다.", "곱의 합으로 성분을 구한다."], "행렬곱 성분 계산", STD_S17)
  ];

  // 심화(Lv4) 단답형 동적 생성기 5개 (실생활 맥락 포함)
  const matSALv4Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 6), b = riSafe(1, 6), c = riSafe(1, 6), d = riSafe(1, 6);
        const det = a * d - b * c;
        return makeSa(
          "물류 변환행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$ 공식을 적용한다.", "곱의 차를 계산한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 6), b = riSafe(1, 6), c = riSafe(1, 6), d = riSafe(1, 6);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가능" : "불가능";
        return makeSa(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 복호화 가능 여부를 구하시오. (가능/불가능)",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역이라 복호화 가능" : "비가역이라 복호화 불가능") + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)\\neq0$이면 가능, $=0$이면 불가능이다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(2, 4), n = riSafe(2, 4), p = riSafe(2, 4);
        return makeSa(
          "광고 반응행렬 $A$가 $" + m + "\\times" + n + "$, 전환행렬 $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건(앞 열=뒤 행)을 확인한다.", "결과는 '앞 행, 뒤 열'로 쓴다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const m2_12 = p * q + q * s;
        return makeSa(
          "교통 인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^2$의 제1행 제2열 성분을 구하시오.",
          "$" + m2_12 + "$",
          String(m2_12),
          "제1행 제2열은 제1행·제2열 내적으로 $" + p + "\\cdot" + q + "+" + q + "\\cdot" + s + "=" + m2_12 + "$이다.",
          ["제1행과 제2열 내적을 계산한다.", "두 곱의 합으로 성분 값을 얻는다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const ans = det !== 0 ? "B=C" : "항상 성립하지 않음";
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하시오. (B=C/항상 성립하지 않음)",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역이라 좌소거 가능, 따라서 $B=C$." : "비가역이라 좌소거가 일반적으로 보장되지 않는다."),
          ["먼저 $\\det(A)$를 계산한다.", "가역 여부에 따라 좌소거 가능성을 판단한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })()
  ];

  // 최고(Lv5) 단답형 정적 10문항 (실생활 + 역추론/다단계)
  const matSALv5Static = [
    makeSa("암호화 합성행렬에서 가역행렬 $A,B$에 대해 $(AB)^{-1}$을 구하시오.", "$B^{-1}A^{-1}$", "B^-1A^-1", "합성변환의 역은 적용 순서를 반대로 하므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.", ["합성 순서를 역추적한다.", "역행렬 곱은 역순으로 쓴다."], "역행렬 성질", STD_S17),
    makeSa("정사각행렬 $A$가 $A^2=E$를 만족할 때 $(E+A)(E-A)$를 구하시오.", "$O$", "O", "전개하면 $(E+A)(E-A)=E-A^2$이고 $A^2=E$를 대입하면 $O$이다.", ["곱셈공식을 먼저 전개한다.", "$A^2=E$를 대입해 단순화한다."], "행렬 곱셈공식", STD_S17),
    makeSa("행렬 $A,B$가 $AB=BA$일 때 $(A+B)^2$를 $A,B$로 나타내시오.", "$A^2+2AB+B^2$", "A^2+2AB+B^2", "일반 전개식은 $A^2+AB+BA+B^2$이고 가환조건 $AB=BA$를 대입하면 $A^2+2AB+B^2$이다.", ["일반 전개식을 먼저 쓴다.", "가환조건을 대입해 같은 항을 합친다."], "가환조건 전개", STD_S17),
    makeSa("인접행렬 $M=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분을 구하시오.", "$2$", "2", "$M^2=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$, $M^3=M^2M$이므로 제1행 제2열은 $1\\cdot1+1\\cdot1=2$이다.", ["$M^2$를 먼저 계산한다.", "$M^3=M^2M$의 제1행 제2열을 내적으로 계산한다."], "인접행렬 거듭제곱", STD_S17),
    makeSa("정규화 스케일 행렬 $D=\\begin{pmatrix}4&0\\\\0&9\\end{pmatrix}$의 역행렬을 구하시오.", "$\\begin{pmatrix}\\frac14&0\\\\0&\\frac19\\end{pmatrix}$", "(1/4,0;0,1/9)", "대각행렬 역행렬은 대각성분의 역수로 구성된다.", ["대각성분마다 역수를 취한다.", "비대각성분은 0으로 유지한다."], "대각행렬 역행렬", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&2\\\\3&6\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하시오. (B=C/항상 성립하지 않음)", "항상 성립하지 않음", "항상 성립하지 않음", "$\\det(A)=1\\cdot6-2\\cdot3=0$이므로 비가역이다. 따라서 좌소거가 일반적으로 성립하지 않는다.", ["행렬식으로 가역 여부를 판정한다.", "비가역이면 좌소거 일반 성립이 아님을 적용한다."], "좌소거 조건", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하시오. (B=C/항상 성립하지 않음)", "B=C", "B=C", "$\\det(A)=1\\neq0$이므로 가역이며 좌소거가 가능해 $B=C$이다.", ["행렬식을 계산한다.", "가역이면 좌소거 가능함을 적용한다."], "좌소거법칙", STD_S17),
    makeSa("전이행렬 $P=\\begin{pmatrix}0.7&0.3\\\\0.2&0.8\\end{pmatrix}$, $Q=\\begin{pmatrix}0.6&0.4\\\\0.1&0.9\\end{pmatrix}$에 대해 $PQ$의 제1행 합을 구하시오.", "$1$", "1", "전이행렬의 곱은 전이행렬이므로 각 행의 합이 1이다. 따라서 제1행 합은 1이다.", ["전이행렬의 행합 보존 성질을 적용한다."], "전이행렬", STD_S17),
    makeSa("정사각행렬 $A=\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}$에서 $\\det(A^{-1})$를 구하시오.", "$1$", "1", "$\\det(A)=2\\cdot2-3\\cdot1=1$이므로 $\\det(A^{-1})=1/\\det(A)=1$이다.", ["먼저 $\\det(A)$를 계산한다.", "$\\det(A^{-1})=1/\\det(A)$를 적용한다."], "역행렬식", STD_S17),
    makeSa("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^3$의 제1행 제2열 성분을 구하시오.", "$3$", "3", "$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$, $A^3=A^2A$이므로 제1행 제2열은 $1\\cdot1+2\\cdot1=3$이다.", ["$A^2$를 먼저 구한다.", "$A^3=A^2A$의 제1행 제2열을 계산한다."], "행렬의 거듭제곱", STD_S17)
  ];

  // 최고(Lv5) 단답형 동적 생성기 5개 (실생활 + 다단계)
  const matSALv5Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 6), b = riSafe(1, 6), c = riSafe(1, 6), d = riSafe(1, 6);
            const det = a * d - b * c;
        return makeSa(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대해 $\\det(A^{-1})$를 구하시오. (단, 가역인 경우)",
          "$\\frac{1}{" + det + "}$",
          "1/" + det,
          "$\\det(A)=" + det + "이므로 $\\det(A^{-1})=1/\\det(A)=1/" + det + "$이다.",
          ["먼저 $\\det(A)$를 계산한다.", "$\\det(A^{-1})=1/\\det(A)$를 적용한다."],
          "역행렬식",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const ans = det !== 0 ? "B=C" : "항상 성립하지 않음";
        return makeSa(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하시오. (B=C/항상 성립하지 않음)",
          ans,
          ans,
          "$\\det(A)=" + det + "이다. " + (det !== 0 ? "가역이므로 좌소거 가능하여 $B=C$." : "비가역이므로 좌소거 일반 성립이 보장되지 않는다."),
          ["행렬식으로 가역 여부를 먼저 판정한다.", "가역/비가역에 따라 좌소거 가능성을 결정한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const m2 = [
          [p * p + q * r, p * q + q * s],
          [r * p + s * r, r * q + s * s]
        ];
        const m3_12 = m2[0][0] * q + m2[0][1] * s;
        return makeSa(
          "교통 인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분을 구하시오.",
          "$" + m3_12 + "$",
          String(m3_12),
          "$M^3=M^2M$를 계산하면 제1행 제2열 성분은 $" + m3_12 + "$이다.",
          ["$M^2$를 먼저 구한다.", "$M^3=M^2M$의 제1행 제2열을 계산한다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(0, 1), b = 1 - a, c = riSafe(0, 1), d = 1 - c;
        const e = riSafe(0, 1), f = 1 - e, g2 = riSafe(0, 1), h = 1 - g2;
        const pq11 = a * e + b * g2;
        const pq12 = a * f + b * h;
        const rowSum = pq11 + pq12;
        return makeSa(
          "전이행렬 $P=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}, Q=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에 대해 $PQ$의 제1행 합을 구하시오.",
          "$" + rowSum + "$",
          String(rowSum),
          "$PQ$의 제1행은 $" + pq11 + "," + pq12 + "$이고 합은 $" + rowSum + "$이다. 전이행렬 곱의 행합은 1로 유지된다.",
          ["$PQ$의 제1행 성분을 계산한다.", "제1행 두 성분의 합을 구한다."],
          "전이행렬",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        const ans = 3 * x;
        return makeSa(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^3$의 제1행 제2열 성분을 구하시오.",
          "$" + ans + "$",
          String(ans),
          "$A^2=\\begin{pmatrix}1&" + (2 * x) + "\\\\0&1\\end{pmatrix}$, $A^3=A^2A$이므로 제1행 제2열은 $" + ans + "$이다.",
          ["$A^2$를 먼저 구한다.", "$A^3=A^2A$의 제1행 제2열을 계산한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["단답형"]; return g;
    })()
  ];

  // 기초(Lv1) 서술형 정적 10문항
  const matESLv1Static = [
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$에서 제1행 제2열의 성분을 구하고, 그 이유를 설명하시오.", "$2$", "2", "행렬의 성분은 행과 열의 위치로 결정한다. 제1행 제2열은 윗줄 두 번째 칸이며 값은 2이다.", ["제1행과 제2열의 교차 위치를 먼저 찾는다."], "행렬의 성분", STD_S15),
    makeEs("행렬 $\\begin{pmatrix}1&0\\end{pmatrix}$의 크기를 구하고, 표기 순서를 설명하시오.", "$1\\times2$", "1x2", "행렬 크기는 (행 수)$\\times$(열 수)로 쓴다. 주어진 행렬은 행 1개, 열 2개이므로 $1\\times2$이다.", ["행 수와 열 수를 각각 센다.", "크기 표기 순서를 '(행)×(열)'로 적용한다."], "행렬의 크기", STD_S15),
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix},\\ B=\\begin{pmatrix}5&6\\\\7&8\\end{pmatrix}$일 때 $A+B$를 구하고 계산 과정을 설명하시오.", "$\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$", "(6,8;10,12)", "행렬 덧셈은 대응 성분끼리 계산한다. 따라서 $A+B=\\begin{pmatrix}1+5&2+6\\\\3+7&4+8\\end{pmatrix}=\\begin{pmatrix}6&8\\\\10&12\\end{pmatrix}$이다.", ["대응 성분끼리 더한다.", "각 칸을 순서대로 계산한다."], "행렬의 덧셈", STD_S15),
    makeEs("행렬 $A=\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix},\\ B=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$일 때 $A-B$를 구하고 풀이를 제시하시오.", "$\\begin{pmatrix}2&-1\\\\2&3\\end{pmatrix}$", "(2,-1;2,3)", "행렬 뺄셈도 대응 성분끼리 계산한다. 따라서 $A-B=\\begin{pmatrix}3-1&1-2\\\\2-0&4-1\\end{pmatrix}=\\begin{pmatrix}2&-1\\\\2&3\\end{pmatrix}$이다.", ["대응 성분끼리 뺀다.", "음수 부호를 정확히 처리한다."], "행렬의 뺄셈", STD_S16),
    makeEs("행렬 $A=\\begin{pmatrix}1&-2\\\\3&0\\end{pmatrix}$에 대해 $2A$를 구하고 실수배의 의미를 설명하시오.", "$\\begin{pmatrix}2&-4\\\\6&0\\end{pmatrix}$", "(2,-4;6,0)", "실수배는 모든 성분에 같은 수를 곱하는 연산이다. 따라서 $2A=\\begin{pmatrix}2&-4\\\\6&0\\end{pmatrix}$이다.", ["모든 성분에 같은 수를 곱한다."], "실수배", STD_S15),
    makeEs("행렬 $A=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$일 때 $AB$를 구하고 이유를 설명하시오.", "$\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$", "(2,-1;3,4)", "단위행렬은 곱셈 항등원이므로 $AB=B$가 성립한다. 따라서 결과는 $\\begin{pmatrix}2&-1\\\\3&4\\end{pmatrix}$이다.", ["단위행렬과의 곱 성질을 적용한다."], "단위행렬", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$를 구하고 계산 과정을 쓰시오.", "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "(1,2;0,1)", "$A^2=AA$를 계산한다. 제1행 제1열은 $1\\cdot1+1\\cdot0=1$, 제1행 제2열은 $1\\cdot1+1\\cdot1=2$, 제2행 제1열은 0, 제2행 제2열은 1이므로 정답 행렬이다.", ["$A^2=AA$로 바꿔 계산한다.", "각 성분을 내적으로 구한다."], "행렬의 거듭제곱", STD_S17),
    makeEs("행렬 $A$가 $2\\times3$, $B$가 $3\\times4$일 때 $AB$의 크기를 구하고 이유를 설명하시오.", "$2\\times4$", "2x4", "행렬곱이 가능하려면 앞 행렬 열 수(3)와 뒤 행렬 행 수(3)가 같아야 한다. 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times4$이다.", ["곱셈 가능 조건을 확인한다.", "결과 크기 규칙을 적용한다."], "행렬곱 결과 크기", STD_S17),
    makeEs("행렬곱에서 일반적으로 $AB=BA$가 성립하지 않는 이유를 간단히 설명하시오.", "$AB\\neq BA\\text{ (일반적으로)}$", "AB!=BA", "행렬곱은 행과 열의 내적 순서에 따라 결과가 달라질 수 있다. 따라서 일반적으로 교환법칙이 성립하지 않는다.", ["행렬곱이 순서에 민감한 연산인지 확인한다."], "행렬곱의 교환법칙", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 가역 여부를 판정하고 근거를 제시하시오.", "가역", "가역", "$\\det(A)=2\\cdot1-1\\cdot1=1\\neq0$이므로 $A$는 가역행렬이다.", ["행렬식을 계산한다.", "$\\det(A)\\neq0$인지 확인한다."], "가역성 판정", STD_S17)
  ];

  // 기초(Lv1) 서술형 동적 생성기 5개
  const matESLv1Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 제2행 제1열의 성분을 구하고 이유를 설명하시오.",
          "$" + c + "$",
          String(c),
          "행렬 성분은 위치로 결정되며 제2행 제1열은 왼쪽 아래 칸이다. 따라서 값은 $" + c + "$이다.",
          ["제2행 제1열 위치를 정확히 찾는다."],
          "행렬의 성분",
          STD_S15
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const r = riSafe(2, 4), c = riSafe(2, 4);
        return makeEs(
          "행이 " + r + "개, 열이 " + c + "개인 행렬의 크기를 구하고 표기 순서를 설명하시오.",
          "$" + r + "\\times" + c + "$",
          r + "x" + c,
          "행렬 크기는 (행 수)$\\times$(열 수)이므로 $" + r + "\\times" + c + "$이다.",
          ["행 수와 열 수를 각각 센다.", "표기 순서를 '(행)×(열)'로 적용한다."],
          "행렬의 크기",
          STD_S15
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a + e, x12 = b + f, x21 = c + g2, x22 = d + h;
        return makeEs(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A+B$를 구하고 풀이를 쓰시오.",
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분끼리 더하면 정답 행렬을 얻는다.",
          ["대응 성분끼리 계산한다.", "각 칸을 순서대로 계산한다."],
          "행렬의 덧셈",
          STD_S15
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const k = riSafe(2, 5), a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const y11 = k * a, y12 = k * b, y21 = k * c, y22 = k * d;
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대해 $" + k + "A$를 구하고 계산 원리를 설명하시오.",
          "$\\begin{pmatrix}" + y11 + "&" + y12 + "\\\\" + y21 + "&" + y22 + "\\end{pmatrix}$",
          "(" + y11 + "," + y12 + ";" + y21 + "," + y22 + ")",
          "실수배는 모든 성분에 같은 수를 곱하는 연산이므로 각 성분에 " + k + "를 곱하면 된다.",
          ["모든 성분에 " + k + "를 곱한다."],
          "실수배",
          STD_S15
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeEs(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하고 이유를 설명하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "곱셈 가능 조건(앞 열=뒤 행)을 만족하며, 결과 크기는 앞 행 수와 뒤 열 수이므로 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기는 '앞 행 수, 뒤 열 수'를 적용한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })()
  ];

  // 기본(Lv2) 서술형 정적 10문항
  const matESLv2Static = [
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 행렬식을 구하고 계산 과정을 설명하시오.", "$1$", "1", "2×2 행렬식은 $ad-bc$이다. 따라서 $\\det(A)=2\\cdot1-1\\cdot1=1$이다.", ["$ad-bc$ 공식을 먼저 쓴다.", "곱의 차를 계산해 결론을 낸다."], "행렬식", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$의 가역 여부를 판정하고 근거를 제시하시오.", "비가역", "비가역", "$\\det(A)=1\\cdot4-2\\cdot2=0$이므로 역행렬이 존재하지 않아 비가역이다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 비가역임을 적용한다."], "가역성 판정", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}3&-1\\\\2&0\\end{pmatrix},\\ B=\\begin{pmatrix}1&4\\\\-2&3\\end{pmatrix}$일 때 $A-B$를 구하고 풀이를 제시하시오.", "$\\begin{pmatrix}2&-5\\\\4&-3\\end{pmatrix}$", "(2,-5;4,-3)", "대응 성분 차로 계산하면 $A-B=\\begin{pmatrix}3-1&-1-4\\\\2-(-2)&0-3\\end{pmatrix}=\\begin{pmatrix}2&-5\\\\4&-3\\end{pmatrix}$이다.", ["대응 성분끼리 뺀다.", "음수 부호를 정확히 처리한다."], "행렬의 뺄셈", STD_S16),
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}2&1\\\\1&0\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하고 근거를 설명하시오.", "$4$", "4", "제1행 제1열은 제1행과 제1열의 내적으로 계산한다. $1\\cdot2+2\\cdot1=4$이다.", ["제1행과 제1열 내적을 계산한다.", "곱의 합 형태를 정확히 적용한다."], "행렬곱 성분 계산", STD_S17),
    makeEs("실수 $k=3$과 행렬 $A=\\begin{pmatrix}1&-2\\\\4&0\\end{pmatrix}$에 대해 $kA$를 구하고 계산 원리를 설명하시오.", "$\\begin{pmatrix}3&-6\\\\12&0\\end{pmatrix}$", "(3,-6;12,0)", "실수배는 모든 성분에 같은 수를 곱한다. 따라서 $3A=\\begin{pmatrix}3&-6\\\\12&0\\end{pmatrix}$이다.", ["모든 성분에 3을 곱한다.", "각 칸 계산값을 행렬 형태로 정리한다."], "실수배", STD_S16),
    makeEs("행렬 $A$가 $2\\times3$, $B$가 $3\\times4$일 때 $AB$의 크기를 구하고 이유를 설명하시오.", "$2\\times4$", "2x4", "곱셈 가능 조건은 앞 행렬의 열 수와 뒤 행렬의 행 수가 같은 것이다(3=3). 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times4$이다.", ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기 규칙을 적용한다."], "행렬곱 결과 크기", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&0\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$일 때 $BA$를 구하고 이유를 설명하시오.", "$\\begin{pmatrix}3&2\\\\1&4\\end{pmatrix}$", "(3,2;1,4)", "단위행렬은 곱셈 항등원이므로 $BA=B$가 성립한다.", ["단위행렬의 곱셈 항등원 성질을 적용한다."], "단위행렬", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$일 때 $A^2$를 구하고 과정을 설명하시오.", "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "(1,2;0,1)", "$A^2=AA$를 계산한다. 제1행 제1열은 1, 제1행 제2열은 2, 제2행 제1열은 0, 제2행 제2열은 1이므로 정답을 얻는다.", ["$A^2=AA$로 바꿔 계산한다.", "각 성분을 내적으로 구한다."], "행렬의 거듭제곱", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\5&3\\end{pmatrix}$에서 제2행 제2열 성분을 구하고 위치를 설명하시오.", "$3$", "3", "제2행 제2열은 오른쪽 아래 칸이며 값은 3이다.", ["제2행 제2열 위치를 정확히 지정한다."], "행렬의 성분", STD_S15),
    makeEs("행렬 $A=\\begin{pmatrix}1&0&0\\\\0&2&0\\\\0&0&4\\end{pmatrix}$의 대각합을 구하고 계산 근거를 설명하시오.", "$7$", "7", "주대각 성분의 합은 $1+2+4=7$이다.", ["주대각 성분만 더한다.", "비대각 성분은 합에서 제외한다."], "대각합", STD_S17)
  ];

  // 기본(Lv2) 서술형 동적 생성기 5개
  const matESLv2Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하고 풀이를 설명하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$를 적용한다.", "곱의 차를 계산해 결론을 제시한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가역" : "비가역";
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 가역 여부를 판정하고 근거를 설명하시오.",
          ans,
          ans,
          "$\\det(A)=" + det + "이다. 따라서 " + (det !== 0 ? "가역행렬" : "비가역행렬") + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)$의 0 여부로 가역성을 판정한다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), c = riSafe(-3, 3), d = riSafe(-3, 3);
        const e = riSafe(-3, 3), f = riSafe(-3, 3), g2 = riSafe(-3, 3), h = riSafe(-3, 3);
        const x11 = a - e, x12 = b - f, x21 = c - g2, x22 = d - h;
        return makeEs(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $A-B$를 구하고 계산 과정을 설명하시오.",
          "$\\begin{pmatrix}" + x11 + "&" + x12 + "\\\\" + x21 + "&" + x22 + "\\end{pmatrix}$",
          "(" + x11 + "," + x12 + ";" + x21 + "," + x22 + ")",
          "대응 성분 차로 계산하면 정답 행렬이 된다.",
          ["대응 성분끼리 뺀다.", "음수 부호를 정확히 처리한다."],
          "행렬의 뺄셈",
          STD_S16
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeEs(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하고 근거를 설명하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "곱셈 가능 조건을 만족하고 결과 크기 규칙에 따라 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기는 앞 행 수와 뒤 열 수를 적용한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        return makeEs(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하고 이유를 설명하시오.",
          "$" + (2 * x) + "$",
          String(2 * x),
          "$A^2=AA$에서 제1행 제2열 성분은 $1\\cdot" + x + "+" + x + "\\cdot1=" + (2 * x) + "$이다.",
          ["$A^2=AA$를 계산한다.", "제1행 제2열 내적을 정확히 계산한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })()
  ];

  // 표준(Lv3) 서술형 정적 10문항
  const matESLv3Static = [
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\3&4\\end{pmatrix}$의 행렬식을 구하고 계산 과정을 설명하시오.", "$-2$", "-2", "$\\det(A)=1\\cdot4-2\\cdot3=-2$이다.", ["$ad-bc$ 공식을 적용한다.", "곱의 차를 계산해 결론을 제시한다."], "행렬식", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 가역 여부를 판정하고 이유를 쓰시오.", "가역", "가역", "$\\det(A)=2\\cdot1-1\\cdot1=1\\neq0$이므로 가역행렬이다.", ["행렬식을 계산한다.", "$\\det(A)\\neq0$인지 확인한다."], "가역성 판정", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$의 가역 여부를 판정하고 이유를 쓰시오.", "비가역", "비가역", "$\\det(A)=1\\cdot4-2\\cdot2=0$이므로 비가역행렬이다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 비가역임을 적용한다."], "가역성 판정", STD_S17),
    makeEs("가역행렬 $A$에 대해 $AB=AC$일 때 $B,C$의 관계를 증명 형태로 설명하시오.", "$B=C$", "B=C", "좌측에서 $A^{-1}$을 곱하면 $A^{-1}AB=A^{-1}AC$이고, $(A^{-1}A)B=(A^{-1}A)C$에서 $B=C$를 얻는다.", ["좌소거 가능 조건(가역성)을 먼저 쓴다.", "양변에 $A^{-1}$을 곱해 정리한다."], "좌소거법칙", STD_S17),
    makeEs("가역행렬 $A,B$에 대해 $(AB)^{-1}$을 유도하고 결과를 쓰시오.", "$B^{-1}A^{-1}$", "B^-1A^-1", "$(AB)(B^{-1}A^{-1})=A(BB^{-1})A^{-1}=AEA^{-1}=E$이므로 $(AB)^{-1}=B^{-1}A^{-1}$이다.", ["후보 역행렬을 오른쪽에 곱해 단위행렬인지 확인한다."], "역행렬 성질", STD_S17),
    makeEs("정사각행렬 $A,B$에 대해 $(AB)^T$를 $A^T,B^T$로 나타내고 이유를 설명하시오.", "$B^TA^T$", "B^TA^T", "전치행렬의 곱 성질에 의해 $(AB)^T=B^TA^T$가 성립한다.", ["전치 시 곱 순서가 바뀌는지 확인한다."], "전치행렬", STD_S17),
    makeEs("정사각행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$에 대해 $A^2$를 구하고 계산 과정을 설명하시오.", "$\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$", "(1,2;0,1)", "$A^2=AA$에서 각 성분을 내적으로 계산하면 정답 행렬을 얻는다.", ["$A^2=AA$로 바꿔 성분별 내적을 계산한다."], "행렬의 거듭제곱", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\0&3\\end{pmatrix},\\ B=\\begin{pmatrix}1&4\\\\2&0\\end{pmatrix}$일 때 $AB$의 제1행 제2열 성분을 구하고 이유를 설명하시오.", "$8$", "8", "제1행 제2열은 제1행과 제2열 내적으로 $2\\cdot4+1\\cdot0=8$이다.", ["제1행과 제2열의 내적을 계산한다.", "해당 두 곱의 합으로 성분을 구한다."], "행렬곱 성분 계산", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&0&0\\\\0&3&0\\\\0&0&5\\end{pmatrix}$의 대각합을 구하고 계산 근거를 설명하시오.", "$9$", "9", "주대각 성분의 합은 $1+3+5=9$이다.", ["주대각 성분만 더한다.", "비대각 성분은 제외한다."], "대각합", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}0&1\\\\0&0\\end{pmatrix}$에 대해 $A^2$를 구하고 결과의 의미를 설명하시오.", "$\\begin{pmatrix}0&0\\\\0&0\\end{pmatrix}$", "(0,0;0,0)", "$A^2=AA$를 계산하면 모든 성분이 0이 된다. 이는 영행렬(멱영행렬 예시)이다.", ["직접 곱해 각 성분을 구한다.", "모든 성분이 0인지 확인한다."], "멱영행렬", STD_S17)
  ];

  // 표준(Lv3) 서술형 동적 생성기 5개
  const matESLv3Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하고 풀이를 설명하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다.",
          ["$ad-bc$ 공식을 적용한다.", "곱의 차를 계산한다."],
          "행렬식",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가역" : "비가역";
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 가역 여부를 판정하고 이유를 설명하시오.",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + ans + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)$의 0 여부로 가역성을 판정한다."],
          "가역성 판정",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const e = riSafe(1, 4), f = riSafe(1, 4), g2 = riSafe(1, 4), h = riSafe(1, 4);
        const v = a * e + b * g2;
        return makeEs(
          "$A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},\\ B=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$일 때 $AB$의 제1행 제1열 성분을 구하고 과정을 설명하시오.",
          "$" + v + "$",
          String(v),
          "제1행 제1열은 제1행·제1열 내적으로 $" + a + "\\cdot" + e + "+" + b + "\\cdot" + g2 + "=" + v + "$이다.",
          ["제1행과 제1열 내적을 계산한다.", "곱의 합을 정확히 계산한다."],
          "행렬곱 성분 계산",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        return makeEs(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$일 때 $A^2$의 제1행 제2열 성분을 구하고 이유를 설명하시오.",
          "$" + (2 * x) + "$",
          String(2 * x),
          "$A^2=AA$에서 제1행 제2열은 $1\\cdot" + x + "+" + x + "\\cdot1=" + (2 * x) + "$이다.",
          ["$A^2=AA$를 계산한다.", "해당 성분의 내적 계산을 제시한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(1, 4), n = riSafe(1, 4), p = riSafe(1, 4);
        return makeEs(
          "$A$가 $" + m + "\\times" + n + "$, $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하고 근거를 설명하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "곱셈 가능 조건을 만족하며 결과 크기 규칙에 따라 $" + m + "\\times" + p + "$이다.",
          ["곱셈 가능 조건(앞 열=뒤 행)을 확인한다.", "결과 크기는 앞 행 수와 뒤 열 수를 적용한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })()
  ];

  // 심화(Lv4) 서술형 정적 10문항 (실생활 맥락 포함)
  const matESLv4Static = [
    makeEs("물류 변환행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$의 행렬식을 구하고, 물류 역추적 가능 여부를 함께 설명하시오.", "$1$", "1", "$\\det(A)=2\\cdot1-1\\cdot1=1$이므로 $A$는 가역이다. 따라서 역변환을 통해 물류 흐름을 역추적할 수 있다.", ["$ad-bc$로 행렬식을 계산한다.", "행렬식의 0 여부와 가역성을 연결해 해석한다."], "행렬식과 가역성", STD_S17),
    makeEs("암호화 행렬 $A=\\begin{pmatrix}1&2\\\\2&4\\end{pmatrix}$에 대해 복호화 가능 여부를 판정하고 근거를 쓰시오.", "불가능", "불가능", "$\\det(A)=1\\cdot4-2\\cdot2=0$이므로 비가역행렬이다. 따라서 역행렬이 존재하지 않아 복호화가 불가능하다.", ["행렬식을 계산한다.", "$\\det(A)=0$이면 역행렬이 없음을 적용한다."], "복호화 가능성 판정", STD_S17),
    makeEs("광고 채널 행렬 $A$가 $2\\times3$, 전환율 행렬 $B$가 $3\\times2$일 때 $AB$의 크기를 구하고 의미를 설명하시오.", "$2\\times2$", "2x2", "곱셈 가능 조건(앞 열=뒤 행)을 만족한다. 결과 크기는 앞 행렬의 행 수와 뒤 행렬의 열 수이므로 $2\\times2$이며, 이는 두 타깃군에 대한 통합 반응 지표 행렬로 해석할 수 있다.", ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기 규칙을 적용하고 의미를 연결한다."], "행렬곱 결과 크기", STD_S17),
    makeEs("교통 인접행렬 $M=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$에서 $M^2$의 제1행 제2열 성분을 구하고 경로 의미를 설명하시오.", "$1$", "1", "$M^2$의 제1행 제2열은 제1행·제2열 내적으로 $0\\cdot1+1\\cdot1=1$이다. 이는 출발점 1에서 도착점 2로 가는 2단계 경로 수를 의미한다.", ["제1행·제2열 내적을 계산한다.", "거듭제곱 성분을 단계 경로 수로 해석한다."], "인접행렬 해석", STD_S17),
    makeEs("정규화 스케일 행렬 $D=\\begin{pmatrix}4&0\\\\0&9\\end{pmatrix}$의 역행렬을 구하고 데이터 복원 원리를 설명하시오.", "$\\begin{pmatrix}\\frac14&0\\\\0&\\frac19\\end{pmatrix}$", "(1/4,0;0,1/9)", "대각행렬의 역행렬은 대각성분의 역수로 구성된다. 따라서 $D^{-1}=\\begin{pmatrix}\\frac14&0\\\\0&\\frac19\\end{pmatrix}$이며 정규화 이전 데이터로 복원할 수 있다.", ["대각성분 역수를 취한다.", "역행렬을 곱하면 원스케일 복원이 가능함을 설명한다."], "대각행렬 역행렬", STD_S17),
    makeEs("가역행렬 $A$에서 $AB=AC$이면 $B=C$임을 증명하고, 비가역일 때 왜 주의해야 하는지 설명하시오.", "$B=C\\text{ (가역일 때)}$", "B=C (가역일 때)", "가역이면 좌측에 $A^{-1}$을 곱해 $B=C$를 얻는다. 비가역이면 좌소거가 일반적으로 성립하지 않아 같은 결론을 보장할 수 없다.", ["가역 조건을 먼저 명시한다.", "양변에 $A^{-1}$을 곱해 소거 과정을 제시한다."], "좌소거법칙", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix},\\ B=\\begin{pmatrix}1&0\\\\1&1\\end{pmatrix}$에 대해 $AB$와 $BA$를 계산하여 교환 여부를 판단하시오.", "$AB\\neq BA$", "AB!=BA", "$AB=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix},\\ BA=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$로 서로 다르다. 따라서 교환법칙이 성립하지 않는다.", ["$AB$와 $BA$를 각각 계산한다.", "두 결과 행렬이 같은지 성분별로 비교한다."], "교환법칙 판정", STD_S17),
    makeEs("전이행렬 $P=\\begin{pmatrix}0.7&0.3\\\\0.2&0.8\\end{pmatrix},\\ Q=\\begin{pmatrix}0.6&0.4\\\\0.1&0.9\\end{pmatrix}$에서 $PQ$의 제1행 합을 구하고 의미를 설명하시오.", "$1$", "1", "전이행렬의 곱도 전이행렬이므로 각 행의 합은 1이다. 따라서 $PQ$의 제1행 합은 1이며, 이는 전체 확률 질량이 보존됨을 의미한다.", ["전이행렬의 행합 조건을 확인한다.", "곱에서도 행합 보존 성질이 유지됨을 적용한다."], "전이행렬", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}$에 대해 $\\det(A^{-1})$를 구하고 과정을 설명하시오.", "$1$", "1", "$\\det(A)=2\\cdot2-3\\cdot1=1$이므로 $\\det(A^{-1})=1/\\det(A)=1$이다.", ["먼저 $\\det(A)$를 계산한다.", "$\\det(A^{-1})=1/\\det(A)$를 적용한다."], "역행렬식", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$에 대해 $A^3$의 제1행 제2열 성분을 구하고 계산 과정을 설명하시오.", "$3$", "3", "$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$, $A^3=A^2A$이므로 제1행 제2열은 $1\\cdot1+2\\cdot1=3$이다.", ["$A^2$를 먼저 구한다.", "$A^3=A^2A$의 해당 성분을 내적으로 계산한다."], "행렬의 거듭제곱", STD_S17)
  ];

  // 심화(Lv4) 서술형 동적 생성기 5개 (실생활 맥락 포함)
  const matESLv4Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 6), b = riSafe(1, 6), c = riSafe(1, 6), d = riSafe(1, 6);
        const det = a * d - b * c;
        return makeEs(
          "물류 변환행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 행렬식을 구하고 역추적 가능 여부를 설명하시오.",
          "$" + det + "$",
          String(det),
          "$\\det(A)=ad-bc=" + a + "\\cdot" + d + "-" + b + "\\cdot" + c + "=" + det + "$이다. " + (det !== 0 ? "가역이므로 역추적 가능하다." : "비가역이므로 역추적이 일반적으로 불가능하다."),
          ["$ad-bc$를 계산한다.", "행렬식의 0 여부로 가역성과 해석을 연결한다."],
          "행렬식과 가역성",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const m = riSafe(2, 4), n = riSafe(2, 4), p = riSafe(2, 4);
        return makeEs(
          "광고 채널 행렬 $A$가 $" + m + "\\times" + n + "$, 전환율 행렬 $B$가 $" + n + "\\times" + p + "$일 때 $AB$의 크기를 구하고 의미를 설명하시오.",
          "$" + m + "\\times" + p + "$",
          m + "x" + p,
          "곱셈 가능 조건을 만족하며 결과 크기는 $" + m + "\\times" + p + "$이다. 이는 " + m + "개 집단과 " + p + "개 지표의 결합 결과를 뜻한다.",
          ["곱셈 가능 조건을 먼저 확인한다.", "결과 크기 규칙을 적용해 의미를 연결한다."],
          "행렬곱 결과 크기",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const m2_12 = p * q + q * s;
        return makeEs(
          "교통 인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^2$의 제1행 제2열 성분을 구하고 경로 의미를 설명하시오.",
          "$" + m2_12 + "$",
          String(m2_12),
          "제1행 제2열은 내적으로 $" + p + "\\cdot" + q + "+" + q + "\\cdot" + s + "=" + m2_12 + "$이다. 이는 2단계 경로 수 해석과 연결된다.",
          ["제1행·제2열 내적을 계산한다.", "해당 성분을 단계 경로 수로 해석한다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 5), b = riSafe(1, 5), c = riSafe(1, 5), d = riSafe(1, 5);
        const det = a * d - b * c;
        const ans = det !== 0 ? "가능" : "불가능";
        return makeEs(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$의 복호화 가능 여부를 판정하고 이유를 설명하시오. (가능/불가능)",
          ans,
          ans,
          "$\\det(A)=" + det + "이므로 " + (det !== 0 ? "가역이라 복호화 가능" : "비가역이라 복호화 불가능") + "이다.",
          ["행렬식을 계산한다.", "$\\det(A)$의 0 여부로 가역성을 판정한다."],
          "복호화 가능성",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const ans = det !== 0 ? "B=C" : "항상 성립하지 않음";
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하고 조건을 설명하시오. (B=C/항상 성립하지 않음)",
          ans,
          ans,
          "$\\det(A)=" + det + "이다. " + (det !== 0 ? "가역이면 좌소거가 가능하여 $B=C$." : "비가역이면 좌소거를 일반적으로 적용할 수 없다."),
          ["먼저 $\\det(A)$를 계산한다.", "가역 여부에 따라 좌소거 가능성을 결정한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })()
  ];

  // 최고(Lv5) 서술형 정적 10문항 (실생활 + 역추론/다단계)
  const matESLv5Static = [
    makeEs("암호화 합성행렬에서 가역행렬 $A,B$에 대해 $(AB)^{-1}$의 형태를 유도하여 쓰시오.", "$B^{-1}A^{-1}$", "B^-1A^-1", "합성변환의 역은 적용 순서를 반대로 한다. 따라서 $(AB)^{-1}=B^{-1}A^{-1}$이다. 실제로 $(AB)(B^{-1}A^{-1})=E$를 확인할 수 있다.", ["합성 변환의 순서를 먼저 확인한다.", "역변환은 역순 적용임을 식으로 검증한다."], "역행렬 성질", STD_S17),
    makeEs("정사각행렬 $A$가 $A^2=E$를 만족할 때 $(E+A)(E-A)$를 구하고 근거를 제시하시오.", "$O$", "O", "전개하면 $(E+A)(E-A)=E-A^2$이다. 조건 $A^2=E$를 대입하면 $E-E=O$가 된다.", ["곱셈공식을 먼저 전개한다.", "조건식을 대입해 항을 소거한다."], "행렬 곱셈공식", STD_S17),
    makeEs("정사각행렬 $A,B$가 $AB=BA$를 만족할 때 $(A+B)^2$를 전개하여 정리하시오.", "$A^2+2AB+B^2$", "A^2+2AB+B^2", "일반 전개식은 $(A+B)^2=A^2+AB+BA+B^2$이다. 가환조건 $AB=BA$를 이용하면 $A^2+2AB+B^2$로 정리된다.", ["일반 전개식을 먼저 쓴다.", "가환조건을 대입해 같은 항을 합친다."], "가환조건 전개", STD_S17),
    makeEs("교통 인접행렬 $M=\\begin{pmatrix}0&1\\\\1&1\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분을 구하고 의미를 설명하시오.", "$2$", "2", "$M^2=\\begin{pmatrix}1&1\\\\1&2\\end{pmatrix}$, $M^3=M^2M$이므로 제1행 제2열은 $1\\cdot1+1\\cdot1=2$이다. 이는 3단계 경로 수를 의미한다.", ["$M^2$를 먼저 구한다.", "$M^3=M^2M$의 해당 성분을 계산하고 경로 해석과 연결한다."], "인접행렬 거듭제곱", STD_S17),
    makeEs("정규화 스케일 행렬 $D=\\begin{pmatrix}4&0\\\\0&9\\end{pmatrix}$의 역행렬을 구하고 데이터 복원 원리를 설명하시오.", "$\\begin{pmatrix}\\frac14&0\\\\0&\\frac19\\end{pmatrix}$", "(1/4,0;0,1/9)", "대각행렬의 역행렬은 대각성분의 역수로 구성된다. 따라서 $D^{-1}=\\begin{pmatrix}\\frac14&0\\\\0&\\frac19\\end{pmatrix}$이며, 역행렬을 곱해 원데이터를 복원할 수 있다.", ["대각성분 역수를 취한다.", "역행렬 곱이 원상복구를 만든다는 점을 연결한다."], "대각행렬 역행렬", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&2\\\\3&6\\end{pmatrix}$에서 $AB=AC$일 때 결론을 쓰고, 왜 그 결론이 항상 성립하지 않는지 설명하시오.", "항상 성립하지 않음", "항상 성립하지 않음", "$\\det(A)=1\\cdot6-2\\cdot3=0$이므로 비가역이다. 따라서 좌소거를 일반적으로 적용할 수 없어 $AB=AC$에서 항상 $B=C$를 결론낼 수 없다.", ["먼저 $\\det(A)$를 계산한다.", "가역이 아닐 때 좌소거가 일반 성립하지 않음을 설명한다."], "좌소거 조건", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&1\\\\1&1\\end{pmatrix}$에서 $AB=AC$일 때 $B,C$의 관계를 구하고 증명하시오.", "$B=C$", "B=C", "$\\det(A)=1\\neq0$이므로 가역이다. 양변 왼쪽에 $A^{-1}$을 곱하면 $B=C$를 얻는다.", ["행렬식으로 가역 여부를 판정한다.", "양변에 $A^{-1}$을 곱해 소거 과정을 제시한다."], "좌소거법칙", STD_S17),
    makeEs("전이행렬 $P=\\begin{pmatrix}0.7&0.3\\\\0.2&0.8\\end{pmatrix}, Q=\\begin{pmatrix}0.6&0.4\\\\0.1&0.9\\end{pmatrix}$에서 $PQ$의 제1행 합을 구하고 의미를 설명하시오.", "$1$", "1", "전이행렬의 곱은 전이행렬이므로 각 행의 합이 1이다. 따라서 $PQ$의 제1행 합은 1이며 총확률 보존을 의미한다.", ["전이행렬의 행합 조건을 확인한다.", "곱에서도 행합 보존이 유지됨을 설명한다."], "전이행렬", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}2&3\\\\1&2\\end{pmatrix}$에 대해 $\\det(A^{-1})$를 구하고 유도 과정을 쓰시오.", "$1$", "1", "$\\det(A)=2\\cdot2-3\\cdot1=1$이다. $AA^{-1}=E$에 행렬식을 취하면 $\\det(A)\\det(A^{-1})=1$이므로 $\\det(A^{-1})=1$이다.", ["먼저 $\\det(A)$를 구한다.", "$\\det(A^{-1})=1/\\det(A)$를 유도해 적용한다."], "역행렬식", STD_S17),
    makeEs("행렬 $A=\\begin{pmatrix}1&1\\\\0&1\\end{pmatrix}$에 대해 $A^3$의 제1행 제2열 성분을 구하고 계산 과정을 설명하시오.", "$3$", "3", "$A^2=\\begin{pmatrix}1&2\\\\0&1\\end{pmatrix}$, $A^3=A^2A$이므로 제1행 제2열은 $1\\cdot1+2\\cdot1=3$이다.", ["$A^2$를 먼저 계산한다.", "$A^3=A^2A$의 해당 성분을 내적으로 계산한다."], "행렬의 거듭제곱", STD_S17)
  ];

  // 최고(Lv5) 서술형 동적 생성기 5개 (실생활 + 다단계)
  const matESLv5Dyn = [
    (function () {
      const g = function () {
        const a = riSafe(1, 6), b = riSafe(1, 6), c = riSafe(1, 6), d = riSafe(1, 6);
        const det = a * d - b * c;
        return makeEs(
          "암호화 행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에 대해 $\\det(A^{-1})$를 구하고 과정을 설명하시오. (가역인 경우)",
          "$\\frac{1}{" + det + "}$",
          "1/" + det,
          "$\\det(A)=" + det + "이므로 $\\det(A^{-1})=1/\\det(A)=1/" + det + "$이다.",
          ["$\\det(A)$를 먼저 계산한다.", "$\\det(A^{-1})=1/\\det(A)$ 공식을 적용한다."],
          "역행렬식",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(1, 4), b = riSafe(1, 4), c = riSafe(1, 4), d = riSafe(1, 4);
        const det = a * d - b * c;
        const ans = det !== 0 ? "B=C" : "항상 성립하지 않음";
        return makeEs(
          "행렬 $A=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix}$에서 $AB=AC$일 때 결론을 구하고 이유를 설명하시오. (B=C/항상 성립하지 않음)",
          ans,
          ans,
          "$\\det(A)=" + det + "이다. " + (det !== 0 ? "가역이면 좌소거가 가능하여 $B=C$." : "비가역이면 좌소거를 일반적으로 적용할 수 없다."),
          ["행렬식으로 가역 여부를 판정한다.", "가역/비가역에 따라 좌소거 가능성을 구분한다."],
          "좌소거법칙",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const p = riSafe(0, 1), q = riSafe(0, 1), r = riSafe(0, 1), s = riSafe(0, 1);
        const m2 = [
          [p * p + q * r, p * q + q * s],
          [r * p + s * r, r * q + s * s]
        ];
        const m3_12 = m2[0][0] * q + m2[0][1] * s;
        return makeEs(
          "교통 인접행렬 $M=\\begin{pmatrix}" + p + "&" + q + "\\\\" + r + "&" + s + "\\end{pmatrix}$에서 $M^3$의 제1행 제2열 성분을 구하고 의미를 설명하시오.",
          "$" + m3_12 + "$",
          String(m3_12),
          "$M^3=M^2M$를 계산하면 제1행 제2열 성분은 $" + m3_12 + "$이다. 이는 3단계 경로 수로 해석된다.",
          ["$M^2$를 먼저 계산한다.", "$M^3=M^2M$의 해당 성분을 계산하고 경로 해석과 연결한다."],
          "인접행렬 거듭제곱",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const a = riSafe(0, 1), b = 1 - a, c = riSafe(0, 1), d = 1 - c;
        const e = riSafe(0, 1), f = 1 - e, g2 = riSafe(0, 1), h = 1 - g2;
        const pq11 = a * e + b * g2;
        const pq12 = a * f + b * h;
        const rowSum = pq11 + pq12;
        return makeEs(
          "전이행렬 $P=\\begin{pmatrix}" + a + "&" + b + "\\\\" + c + "&" + d + "\\end{pmatrix},Q=\\begin{pmatrix}" + e + "&" + f + "\\\\" + g2 + "&" + h + "\\end{pmatrix}$에 대해 $PQ$의 제1행 합을 구하고 의미를 설명하시오.",
          "$" + rowSum + "$",
          String(rowSum),
          "$PQ$의 제1행은 $" + pq11 + "," + pq12 + "$이며 합은 $" + rowSum + "$이다. 전이행렬 곱에서 확률질량 보존을 의미한다.",
          ["먼저 $PQ$ 제1행 성분을 계산한다.", "제1행 합을 구해 확률 보존 의미와 연결한다."],
          "전이행렬",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })(),
    (function () {
      const g = function () {
        const x = riSafe(1, 5);
        const ans = 3 * x;
        return makeEs(
          "행렬 $A=\\begin{pmatrix}1&" + x + "\\\\0&1\\end{pmatrix}$에 대해 $A^3$의 제1행 제2열 성분을 구하고 과정을 설명하시오.",
          "$" + ans + "$",
          String(ans),
          "$A^2=\\begin{pmatrix}1&" + (2 * x) + "\\\\0&1\\end{pmatrix}$, $A^3=A^2A$이므로 제1행 제2열은 $" + ans + "$이다.",
          ["$A^2$를 먼저 계산한다.", "$A^3=A^2A$의 제1행 제2열 내적을 계산한다."],
          "행렬의 거듭제곱",
          STD_S17
        );
      }; g._types = ["서술형"]; return g;
    })()
  ];

  if (!HIGH_OX_BANK[G]) HIGH_OX_BANK[G] = {};
  if (!HIGH_BANK[G]) HIGH_BANK[G] = {};
  if (!HIGH_RAND_GENS[G]) HIGH_RAND_GENS[G] = {};

  // OX 정적 풀(기초 Lv1 + 기본 Lv2 + 표준 Lv3 + 심화 Lv4 + 최고 Lv5)
  HIGH_OX_BANK[G][U] = matOXLv1Static.concat(matOXLv2Static, matOXLv3Static, matOXLv4Static, matOXLv5Static);

  // BANK 구조 안전 초기화 (비어 있어도 pick에서 참조 가능)
  HIGH_BANK[G][U] = {
    1: matMCLv1Static.slice().concat(matSALv1Static, matESLv1Static),
    2: matMCLv2Static.slice().concat(matSALv2Static, matESLv2Static),
    3: matMCLv3Static.slice().concat(matSALv3Static, matESLv3Static),
    4: matMCLv4Static.slice().concat(matSALv4Static, matESLv4Static),
    5: matMCLv5Static.slice().concat(matSALv5Static, matESLv5Static)
  };

  // RAND_GENS: Lv1~Lv5 OX 동적 등록
  HIGH_RAND_GENS[G][U] = {
    1: matOXLv1Dyn.slice().concat(matMCLv1Dyn, matSALv1Dyn, matESLv1Dyn),
    2: matOXLv2Dyn.slice().concat(matMCLv2Dyn, matSALv2Dyn, matESLv2Dyn),
    3: matOXLv3Dyn.slice().concat(matMCLv3Dyn, matSALv3Dyn, matESLv3Dyn),
    4: matOXLv4Dyn.slice().concat(matMCLv4Dyn, matSALv4Dyn, matESLv4Dyn),
    5: matOXLv5Dyn.slice().concat(matMCLv5Dyn, matSALv5Dyn, matESLv5Dyn)
  };

  if (!HIGH_GRADE_UNITS[G]) HIGH_GRADE_UNITS[G] = [];
  const c1 = HIGH_GRADE_UNITS[G].find(function (x) { return x.subject === "공통수학1"; });
  if (c1) {
    if (!c1.units.find(function (u) { return u.v === U; })) c1.units.push({ v: U, d: "행렬의 연산과 성질" });
  } else {
    HIGH_GRADE_UNITS[G].push({
      subject: "공통수학1",
      units: [{ v: U, d: "행렬의 연산과 성질" }]
    });
  }

  console.log("[matrices] rebuilt step20: OX Lv1~Lv5 + MC Lv1~Lv5 + SA Lv1~Lv5 + ES Lv1~Lv5");
})();
