const ctx = document.getElementById('lineChart').getContext('2d');

const colors = ['#11f8f9', '#f400e6', '#ad58ff', '#6eb4fe'];

function generateData(length) {
  let data = [];
  let y = Math.random() * 50 + 20;
  for (let i = 0; i < length; i++) {
    y += Math.sin(i / 2) * (Math.random() * 10 - 5);
    data.push(parseFloat(y.toFixed(2)));
  }
  return data;
}

const labels = Array.from({ length: 20 }, (_, i) => `T${i}`);

const datasets = colors.map((color, i) => ({
  label: `Series ${i + 1}`,
  data: generateData(labels.length),
  borderColor: color,
  backgroundColor: color,
  tension: 0.4,
  borderWidth: 2,
  fill: false,
  pointRadius: 0
}));

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: datasets
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: {
          color: '#444',
          borderDash: [5, 5]
        },
        ticks: {
          color: '#ccc'
        }
      },
      y: {
        grid: {
          color: '#444',
          borderDash: [5, 5]
        },
        ticks: {
          color: '#ccc'
        }
      }
    }
  }
});

// Scroll event from parent
window.addEventListener('message', (event) => {
  if (event.data === 'scroll-update') {
    chart.data.datasets.forEach(ds => {
      ds.data = generateData(labels.length);
    });
    chart.update();
  }
});
