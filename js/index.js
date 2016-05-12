/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function contact(src, tele, name, notes){
   this.src=src;
   this.name=name;
    this.tele=tele;
    this.notes=notes;
}
contacts={};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');
    }
    // Update DOM on a Received Event
    /*receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};

app.initialize();

document.addEventListener("deviceready", function(){
    document.getElementById('takePicture').addEventListener('click', onPictureClick);
    document.getElementById('takePicture').addEventListener('tap', onPictureClick);

});

function onPictureClick(){
    
    navigator.camera.getPicture(cameraCallback, cameraError, {destinationType: Camera.DestinationType.DATA_URL});
}

function cameraError(msg){
    alert(1);
}

function cameraCallback(imageData) {
   var image = $('#theImage')[0];
   image.src = "data:image/jpeg;base64," + imageData;
   //alert(imageData);
   //$('#theImage').show();

}


//Test for browser compatibility
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("contact_db", "0.1", "A Database of Cars I Like", 1024 * 1024);

    //create the cars table using SQL for the database using a transaction
    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY ASC, image TEXT, tele TEXT, name TEXT, notes TEXT)");
    });



} 

//function to output the list of cars in the database

function updateContactList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("contacts");

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li class='ui-btn ui-icon-user ui-btn-icon-left' id='"+row.id + "'><a href='#details' >"+row.name+"</a></li>";

        contacts[row.id]=new contact(row.image, row.tele, row.name, row.notes);
       
        $("#"+row.id).on("tap",function(){
            fillContact(row.id);
        }); 
    
         $(function(){
             $( "#"+row.id ).bind( "taphold", tapholdHandler );
 
                function tapholdHandler( event ){
           deleteContact(row.id);
  }
});

    }

}
$("#emptyContact").on("tap",function(){
            clearContact();
        });
function fillContact(temp){
     document.getElementById("contacthead").value=contacts[temp].name;
    document.getElementById("contactImage").src=contacts[temp].src;
    document.getElementById("contactTele").value=contacts[temp].tele;
    document.getElementById("contactName").value=contacts[temp].name;
    document.getElementById("contactNotes").value=contacts[temp].notes;

       $('#'+editContact).on("tap",function(){
            fillEdit(temp);
        }); 
}

function fillEdit(temp){
    document.getElementById("theImage").src=contacts[temp].src;
    document.getElementById("Tele").value=contacts[temp].tele;
    document.getElementById("Name").value=contacts[temp].name;
    document.getElementById("Notes").value=contacts[temp].notes;
    document.getElementById("oldId").innerHTML=""+temp;
}

function clearContact(){
    document.getElementById("contactImage").src="";
    document.getElementById("contactTele").value="";
    document.getElementById("contactName").value="";
    document.getElementById("contactNotes").value="";
    document.getElementById("contactHead").value="";
    $('#'+editContact).unbind("tap");
       
}

//function to get the list of cars from the database

function outputContacts() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM contacts ORDER BY name", [], updateContactList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}
$(document).on("pagecreate","#edit",function(){
 $("#cancel").on("tap",function(){
   clearEdit();
  }); 
});
$(document).on("pagecreate","#edit",function(){
 $("#add").on("tap",function(){
   addContact();
  }); 
});
//function to add the car to the database
function clearEdit() {
   document.getElementById("theImage").src="";
    document.getElementById("Tele").value="";
    document.getElementById("Name").value="";
    document.getElementById("Notes").value="";
    document.getElementById("oldId").innerHTML="-1";
}
 
function addContact() {
    var oldId = document.getElementById("oldId").innerHTML;
    var image = document.getElementById("theImage").src;
    var tele = document.getElementById("Tele").value;
    var name = document.getElementById("Name").value+" ";
    var notes = document.getElementById("Notes").value;

        //Test to ensure that the user has entered both a make and model
        
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO contacts (image, tele, name, notes) VALUES (?, ?, ?,?)", [image, tele, name, notes]);
                outputContacts();
            });
            clearEdit();
            if(oldId!="-1"){
                deleteContact(parseInt.oldId);
            }
        
    
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteContact(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM contacts WHERE id=?", [id], outputContacts);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputContacts();