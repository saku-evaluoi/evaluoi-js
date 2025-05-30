const ctx = document.getElementById('barChart').getContext('2d');

// Allowed colors
const colors = ['#f400e6', '#ad58ff', '#6eb4fe', '#11f8f9'];

// Initialize with random data
let chartData = Array.from({ length: 6 }, () => getRandomValue());

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    datasets: [{
      label: 'Scroll Bars',
      data: chartData,
      backgroundColor: chartData.map(getColor),
      borderRadius: 5,
      borderSkipped: false,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { color: '#555' }
      },
      y: {
        grid: { color: '#444' },
        ticks: {
          color: '#ccc'
        }
      }
    }
  }
});

// Generate random value between -100 and 100
function getRandomValue() {
  return Math.floor(Math.random() * 200) - 100;
}

// Pick a color based on value
function getColor(value) {
  return value >= 0 ? colors[Math.floor(Math.random() * 2)] : colors[Math.floor(Math.random() * 2) + 2];
}

// Update chart on scroll
window.addEventListener('scroll', () => {
  chart.data.datasets[0].data = Array.from({ length: 6 }, () => getRandomValue());
  chart.data.datasets[0].backgroundColor = chart.data.datasets[0].data.map(getColor);
  chart.update();
});
