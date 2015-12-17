function updateItemStatus() {
	var cbId = this.id.replace("cb_", "");
	var itemText = document.getElementById("item_" + cbId);
	if (this.checked){
		itemText.className = "checked";
		} else {
		itemText.className = "";
	}
	
}

function removeItem(){
	var btnId = this.id.replace("btn_", "");
	var elem = document.getElementById("li_" + btnId);
	elem.parentNode.removeChild(elem);
	for(var i = 0; i < todoArray.length; i++) {
		var obj = todoArray[i];
		
		if(obj.id == btnId) {
			todoArray.splice(i, 1);
			break;
		}
	}
}

function renameItem() {
	var spanId = this.id.replace("item_", "");
	var newText = prompt("What should this todo be renamed to?");
	
	if (!newText || newText == "" || newText == " "){
		return false;
	}
	this.innerText = newText;
	for(var i = 0; i < todoArray.length; i++) {
		var obj = todoArray[i];
		
		if(obj.id == spanId) {
			obj.todotext = newText;
			break;
		}
	}
}


function makeUL(array) {
	updateLi();
    // Create the list element:
	var element = document.getElementById("todos");
	element.parentNode.removeChild(element);
    var list = document.createElement('ul');
	list.id = "todos";
	
    for(var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement("li");
		item.id = "li_" + array[i].id;
		
        // Set its contents:
		var btnDel = document.createElement("button");
		btnDel.id = "btn_" + array[i].id;
		btnDel.onclick = removeItem;
		
		var checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.id = "cb_" + array[i].id;
		checkBox.onclick = updateItemStatus;
		
		var span = document.createElement("span");
		span.id = "item_" + array[i].id;
		span.innerText = array[i].todotext;
		span.ondblclick = renameItem;
		
		var dropdown = document.createElement("select");
		for (var n = 1; n < 6; n++) {
			var option = document.createElement("option");
			option.value = n;
			option.text = n;
			dropdown.appendChild(option);
		}
		dropdown.id = "drd_" + array[i].id;
		dropdown.value = array[i].drd;
		
		var datebox = document.createElement("input");
		datebox.type = "date";
		datebox.id = "dtbox_" + array[i].id;
		datebox.className = "datebox";
		datebox.value = array[i].datebox;
		
		item.appendChild(btnDel);
		item.appendChild(checkBox);
        item.appendChild(span);
		item.appendChild(dropdown);
		item.appendChild(datebox);
		
        // Add it to the list:
        list.appendChild(item);
	}
	
    // Finally, return the constructed list:
    return list;
}

function addNewItem(list, itemText){
	if(itemText != ""){
		
		var listItem = document.createElement("li");
		listItem.id = "li_" + totalItems;
		
		var btnDel = document.createElement("button");
		btnDel.id = "btn_" + totalItems;
		btnDel.onclick = removeItem;
		
		var checkBox = document.createElement("input");
		checkBox.type = "checkbox";
		checkBox.id = "cb_" + totalItems;
		checkBox.onclick = updateItemStatus;
		
		var span = document.createElement("span");
		span.id = "item_" + totalItems;
		span.innerText = itemText;
		span.ondblclick = renameItem;
		
		var dropdown = document.createElement("select");
		for (var i = 1; i < 6; i++) {
			var option = document.createElement("option");
			option.value = i;
			option.text = i;
			dropdown.appendChild(option);
		}
		dropdown.id = "drd_" + totalItems;
		dropdown.options[dropdown.selectedIndex].value = 1;
		
		var datebox = document.createElement("input");
		datebox.type = "date";
		datebox.id = "dtbox_" + totalItems;
		datebox.className = "datebox";
		
		listItem.appendChild(btnDel);
		listItem.appendChild(checkBox);
		listItem.appendChild(span);
		listItem.appendChild(dropdown);
		listItem.appendChild(datebox);
		
		list.appendChild(listItem);
		document.getElementById("new-todo").value = "";
		
		var todo = {id: totalItems , todotext: itemText , drd : 1 , datebox: null};
		todoArray.push(todo);
		
		totalItems++;
	}
}

var todoArray = [];
var totalItems = 1;
var inItemText = document.getElementById("new-todo");
inItemText.focus();

var btnNew = document.getElementById("btnAdd");
btnNew.onclick = function(){
	var itemText = inItemText.value;
	addNewItem(document.getElementById("todos"), itemText);
}


inItemText.onkeyup = function(event){
	if(event.which == 13){
		var itemText = inItemText.value;
		addNewItem(document.getElementById("todos"), itemText);
	}
}

function updateLi() {
	for (var n in todoArray) {
		var e = document.getElementById("drd_" + todoArray[n].id);
		var b = document.getElementById("dtbox_" + todoArray[n].id);
		var drdValue = e.options[e.selectedIndex].value;
		todoArray[n].drd = drdValue;
		todoArray[n].datebox = b.value; 
	}
}

var btnSort = document.getElementById("btnSort");
btnSort.onclick = function sortDrd() {
	updateLi();
	function compare(a,b) {
		if (a.drd < b.drd){
			return 1;
		}
		if (a.drd > b.drd){
			return -1;
		}
		return 0;
	}
	
	todoArray.sort(compare);
	document.getElementById('foo').appendChild(makeUL(todoArray));
}

var btnSort2 = document.getElementById("btnSort2");
btnSort2.onclick = function sortDate() {
	updateLi();
	
	todoArray.sort(function(a,b){
		if((a.datebox == null || a.datebox == "") && (b.datebox !== null && b.datebox !== "")){
			return 1;
		}
		else {
			return new Date(a.datebox) - new Date(b.datebox);
		}
	});
	
	document.getElementById('foo').appendChild(makeUL(todoArray));
}
