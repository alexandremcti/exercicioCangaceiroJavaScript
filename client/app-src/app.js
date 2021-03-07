import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/js/modal.js';
import '../css/meucss.css';
import { NegociacaoController } from "./controllers/NegociacaoController.js";


const controller = new NegociacaoController();

$('h1').on('click', ()=> alert('Foi clicado!'))
console.log($('h1').modal);

