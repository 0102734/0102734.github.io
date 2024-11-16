// js/chart-loader.js

const API_URL = "https://0102734.github.io/assets/json/chart.json"; // API 엔드포인트

async function loadCharts() {
  try {
    const response = await fetch(API_URL); // API 호출
    const data = await response.json(); // JSON 데이터 파싱

    const chartsContainer = document.getElementById("charts"); // 차트를 렌더링할 컨테이너
    data.charts.forEach((chartConfig, index) => {
      // 각 차트를 렌더링할 개별 컨테이너 생성
      const chartContainer = document.createElement("div");
      chartContainer.id = `chart-${index}`; // 각 차트에 고유 ID 할당
      chartContainer.className = "chart-container";
      chartsContainer.appendChild(chartContainer);

      // 차트 유형에 따라 적절한 생성 함수 호출
      if (chartConfig.type === "bar") {
        createBarChart(chartContainer.id, chartConfig); // Bar 차트 생성
      } else if (chartConfig.type === "line") {
        createLineChart(chartContainer.id, chartConfig); // Line 차트 생성
      } else {
        console.error(`Unsupported chart type: ${chartConfig.type}`); // 지원되지 않는 차트 유형
      }
    });
  } catch (error) {
    console.error("Error loading charts:", error); // API 호출 오류 핸들링
  }
}

// 초기화
loadCharts();
