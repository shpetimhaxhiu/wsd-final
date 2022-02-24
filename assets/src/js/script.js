$(document).ready(() => {
  NProgress.start();
  $('#fader').fadeIn();
  NProgress.inc();
  NProgress.done();

  $('a:not(.tabs-class)').click(function (e) {
    NProgress.start();
    e.preventDefault();
    newLocation = this.href;
    $('#fader').fadeOut(400, newpage);
  });

  function newpage() {
    window.location = newLocation;
  }

  $(() => {
    $('[data-toggle="popover"]').popover();
  });

  $('#services-table').DataTable({
    columnDefs: [
      { width: '45%', targets: [0] },
      { width: '15%', targets: [2] },
      { width: '10%', targets: [3] },
      { width: '12%', targets: [4] },
    ],
  });

  $('.group-table').DataTable({});

  $('#services-table-home').DataTable({
    pageLength: 5,
  });

  const data = {
    labels: ['Not implemented', 'Implemented', 'Forbidden', 'No Web Hosts'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [2, 5, 6, 8],
        backgroundColor: ['#e74c3c', '#18bc9c', '#95a5a6', '#3498db'],
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  };

  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, config);

  ajaxChart(myChart, 'api/services/counted');
  
  function ajaxChart(chart, url, data) {
    var data = data || {};

    $.getJSON(url, data).done((response) => {
      chart.data.datasets[0].data = Object.values(response); 
      chart.update(); 
    });
  }
});
