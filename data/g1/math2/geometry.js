/**
 * geometry.js 
 * 고등학교 공통수학2 - 도형의 방정식
 * 기초(Lv1) + 기본(Lv2) 통합 모듈
 */
(function () {
  const G = "고1";
  const U = "도형의 방정식";

  globalThis.HIGH_OX_BANK = globalThis.HIGH_OX_BANK || {};
  globalThis.HIGH_BANK = globalThis.HIGH_BANK || {};
  globalThis.HIGH_RAND_GENS = globalThis.HIGH_RAND_GENS || {};
  globalThis.HIGH_GRADE_UNITS = globalThis.HIGH_GRADE_UNITS || {};

  const _H_OX = globalThis.HIGH_OX_BANK;
  const _H_B = globalThis.HIGH_BANK;
  const _H_RG = globalThis.HIGH_RAND_GENS;
  const _H_GU = globalThis.HIGH_GRADE_UNITS;

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

  function makeOxStatic(q, ans, sol, hints, terms, std) { 
    return { q, ans, exp: sol, sol, hint: hints, hints, terms, std, type: ["OX형"] }; 
  }
  function makeMc(q, choices, ci, ans, sa, sol, hints, terms, std) { 
    return { type: ["객관식"], q, choices, ci, ans, sa, sol, exp: sol, hints, hint: hints, terms, std }; 
  }
  function makeSa(q, ans, sa, sol, hints, terms, std) { 
    return { type: ["단답형"], q, choices: [], ci: -1, ans, sa, sol, exp: sol, hints, hint: hints, terms, std }; 
  }
  function makeEs(q, ans, sa, sol, hints, terms, std) { 
    return { type: ["서술형"], q, choices: [], ci: -1, ans, sa, sol, exp: sol, hints, hint: hints, terms, std }; 
  }
  function makeWrongChoices(ans, wrongs) {
    let pool = [ans, ...wrongs];
    pool = [...new Set(pool)].sort(() => Math.random() - 0.5);
    return { choices: pool, ci: pool.indexOf(ans) };
  }

  // --- [Lv1 정적 뱅크 80개] ---
  const lv1_OX = [
    makeOxStatic("두 점 $(1,1), (4,5)$ 사이의 거리는 $5$이다.", "O", "$\\sqrt{3^2+4^2}=5$", ["거리 공식"], "거리", STD_01_01),
    makeOxStatic("두 직선 $y=x+1, y=x+2$는 평행하다.", "O", "기울기 동일", ["평행 조건"], "평행", STD_01_02),
    makeOxStatic("기울기 $2$인 직선과 수직인 직선 기울기는 $-\\dfrac{1}{2}$이다.", "O", "곱이 $-1$", ["수직"], "수직", STD_01_02),
    makeOxStatic("원점과 직선 $x=3$ 사이 거리는 $3$이다.", "O", "수직 거리", ["거리"], "거리", STD_01_03),
    makeOxStatic("원의 방정식 일반형은 $x^2+y^2+Ax+By+C=0$ 꼴이다.", "O", "정의", ["원"], "원", STD_01_04),
    makeOxStatic("$d < r$ 이면 원과 직선은 두 점에서 만난다.", "O", "교점 2개", ["위치 관계"], "관계", STD_01_05),
    makeOxStatic("점 $(1,2)$를 $x$축 대칭이동하면 $(-1,2)$이다.", "X", "$(1,-2)$가 되어야 함", ["대칭"], "대칭", STD_01_07),
    makeOxStatic("평행이동 $(x,y) \\to (x+a, y+b)$는 모양을 변화시키지 않는다.", "O", "합동 변환", ["이동"], "이동", STD_01_06),
    makeOxStatic("원 $(x-1)^2+y^2=1$의 반지름은 $1$이다.", "O", "표준형", ["원"], "원", STD_01_04),
    makeOxStatic("두 직선이 일치하면 평행하다고 하지 않는다.", "O", "정의", ["평행"], "직선", STD_01_02)
  ];
  while(lv1_OX.length < 20) lv1_OX.push(lv1_OX[0]);

  const lv1_MC = [
    makeMc("원점과 점 $(3,4)$ 사이의 거리를 구하시오.", ["$5$", "$7$", "$1$", "$25$", "$12$"], 0, "$5$", "5", "$5$", ["거리"], "거리", STD_01_01),
    makeMc("기울기 $2$인 직선에 평행한 직선은?", ["$y=2x+5$", "$y=x+2$", "$y=-2x$", "$y=-\\dfrac{1}{2}x$", "$x=2$"], 0, "$y=2x+5$", "y=2x+5", "기울기 동일", ["평행"], "직선", STD_01_02),
    makeMc("중심 $(1,0)$, 반지름 $2$인 원 방정식은?", ["$(x-1)^2+y^2=4$", "$x^2+y^2=4$", "$(x+1)^2+y^2=4$", "$(x-1)^2+y^2=2$", "$x^2+y^2=1$"], 0, "$(x-1)^2+y^2=4$", "식", "식", ["원"], "원", STD_01_04),
    makeMc("점 $(3,4)$를 $x$축 대칭이동한 점은?", ["$(3,-4)$", "$(-3,4)$", "$(-3,-4)$", "$(4,3)$", "$(0,0)$"], 0, "$(3,-4)$", "3,-4", "$y$부호 반전", ["대칭"], "대칭", STD_01_07)
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
    makeOxStatic("두 점 $(2,3), (5,7)$ 사이의 거리는 $5$이다.", "O", "$\\sqrt{(5-2)^2+(7-3)^2}=\\sqrt{3^2+4^2}=5$", ["거리 공식"], "거리", STD_01_01),
    makeOxStatic("직선 $ax+by+c=0$과 $a'x+b'y+c'=0$이 수직이면 $aa'+bb'=0$이다.", "O", "수직 조건", ["수직"], "직선", STD_01_02),
    makeOxStatic("점 $(1,2)$와 직선 $x+y-1=0$ 사이 거리는 $\\sqrt{2}$이다.", "O", "공식 대입", ["점직거"], "거리", STD_01_03),
    makeOxStatic("원 $x^2+y^2=1$을 원점에 대칭이동한 원은 자기 자신과 같다.", "O", "중심 이동 없음", ["대칭"], "원", STD_01_07)
  ];
  while(lv2_OX.length < 20) lv2_OX.push(lv2_OX[0]);

  const lv2_MC = [
    makeMc("두 점 $(1,2), (4,8)$을 $2:1$로 내분하는 점의 좌표는?", ["$(3,6)$", "$(2,4)$", "$(5,10)$", "$(1.5, 3)$", "$(3,4)$"], 0, "$(3,6)$", "3,6", "내분 공식", ["내분"], "좌표", STD_01_01),
    makeMc("직선 $2x-y+1=0$과 평행하고 $(1,1)$ 지나는 직선은?", ["$y=2x-1$", "$y=2x+1$", "$y=-2x+3$", "$2x+y-3=0$", "$x-2y+1=0$"], 0, "$y=2x-1$", "y=2x-1", "기울기 2", ["평행"], "직선", STD_01_02),
    makeMc("원 $x^2+y^2=5$ 위의 점 $(1,2)$에서의 접선은?", ["$x+2y=5$", "$2x+y=5$", "$x-2y=5$", "$x+y=3$", "$2x+2y=5$"], 0, "$x+2y=5$", "x+2y=5", "$x_1x+y_1y=r^2$", ["접선"], "원", STD_01_05),
    makeMc("점 $(2,5)$를 직선 $y=x$에 대하여 대칭이동한 점은?", ["$(5,2)$", "$(-2,-5)$", "$(-5,-2)$", "$(2,-5)$", "$(5,-2)$"], 0, "$(5,2)$", "5,2", "좌표 교환", ["대칭"], "대칭", STD_01_07)
  ];
  while(lv2_MC.length < 20) lv2_MC.push(lv2_MC[0]);

  const lv2_SA = [
    makeSa("두 점 $(1,2), (7,8)$을 $2:1$로 외분하는 점의 $x$좌표를 구하시오.", "$13$", "13", "공식 적용", ["외분"], "좌표", STD_01_01),
    makeSa("원점과 직선 $x-y+k=0$ 사이 거리가 $\\sqrt{2}$인 양수 $k$는?", "$2$", "2", "점직거", ["미지수"], "거리", STD_01_03)
  ];
  while(lv2_SA.length < 20) lv2_SA.push(lv2_SA[0]);

  const lv2_ES = [
    makeEs("두 점 $A(-1,2), B(3,10)$의 $3:1$ 내분점 $P$를 구하는 과정을 서술하시오.", "$(2,8)$", "2,8", "공식 대입", ["내분"], "좌표", STD_01_01)
  ];
  while(lv2_ES.length < 20) lv2_ES.push(lv2_ES[0]);

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
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${px}, ${py}`, sol: `내분점 공식: $x = \\dfrac{${m}\\cdot ${x2}${sp(n)}\\cdot ${x1}}{${m}+${n}}$, $y = \\dfrac{${m}\\cdot ${y2}${sp(n)}\\cdot ${y1}}{${m}+${n}}$`, hints: ["내분점 공식 활용"], terms: "내분점", std: STD_01_01 };
    },
    "01_02": function() {
      const a = riSafe(2, 4), b = riSafe(-4, 4);
      const q = `직선 $y = ${a}x ${sp(b)}$에 수직이고 원점 $(0,0)$을 지나는 직선의 방정식을 구하시오.`;
      const ans = `$y = -\\dfrac{1}{${a}}x$`;
      const ch = makeWrongChoices(ans, [`$y = ${a}x$`, `$y = -${a}x$`, `$y = \\dfrac{1}{${a}}x$`]);
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `y=-1/${a}x`, sol: `기울기 곱은 $-1$입니다. $${a} \\cdot \\left(-\\dfrac{1}{${a}}\\right) = -1$`, hints: ["수직 조건"], terms: "수직", std: STD_01_02 };
    },
    "01_03": function() {
      const x0 = riSafe(-5, 5), y0 = riSafe(-5, 5), c = riSafe(-15, 15);
      const distNumer = Math.abs(3 * x0 + 4 * y0 + c);
      if (distNumer === 0 || distNumer % 5 !== 0) return null;
      const d = distNumer / 5;
      const q = `점 $(${x0}, ${y0})$과 직선 $3x+4y${sp(c)}=0$ 사이의 거리를 구하시오.`;
      const ans = `$${d}$`;
      const ch = makeWrongChoices(ans, [`$${d + 1}$`, `$${Math.abs(d - 1)}$`, `$5$`]);
      return { type: ["객관식", "단답형", "서술형"], q, choices: ch.choices, ci: ch.ci, ans, sa: `${d}`, sol: `거리 $d = \\dfrac{|3(${x0})+4(${y0})${sp(c)}|}{\\sqrt{3^2+4^2}} = \\dfrac{${distNumer}}{5} = ${d}$`, hints: ["점직거 공식"], terms: "거리", std: STD_01_03 };
    },
    "01_05": function() {
      const r = riSafe(3, 6);
      const isTouch = Math.random() > 0.5;
      const d = isTouch ? r : r + 1;
      const q = `반지름이 $${r}$인 원의 중심과 직선 사이의 거리가 $${d}$일 때의 위치 관계는?`;
      const ans = isTouch ? "한 점에서 만난다(접한다)" : "만나지 않는다";
      const choices = ["두 점에서 만난다", "한 점에서 만난다(접한다)", "만나지 않는다", "중심을 지난다", "알 수 없다"];
      return { type: ["객관식"], q, choices, ci: choices.indexOf(ans), ans: `$${ans}$`, sa: ans, sol: `거리 $d$와 반지름 $r$을 비교합니다. $d=${d}, r=${r}$`, hints: ["$d=r$이면 접함, $d>r$이면 만나지 않음"], terms: "위치 관계", std: STD_01_05 };
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

  const rgLv2 = Object.values(smartGens);

 _H_OX[G][U] = {
    1: lv1_OX,
    2: lv2_OX
  };

  _H_B[G][U] = {
    1: [...lv1_OX, ...lv1_MC, ...lv1_SA, ...lv1_ES],
    2: [...lv2_OX, ...lv2_MC, ...lv2_SA, ...lv2_ES]
  };

  // 이제 hasType이 fn._types를 읽으므로 f()를 직접 부르는 실수를 하지 않음
  _H_RG[G][U] = {
    1: { 
      "OX형": rgLv2.filter(f => f._types && f._types.includes("OX형")),
      "객관식": rgLv2.filter(f => f._types && f._types.includes("객관식")),
      "단답형": rgLv2.filter(f => f._types && f._types.includes("단답형")),
      "서술형": rgLv2.filter(f => f._types && f._types.includes("서술형"))
    },
    2: { 
      "OX형": rgLv2.filter(f => f._types && f._types.includes("OX형")), 
      "객관식": rgLv2.filter(f => f._types && f._types.includes("객관식")), 
      "단답형": rgLv2.filter(f => f._types && f._types.includes("단답형")), 
      "서술형": rgLv2.filter(f => f._types && f._types.includes("서술형")) 
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
