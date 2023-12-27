import $ from 'jquery';
import UIkit from 'uikit';

import 'markdown-it-latex/dist/index.css'
import markdownItLatex from 'markdown-it-latex'

window.$ = $;

import markdownIt from 'markdown-it'
const mdi = markdownIt()
mdi.use(markdownItLatex)  

import metals from './metals.json';

var list_n = 0;

$(document).ready(() => {
  metals.forEach(metal => {
    renderMetal(metal);
  });
});

var list_n = 0;

function arabicToRoman(num) {
  if (typeof num !== 'number')
    return false;
  var digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman_num = "",
    i = 3;
  while (i--)
    roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
  return Array(+digits.join("") + 1).join("M") + roman_num;
}

function renderMetal(metal) {
  metal.oxStates.forEach(oxState => {
    renderMetalRow(metal, oxState);
  });
}

function numberToPrefix(number) {
  switch (number) {
    case 1:
      return "";
    case 2:
      return "di";
    case 3:
      return "tri";
    case 4:
      return "tetra";
    case 5:
      return "penta";
    case 6:
      return "hexa";
    case 7:
      return "hepta";
    case 8:
      return "octa";
    case 9:
      return "nona";
    case 10:
      return "deca";
    default:
      return "";
  }
}

function renderMetalRow(metal, oxState) {
  var hOxiState = 1;
  //1. cruzar los estados de oxidación, que serán los números de átomos de cada elemento
  var atoms = {};
  atoms[metal.symbol] = hOxiState;
  atoms['H'] = oxState;
  //3. definir el render de la reacción, ejemplo:
  var render = mdi.render('`$' + metal.symbol + '^{+' + oxState + '}' + ' + H^{-1}' + ' \\rightarrow ' + metal.symbol + nullifone('H', atoms["H"]) + '$`');
  //4. definir nomenclatura tradicional, ejemplo:
  var n_tradicional;
  switch (metal.oxStates.length) {
    case 1:
      n_tradicional = "Hidruro de " + metal.name;
      break;
    case 2:
      if (oxState == metal.oxStates[0]) {
        n_tradicional = "Hidruro " + metal.oxNames.min;
      } else {
        n_tradicional = "Hidruro " + metal.oxNames.max;
      }
      break;
    case 3:
      if (oxState == metal.oxStates[0]) {
        n_tradicional = "Hidruro hipo" + metal.oxNames.min;
      } else if (oxState == metal.oxStates[1]) {
        n_tradicional = "Hidruro " + metal.oxNames.min;
      } else {
        n_tradicional = "Hidruro " + metal.oxNames.max;
      }
      break;
    case 4:
      if (oxState == metal.oxStates[0]) {
        n_tradicional = "Hidruro hipo" + metal.oxNames.min;
      } else if (oxState == metal.oxStates[1]) {
        n_tradicional = "Hidruro " + metal.oxNames.min;
      } else if (oxState == metal.oxStates[2]) {
        n_tradicional = "Hidruro " + metal.oxNames.max;
      } else {
        n_tradicional = "Hidruro per" + metal.oxNames.max;
      }
      break;
    default:
      n_tradicional = "<span class='uk-text-muted uk-text-italic'>No es posible</span>";
  }
  //5. definir nomenclatura stock, ejemplo:
  var n_stock = "Hidruro de " + metal.name + " (" + arabicToRoman(oxState) + ")";
  //6. definir nomenclatura sistemática, ejemplo:
  if (oxState == 1) {
    var n_sistem = "Hidruro de " + metal.name;
  } else {
    var n_sistem = numberToPrefix(oxState).charAt(0).toUpperCase() + numberToPrefix(oxState).slice(1) + "hidruro de " + metal.name;
  }
  $('#tbody').append(`
    <tr>
      <td>${++list_n}</td>
      <td>${render}</td>
      <td>${n_tradicional}</td>
      <td>${n_stock}</td>
      <td>${n_sistem}</td>
    </tr>
  `);
}

function nullifone(symbol, number) {
  if (number == 1) {
    return symbol;
  } else {
    return symbol + "_{" + number + "}";
  }
}