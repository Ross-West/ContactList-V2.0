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
    db.usercollection.insert({
    "name" : name, 
    "tele" : tele, 
    "notes" : notes })
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("usercollection");
        }
    });
});

//function to output the list of contacts in the database
//RW: Why is this one called UpdateContactList and not OutputContactList?!
//And worse is that I don't even know where this is called

function updateContactList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the contact list holder ul
    var listholder = document.getElementById("contacts");

    //clear contact list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li class='ui-btn ui-icon-user ui-btn-icon-left' id='"+row.id + "'><a href='#details' >"+row.name+"</a></li>";

    /* GET Userlist page. */
    router.get('/userlist', function(req, res) {
        var db = req.db;
        var collection = db.get('usercollection');
        collection.find({},{},function(e,docs){
            res.render('userlist', {
                "userlist" : docs
            });
        });
    });
       
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
//RW: MR. CZINNER, WHY THE HELL DOES THE FUCTION THAT GETS THE LIST CALLED OUTPUT CONTACTS?!?!
//This is what was delaying me for so long, I assumed all comments were accurate!
function outputContacts() {

    //check to ensure the user collection has been created
    var collection = db.get('usercollection');

    if (collection) {
            db.usercollection.find()
    } else {
        alert("db not found, something has gone terribly wrong.");
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

    //There should be more security but we don't have time for that
    // Set our collection
    var collection = db.get('usercollection');

            mydb.transaction(function (t) {
                db.usercollection.insert({
                    "oldId" : oldId
                    "name" : name, 
                    "tele" : tele, 
                    "notes" : notes })
                outputContacts();
            });
            clearEdit();
            if(oldId!="-1"){
                deleteContact(parseInt.oldId);
            }
}

function deleteContact(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        mydb.transaction(function (t) {
            db.collection.remove( {"oldID" : id} )
        });
    } else {
        alert("db not found, something exploded.");
    }
}

outputContacts();