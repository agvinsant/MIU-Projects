$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#choreForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(this.key);
		}
	});
    
    	
    function a(x) {
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Function to find value of radio buttons
    var getSelectedRadio= function() {
        var radios = document.forms[0].urgency;
        for(var i=0; i<radios.length; i++) {
            if(radios[i].checked) {
                urgencyValue = radios[i].value;
            }
        }
    }
    
    var storeData = function(key){
	if(!key) {
		    var id = Math.floor(Math.random()*100000001);
	    }else{
		    //Set the id to the existing key that is being edited so that it will save over the data.
		    //The key is the same key that's been passed along from the editSubmit event handler.
		    //to the validate function, and then passed here, into the storeData function.
		    id = key;
	    }
	    
	    //Gathering all form values, storing into an object
	    // Object contains array with the form label and input value
	    getSelectedRadio();
	    var item= {};
		item.choretype = ["Chore Type:", a('choretype').value];		//Change these to fit new form tags and id's
		item.chorename = ["Chore Name:", a('chorename').value];
		item.finishby  = ["Finish By:", a("finishby").value];
		item.urgency   = ["Is this chore Urgent?:", urgencyValue];
		item.difficulty= ["Difficulty:", a('difficulty').value];
		item.recurring = ["Is this a recurring chore?:", a('recurring').value];
		item.chorenotes= ["Chore Notes:", a('chorenotes').value];
	    
	    // Save data to local storage, use Stringify to convert object to string
	    localStorage.setItem(id, JSON.stringify(item));
	    alert("Chore Saved!");			// Change to fit form type
    }; 
    
    var getData = function(){
	    
	    if(localStorage.length === 0) {
		alert('There are no chores at this time so default data was added.');		//change to fit form type
		autoFillData(); //delete this for working model. uncomment toggleControls function above.
	    }
	    
	    var makeDiv = a('data');
	    var makeList = document.createElement('ul');
	    makeList.setAttribute("class", "choreList");
            //change 'choreList' to fit new HTML
	    makeDiv.appendChild(makeList);
	    for (var i=0, len=localStorage.length; i<len; i++) {
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeli.setAttribute("class", "eachChore");	//Change 'eachChore'to fit form type ie eachContact, etc.
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		
		//Convert the string from local storage to an object
		var object = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		getImage(object.choretype[1], makeSubList);
		for(var n in object) {
		    var makeSubli = document.createElement('li');
		    makeSubList.appendChild(makeSubli);
		    var optSubText = object[n][0] + " " +object[n][1];
		    makeSubli.innerHTML = optSubText;
		    makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	    }
    };
    
    var autoFillData = function(){  //delete this function in working model
	for(var n in json){
		var id = Math.floor(Math.random()*100000001);
		localStorage.setItem(id,JSON.stringify(json[n]));
	}
    }
    
    var deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this chore?"); 	//Change to fit form type
	    if(ask){
		    localStorage.removeItem(this.key);
		    window.location.reload();
	    }else{
		    alert("Chore was not deleted!");	//change to fit form type
		    window.location.reload();
		    return false;
	    }			
    };
					    
    var clearLocal = function(){
	if(localStorage.length === 0) {
		    alert('There is no data to clear.');
	    } else {
		    localStorage.clear();
		    alert('All chores are deleted.');
		    window.location.reload();
		    return false;
	    }
    };
    
    var makeItemLinks = function(key, linksLi) {
	    //add edit single item link
	    var editLink = document.createElement('a');
	    editLink.href = '#additem';
	    editLink.key = key;
	    var editText = "Edit Chore";		//Change to fit form type ie Edit Contact
	    editLink.setAttribute("class", "editLink");
	    editLink.addEventListener('click', editItem);
	    editLink.innerHTML = editText;
	    linksLi.appendChild(editLink);
	    
	    //add line break
	    //var breakTag = document.createElement('br');
	    //linksLi.appendChild(breakTag);
	    
	    // delete Link
	    var deleteLink = document.createElement('a');
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    var deleteText = "Delete Chore";		//Change to fit form type
	    deleteLink.setAttribute("class", "deleteLink");
	    deleteLink.addEventListener('click', deleteItem);
	    deleteLink.innerHTML = deleteText;
	    linksLi.appendChild(deleteLink);
	    
	}
	
    var editItem = function() {
	    // Getting data from local storage
	    var value = localStorage.getItem(this.key);
	    var item = JSON.parse(value);
	    
	    // populating the form with data from local storage
	    a('choretype').value = item.choretype[1];		//change id's to fit html and form type
	    a('chorename').value = item.chorename[1];		//change id's to fit html and form type
	    a('finishby').value = item.finishby[1];			//change id's to fit html and form type
	    var radios = document.forms[0].urgency;
	    for(var i=0; i<radios.length; i++) {
		    if(radios[i].value == "Yes" && item.urgency[1] == "Yes") {		//Change id tags to fit html
			    radios[i].setAttribute("checked", "checked");
		    }else if(radios[i].value === "No" && item.urgency[1] == "No") {
			    radios[i].setAttribute("checked", "checked");
		    }
	    }
	    
	    a('difficulty').value = item.difficulty[1];		//Change to fit html and form type
	    a('chorenotes').value = item.chorenotes[1];
	    
	    //remove the initial listener from the input submitButton
	    submitButton.removeEventListener("click", storeData);
	    //change submitButton value to Edit button
	    a('submitButton').value = "Edit Chore";		//change to fit form type
	    var editSubmit = a('submitButton');
	    // save key value established in this function as a property of the editSubmit event
	    // so we can use that value when we save the data we edited.
	    editSubmit.addEventListener("click", storeData);
	    editSubmit.key = this.key;
	}
	
	//Get image for catagory being displayed
    var getImage = function(typeName, makeSubList) {
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImage = document.createElement('img');
	var setSrc = newImage.setAttribute("src","images/" + typeName + ".gif");
	imageLi.appendChild(newImage);
	
    }
	
	
    
    
	
    var displayButton = a('displayButton');
    displayButton.addEventListener("click", getData);
    
    var clearButton = a('clearButton');
    clearButton.addEventListener("click", clearLocal);
    
    var submitButton = a('submitButton');
    submitButton.addEventListener("click", storeData);
});

$('#displayLink').on('pageinit', function(){
	//code needed for home page goes here
});

$('#construction').on('pageinit', function(){
	//code needed for home page goes here
});

$('#about').on('pageinit', function(){
	//code needed for home page goes here
});	
    

//The functions below can go inside or outside the pageinit function for the page in which it is needed.
