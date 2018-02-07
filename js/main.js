

function makeElement(el){
  var newNode = document.createElement("li");
  var classAttr = document.createAttribute("class");
  var name = $('span', el).html();

  classAttr.value = "list-group-item";
  newNode.setAttributeNode(classAttr); 
  newNode.innerHTML = '<div class="row"> <div class="col-8"> <input type="checkbox"> <span>'+name+'</span> </div><div class="col-4"> <button class="btn fas fa-trash-alt"></button> </div></div>';
  newNode.classList.add("elem");

  return newNode;
}
$( document ).ready(function() {
  $(".add-group").click(function(){
      //add the ajax and toast here
  });
  $(".check-all").click(function(){
    $('ul'+$(this).data('target'))
      .find('input:checkbox')
      .not(this)
      .prop('checked', this.checked);
  });
  function a(id) {
    return document.getElementById(id);
  }

  function initdrag(dropId){
    dragula([document.getElementById('user-list'), document.getElementById(dropId)], {
      copy: function (el, source) {
        return source === document.getElementById('user-list')
      },
      accepts: function (el, target) {
        return target !== document.getElementById('user-list')
      },
      revertOnSpill: true
    }).on('dragend', function (el) {
      if (this._shadow){
        this._shadow.remove();
        this._shadow = null;
      }
    }).on('drop', function (el) {
        el.parentNode.replaceChild(makeElement(el), el);
    }).on('shadow', function(el, target){
        if (!this._shadow){
            this._shadow = makeElement(el);
            this._shadow.classList.add("gu-transit");
        }
        el.style.display = 'none';
        el.parentNode.insertBefore(this._shadow, el);
    });
  }
  initdrag('admin');

  // $('#accordion').on('shown.bs.collapse', function () {
  //   var dropId = ($(this).find('.show').find('ul').attr('id'));
  //   initdrag(dropId);
  // });

});
