window.addEventListener("DOMContentLoaded", function() {

// getElementById Function
    function a(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    

//Search Page Functions
    var search = a('searchButton');
    
    var getSearch = function() {
	var type = a('choretype').value;
	var term = a('search').value;
	
	//Search by Type or Category Only
	if(type != "Select Chore Type" && term === ""){
		for(i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var object = JSON.parse(value);
			if(type === object.choretype[1]){
				for (n in object){
					console.log(object[n][1]);	
				}
			}
		}
	}
	
	//Search by Term Only
	if(term != "" && type === "Select Chore Type"){
	    for(i=0, j=localStorage.length; i<j; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var object = JSON.parse(value);
		for(n in object){
		    if(term === object[n][1]){
			for(q in object){
			    console.log(object[q][1]);
			}
		    }
		}
	    }
	}
	//Search by Both Type AND Term
	if(term != "" && type !== "Select Chore Type"){
	    for(i=0, j= localStorage.length; i<j; i++){
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var object = JSON.parse(value);
		for(n in object){
		    if(term === object[n][1] && type === object.choretype[1]){
			for(q in object){
			    console.log(object[q][1]);
			}
		    }
		}
	    }
	}
    };
    search.addEventListener("click", getSearch);
    
});