import _ from 'lodash';
import $ from 'jquery';
import test from './self';
function component() {
  var element = $('<div></div>');
  element.html(_.join(['hello','webpack'], ' '))  
  return element.get(0);
}
var str = test();
document.body.appendChild(component());
console.log(str);