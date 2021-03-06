/**
 * Esta página, é responsável para carregar as views de forma dinâmica,
 * sem que seja realizado o carregamento da página, ao selecionar as opções
 * do SideNav
 */

app.config(function($routeProvider){
    $routeProvider
    // Página Inicial
    .when("/", {
        templateUrl : 'views/main.html',
        controller  : 'Main'
    })
    // Paciente
    .when("/paciente", {
        templateUrl : 'views/paciente.html',
        controller  : 'PacienteCtrl'
    })
    // Prontuário
    .when("/prontuario", {
        templateUrl : 'views/prontuario.html',
        controller  : 'ProntuarioCtrl'
    })
 });