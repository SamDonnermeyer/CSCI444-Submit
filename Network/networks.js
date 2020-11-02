////////// Creating Network Graph ///////////
// Functions for Embedding Flourish Graphs //

// Return the Network 
function displayNetwork(network) {
  console.debug("RAN")
  var network_list = ["https://flo.uri.sh/visualisation/4205685/embed?auto=1", 
                      "https://flo.uri.sh/visualisation/4205247/embed?auto=1",
                      "https://flo.uri.sh/visualisation/4205674/embed?auto=1",
                      "https://flo.uri.sh/visualisation/4205681/embed?auto=1"                    
                     ];
  var network_names = ["Entire Trilogy", 
                       "Fellowship of the Ring", 
                       "Two Towers", 
                       "Return of the King"
                      ];

  // Update the iframe with the flousih visual for selected novel 
  document.getElementById("i_net").src = network_list[network];

  // Change the novel designator 
  changeText(network_names[network]);
}


// Change Novel Designator // 
function changeText(value) {
  // Select the text 
  var text = d3.select("#novel_designator");

  text.text( function() {
    return value
  });

}



