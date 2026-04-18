/**
 * geometry.js 
 * 고등학교 공통수학2 - 도형의 방정식
 * 기초(Lv1) + 기본(Lv2) 통합 모듈
 */
(function () {
  const G = "고1";
  const U = "도형의 방정식";

  if (typeof HIGH_OX_BANK === "undefined") globalThis.HIGH_OX_BANK = {};
  if (typeof HIGH_BANK === "undefined") globalThis.HIGH_BANK = {};
  if (typeof HIGH_RAND_GENS === "undefined") globalThis.HIGH_RAND_GENS = {};
  if (typeof HIGH_GRADE_UNITS === "undefined") globalThis.HIGH_GRADE_UNITS = {};

  const _H_OX = (typeof HIGH_OX_BANK !== "undefined") ? HIGH_OX_BANK : globalThis.HIGH_OX_BANK;
  const _H_B = (typeof HIGH_BANK !== "undefined") ? HIGH_BANK : globalThis.HIGH_BANK;
  const _H_RG = (typeof HIGH_RAND_GENS !== "undefined") ? HIGH_RAND_GENS : globalThis.HIGH_RAND_GENS;
  const _H_GU = (typeof HIGH_GRADE_UNITS !== "undefined") ? HIGH_GRADE_UNITS : globalThis.HIGH_GRADE_UNITS;

  if (!_H_OX[G]) _H_OX[G] = {};
  if (!_H_B[G]) _H_B[G] = {};
  if (!_H_RG[G]) _H_RG[G] = {};

  const STD_01_01 = "[10공수2-01-01] 선분의 내분을 이해하고, 내분점의 좌표를 계산할 수 있다.";
  const STD_01_02 = "[10공수2-01-02] 두 직선의 평행 조건과 수직 조건을 탐구하고 이해한다.";
  const STD_01_03 = "[10공수2-01-03] 점과 직선 사이의 거리를 구하고, 관련된 문제를 해결할 수 있다.";
  const STD_01_04 = "[10공수2-01-04] 원의 방정식을 구하고, 그래프를 그릴 수 있다.";
  const STD_01_05 = "[10공수2-01-05] 좌표평면에서 원과 직선의 위치 관계를 판단하고, 이를 활용하여 문제를 해결할 수 있다.";
  const STD_01_06 = "[10공수2-01-06] 평행이동을 탐구하고, 실생활과 연결하여 문제를 해결할 수 있다.";
  const STD_01_07 = "[10공수2-01-07] 원점, $x$축, $y$축, 직선 $y=x$에 대한 대칭이동을 탐구하고, 실생활과 연결하여 문제를 해결할 수 있다.";

  const riSafe = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const sp = (n) => (n >= 0 ? "+" + n : n);
  const spNZ = (n) => (n === 0 ? "" : (n > 0 ? "+" + n : String(n)));
  const coef = (k, v) => {
    if (k === 1) return v;
    if (k === -1) return "-" + v;
    return `${k}${v}`;
  };
  const lineY = (m, b) => `y=${coef(m, "x")}${spNZ(b)}`;
  const sqShift = (v, c) => {
    if (c === 0) return `${v}^2`;
    if (c > 0) return `(${v}-${c})^2`;
    return `(${v}+${Math.abs(c)})^2`;
  };
  const circleEq = (a, b, r2) => `${sqShift("x", a)}+${sqShift("y", b)}=${r2}`;
const normalizeText = (s) => {
    if (typeof s !== "string") return s;
    // 분수(\dfrac)가 포함된 경우 정규식 처리를 건너뛰어 수식 파괴를 방지
    if (s.includes("\\dfrac")) return s;
    
    return s
      .replace(/\(x\)\^2/g, "x^2")
      .replace(/\(y\)\^2/g, "y^2")
      .replace(/\+0(?=[^0-9]|$)/g, "")
      .replace(/-0(?=[^0-9]|$)/g, "")
      .replace(/-1x/g, "-x")
      .replace(/-1y/g, "-y")
      .replace(/(^|[^0-9])1x/g, "$1x")
      .replace(/(^|[^0-9])1y/g, "$1y")
      .replace(/\+\-/g, "-")
      .replace(/\s{2,}/g, " ")
      .trim();
  };
  const normalizeArr = (arr) => Array.isArray(arr) ? arr.map(normalizeText) : arr;

  function makeOxStatic(q, ans, sol, hints, terms, std) { 
    return { 
      q: normalizeText(q), 
      ans: normalizeText(ans), 
      exp: normalizeText(sol), 
      sol: normalizeText(sol), 
      hint: normalizeArr(hints), 
      hints: normalizeArr(hints), 
      terms: normalizeText(terms), 
      std: normalizeText(std), 
      type: ["OX형"] 
    }; 
  }

  function makeMc(q, choices, ci, ans, sa, sol, hints, terms, std) { 
    let finalChoices = choices;
    let finalCi = ci;
    let finalAns = ans;

    if (Array.isArray(choices) && choices.length > 1) {
      const correct = choices[ci];
      const wrongs = choices.filter((_, i) => i !== ci);
      // HTML 메인에 있는 수정된 makeWrongChoices를 호출
      const mixed = makeWrongChoices(correct, wrongs);
      finalChoices = mixed.choices;
      finalCi = mixed.ci;
      finalAns = correct;
    }

    return { 
      type: ["객관식"], 
      q: normalizeText(q), 
      choices: finalChoices.map(c => normalizeText(c)), 
      ci: finalCi, 
      ans: normalizeText(finalAns), 
      sa: normalizeText(sa), 
      sol: normalizeText(sol), 
      exp: normalizeText(sol), 
      hints: normalizeArr(hints), 
      terms: normalizeText(terms), 
      std: normalizeText(std) 
    }; 
  }
  function makeSa(q, ans, sa, sol, hints, terms, std) { 
    q = normalizeText(q);
    ans = normalizeText(ans);
    sa = normalizeText(sa);
    sol = normalizeText(sol);
    hints = normalizeArr(hints);
    terms = normalizeText(terms);
    std = normalizeText(std);
    return { type: ["단답형"], q, choices: [], ci: -1, ans, sa, sol, exp: sol, hints, hint: hints, terms, std }; 
  }
  function makeEs(q, ans, sa, sol, hints, terms, std) { 
    q = normalizeText(q);
    ans = normalizeText(ans);
    sa = normalizeText(sa);
    sol = normalizeText(sol);
    hints = normalizeArr(hints);
    terms = normalizeText(terms);
    std = normalizeText(std);
    return { type: ["서술형"], q, choices: [], ci: -1, ans, sa, sol, exp: sol, hints, hint: hints, terms, std }; 
  }
  function makeWrongChoices(ans, wrongs) {
    let pool = [ans, ...wrongs];
    pool = [...new Set(pool)].sort(() => Math.random() - 0.5);
    return { choices: pool, ci: pool.indexOf(ans) };
  }

  // --- [Lv1 정적 뱅크 80개] ---
  const lv1_OX = [
    makeOxStatic("두 점 $(1,1), (4,5)$ 사이의 거리는 $5$이다.", "O", "$\\sqrt{3^2+4^2}=5$", ["두 점 사이 거리는 좌표 차이를 이용한다.", "$\\Delta x$, $\\Delta y$를 각각 구해 제곱합의 제곱근을 취한다.", "$\\Delta x=3$, $\\Delta y=4$ 형태가 되는지 확인한다."], "거리", STD_01_01),
    makeOxStatic("두 직선 $y=x+1, y=x+2$는 평행하다.", "O", "기울기 동일", ["평행 여부는 기울기를 비교한다.", "$y=mx+n$ 꼴에서 $m$ 값만 비교한다.", "두 식의 $x$ 계수가 같은지 확인한다."], "평행", STD_01_02),
    makeOxStatic("기울기 $2$인 직선과 수직인 직선 기울기는 $-\\dfrac{1}{2}$이다.", "O", "곱이 $-1$", ["수직인 두 직선의 기울기 곱은 $-1$이다.", "주어진 기울기 $2$에 대해 $m\\cdot2=-1$을 만족하는 $m$을 생각한다.", "부호가 반대이고 역수 관계인지 점검한다."], "수직", STD_01_02),
    makeOxStatic("원점과 직선 $x=3$ 사이 거리는 $3$이다.", "O", "수직 거리", ["점과 직선 사이 거리는 최단거리(수선의 길이)다.", "$x=3$은 세로선이므로 원점에서 수평으로 잰다.", "원점의 $x$좌표와 직선의 $x$값 차이를 본다."], "거리", STD_01_03),
    makeOxStatic("원의 방정식 일반형은 $x^2+y^2+Ax+By+C=0$ 꼴이다.", "O", "정의", ["원의 일반형은 $x^2$와 $y^2$의 계수가 같고 교차항 $xy$가 없다.", "$x^2+y^2$ 항과 일차항, 상수항 구조를 확인한다.", "제시식이 일반형의 필수 구조를 모두 갖추는지 본다."], "원", STD_01_04),
    makeOxStatic("$d < r$ 이면 원과 직선은 두 점에서 만난다.", "O", "교점 2개", ["원과 직선의 위치는 중심-직선 거리 $d$와 반지름 $r$ 비교로 판단한다.", "$d<r$, $d=r$, $d>r$ 세 경우를 구분한다.", "$d<r$에 해당하는 교점 개수를 떠올린다."], "관계", STD_01_05),
    makeOxStatic("점 $(1,2)$를 $x$축 대칭이동하면 $(-1,2)$이다.", "X", "$(1,-2)$가 되어야 함", ["$x$축 대칭은 $x$좌표는 그대로 두고 $y$좌표 부호만 바꾼다.", "원점 대칭과 $x$축 대칭을 혼동하지 않는다.", "좌표의 어느 성분 부호가 바뀌는지 확인한다."], "대칭", STD_01_07),
    makeOxStatic("평행이동 $(x,y) \\to (x+a, y+b)$는 모양을 변화시키지 않는다.", "O", "합동 변환", ["평행이동은 모든 점을 같은 벡터만큼 이동시키는 변환이다.", "길이와 각도의 크기가 보존되는지 생각한다.", "도형의 위치만 바뀌고 크기·모양이 유지되는지 판단한다."], "이동", STD_01_06),
    makeOxStatic("원 $(x-1)^2+y^2=1$의 반지름은 $1$이다.", "O", "표준형", ["원 표준형 $(x-a)^2+(y-b)^2=r^2$를 떠올린다.", "우변이 $r^2$이므로 반지름은 우변의 제곱근이다.", "$y^2$는 $(y-0)^2$와 같다는 점을 이용한다."], "원", STD_01_04),
    makeOxStatic("두 직선이 일치하면 평행하다고 하지 않는다.", "O", "정의", ["평행은 보통 서로 만나지 않는 두 직선을 말한다.", "일치하는 경우는 특수한 경우로 별도로 다루기도 한다.", "교과서의 평행 정의(서로 다른 두 직선)를 기준으로 판단한다."], "직선", STD_01_02)
  ];
  while(lv1_OX.length < 20) lv1_OX.push(lv1_OX[0]);

  const lv1_MC = [
    makeMc("선분의 내분점에 대한 설명으로 옳은 것을 고르시오.", ["내분점은 항상 두 점을 잇는 선분 위에 있다.", "내분점은 항상 두 점 밖에 있다.", "내분점은 항상 정수 좌표이다.", "내분점은 한 점과 반드시 일치한다.", "내분점은 좌표평면에서 정의할 수 없다."], 0, "내분점은 항상 두 점을 잇는 선분 위에 있다.", "내분점은 선분 위", "내분은 선분을 일정 비로 나누는 점이다.", ["내분의 정의를 먼저 떠올린다.", "내분은 두 점 사이를 나누는 상황인지 확인한다.", "선분 내부/외부 개념에서 내분과 외분을 구분한다."], "내분", STD_01_01),
    makeMc("두 직선의 평행 조건으로 옳은 것을 고르시오.", ["기울기가 같다.", "기울기의 곱이 $-1$이다.", "절편이 같다.", "$x$계수가 같다.", "항상 한 점에서 만난다."], 0, "기울기가 같다.", "기울기 같다", "평행 직선은 방향이 같아 기울기가 같다.", ["평행과 수직 조건을 구분한다.", "기울기 비교가 핵심인지 판단한다.", "절편은 달라도 평행 가능함을 확인한다."], "평행", STD_01_02),
    makeMc("두 직선의 수직 조건으로 옳은 것을 고르시오.", ["기울기 곱이 $-1$이다.", "기울기가 같다.", "절편의 곱이 $-1$이다.", "$x$절편이 같다.", "항상 만나지 않는다."], 0, "기울기 곱이 $-1$이다.", "기울기 곱 -1", "수직 직선의 기울기 사이에는 역수·부호 관계가 있다.", ["수직은 직각으로 만나는 관계다.", "기울기 $m_1,m_2$ 사이 식을 떠올린다.", "평행 조건과 혼동하지 않도록 비교한다."], "수직", STD_01_02),
    makeMc("점과 직선 사이 거리의 설명으로 옳은 것을 고르시오.", ["점에서 직선에 내린 수선의 길이이다.", "점과 직선 위 임의의 점 사이 길이이다.", "점의 $x$좌표와 직선 기울기의 차이이다.", "점의 $y$좌표 절댓값이다.", "항상 정수로만 나온다."], 0, "점에서 직선에 내린 수선의 길이이다.", "수선의 길이", "점-직선 거리는 최단거리 개념이다.", ["거리의 기하적 정의를 먼저 본다.", "최단거리와 임의거리 차이를 구분한다.", "수선 개념이 들어간 선택지를 찾는다."], "점직거리", STD_01_03),
    makeMc("원 $(x-a)^2+(y-b)^2=r^2$에 대한 설명으로 옳은 것을 고르시오.", ["중심은 $(a,b)$이고 반지름은 $r$이다.", "중심은 $(-a,-b)$이다.", "반지름은 $r^2$이다.", "항상 원점을 지난다.", "항상 $x$축에 접한다."], 0, "중심은 $(a,b)$이고 반지름은 $r$이다.", "중심(a,b), 반지름 r", "원의 표준형에서 중심과 반지름을 직접 읽는다.", ["표준형의 각 기호 의미를 대응한다.", "괄호 안 부호와 중심 복원을 연결한다.", "우변은 반지름 자체가 아닌 제곱값임을 확인한다."], "원의 방정식", STD_01_04),
    makeMc("원과 직선의 위치 관계 판단에서 옳은 설명을 고르시오.", ["중심과 직선 사이 거리와 반지름을 비교한다.", "직선의 절편만 보면 된다.", "반지름만 보면 된다.", "항상 두 점에서 만난다.", "기울기가 같으면 만난다."], 0, "중심과 직선 사이 거리와 반지름을 비교한다.", "d와 r 비교", "원-직선 위치는 거리 비교로 분류한다.", ["비교해야 할 두 양이 무엇인지 찾는다.", "$d<r$, $d=r$, $d>r$의 세 경우를 정리한다.", "교점 개수와 세 경우를 연결한다."], "위치 관계", STD_01_05),
    makeMc("점 $(x,y)$를 $(x+p,y+q)$로 보내는 변환의 성질로 옳은 것을 고르시오.", ["도형의 크기와 모양은 바뀌지 않는다.", "길이는 항상 2배가 된다.", "각의 크기가 변한다.", "원이 타원이 된다.", "기울기가 모두 바뀐다."], 0, "도형의 크기와 모양은 바뀌지 않는다.", "합동 유지", "평행이동은 합동변환이다.", ["좌표가 일정량 이동하는 변환인지 본다.", "길이·각도 보존 여부를 판단한다.", "위치만 변하고 형상은 유지되는지 확인한다."], "평행이동", STD_01_06),
    makeMc("점 $(a,b)$를 $x$축에 대하여 대칭이동한 점으로 옳은 것을 고르시오.", ["$(a,-b)$", "$(-a,b)$", "$(-a,-b)$", "$(b,a)$", "$(a,b)$"], 0, "$(a,-b)$", "(a,-b)", "$x$축 대칭은 $y$부호만 바뀐다.", ["$x$축은 위아래를 뒤집는 축이다.", "$x$좌표 유지, $y$좌표 부호 반전 규칙을 적용한다.", "원점 대칭·$y=x$ 대칭과 구분한다."], "대칭이동", STD_01_07),
    makeMc("점 $(a,b)$를 원점에 대하여 대칭이동한 점으로 옳은 것을 고르시오.", ["$(-a,-b)$", "$(a,-b)$", "$(-a,b)$", "$(b,a)$", "$(a,b)$"], 0, "$(-a,-b)$", "(-a,-b)", "원점 대칭은 두 좌표 부호를 모두 바꾼다.", ["원점 대칭의 좌표 규칙을 떠올린다.", "두 성분 모두 부호가 바뀌는지 확인한다.", "축대칭과 다르게 좌표 유지가 없음을 점검한다."], "대칭이동", STD_01_07),
    makeMc("점 $(a,b)$를 직선 $y=x$에 대하여 대칭이동한 점으로 옳은 것을 고르시오.", ["$(b,a)$", "$(-b,-a)$", "$(a,-b)$", "$(-a,b)$", "$(a,b)$"], 0, "$(b,a)$", "(b,a)", "$y=x$ 대칭은 좌표를 교환한다.", ["직선 $y=x$는 좌표교환 대칭축이다.", "첫째·둘째 좌표 위치를 바꾸는 규칙을 적용한다.", "부호는 임의로 바꾸지 않고 원래 성분을 따른다."], "대칭이동", STD_01_07),
    makeMc("원의 방정식을 일반형으로 바꿨을 때 성질로 옳은 것을 고르시오.", ["$x^2$와 $y^2$의 계수는 같다.", "$xy$항이 반드시 있다.", "$x^2$의 계수는 항상 2이다.", "상수항은 항상 0이다.", "일차항은 존재할 수 없다."], 0, "$x^2$와 $y^2$의 계수는 같다.", "x2,y2 계수 같음", "원은 이차항 구조가 대칭적이다.", ["일반형의 필수 형태를 떠올린다.", "$x^2,y^2$ 계수 관계와 $xy$항 유무를 확인한다.", "항상/반드시 같은 절대 표현을 검토한다."], "원의 일반형", STD_01_04),
    makeMc("직선 $x=c$를 좌우로 평행이동할 때의 설명으로 옳은 것을 고르시오.", ["이동 후에도 식은 $x=\\text{상수}$ 꼴이다.", "이동 후 $y=mx+n$ 꼴로 바뀐다.", "항상 기울기 1이 된다.", "항상 원점을 지난다.", "직선이 곡선으로 바뀐다."], 0, "이동 후에도 식은 $x=\\text{상수}$ 꼴이다.", "세로선 유지", "세로선은 평행이동 후에도 세로선이다.", ["원래 직선의 방향(세로/가로)을 먼저 본다.", "평행이동은 방향을 바꾸지 않는 변환이다.", "식 형태가 유지되는지 판단한다."], "직선의 평행이동", STD_01_06)
  ];
  while(lv1_MC.length < 20) lv1_MC.push(lv1_MC[0]);

  const lv1_SA = [
    makeSa("두 점 $(1,2), (4,6)$ 사이 거리를 구하시오.", "$5$", "5", "$\\sqrt{3^2+4^2}=5$", ["거리"], "거리", STD_01_01),
    makeSa("원의 중심이 $(3,4)$이고 반지름이 $5$일 때 상수항 없는 식 $x^2+y^2-6x-8y+25=r^2$에서 $r$값을 쓰시오.", "$5$", "5", "5", ["원"], "원", STD_01_04)
  ];
  while(lv1_SA.length < 20) lv1_SA.push(lv1_SA[0]);

  const lv1_ES = [
    makeEs("두 점 사이의 거리 공식을 서술하고 $(1,1), (4,5)$ 거리를 구하시오.", "$5$", "5", "$\\sqrt{(4-1)^2+(5-1)^2}=5$", ["거리"], "거리", STD_01_01)
  ];
  while(lv1_ES.length < 20) lv1_ES.push(lv1_ES[0]);

  // --- [Lv2 정적 뱅크 80개] ---
  const lv2_OX = [
    makeOxStatic("두 점 $(2,3), (5,7)$ 사이의 거리는 $5$이다.", "O", "$\\sqrt{(5-2)^2+(7-3)^2}=\\sqrt{3^2+4^2}=5$", ["거리 공식을 적용해 좌표 차이를 계산한다.", "$\\Delta x$, $\\Delta y$를 제곱해 더한 뒤 제곱근을 취한다.", "$3$과 $4$의 제곱합 구조가 되는지 확인한다."], "거리", STD_01_01),
    makeOxStatic("직선 $ax+by+c=0$과 $a'x+b'y+c'=0$이 수직이면 $aa'+bb'=0$이다.", "O", "수직 조건", ["일반형 직선의 법선벡터를 생각한다.", "수직 조건은 두 법선벡터의 내적과 연결된다.", "$aa'+bb'$ 값이 어떤 의미인지 판단한다."], "직선", STD_01_02),
    makeOxStatic("점 $(1,2)$와 직선 $x+y-1=0$ 사이 거리는 $\\sqrt{2}$이다.", "O", "공식 대입", ["점-직선 거리 공식 $d=\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$를 사용한다.", "여기서 $a,b,c$를 식에서 읽어 대입한다.", "분자 절댓값과 분모 길이를 각각 계산해 비교한다."], "거리", STD_01_03),
    makeOxStatic("원 $x^2+y^2=1$을 원점에 대칭이동한 원은 자기 자신과 같다.", "O", "중심 이동 없음", ["원점 대칭은 $(x,y)\\to(-x,-y)$ 변환이다.", "중심이 원점인 도형은 원점 대칭에 대해 형태가 유지된다.", "중심과 반지름이 변하는지 여부를 확인한다."], "원", STD_01_07)
  ];
  while(lv2_OX.length < 20) lv2_OX.push(lv2_OX[0]);

  const lv2_MC = [
    makeMc("선분 내분점의 좌표 공식을 바르게 나타낸 것을 고르시오.", ["$P\\left(\\dfrac{mx_2+nx_1}{m+n},\\dfrac{my_2+ny_1}{m+n}\\right)$", "$P\\left(\\dfrac{mx_1+nx_2}{m+n},\\dfrac{my_1+ny_2}{m+n}\\right)$", "$P\\left(\\dfrac{x_1+x_2}{2},\\dfrac{y_1+y_2}{2}\\right)$", "$P\\left(\\dfrac{mx_2-nx_1}{m-n},\\dfrac{my_2-ny_1}{m-n}\\right)$", "$P\\left(mx_2+nx_1,my_2+ny_1\\right)$"], 0, "$P\\left(\\dfrac{mx_2+nx_1}{m+n},\\dfrac{my_2+ny_1}{m+n}\\right)$", "내분점 공식", "내분 공식", ["내분점은 양 끝점 좌표의 가중평균이다.", "분모는 비의 합 $m+n$이 된다.", "$x$, $y$좌표를 같은 방식으로 계산하는 식을 고른다."], "내분", STD_01_01),
    makeMc("두 직선 $2x-3y+1=0$, $3x+2y-4=0$의 위치 관계를 고르시오.", ["서로 수직", "서로 평행", "서로 일치", "만나지 않는다", "판단할 수 없다"], 0, "서로 수직", "수직", "법선벡터 내적 또는 기울기 곱으로 판단", ["각 직선을 $y=mx+n$ 꼴로 바꿔 기울기를 비교한다.", "또는 법선벡터 $(a,b)$를 이용해 내적을 계산한다.", "수직/평행/일치 조건 중 어느 것에 해당하는지 결정한다."], "평행·수직", STD_01_02),
    makeMc("점 $(2,-1)$과 직선 $3x-4y+5=0$ 사이 거리 공식 적용식으로 옳은 것을 고르시오.", ["$\\dfrac{|3\\cdot2-4\\cdot(-1)+5|}{\\sqrt{3^2+(-4)^2}}$", "$\\dfrac{|3\\cdot2-4\\cdot(-1)+5|}{3+4}$", "$\\dfrac{|2-(-1)+5|}{\\sqrt{3^2+4^2}}$", "$\\dfrac{|3\\cdot2-4\\cdot(-1)|}{\\sqrt{3^2+(-4)^2}}$", "$\\dfrac{|3\\cdot2-4\\cdot(-1)+5|}{\\sqrt{2^2+(-1)^2}}$"], 0, "$\\dfrac{|3\\cdot2-4\\cdot(-1)+5|}{\\sqrt{3^2+(-4)^2}}$", "거리 공식 대입", "점-직선 거리 공식 대입", ["점-직선 거리 공식의 분자와 분모를 구분한다.", "분자에는 $ax_0+by_0+c$를 넣고 절댓값을 취한다.", "분모는 직선 계수 $a,b$로 만든 $\\sqrt{a^2+b^2}$임을 확인한다."], "점직거리", STD_01_03),
    makeMc("원 $x^2+y^2-6x+4y-12=0$의 중심과 반지름으로 옳은 것을 고르시오.", ["중심 $(3,-2)$, 반지름 $5$", "중심 $(-3,2)$, 반지름 $5$", "중심 $(3,-2)$, 반지름 $25$", "중심 $(6,-4)$, 반지름 $5$", "중심 $(3,2)$, 반지름 $5$"], 0, "중심 $(3,-2)$, 반지름 $5$", "(3,-2),5", "완전제곱으로 표준형 변환", ["일반형을 $x$, $y$에 대해 각각 완전제곱식으로 정리한다.", "표준형에서 중심 좌표와 반지름을 읽는다.", "반지름은 우변 값이 아니라 그 제곱근임을 확인한다."], "원의 방정식", STD_01_04),
    makeMc("원 $x^2+y^2=25$와 직선 $3x+4y-20=0$의 위치 관계를 고르시오.", ["한 점에서 만난다(접한다)", "두 점에서 만난다", "만나지 않는다", "일치한다", "원의 중심을 지난다"], 0, "한 점에서 만난다(접한다)", "접한다", "중심-직선 거리와 반지름 비교", ["원의 중심은 $(0,0)$, 반지름은 $5$이다.", "직선까지 거리 $d=\\dfrac{|c|}{\\sqrt{a^2+b^2}}$를 계산한다.", "$d$와 $r$을 비교하여 교점 개수를 결정한다."], "위치 관계", STD_01_05),
    makeMc("점 $A(1,-2)$를 벡터 $(3,4)$만큼 평행이동한 점을 $A'$라 하자. 옳은 설명을 고르시오.", ["$A'=(4,2)$이고 $AA'$의 길이는 $5$이다.", "$A'=(4,-6)$이고 $AA'$의 길이는 $5$이다.", "$A'=(-2,2)$이고 $AA'$의 길이는 $7$이다.", "$A'=(4,2)$이고 $AA'$의 길이는 $7$이다.", "$A'=(1,-2)$이고 $AA'$의 길이는 $0$이다."], 0, "$A'=(4,2)$이고 $AA'$의 길이는 $5$이다.", "A'=(4,2), 길이5", "좌표 이동과 이동벡터 길이", ["평행이동은 좌표에 이동벡터 성분을 더한다.", "이동 전후 점 사이 거리는 이동벡터의 크기와 같다.", "좌표 계산과 거리 계산을 모두 만족하는 선택지를 찾는다."], "평행이동", STD_01_06),
    makeMc("점 $P(2,-5)$를 원점 대칭한 뒤 다시 $y=x$ 대칭한 점을 구하시오.", ["$(5,-2)$", "$(-5,2)$", "$(2,5)$", "$(-2,5)$", "$(5,2)$"], 0, "$(5,-2)$", "5,-2", "대칭 변환을 순서대로 적용", ["대칭변환은 순서에 따라 결과가 달라질 수 있다.", "원점 대칭 규칙을 먼저 적용한 뒤 $y=x$ 대칭을 적용한다.", "각 단계에서 좌표를 정확히 기록해 최종 좌표를 결정한다."], "대칭이동", STD_01_07),
    makeMc("두 점 $A(-2,1)$, $B(4,7)$을 $1:2$로 외분하는 점의 좌표로 옳은 것을 고르시오.", ["$(-8,-5)$", "$(8,5)$", "$(0,3)$", "$(-4,-2)$", "$(2,4)$"], 0, "$(-8,-5)$", "-8,-5", "외분점 공식", ["외분은 분모가 $m-n$ 형태로 나타난다.", "$1:2$ 외분에서 좌표 계산 시 부호 처리를 주의한다.", "선분 바깥쪽에 위치하는 좌표인지 기하적으로도 점검한다."], "외분", STD_01_01),
    makeMc("직선 $y=\\dfrac{1}{2}x+3$과 수직이고 점 $(2,1)$을 지나는 직선의 방정식을 고르시오.", ["$y=-2x+5$", "$y=2x-3$", "$y=-\\dfrac{1}{2}x+2$", "$y=\\dfrac{1}{2}x$", "$y=-2x-3$"], 0, "$y=-2x+5$", "y=-2x+5", "수직 기울기와 점대입", ["수직인 직선의 기울기는 음의 역수다.", "직선식을 $y=mx+b$로 두고 점 $(2,1)$을 대입해 $b$를 구한다.", "기울기와 점 조건을 동시에 만족하는 식을 선택한다."], "수직 조건", STD_01_02),
    makeMc("원 $x^2+y^2+2ax-4y+1=0$의 중심이 $( -3,2 )$일 때 $a$의 값으로 옳은 것을 고르시오.", ["$3$", "$-3$", "$6$", "$-6$", "$1$"], 0, "$3$", "3", "중심과 계수 관계", ["일반형에서 중심은 $(-\\frac{A}{2},-\\frac{B}{2})$ 형태다.", "$2ax$의 계수를 $A$로 보고 중심의 $x$좌표와 연결한다.", "주어진 중심과 식의 계수를 비교해 $a$를 결정한다."], "원 일반형", STD_01_04),
    makeMc("원 $x^2+(y-1)^2=10$과 직선 $x=4$의 위치 관계를 고르시오.", ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "일치한다", "판단할 수 없다"], 0, "두 점에서 만난다", "두 점", "거리-반지름 비교", ["원의 중심은 $(0,1)$이고 반지름은 $\\sqrt{10}$이다.", "직선 $x=4$까지 중심의 거리는 $4$이다.", "$4$와 $\\sqrt{10}$의 크기를 비교해 교점 개수를 판단한다."], "위치 관계", STD_01_05)
  ];
  while(lv2_MC.length < 20) lv2_MC.push(lv2_MC[0]);

  const lv2_SA = [
    makeSa("두 점 $(1,2), (7,8)$을 $2:1$로 외분하는 점의 $x$좌표를 구하시오.", "$13$", "13", "공식 적용", ["외분"], "좌표", STD_01_01),
    makeSa("원점과 직선 $x-y+k=0$ 사이 거리가 $\\sqrt{2}$인 양수 $k$를 구하시오.", "$2$", "2", "점직거", ["미지수"], "거리", STD_01_03)
  ];
  while(lv2_SA.length < 20) lv2_SA.push(lv2_SA[0]);

  const lv2_ES = [
    makeEs("두 점 $A(-1,2), B(3,10)$의 $3:1$ 내분점 $P$를 구하는 과정을 서술하시오.", "$(2,8)$", "2,8", "공식 대입", ["내분"], "좌표", STD_01_01)
  ];
  while(lv2_ES.length < 20) lv2_ES.push(lv2_ES[0]);

  const lv3_MC = [
    makeMc("두 점 $A(-2,1), B(7,10)$을 $2:1$로 내분하는 점의 좌표를 구하시오.", ["$(4,7)$", "$(1,4)$", "$(5,8)$", "$(3,6)$", "$(2,5)$"], 0, "$(4,7)$", "4,7", "내분점 공식", ["좌표를 각각 내분점 공식에 대입한다.", "$2:1$ 비율을 $x$, $y$에 동일하게 적용한다.", "계산 좌표가 두 점 사이에 위치하는지 점검한다."], "내분점", STD_01_01),
    makeMc("직선 $2x-3y+4=0$과 수직이고 점 $(3,-1)$을 지나는 직선의 방정식을 고르시오.", ["$3x+2y-7=0$", "$2x-3y-9=0$", "$3x-2y+11=0$", "$2x+3y-3=0$", "$3x+2y+7=0$"], 0, "$3x+2y-7=0$", "3x+2y-7=0", "수직 조건 + 점대입", ["수직인 직선의 기울기는 음의 역수 관계다.", "원하는 기울기를 가진 직선식을 세운다.", "주어진 점을 대입해 상수항을 결정한다."], "수직", STD_01_02),
    makeMc("점 $(2,-3)$과 직선 $4x-3y+6=0$ 사이의 거리를 구하시오.", ["$\\dfrac{23}{5}$", "$\\dfrac{17}{5}$", "$\\dfrac{23}{3}$", "$5$", "$\\dfrac{19}{5}$"], 0, "$\\dfrac{23}{5}$", "23/5", "점-직선 거리 공식", ["거리 공식의 분자와 분모를 정확히 계산한다.", "분자는 $|ax_0+by_0+c|$ 형태다.", "분모 $\\sqrt{a^2+b^2}$로 나누어 기약분수로 정리한다."], "점직거리", STD_01_03),
    makeMc("원 $x^2+y^2-8x+6y-11=0$의 중심과 반지름으로 옳은 것을 고르시오.", ["중심 $(4,-3)$, 반지름 $6$", "중심 $(-4,3)$, 반지름 $6$", "중심 $(4,-3)$, 반지름 $36$", "중심 $(8,-6)$, 반지름 $6$", "중심 $(4,3)$, 반지름 $6$"], 0, "중심 $(4,-3)$, 반지름 $6$", "(4,-3),6", "완전제곱식으로 표준형 변환", ["$x$, $y$항을 각각 완전제곱식으로 묶는다.", "표준형에서 중심 좌표를 읽는다.", "우변 값의 제곱근으로 반지름을 결정한다."], "원의 방정식", STD_01_04),
    makeMc("원 $x^2+y^2=25$와 직선 $3x-4y+30=0$의 위치 관계를 고르시오.", ["만나지 않는다", "한 점에서 만난다(접한다)", "두 점에서 만난다", "일치한다", "원의 중심을 지난다"], 0, "만나지 않는다", "만나지 않음", "중심-직선 거리와 반지름 비교", ["중심 $(0,0)$에서 직선까지 거리를 계산한다.", "계산한 거리와 반지름 $5$를 비교한다.", "$d>r$인지 확인해 위치 관계를 결정한다."], "위치 관계", STD_01_05),
    makeMc("점 $P(1,-2)$를 오른쪽으로 $4$, 위로 $3$ 평행이동한 뒤 원점 대칭한 점을 구하시오.", ["$(-5,-1)$", "$(5,1)$", "$(-5,1)$", "$(5,-1)$", "$(-1,-5)$"], 0, "$(-5,-1)$", "-5,-1", "평행이동 후 대칭", ["변환을 순서대로 적용한다.", "먼저 평행이동으로 좌표를 구한다.", "그 결과를 원점 대칭 규칙에 넣어 최종 좌표를 구한다."], "변환 합성", STD_01_06),
    makeMc("점 $P(4,-1)$을 직선 $y=x$에 대하여 대칭이동한 점을 다시 $y$축 대칭이동한 점을 구하시오.", ["$(1,4)$", "$(-1,4)$", "$(1,-4)$", "$(-4,1)$", "$(4,1)$"], 0, "$(1,4)$", "1,4", "좌표 교환 후 y축 대칭", ["먼저 $y=x$ 대칭으로 좌표를 교환한다.", "그다음 $y$축 대칭으로 $x$좌표 부호를 바꾼다.", "각 단계 중간 좌표를 기록해 오차를 줄인다."], "대칭이동", STD_01_07),
    makeMc("직선 $x-2y+3=0$과 점 $(1,2)$ 사이의 거리가 $d$일 때 $d^2$의 값을 구하시오.", ["$\\dfrac{4}{5}$", "$\\dfrac{2}{5}$", "$\\dfrac{16}{5}$", "$\\dfrac{9}{5}$", "$\\dfrac{1}{5}$"], 0, "$\\dfrac{4}{5}$", "4/5", "거리공식 후 제곱", ["거리 공식을 적용해 먼저 $d$를 구한다.", "분모 제곱근을 정리해 분수 형태로 표현한다.", "최종적으로 문제에서 요구한 $d^2$를 계산한다."], "점직거리", STD_01_03),
    makeMc("원 $(x-2)^2+(y+1)^2=16$을 왼쪽으로 $5$, 아래로 $2$만큼 평행이동한 원의 방정식을 고르시오.", ["$(x+3)^2+(y+3)^2=16$", "$(x-3)^2+(y-3)^2=16$", "$(x+3)^2+(y-1)^2=16$", "$(x-3)^2+(y+3)^2=16$", "$(x+3)^2+(y+3)^2=4$"], 0, "$(x+3)^2+(y+3)^2=16$", "(x+3)^2+(y+3)^2=16", "중심 이동 후 표준형 작성", ["원의 중심을 이동벡터만큼 옮긴다.", "이동된 중심으로 표준형을 다시 쓴다.", "반지름은 변하지 않는다는 점을 확인한다."], "원의 평행이동", STD_01_06),
    makeMc("두 직선 $x+2y-3=0$, $2x-4y+1=0$의 위치 관계를 고르시오.", ["두 점에서 만나는 서로 다른 직선", "서로 평행", "서로 수직", "서로 일치", "판단할 수 없다"], 0, "두 점에서 만나는 서로 다른 직선", "한 점에서 만남", "기울기 비교", ["각 직선을 $y=mx+n$ 꼴로 바꿔 기울기를 구한다.", "기울기가 다르고 수직조건도 아닌지 확인한다.", "그 경우 한 점에서 만나는 서로 다른 직선이다."], "직선의 위치관계", STD_01_02)
  ];
  while(lv3_MC.length < 20) lv3_MC.push(lv3_MC[0]);

  // --- [스마트 생성기] ---
  const smartGens = {
    "01_01": function() {
      const x1 = riSafe(-5, 5), y1 = riSafe(-5, 5), x2 = riSafe(-5, 5), y2 = riSafe(-5, 5);
      const m = riSafe(2, 3), n = 1;
      const px = (m * x2 + n * x1) / (m + n), py = (m * y2 + n * y1) / (m + n);
      if (!Number.isInteger(px) || !Number.isInteger(py)) return null;
      const q = `두 점 $A(${x1}, ${y1}), B(${x2}, ${y2})$를 $${m}:${n}$으로 내분하는 점의 좌표를 구하시오.`;
      const ans = `$(${px}, ${py})$`;
      const ch = makeWrongChoices(ans, [`$(${px + 1}, ${py})$`, `$(${px}, ${py - 1})$`, `$(${py}, ${px})$`]);
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px}, ${py}`, sol: `내분점 공식: $x = \\dfrac{${m}\\cdot ${x2}${sp(n)}\\cdot ${x1}}{${m}+${n}}$, $y = \\dfrac{${m}\\cdot ${y2}${sp(n)}\\cdot ${y1}}{${m}+${n}}$`, hints: ["내분점은 두 점 좌표의 가중평균으로 계산한다.", "비 $m:n$이면 분모는 $m+n$으로 두고, 각 좌표를 같은 비로 계산한다.", "$x$, $y$좌표를 각각 공식에 대입해 정수/분수 형태를 정리한다."], terms: "내분점", std: STD_01_01 };
    },
    "01_02": function() {
      const a = riSafe(2, 4), b = riSafe(-4, 4);
      const q = `직선 $${lineY(a, b)}$에 수직이고 원점 $(0,0)$을 지나는 직선의 방정식을 구하시오.`;
      const ans = `$y = -\\dfrac{1}{${a}}x$`;
      const ch = makeWrongChoices(ans, [`$y = ${a}x$`, `$y = -${a}x$`, `$y = \\dfrac{1}{${a}}x$`]);
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `y=-1/${a}x`, sol: `기울기 곱은 $-1$입니다. $${a} \\cdot \\left(-\\dfrac{1}{${a}}\\right) = -1$`, hints: ["수직인 두 직선의 기울기 곱은 $-1$이다.", "주어진 직선 기울기를 $m$이라 두고 새 기울기 $m'$에 대해 $mm'=-1$을 적용한다.", "원점을 지나므로 절편은 $0$이 되어 $y=m'x$ 꼴로 정리한다."], terms: "수직", std: STD_01_02 };
    },
    "01_03": function() {
      const x0 = riSafe(-5, 5), y0 = riSafe(-5, 5), c = riSafe(-15, 15);
      const distNumer = Math.abs(3 * x0 + 4 * y0 + c);
      if (distNumer === 0 || distNumer % 5 !== 0) return null;
      const d = distNumer / 5;
      const q = `점 $(${x0}, ${y0})$과 직선 $3x+4y${spNZ(c)}=0$ 사이의 거리를 구하시오.`;
      const ans = `$${d}$`;
      const ch = makeWrongChoices(ans, [`$${d + 1}$`, `$${Math.abs(d - 1)}$`, `$5$`]);
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${d}`, sol: `거리 $d = \\dfrac{|3(${x0})+4(${y0})${spNZ(c)}|}{\\sqrt{3^2+4^2}} = \\dfrac{${distNumer}}{5} = ${d}$`, hints: ["점-직선 거리 공식 $d=\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$를 사용한다.", "직선의 계수 $a,b,c$와 점 좌표 $(x_0,y_0)$를 정확히 대응해 대입한다.", "분자 절댓값 계산 후 분모 $\\sqrt{a^2+b^2}$로 나누어 최종 거리를 구한다."], terms: "거리", std: STD_01_03 };
    },
    "01_05": function() {
      const r = riSafe(3, 6);
      const isTouch = Math.random() > 0.5;
      const d = isTouch ? r : r + 1;
      const q = `반지름이 $${r}$인 원의 중심과 직선 사이의 거리가 $${d}$일 때의 위치 관계를 고르시오.`;
      const ans = isTouch ? "한 점에서 만난다(접한다)" : "만나지 않는다";
      const choices = ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "중심을 지난다", "알 수 없다"];
      return { type: ["객관식"], q, choices, ci: choices.indexOf(ans), ans: `$${ans}$`, sa: ans, sol: `거리 $d$와 반지름 $r$을 비교합니다. $d=${d}, r=${r}$`, hints: ["위치 관계는 중심-직선 거리 $d$와 반지름 $r$의 대소비교로 결정한다.", "$d<r$, $d=r$, $d>r$ 세 경우를 각각 떠올린다.", "문제의 $d,r$ 값을 비교해 해당 경우의 교점 개수를 선택한다."], terms: "위치 관계", std: STD_01_05 };
    }
  };

  // --- [기초-객관식 전용 스마트 생성기: 성취기준별 1개] ---
  const basicMcGens = {
    "01_01": function () {
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const x1 = riSafe(-4, 4), y1 = riSafe(-4, 4);
        const dx = riSafe(1, 4), dy = riSafe(1, 4);
        const x2 = x1 + 2 * dx, y2 = y1 + 2 * dy;
        const q = `두 점 $A(${x1}, ${y1}), B(${x2}, ${y2})$의 중점을 구하시오.`;
        const ans = `$(${x1 + dx}, ${y1 + dy})$`;
        const ch = makeWrongChoices(ans, [`$(${x1 + dx + 1}, ${y1 + dy})$`, `$(${x1 + dx}, ${y1 + dy - 1})$`, `$(${x1 + dy}, ${y1 + dx})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${x1 + dx}, ${y1 + dy}`, sol: `중점 공식으로 $\\left(\\dfrac{${x1}+${x2}}{2},\\dfrac{${y1}+${y2}}{2}\\right)=(${x1 + dx},${y1 + dy})$`, hints: ["중점은 두 좌표의 산술평균으로 구한다.", "$x$좌표끼리, $y$좌표끼리 각각 평균을 계산한다.", "계산한 좌표가 두 점 사이에 있는지 함께 점검한다."], terms: "내분점", std: STD_01_01 };
      }
      if (mode === 2) {
        const x1 = riSafe(-4, 2), y1 = riSafe(-4, 2);
        const x2 = x1 + riSafe(2, 5), y2 = y1 + riSafe(2, 5);
        const m = 1, n = 2;
        const px = (m * x2 + n * x1) / (m + n), py = (m * y2 + n * y1) / (m + n);
        const q = `두 점 $A(${x1},${y1}), B(${x2},${y2})$를 $1:2$로 내분하는 점의 좌표를 구하시오.`;
        const ans = `$(${px},${py})$`;
        const ch = makeWrongChoices(ans, [`$(${x1 + 1},${y1 + 1})$`, `$(${x2 - 1},${y2 - 1})$`, `$(${(x1 + x2) / 2},${(y1 + y2) / 2})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px},${py}`, sol: `내분점 공식으로 $\\left(\\dfrac{1\\cdot${x2}+2\\cdot${x1}}{3},\\dfrac{1\\cdot${y2}+2\\cdot${y1}}{3}\\right)=(${px},${py})$`, hints: ["내분점은 양 끝점 좌표를 비율로 가중해 계산한다.", "$1:2$ 내분이면 한쪽 점의 좌표에 $2$를 곱해 더한다.", "$x$, $y$를 각각 계산하여 좌표쌍으로 정리한다."], terms: "내분점", std: STD_01_01 };
      }
      const x1 = riSafe(-5, 0), y1 = riSafe(-3, 3);
      const x2 = x1 + riSafe(4, 8), y2 = y1;
      const q = `선분의 양 끝점이 $A(${x1},${y1}), B(${x2},${y2})$일 때 선분의 길이를 구하시오.`;
      const len = Math.abs(x2 - x1);
      const ans = `$${len}$`;
      const ch = makeWrongChoices(ans, [`$${len + 1}$`, `$${Math.max(1, len - 1)}$`, `$${len * 2}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${len}`, sol: `두 점의 $y$좌표가 같으므로 길이는 $|${x2}-${x1}|=${len}$이다.`, hints: ["두 점의 $y$좌표가 같으면 수평선분이다.", "수평선분 길이는 $x$좌표 차이의 절댓값이다.", "절댓값 계산 후 길이를 양수로 적는다."], terms: "선분 길이", std: STD_01_01 };
    },
    "01_02": function () {
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const m = riSafe(-4, 4) || 2;
        const b = riSafe(-5, 5);
        const q = `직선 $${lineY(m, b)}$와 평행한 직선을 고르시오.`;
        const ansB = riSafe(-5, 5);
        const ans = `$${lineY(m, ansB)}$`;
        const ch = makeWrongChoices(ans, [`$${lineY(-m, riSafe(-5, 5))}$`, `$${lineY(m + 1, riSafe(-5, 5))}$`, `$y=\\dfrac{1}{${m === 0 ? 1 : m}}x$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: ans.replace(/\$/g, ""), sol: "평행한 두 직선은 기울기가 같다.", hints: ["평행 여부는 기울기를 비교해 판단한다.", "각 선택식을 $y=mx+n$ 꼴로 보고 $m$을 맞춰 본다.", "기울기가 같은 식만 남기고 절편은 달라도 됨을 확인한다."], terms: "평행", std: STD_01_02 };
      }
      if (mode === 2) {
        const m = riSafe(2, 4);
        const q = `직선 $y=${m}x$에 수직인 직선의 기울기를 구하시오.`;
        const ans = `$-\\dfrac{1}{${m}}$`;
        const ch = makeWrongChoices(ans, [`$\\dfrac{1}{${m}}$`, `$-${m}$`, `$${m}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `-1/${m}`, sol: `수직 조건 $m_1m_2=-1$을 적용하면 $m_2=-\\dfrac{1}{${m}}$이다.`, hints: ["수직한 두 직선의 기울기 곱은 $-1$이다.", "주어진 기울기를 $m_1$로 두고 $m_2$를 식으로 구한다.", "역수로 바꾸고 부호를 반대로 바꾼다."], terms: "수직", std: STD_01_02 };
      }
      const m = riSafe(-4, 4) || 1;
      const x0 = riSafe(-3, 3), y0 = riSafe(-3, 3);
      const b = y0 - m * x0;
      const q = `기울기가 $${m}$이고 점 $(${x0},${y0})$를 지나는 직선의 방정식을 고르시오.`;
      const ans = `$${lineY(m, b)}$`;
      const ch = makeWrongChoices(ans, [`$${lineY(m, b + 1)}$`, `$${lineY(-m, b)}$`, `$${lineY(m + 1, b)}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: lineY(m, b), sol: `직선식 $y=mx+b$에 점 $(${x0},${y0})$를 대입하면 $b=${b}$를 얻는다.`, hints: ["직선식을 $y=mx+b$로 둔다.", "주어진 점 좌표를 식에 대입해 $b$를 구한다.", "기울기와 절편이 모두 맞는 식을 선택한다."], terms: "직선의 방정식", std: STD_01_02 };
    },
    "01_03": function () {
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const x0 = riSafe(-3, 3), y0 = riSafe(-3, 3);
        const c = -(x0 + y0 + 3);
        const q = `점 $(${x0},${y0})$과 직선 $x+y${spNZ(c)}=0$ 사이의 거리를 구하시오.`;
        const ansVal = 3 / Math.sqrt(2);
        const ans = `$\\dfrac{3\\sqrt{2}}{2}$`;
        const ch = makeWrongChoices(ans, ["$\\dfrac{3}{2}$", "$\\dfrac{3}{\\sqrt{2}}$", "$\\sqrt{2}$"]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${ansVal}`, sol: `거리 공식: $d=\\dfrac{|${x0}+${y0}${sp(c)}|}{\\sqrt{1^2+1^2}}=\\dfrac{3}{\\sqrt{2}}=\\dfrac{3\\sqrt{2}}{2}$`, hints: ["점-직선 거리 공식 형태를 먼저 쓴다.", "직선 계수와 점 좌표를 대입해 분자 절댓값을 계산한다.", "분모를 유리화해 보기 형태와 일치하는지 확인한다."], terms: "거리", std: STD_01_03 };
      }
      if (mode === 2) {
        const x0 = riSafe(-5, 2);
        const q = `점 $(${x0},2)$와 직선 $x=4$ 사이의 거리를 구하시오.`;
        const d = Math.abs(4 - x0);
        const ans = `$${d}$`;
        const ch = makeWrongChoices(ans, [`$${d + 1}$`, `$${Math.max(1, d - 1)}$`, `$${Math.abs(2 - x0)}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${d}`, sol: `수직거리이므로 $|4-(${x0})|=${d}$이다.`, hints: ["직선 $x=4$는 세로선이다.", "점에서 세로선까지 거리는 $x$좌표 차이의 절댓값이다.", "$y$값은 거리 계산에 영향을 주지 않는다."], terms: "점과 직선 사이 거리", std: STD_01_03 };
      }
      const y0 = riSafe(-5, 1);
      const q = `점 $(3,${y0})$과 직선 $y=5$ 사이의 거리를 구하시오.`;
      const d = Math.abs(5 - y0);
      const ans = `$${d}$`;
      const ch = makeWrongChoices(ans, [`$${d + 2}$`, `$${Math.max(1, d - 2)}$`, `$${Math.abs(3 - y0)}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${d}`, sol: `수직거리이므로 $|5-(${y0})|=${d}$이다.`, hints: ["직선 $y=5$는 가로선이다.", "점에서 가로선까지 거리는 $y$좌표 차이의 절댓값이다.", "$x$좌표와 무관함을 확인한다."], terms: "점과 직선 사이 거리", std: STD_01_03 };
    },
    "01_04": function () {
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const a = riSafe(-4, 4), b = riSafe(-4, 4), r = riSafe(1, 5);
        const q = `중심이 $(${a},${b})$, 반지름이 $${r}$인 원의 방정식을 구하시오.`;
        const ans = `$${circleEq(a, b, r * r)}$`;
        const ch = makeWrongChoices(ans, [`$${circleEq(-a, -b, r * r)}$`, `$${circleEq(a, b, r)}$`, `$x^2+y^2=${r * r}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: ans.replace(/\$/g, ""), sol: "원 표준형 $(x-a)^2+(y-b)^2=r^2$를 사용한다.", hints: ["원의 표준형에 중심과 반지름을 대응한다.", "괄호 안 부호가 중심 좌표와 반대임을 확인한다.", "우변은 반지름의 제곱으로 들어가는지 최종 점검한다."], terms: "원", std: STD_01_04 };
      }
      if (mode === 2) {
        const a = riSafe(-4, 4), b = riSafe(-4, 4), r2 = riSafe(4, 25);
        const q = `원 $${circleEq(a, b, r2)}$의 중심을 고르시오.`;
        const ans = `$(${a},${b})$`;
        const ch = makeWrongChoices(ans, [`$(${-a},${b})$`, `$(${a},${-b})$`, `$(${-a},${-b})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${a},${b}`, sol: "표준형에서 중심은 $(a,b)$이다.", hints: ["표준형 $(x-a)^2+(y-b)^2=r^2$을 기준으로 읽는다.", "괄호 안 부호를 바꿔 중심 좌표를 복원한다.", "$x$와 $y$ 항을 각각 따로 읽어 좌표를 완성한다."], terms: "원의 중심", std: STD_01_04 };
      }
      const a = riSafe(-3, 3), b = riSafe(-3, 3), r = riSafe(2, 5);
      const q = `원 $${circleEq(a, b, r * r)}$의 반지름을 구하시오.`;
      const ans = `$${r}$`;
      const ch = makeWrongChoices(ans, [`$${r * r}$`, `$${r + 1}$`, `$${Math.max(1, r - 1)}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${r}`, sol: `우변이 $r^2$이므로 반지름은 $\\sqrt{${r * r}}=${r}$이다.`, hints: ["원의 표준형 우변은 반지름의 제곱이다.", "우변 수의 제곱근을 취해 반지름을 구한다.", "길이는 양수만 취한다."], terms: "반지름", std: STD_01_04 };
    },
    "01_05": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const r = riSafe(2, 6);
        const rel = riSafe(0, 2); // 0:2점, 1:접, 2:불만남
        const d = rel === 0 ? r - 1 : (rel === 1 ? r : r + 1);
        const q = `원의 반지름이 $${r}$, 중심에서 직선까지의 거리가 $${d}$일 때 위치 관계를 고르시오.`;
        const ans = rel === 0 ? "두 점에서 만난다" : (rel === 1 ? "한 점에서 만난다(접한다)" : "만나지 않는다");
        const choices = ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "직선이 원의 중심을 지난다", "항상 교점이 2개다"];
        const ci = choices.indexOf(ans);
        return { type: ["객관식"], q, choices, ci, ans: `$${ans}$`, sa: ans, sol: `$d=${d}, r=${r}$를 비교한다.`, hints: ["중심-직선 거리와 반지름 비교가 핵심이다.", "$d<r$, $d=r$, $d>r$ 각각의 교점 개수를 정리한다.", "문제 값이 어떤 경우에 해당하는지 대입해 판단한다."], terms: "위치 관계", std: STD_01_05 };
      }
      const r = riSafe(2, 6);
      const y0 = riSafe(-2, 2);
      const rel = riSafe(0, 2);
      const k = rel === 0 ? y0 + (r - 1) : (rel === 1 ? y0 + r : y0 + r + 1);
      const q = `중심이 $(0,${y0})$, 반지름이 $${r}$인 원과 직선 $y=${k}$의 위치 관계를 고르시오.`;
      const ans = rel === 0 ? "두 점에서 만난다" : (rel === 1 ? "한 점에서 만난다(접한다)" : "만나지 않는다");
      const choices = ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "원의 중심을 지난다", "항상 만나지 않는다"];
      return { type: ["객관식"], q, choices, ci: choices.indexOf(ans), ans: `$${ans}$`, sa: ans, sol: `중심에서 직선까지 거리 $|${k}-(${y0})|$와 반지름 $${r}$을 비교한다.`, hints: ["가로선 $y=k$까지의 거리는 $|k-y_0|$로 계산한다.", "계산한 거리와 반지름의 대소를 비교한다.", "비교 결과를 교점 개수와 연결해 선택한다."], terms: "원과 직선의 위치 관계", std: STD_01_05 };
    },
    "01_06": function () {
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const a = riSafe(-4, 4), b = riSafe(-4, 4), p = riSafe(1, 4), q2 = riSafe(1, 4);
        const q = `점 $(${a},${b})$를 오른쪽으로 $${p}$, 아래로 $${q2}$만큼 평행이동한 점을 구하시오.`;
        const nx = a + p, ny = b - q2;
        const ans = `$(${nx},${ny})$`;
        const ch = makeWrongChoices(ans, [`$(${a - p},${ny})$`, `$(${nx},${b + q2})$`, `$(${a + q2},${b - p})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${nx},${ny}`, sol: `평행이동은 $(x,y)\\to(x+${p},y-${q2})$.`, hints: ["이동 방향에 따라 $x,y$좌표 증감을 구분한다.", "수평 이동량은 $x$에, 수직 이동량은 $y$에 각각 반영한다.", "부호를 포함해 좌표를 계산한 뒤 선택지와 대조한다."], terms: "평행이동", std: STD_01_06 };
      }
      if (mode === 2) {
        const c = riSafe(-2, 4), p = riSafe(1, 4);
        const q = `직선 $x=${c}$를 오른쪽으로 $${p}$만큼 평행이동한 직선을 구하시오.`;
        const ans = `$x=${c + p}$`;
        const ch = makeWrongChoices(ans, [`$x=${c - p}$`, `$y=${c + p}$`, `$x=${c + p + 1}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `x=${c + p}`, sol: `세로선은 평행이동 후에도 세로선이며 상수항만 ${p}만큼 증가한다.`, hints: ["$x=c$는 세로선이라는 점을 먼저 확인한다.", "오른쪽 이동은 $x$값을 증가시키는 변환이다.", "이동 후에도 $x=$꼴 직선인지 확인한다."], terms: "직선의 평행이동", std: STD_01_06 };
      }
      const a = riSafe(-3, 3), b = riSafe(-3, 3), p = riSafe(1, 3), q2 = riSafe(1, 3), r = riSafe(2, 4);
      const q = `원 $${circleEq(a, b, r * r)}$를 오른쪽으로 $${p}$, 위로 $${q2}$만큼 평행이동한 원의 중심을 고르시오.`;
      const ans = `$(${a + p},${b + q2})$`;
      const ch = makeWrongChoices(ans, [`$(${a - p},${b + q2})$`, `$(${a + p},${b - q2})$`, `$(${a + q2},${b + p})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${a + p},${b + q2}`, sol: `평행이동에서 중심은 이동벡터만큼 그대로 이동한다.`, hints: ["원의 평행이동은 중심을 같은 벡터만큼 이동한다.", "오른쪽 $p$, 위쪽 $q$이면 중심 좌표에 각각 더한다.", "반지름은 변하지 않음을 함께 확인한다."], terms: "원의 평행이동", std: STD_01_06 };
    },
    "01_07": function () {
      const x = riSafe(-5, 5), y = riSafe(-5, 5);
      const mode = riSafe(1, 3); // 1:원점,2:x축,3:y=x
      if (mode === 1) {
        const ans = `$(${-x},${-y})$`;
        const ch = makeWrongChoices(ans, [`$(${x},${-y})$`, `$(${-x},${y})$`, `$(${y},${x})$`]);
        return { type: ["객관식"], q: `점 $(${x},${y})$를 원점에 대하여 대칭이동한 점을 구하시오.`, choices: ch.choices, ci: ch.ci, ans, sa: `${-x},${-y}`, sol: "원점 대칭은 두 좌표의 부호를 모두 바꾼다.", hints: ["원점 대칭 규칙을 먼저 쓴다.", "$x$와 $y$의 부호를 모두 반대로 바꾼다.", "좌표 교환이 아니라 부호 반전임을 확인한다."], terms: "대칭이동", std: STD_01_07 };
      }
      if (mode === 2) {
        const ans = `$(${x},${-y})$`;
        const ch = makeWrongChoices(ans, [`$(${-x},${y})$`, `$(${-x},${-y})$`, `$(${y},${x})$`]);
        return { type: ["객관식"], q: `점 $(${x},${y})$를 $x$축에 대하여 대칭이동한 점을 구하시오.`, choices: ch.choices, ci: ch.ci, ans, sa: `${x},${-y}`, sol: "$x$축 대칭은 $y$좌표 부호만 바뀐다.", hints: ["$x$축 대칭 규칙을 확인한다.", "$x$좌표는 유지하고 $y$좌표 부호만 바꾼다.", "원점/직선 $y=x$ 대칭과 규칙이 다름을 점검한다."], terms: "대칭이동", std: STD_01_07 };
      }
      const ans = `$(${y},${x})$`;
      const ch = makeWrongChoices(ans, [`$(${-y},${-x})$`, `$(${x},${-y})$`, `$(${-x},${y})$`]);
      return { type: ["객관식"], q: `점 $(${x},${y})$를 직선 $y=x$에 대하여 대칭이동한 점을 구하시오.`, choices: ch.choices, ci: ch.ci, ans, sa: `${y},${x}`, sol: "$y=x$ 대칭은 두 좌표를 서로 바꾼다.", hints: ["직선 $y=x$ 대칭은 좌표 교환 규칙을 쓴다.", "첫째 좌표와 둘째 좌표 위치를 바꾼다.", "부호는 각 좌표가 원래 가진 부호를 그대로 따른다."], terms: "대칭이동", std: STD_01_07 };
    }
  };

  const lv2McGens = {
    "01_01": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const x1 = riSafe(-4, 2), y1 = riSafe(-4, 2);
        const x2 = x1 + 6, y2 = y1 + 9;
        const m = 2, n = 1;
        const px = (m * x2 + n * x1) / (m + n), py = (m * y2 + n * y1) / (m + n);
        const q = `두 점 $A(${x1},${y1}), B(${x2},${y2})$를 $2:1$로 내분하는 점의 좌표를 구하시오.`;
        const ans = `$(${px},${py})$`;
        const ch = makeWrongChoices(ans, [`$(${(x1 + x2) / 2},${(y1 + y2) / 2})$`, `$(${px + 1},${py})$`, `$(${px},${py - 1})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px},${py}`, sol: `내분점 공식으로 $P(${px},${py})$를 얻는다.`, hints: ["내분점은 좌표의 가중평균으로 계산한다.", "비가 $2:1$이면 좌표 계산에도 같은 비를 적용한다.", "$x$, $y$를 각각 계산해 좌표쌍으로 정리한다."], terms: "내분점", std: STD_01_01 };
      }
      const x1 = riSafe(-2, 2), y1 = riSafe(-2, 2);
      const x2 = x1 + 6, y2 = y1 + 9;
      const m = 1, n = 2;
      const px = (m * x2 - n * x1) / (m - n), py = (m * y2 - n * y1) / (m - n);
      const q = `두 점 $A(${x1},${y1}), B(${x2},${y2})$를 $1:2$로 외분하는 점의 좌표를 구하시오.`;
      const ans = `$(${px},${py})$`;
      const ch = makeWrongChoices(ans, [`$(${x2},${y2})$`, `$(${(x1 + x2) / 2},${(y1 + y2) / 2})$`, `$(${px - 2},${py - 3})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px},${py}`, sol: `외분점 공식으로 $P(${px},${py})$를 얻는다.`, hints: ["외분점 공식은 분모가 $m-n$ 형태다.", "외분점은 선분 바깥에 위치함을 함께 확인한다.", "계산 후 좌표를 기하적으로 점검한다."], terms: "외분점", std: STD_01_01 };
    },
"01_02": function () {
  const mode = riSafe(1, 2);
  if (mode === 1) {
    const m = riSafe(2, 5);
    const q = `직선 $y=${m}x-1$과 수직이고 점 $(1,2)$를 지나는 직선의 방정식을 고르시오.`;

    // b = 2 + 1/m → 분자: 2m+1, 분모: m
    const b_num = 2 * m + 1;
    const b_den = m;

    // 기약분수 처리
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const g = gcd(b_num, b_den);
    const bn = b_num / g, bd = b_den / g;

    const bStr = bd === 1 ? `${bn}` : `\\dfrac{${bn}}{${bd}}`;
    const ans = `$y=-\\dfrac{1}{${m}}x+${bStr}$`;

    // 오답: 분수 형태로 일관되게
    const w1_b_num = 2 * m - 1;
    const w1g = gcd(Math.abs(w1_b_num), m);
    const w1bn = w1_b_num / w1g, w1bd = m / w1g;
    const w1bStr = w1bd === 1 ? `${w1bn}` : `\\dfrac{${w1bn}}{${w1bd}}`;

    const w1 = `$y=${m}x+${2 - m}$`;
    const w2 = `$y=-${m}x+${2 + m}$`;
    const w3 = `$y=\\dfrac{1}{${m}}x+${w1bStr}$`;

    const ch = makeWrongChoices(ans, [w1, w2, w3]);

    return {
      type: ["객관식"],
      q,
      choices: ch.choices,
      ci: ch.ci,
      ans,
      sa: `y=-1/${m}x+${b_num}/${b_den}`,
      sol: `수직인 직선의 기울기는 $-\\dfrac{1}{${m}}$입니다. 점 $(1,2)$를 대입하면 $2=-\\dfrac{1}{${m}}+b$에서 $b=\\dfrac{${b_num}}{${b_den}}$이 됩니다.`,
      hints: [
        "수직 기울기는 음의 역수다.",
        "직선식을 $y=mx+b$로 두고 점을 대입한다.",
        "기울기와 점 조건을 동시에 만족하는 식을 선택한다."
      ],
      terms: "수직",
      std: STD_01_02
    };
  }
  // mode === 2 (기존 코드 그대로)
  const q = `두 직선 $2x-3y+5=0$, $3x+2y-4=0$의 위치 관계를 고르시오.`;
  const choices = ["서로 수직", "서로 평행", "서로 일치", "만나지 않는다", "판단할 수 없다"];
  return {
    type: ["객관식"],
    q,
    choices,
    ci: 0,
    ans: "서로 수직",
    sa: "수직",
    sol: "두 직선의 기울기 곱이 $-1$이므로 수직이다.",
    hints: [
      "직선을 $y=mx+n$ 꼴로 바꿔 기울기를 구한다.",
      "두 기울기의 곱 또는 법선벡터 내적을 계산한다.",
      "수직/평행/일치 중 어디에 해당하는지 판정한다."
    ],
    terms: "평행·수직",
    std: STD_01_02
  };
},
    "01_03": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const x0 = riSafe(-3, 3), y0 = riSafe(-3, 3), c = riSafe(-8, 8);
        const numer = Math.abs(3 * x0 + 4 * y0 + c);
        const q = `점 $(${x0},${y0})$과 직선 $3x+4y${spNZ(c)}=0$ 사이의 거리를 구하시오.`;
        const ans = `$\\dfrac{${numer}}{5}$`;
        const ch = makeWrongChoices(ans, [`$\\dfrac{${numer}}{7}$`, `$\\dfrac{${numer + 5}}{5}$`, `$${numer}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${numer}/5`, sol: `거리 공식 $d=\\dfrac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$를 적용한다.`, hints: ["공식의 분자와 분모를 분리해 계산한다.", "분자에는 점 좌표 대입 후 절댓값을 취한다.", "분모는 계수 제곱합의 제곱근이다."], terms: "점직거리", std: STD_01_03 };
      }
      const x0 = riSafe(-5, 1);
      const q = `점 $(${x0},-2)$과 직선 $x=4$ 사이의 거리를 구하시오.`;
      const d = Math.abs(4 - x0);
      const ans = `$${d}$`;
      const ch = makeWrongChoices(ans, [`$${d + 1}$`, `$${Math.max(1, d - 1)}$`, `$${Math.abs(-2 - x0)}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${d}`, sol: `세로선까지 거리는 $x$좌표 차이의 절댓값으로 구한다.`, hints: ["$x=4$는 세로선이므로 수평거리로 계산한다.", "거리 계산에는 $x$좌표 차이만 사용한다.", "절댓값을 취해 양수 길이로 정리한다."], terms: "점직거리", std: STD_01_03 };
    },
    "01_04": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const a = riSafe(-4, 4), b = riSafe(-4, 4), r = riSafe(2, 6);
        const q = `중심이 $(${a},${b})$, 반지름이 $${r}$인 원의 방정식을 구하시오.`;
        const ans = `$${circleEq(a, b, r * r)}$`;
        const ch = makeWrongChoices(ans, [`$${circleEq(-a, b, r * r)}$`, `$${circleEq(a, -b, r * r)}$`, `$${circleEq(a, b, r)}$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: circleEq(a, b, r * r), sol: `표준형에 중심과 반지름을 대입한다.`, hints: ["원의 표준형을 먼저 쓴다.", "중심 좌표의 부호를 반대로 넣는다.", "우변은 반지름의 제곱으로 계산한다."], terms: "원의 방정식", std: STD_01_04 };
      }
      const a = riSafe(-3, 3), b = riSafe(-3, 3), r = riSafe(2, 5);
      const q = `원 $${circleEq(a, b, r * r)}$의 중심과 반지름으로 옳은 것을 고르시오.`;
      const ans = `중심 $(${a},${b})$, 반지름 $${r}$`;
      const choices = [
        `중심 $(${a},${b})$, 반지름 $${r}$`,
        `중심 $(${-a},${b})$, 반지름 $${r}$`,
        `중심 $(${a},${-b})$, 반지름 $${r}$`,
        `중심 $(${a},${b})$, 반지름 $${r * r}$`,
        `중심 $(0,0)$, 반지름 $${r}$`
      ];
      return { type: ["객관식"], q, choices, ci: 0, ans, sa: `${a},${b},${r}`, sol: `표준형에서 중심과 반지름을 직접 읽는다.`, hints: ["표준형의 각 항 의미를 먼저 대응한다.", "괄호 안 부호를 반대로 바꿔 중심을 읽는다.", "반지름은 우변의 제곱근으로 읽는다."], terms: "원의 해석", std: STD_01_04 };
    },
    "01_05": function () {
      const r = riSafe(3, 6);
      const rel = riSafe(0, 2);
      const d = rel === 0 ? r - 1 : (rel === 1 ? r : r + 2);
      const q = `반지름이 $${r}$인 원에서 중심과 직선 사이 거리가 $${d}$일 때 위치 관계를 고르시오.`;
      const ans = rel === 0 ? "두 점에서 만난다" : (rel === 1 ? "한 점에서 만난다(접한다)" : "만나지 않는다");
      const choices = ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "판단할 수 없다", "항상 두 점에서 만난다"];
      return { type: ["객관식"], q, choices, ci: choices.indexOf(ans), ans, sa: ans, sol: `$d$와 $r$의 대소를 비교해 판단한다.`, hints: ["핵심은 중심-직선 거리와 반지름 비교다.", "$d<r$, $d=r$, $d>r$ 세 경우를 정리한다.", "문제의 값이 어느 경우인지 대입해 결정한다."], terms: "위치 관계", std: STD_01_05 };
    },
    "01_06": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const a = riSafe(-3, 3), b = riSafe(-3, 3), p = riSafe(1, 4), q2 = riSafe(1, 4), r = riSafe(2, 4);
        const q = `원 $${circleEq(a, b, r * r)}$를 오른쪽으로 $${p}$, 아래로 $${q2}$만큼 평행이동한 원의 중심을 고르시오.`;
        const ans = `$(${a + p},${b - q2})$`;
        const ch = makeWrongChoices(ans, [`$(${a - p},${b - q2})$`, `$(${a + p},${b + q2})$`, `$(${a + q2},${b - p})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${a + p},${b - q2}`, sol: `원의 중심을 이동벡터만큼 이동한다.`, hints: ["평행이동에서 원은 중심만 이동한다.", "오른쪽은 $x$ 증가, 아래는 $y$ 감소다.", "이동 후 반지름은 동일함을 확인한다."], terms: "원의 평행이동", std: STD_01_06 };
      }
      const c = riSafe(-2, 3), p = riSafe(2, 5);
      const q = `직선 $x=${c}$를 왼쪽으로 $${p}$만큼 평행이동한 직선을 구하시오.`;
      const ans = `$x=${c - p}$`;
      const ch = makeWrongChoices(ans, [`$x=${c + p}$`, `$y=${c - p}$`, `$x=${c - p + 1}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `x=${c - p}`, sol: `세로선은 이동 후에도 세로선이며 상수항만 변한다.`, hints: ["$x=c$는 세로선임을 먼저 확인한다.", "왼쪽 이동은 $x$값 감소를 의미한다.", "식 형태가 $x=\\text{상수}$인지 점검한다."], terms: "직선의 평행이동", std: STD_01_06 };
    },
    "01_07": function () {
      const x = riSafe(-5, 5), y = riSafe(-5, 5);
      const mode = riSafe(1, 3);
      if (mode === 1) {
        const q = `점 $(${x},${y})$를 원점 대칭한 뒤 $x$축 대칭한 점을 구하시오.`;
        const ans = `$(${-x},${y})$`;
        const ch = makeWrongChoices(ans, [`$(${x},${-y})$`, `$(${-x},${-y})$`, `$(${y},${x})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${-x},${y}`, sol: `대칭 변환을 순서대로 적용한다.`, hints: ["합성변환은 적용 순서를 지켜 계산한다.", "원점 대칭 후 $x$축 대칭을 이어서 적용한다.", "중간 좌표를 기록해 최종 좌표를 구한다."], terms: "대칭이동", std: STD_01_07 };
      }
      if (mode === 2) {
        const q = `점 $(${x},${y})$를 직선 $y=x$에 대하여 대칭이동한 점을 고르시오.`;
        const ans = `$(${y},${x})$`;
        const ch = makeWrongChoices(ans, [`$(${-y},${-x})$`, `$(${x},${-y})$`, `$(${-x},${y})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${y},${x}`, sol: `$y=x$ 대칭은 좌표를 교환한다.`, hints: ["$y=x$ 대칭 규칙은 좌표 교환이다.", "첫째·둘째 좌표를 맞바꾼다.", "부호는 원래 좌표의 부호를 따른다."], terms: "대칭이동", std: STD_01_07 };
      }
      const q = `점 $(${x},${y})$를 $y$축 대칭한 점을 구하시오.`;
      const ans = `$(${-x},${y})$`;
      const ch = makeWrongChoices(ans, [`$(${x},${-y})$`, `$(${-x},${-y})$`, `$(${y},${x})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${-x},${y}`, sol: `$y$축 대칭은 $x$좌표 부호만 바꾼다.`, hints: ["$y$축 대칭 규칙을 먼저 적용한다.", "$x$좌표만 부호를 바꾸고 $y$는 유지한다.", "다른 축 대칭 규칙과 구분해 확인한다."], terms: "대칭이동", std: STD_01_07 };
    }
  };

  const lv3McGens = {
    "01_01": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const x1 = riSafe(-4, 2), y1 = riSafe(-4, 2);
        const x2 = x1 + 6, y2 = y1 + 9;
        const m = 2, n = 1;
        const px = (m * x2 + n * x1) / (m + n), py = (m * y2 + n * y1) / (m + n);
        const q = `두 점 $A(${x1},${y1}), B(${x2},${y2})$를 $2:1$로 내분하는 점의 좌표를 구하시오.`;
        const ans = `$(${px},${py})$`;
        const ch = makeWrongChoices(ans, [`$(${(x1 + x2) / 2},${(y1 + y2) / 2})$`, `$(${px + 1},${py})$`, `$(${px},${py - 1})$`]);
        return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px},${py}`, sol: `내분점 공식으로 계산한다.`, hints: ["내분점은 좌표 가중평균으로 계산한다.", "비율을 $x$, $y$좌표에 동일 적용한다.", "계산 결과가 선분 내부인지 확인한다."], terms: "내분점", std: STD_01_01 };
      }
      const x1 = riSafe(-2, 2), y1 = riSafe(-2, 2);
      const x2 = x1 + 6, y2 = y1 + 9;
      const m = 1, n = 2;
      const px = (m * x2 - n * x1) / (m - n), py = (m * y2 - n * y1) / (m - n);
      const q = `두 점 $A(${x1},${y1}), B(${x2},${y2})$를 $1:2$로 외분하는 점의 좌표를 구하시오.`;
      const ans = `$(${px},${py})$`;
      const ch = makeWrongChoices(ans, [`$(${x2},${y2})$`, `$(${(x1 + x2) / 2},${(y1 + y2) / 2})$`, `$(${px - 2},${py - 3})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px},${py}`, sol: `외분점 공식으로 계산한다.`, hints: ["외분은 분모가 $m-n$ 형태다.", "좌표 계산에서 부호 처리를 주의한다.", "결과 점이 선분 바깥인지 점검한다."], terms: "외분점", std: STD_01_01 };
    },
    "01_02": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const q = `두 직선 $2x-3y+5=0$, $3x+2y-4=0$의 위치 관계를 고르시오.`;
        const choices = ["서로 수직", "서로 평행", "서로 일치", "만나지 않는다", "판단할 수 없다"];
        return { type: ["객관식"], q, choices, ci: 0, ans: "서로 수직", sa: "수직", sol: `기울기 조건으로 수직임을 판단한다.`, hints: ["두 직선을 기울기 형태로 변환한다.", "기울기 곱 또는 법선벡터 내적으로 수직 여부를 판단한다.", "평행·일치와 비교해 최종 분류한다."], terms: "수직", std: STD_01_02 };
      }
      const m = riSafe(2, 5);
      const q = `직선 $y=${m}x-1$과 수직이고 점 $(1,2)$를 지나는 직선의 방정식을 고르시오.`;
      const b = 2 + 1 / m;
      const ans = `$y=-\\dfrac{1}{${m}}x+${b}$`;
      const ch = makeWrongChoices(ans, [`$y=${m}x+${2 - m}$`, `$y=-${m}x+${2 + m}$`, `$y=\\dfrac{1}{${m}}x+${2 - 1 / m}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `y=-1/${m}x+${b}`, sol: `수직 기울기와 점대입으로 결정한다.`, hints: ["수직 기울기는 음의 역수다.", "직선식을 세우고 점 대입으로 절편을 구한다.", "식을 정리해 보기와 대조한다."], terms: "수직", std: STD_01_02 };
    },
    "01_03": function () {
      const x0 = riSafe(-3, 3), y0 = riSafe(-3, 3), c = riSafe(-8, 8);
      const numer = Math.abs(3 * x0 + 4 * y0 + c);
      const q = `점 $(${x0},${y0})$과 직선 $3x+4y${spNZ(c)}=0$ 사이의 거리를 구하시오.`;
      const ans = `$\\dfrac{${numer}}{5}$`;
      const ch = makeWrongChoices(ans, [`$\\dfrac{${numer}}{7}$`, `$\\dfrac{${numer + 5}}{5}$`, `$${numer}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${numer}/5`, sol: `점-직선 거리 공식을 적용한다.`, hints: ["거리 공식의 구조를 먼저 쓴다.", "분자 절댓값과 분모 제곱근을 분리 계산한다.", "기약분수로 정리해 보기와 비교한다."], terms: "점직거리", std: STD_01_03 };
    },
    "01_04": function () {
      const mode = riSafe(1, 2);
      if (mode === 1) {
        const q = `원 $x^2+y^2-8x+6y-11=0$의 중심과 반지름으로 옳은 것을 고르시오.`;
        const choices = ["중심 $(4,-3)$, 반지름 $6$", "중심 $(-4,3)$, 반지름 $6$", "중심 $(4,-3)$, 반지름 $36$", "중심 $(8,-6)$, 반지름 $6$", "중심 $(4,3)$, 반지름 $6$"];
        return { type: ["객관식"], q, choices, ci: 0, ans: "중심 $(4,-3)$, 반지름 $6$", sa: "(4,-3),6", sol: `완전제곱식으로 표준형을 만든 뒤 읽는다.`, hints: ["일반형을 완전제곱식으로 정리한다.", "표준형에서 중심을 읽는다.", "반지름은 우변의 제곱근으로 결정한다."], terms: "원의 방정식", std: STD_01_04 };
      }
      const a = riSafe(-4, 4), b = riSafe(-4, 4), r = riSafe(2, 6);
      const q = `중심이 $(${a},${b})$, 반지름이 $${r}$인 원의 방정식을 구하시오.`;
      const ans = `$${circleEq(a, b, r * r)}$`;
      const ch = makeWrongChoices(ans, [`$${circleEq(-a, b, r * r)}$`, `$${circleEq(a, -b, r * r)}$`, `$${circleEq(a, b, r)}$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: circleEq(a, b, r * r), sol: `표준형에 대입한다.`, hints: ["표준형을 먼저 설정한다.", "중심 좌표의 부호 반전을 적용한다.", "우변에 반지름 제곱을 넣어 완성한다."], terms: "원의 방정식", std: STD_01_04 };
    },
    "01_05": function () {
      const q = `원 $x^2+y^2=25$와 직선 $3x-4y+30=0$의 위치 관계를 고르시오.`;
      const choices = ["만나지 않는다", "한 점에서 만난다(접한다)", "두 점에서 만난다", "일치한다", "원의 중심을 지난다"];
      return { type: ["객관식"], q, choices, ci: 0, ans: "만나지 않는다", sa: "만나지 않음", sol: `중심-직선 거리와 반지름 비교로 판단한다.`, hints: ["원의 중심과 반지름을 먼저 읽는다.", "중심에서 직선까지 거리를 계산한다.", "$d$와 $r$의 대소 비교로 결론을 낸다."], terms: "위치 관계", std: STD_01_05 };
    },
    "01_06": function () {
      const a = riSafe(-3, 3), b = riSafe(-3, 3), p = riSafe(1, 4), q2 = riSafe(1, 4), r = riSafe(2, 4);
      const q = `원 $${circleEq(a, b, r * r)}$를 오른쪽으로 $${p}$, 아래로 $${q2}$만큼 평행이동한 원의 중심을 고르시오.`;
      const ans = `$(${a + p},${b - q2})$`;
      const ch = makeWrongChoices(ans, [`$(${a - p},${b - q2})$`, `$(${a + p},${b + q2})$`, `$(${a + q2},${b - p})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${a + p},${b - q2}`, sol: `중심을 이동벡터만큼 이동한다.`, hints: ["평행이동에서 중심 좌표 변화만 추적한다.", "오른쪽은 $x$ 증가, 아래는 $y$ 감소다.", "반지름 불변을 확인해 검산한다."], terms: "원의 평행이동", std: STD_01_06 };
    },
    "01_07": function () {
      const x = riSafe(-5, 5), y = riSafe(-5, 5);
      const q = `점 $(${x},${y})$를 직선 $y=x$에 대하여 대칭이동한 뒤 $y$축 대칭이동한 점을 구하시오.`;
      const ax = y, ay = x;
      const bx = -ax, by = ay;
      const ans = `$(${bx},${by})$`;
      const ch = makeWrongChoices(ans, [`$(${ax},${-ay})$`, `$(${x},${y})$`, `$(${-y},${-x})$`]);
      return { type: ["객관식"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${bx},${by}`, sol: `두 대칭 변환을 순서대로 적용한다.`, hints: ["첫 변환과 두 번째 변환을 분리해 계산한다.", "$y=x$ 대칭은 좌표 교환, $y$축 대칭은 $x$부호 반전이다.", "중간 좌표를 기록해 최종 좌표를 정한다."], terms: "합성 대칭이동", std: STD_01_07 };
    }
  };

  // --- [데이터 최종 주입] ---
  // 정적 속성 할당으로 hasType 검사 시 f() 실행을 방지
  Object.keys(smartGens).forEach(k => {
    const fn = smartGens[k];
    const dummy = fn(); // 임시 실행해서 타입 추출
    if (dummy) {
      fn._types = dummy.type;
      fn._std = dummy.std;
      fn._terms = dummy.terms;
    } else {
      // dummy가 null이면(safeguard) 기본값 할당
      fn._types = ["객관식", "단답형", "서술형"];
    }
  });

  Object.keys(basicMcGens).forEach(k => {
    const fn = basicMcGens[k];
    const dummy = fn();
    if (dummy) {
      fn._types = dummy.type;
      fn._std = dummy.std;
      fn._terms = dummy.terms;
    } else {
      fn._types = ["객관식"];
    }
  });
  Object.keys(lv2McGens).forEach(k => {
    const fn = lv2McGens[k];
    const dummy = fn();
    if (dummy) {
      fn._types = dummy.type;
      fn._std = dummy.std;
      fn._terms = dummy.terms;
    } else {
      fn._types = ["객관식"];
    }
  });
  Object.keys(lv3McGens).forEach(k => {
    const fn = lv3McGens[k];
    const dummy = fn();
    if (dummy) {
      fn._types = dummy.type;
      fn._std = dummy.std;
      fn._terms = dummy.terms;
    } else {
      fn._types = ["객관식"];
    }
  });

  const rgLv2 = Object.values(smartGens);
  const rgLv1Mc = Object.values(basicMcGens);
  const rgLv2Mc = Object.values(lv2McGens);
  const rgLv3Mc = Object.values(lv3McGens);

 _H_OX[G][U] = {
    1: lv1_OX,
    2: lv2_OX
  };

  _H_B[G][U] = {
    1: [...lv1_OX, ...lv1_MC, ...lv1_SA, ...lv1_ES],
    2: [...lv2_OX, ...lv2_MC, ...lv2_SA, ...lv2_ES],
    3: [...lv3_MC]
  };

  // 이제 hasType이 fn._types를 읽으므로 f()를 직접 부르는 실수를 하지 않음
  _H_RG[G][U] = {
    1: { 
      "OX형": rgLv2.filter(f => f._types && f._types.includes("OX형")),
      "객관식": rgLv1Mc.filter(f => f._types && f._types.includes("객관식")),
      "단답형": rgLv2.filter(f => f._types && f._types.includes("단답형")),
      "서술형": rgLv2.filter(f => f._types && f._types.includes("서술형"))
    },
    2: { 
      "OX형": rgLv2.filter(f => f._types && f._types.includes("OX형")), 
      "객관식": [...rgLv2.filter(f => f._types && f._types.includes("객관식")), ...rgLv2Mc.filter(f => f._types && f._types.includes("객관식"))], 
      "단답형": rgLv2.filter(f => f._types && f._types.includes("단답형")), 
      "서술형": rgLv2.filter(f => f._types && f._types.includes("서술형")) 
    },
    3: {
      "OX형": [],
      "객관식": rgLv3Mc.filter(f => f._types && f._types.includes("객관식")),
      "단답형": [],
      "서술형": []
    }
  };

  // 경칩 리스트 동기화
  if (_H_GU[G]) {
    const m2 = _H_GU[G].find(s => s.subject === "공통수학2");
    if (m2 && !m2.units.find(u => u.v === U)) {
      m2.units.push({ v: U, d: "평면좌표·직선·원·이동" });
    }
  }

  console.log("도형의 방정식(Lv2 확장 및 UI 버그 수정) 모듈 로드 완료");
})();
