

var data= (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo:[],
  completed:[]
};


//SVG paths
var removeSVG='<svg class="fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" version="1.1" width="26" height="26"> <g id="surface1"> <path class="fill" style=" " d="M 11 -0.03125 C 10.164063 -0.03125 9.34375 0.132813 8.75 0.71875 C 8.15625 1.304688 7.96875 2.136719 7.96875 3 L 4 3 C 3.449219 3 3 3.449219 3 4 L 2 4 L 2 6 L 24 6 L 24 4 L 23 4 C 23 3.449219 22.550781 3 22 3 L 18.03125 3 C 18.03125 2.136719 17.84375 1.304688 17.25 0.71875 C 16.65625 0.132813 15.835938 -0.03125 15 -0.03125 Z M 11 2.03125 L 15 2.03125 C 15.546875 2.03125 15.71875 2.160156 15.78125 2.21875 C 15.84375 2.277344 15.96875 2.441406 15.96875 3 L 10.03125 3 C 10.03125 2.441406 10.15625 2.277344 10.21875 2.21875 C 10.28125 2.160156 10.453125 2.03125 11 2.03125 Z M 4 7 L 4 23 C 4 24.652344 5.347656 26 7 26 L 19 26 C 20.652344 26 22 24.652344 22 23 L 22 7 Z M 8 10 L 10 10 L 10 22 L 8 22 Z M 12 10 L 14 10 L 14 22 L 12 22 Z M 16 10 L 18 10 L 18 22 L 16 22 Z "/> </g> </svg>';

var completeSVG=' <svg class="fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 26 26" version="1.1" width="26" height="26"> <g id="surface1"> <path class="fill" style=" " d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z "/> </g> </svg>';
renderStart();

var addbtn=document.getElementById('add');
addbtn.addEventListener('click',function(){
  var value=document.getElementById('item').value;
  if(value) {
    data.todo.push(value);
    addItemTodo(value);
    document.getElementById('item').value='';
  }
objectUpdated();
});


document.getElementById('item').addEventListener('keydown',function(e){
  var value=this.value;
  if(e.code === 'Enter' && value){
    data.todo.push(value);
    addItemTodo(value);
    document.getElementById('item').value='';
  }
})

function renderStart(){
  
  if(!data.todo.lenght && !data.completed.length) return;

  for(var i=0;i<data.todo.length;i++){
    addItemTodo(data.todo[i]);
  }

  for(var j=0;j<data.completed.length;j++){
    addItemTodo(data.completed[j],true);
  }
}

function objectUpdated(){
 localStorage.setItem('todoList',JSON.stringify(data));
}

//logic for delete function
function  removeItem(){
  var item=this.parentNode.parentNode;
  var parent=item.parentNode;
  var id=parent.id;
  var value=item.innerText;
  parent.removeChild(item);
  if(id ==='todo'){
    data.todo.splice(data.todo.indexOf(value),1);
  }else{
    data.completed.splice(data.completed.indexOf(value),1);
  }
   objectUpdated();
}

//logic for complete function
function completeItem(){
  var item=this.parentNode.parentNode; //li
  var parent=item.parentNode; //ul
  var id=parent.id;
  var value=item.innerText;
  if(id ==='todo'){
    data.todo.splice(data.todo.indexOf(value),1);
    data.completed.push(value);
  }
  else{
    data.completed.splice(data.completed.indexOf(value),1);
    data.todo.push(value);

  }

 
  var target = (id ==='todo') ? document.getElementById('completed'):document.getElementById('todo');
  parent.removeChild(item);
  target.insertBefore(item,target.childNodes[0]);
  objectUpdated();
}


//adds new item to the list
function addItemTodo(text,completed){

  var list=(completed) ? document.getElementById('completed') : document.getElementById('todo');

  var item=document.createElement('li');
  item.innerText=text;

// div with class of buttons
  var buttons=document.createElement('div');
  buttons.classList.add('buttons');

//remove button created
  var remove=document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML=removeSVG;

//functionality for delete icon
remove.addEventListener('click',removeItem);


//complete button created
  var complete=document.createElement('button');
  complete.classList.add('complete');
  complete.classList.add('divider');
  complete.innerHTML=completeSVG;

//add click event for complete the item
complete.addEventListener('click',completeItem);


  //append the remove and complete to the div element
  buttons.appendChild(remove);
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item,list.childNodes[0]);

}
