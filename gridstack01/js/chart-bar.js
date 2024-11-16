// js/chart-bar.js

function createBarChart(containerId, chartConfig) {
  // AmCharts 5 라이브러리 설정
  am5.ready(function () {
    // 루트 생성
    let root = am5.Root.new(containerId);

    root.setThemes([am5themes_Animated.new(root)]);

    // 차트 생성
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // X축 (CategoryAxis)
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(chartConfig.data);

    // Y축 (ValueAxis)
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Series 생성
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: chartConfig.options?.title || "Bar Chart",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    series.data.setAll(chartConfig.data);

    // 차트 제목 추가
    chart.children.unshift(
      am5.Label.new(root, {
        text: chartConfig.options?.title || "Bar Chart",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        x: am5.p50,
        centerX: am5.p50,
      })
    );
  });
}
