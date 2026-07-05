import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await fetch("/api/risk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>✈️ 航班延误预测系统</h2>

      <input
        style={{ width: "100%", padding: 10 }}
        placeholder="输入航班号 / 机场 / 台风"
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        开始分析
      </button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>📊 风险评分：{result.score}</h3>
          <p>风险等级：{result.level}</p>
          <p>2小时延误概率：{result.delay2h}%</p>
          <p>4小时延误概率：{result.delay4h}%</p>
          <p>说明：{result.note}</p>
        </div>
      )}
    </div>
  );
}
