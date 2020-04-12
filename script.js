$(document).ready(function(){
    $('#submit').click(function(e){       
        let searchValue_1 = $('#search_1').val();
        let searchValue_2 = $('#search_2').val();
        let searchValue_3 = $('#search_3').val();
        let searchValue_4 = $('#search_4').val();
        let searchValue_5 = $('#search_5').val(); 
        let startDateValue = $('#startDate').val();
        let endDateValue = $('#endDate').val();
        var datesArr = [];
        const stocks = [{name: searchValue_1},{name: searchValue_2},{name: searchValue_3},{name: searchValue_4},{name: searchValue_5}];
        var userInputs = [searchValue_1, searchValue_2, searchValue_3, searchValue_4, searchValue_5];
        var ajaxRequests = [];
        userInputs.forEach(ele => {
            if(ele.trim() !== ""){
                var apiKey = "SJI75DMKMCZVO9E4";
                var queryURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" + ele + "&apikey=" + apiKey;
                ajaxRequests.push(
                    () => {
                        return  $.ajax({
                            url: queryURL,
                            method: "GET",
                            dataType: 'json', 
                            
                        });
                    }
                ) 
            }   
        }) 
        
        $.when(...ajaxRequests.map(request => request())).done(function(...responses){ 
            console.log(responses);
            if(responses.length > 3){
                for(var i = 0; i < responses.length; i++){
                    stocks[i].price = [];
                    stocks[i].volume = []; 
                    for(key in responses[i][0]['Time Series (Daily)']){
                        if (moment(key).isBetween(startDateValue, endDateValue) || moment(key).isSame(startDateValue) || moment(key).isSame(endDateValue)){
                            if (datesArr.includes(key)){
                                datesArr = datesArr;
                            } else {
                                datesArr.unshift(key); 
                            }                 
                            stocks[i].price.unshift(parseFloat(responses[i][0]['Time Series (Daily)'][key]['5. adjusted close']));
                            stocks[i].volume.unshift(parseFloat(responses[i][0]['Time Series (Daily)'][key]['6. volume']));
                        }
                    };
                }
            } else {
                for(var i = 0; i < responses.length; i++){
                    stocks[i].price = [];
                    stocks[i].volume = []; 
                    for(key in responses[0]['Time Series (Daily)']){
                        if (moment(key).isBetween(startDateValue, endDateValue) || moment(key).isSame(startDateValue) || moment(key).isSame(endDateValue)){
                            if (datesArr.includes(key)){
                                datesArr = datesArr;
                            } else {
                                datesArr.unshift(key); 
                            }                 
                            stocks[i].price.unshift(parseFloat(responses[0]['Time Series (Daily)'][key]['5. adjusted close']));
                            stocks[i].volume.unshift(parseFloat(responses[0]['Time Series (Daily)'][key]['6. volume']));
                        }
                    };
                }
            }

      
            var ctx = document.getElementById("myChart1").getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: datesArr,
                  datasets: [{
                      label: searchValue_1, // Name the series
                      lineTension: 0,
                      data: stocks[0].price, // Specify the data values array
                      fill: false,
                      borderColor: '#ED7188', // Add custom color border (Line)
                      backgroundColor: '#ED7188', // Add custom color background (Points and Fill)
                      borderWidth: 1 // Specify bar border width
                      },
                      {
                      label: searchValue_2, 
                      lineTension: 0,
                      data: stocks[1].price, 
                      fill: false,
                      borderColor: '#F6E394', 
                      backgroundColor: '#F6E394', 
                      borderWidth: 1 
                      },
                      {
                      label: searchValue_3, 
                      lineTension: 0,
                      data: stocks[2].price, 
                      fill: false,
                      borderColor: '#90B8D6', 
                      backgroundColor: '#90B8D6', 
                      borderWidth: 1
                      },
                      {
                      label: searchValue_4, 
                      lineTension: 0,
                      data: stocks[3].price, 
                      fill: false,
                      borderColor: '#B6DEA0', 
                      backgroundColor: '#B6DEA0', 
                      borderWidth: 1 
                      },
                      {
                      label: searchValue_5, 
                      lineTension: 0,
                      data: stocks[4].price, 
                      fill: false,
                      borderColor: '#F6B982', 
                      backgroundColor: '#F6B982', 
                      borderWidth: 1 
                      }
                  ]},
                  options: {
                  responsive: true, 
                  maintainAspectRatio: false, 
                  title: {
                      display: true,
                      text: 'Historical Stock Price'
                      },
                  scales: {
                      xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }],
                      yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Stock Price ($)'
                              } 
                        }]
                    }
                  }
            });

            var ctx = document.getElementById("myChart2").getContext('2d');
            var myChart = new Chart(ctx, {
              type: 'line',
              data: {
                  labels: datesArr,
                  datasets: [{
                      label: searchValue_1, // Name the series
                      lineTension: 0,
                      data: stocks[0].volume, // Specify the data values array
                      fill: false,
                      borderColor: '#ED7188', // Add custom color border (Line)
                      backgroundColor: '#ED7188', // Add custom color background (Points and Fill)
                      borderWidth: 1 // Specify bar border width
                      },
                      {
                      label: searchValue_2, 
                      lineTension: 0,
                      data: stocks[1].volume, 
                      fill: false,
                      borderColor: '#F6E394', 
                      backgroundColor: '#F6E394', 
                      borderWidth: 1 
                      },
                      {
                      label: searchValue_3, 
                      lineTension: 0,
                      data: stocks[2].volume, 
                      fill: false,
                      borderColor: '#90B8D6', 
                      backgroundColor: '#90B8D6', 
                      borderWidth: 1
                      },
                      {
                      label: searchValue_4, 
                      lineTension: 0,
                      data: stocks[3].volume, 
                      fill: false,
                      borderColor: '#B6DEA0', 
                      backgroundColor: '#B6DEA0', 
                      borderWidth: 1 
                      },
                      {
                      label: searchValue_5, 
                      lineTension: 0,
                      data: stocks[4].volume, 
                      fill: false,
                      borderColor: '#F6B982', 
                      backgroundColor: '#F6B982', 
                      borderWidth: 1 
                      }
                  ]},
                  options: {
                  responsive: true, 
                  maintainAspectRatio: false, 
                  title: {
                      display: true,
                      text: 'Historical Trading Volume' 
                      },
                  scales: {
                      xAxes: [{
                            gridLines: {
                                display: false,
                            }
                        }],
                      yAxes: [{
                            gridLines: {
                                display: false,
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Volume'
                              } 
                        }]
                    }
                  }
            });


        });

    });
});