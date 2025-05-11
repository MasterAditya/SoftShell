import { useEffect, useRef } from 'react'
import { Chart } from 'chart.js/auto'

export function LineChart({ data, xKey, yKey, color = '#3B82F6', height = 400 }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext('2d')

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => item[xKey]),
        datasets: [
          {
            label: yKey.charAt(0).toUpperCase() + yKey.slice(1),
            data: data.map(item => item[yKey]),
            borderColor: color,
            backgroundColor: color + '20',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: color,
            pointBorderColor: 'white',
            pointBorderWidth: 2,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#1F2937',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: '#374151',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (yKey === 'amount') {
                  label += '$' + context.parsed.y.toLocaleString()
                } else {
                  label += context.parsed.y.toLocaleString()
                }
                return label
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#6B7280',
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#E5E7EB',
            },
            ticks: {
              color: '#6B7280',
              callback: function(value) {
                if (yKey === 'amount') {
                  return '$' + value.toLocaleString()
                }
                return value.toLocaleString()
              },
            },
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, xKey, yKey, color])

  return (
    <div style={{ height }}>
      <canvas ref={chartRef} />
    </div>
  )
}
