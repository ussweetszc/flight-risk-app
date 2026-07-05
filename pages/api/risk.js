export default function handler(req, res) {
  const { text } = req.body;

  let score = 40; // 基础值

  // ===== 简化规则模型 =====

  // 台风关键词
  if (text.includes("台风")) score += 30;
  if (text.includes("巴威")) score += 25;

  // 航班号规则（模拟）
  if (text.includes("ZH")) score += 10;
  if (text.includes("CZ")) score += 15;

  // 机场规则
  if (text.includes("深圳")) score += 20;
  if (text.includes("广州")) score += 18;

  // 风险等级
  let level = "低";
  if (score > 50) level = "中";
  if (score > 70) level = "高";
  if (score > 85) level = "极高";

  res.json({
    score,
    level,
    delay2h: Math.min(score, 90),
    delay4h: Math.max(score - 30, 5),
    note: "基于天气+台风+机场运行规则模型"
  });
}
