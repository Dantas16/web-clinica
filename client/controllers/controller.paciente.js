app.controller('PacienteCtrl', function($scope, $http){
    
    M.AutoInit();

    $('#codigo').mask('000000');
    $('#dtnasc').mask('00/00/0000');
    $('#cpf').mask('000.000.000-00');
    $('#uf').mask('SS');
    $('#telefone').mask('(00) 00000-0000');

    $scope.paciente = {};
    $scope.pacientes = [];
    
    $scope.estado = function (){
        var botao = document.getElementById('botao')
        var conteudo = document.getElementById('pacientes').style.display

        if(conteudo == 'none'){
            $http({
                method : "GET",
                url : "http://localhost:8000/api/pacientes"
              }).then(function mySuccess(response) {

                    // VERIFICAR NO CONSOLE A RESPOSTA DO SERVER
                    console.warn(response.data.result);
                    $scope.pacientes = response.data.result;

              }, function myError(response) {
                    $scope.pacientes = [];
              });


            document.getElementById('pacientes').style.display = 'block'
            botao.innerHTML = "Ocultar"
        } else{
            document.getElementById('pacientes').style.display = 'none'
            botao.innerHTML = 'Consultar'
        }
    }


    $scope.cadastrarPaciente = function(){ 
        $scope.pacienteCadastrado = false;     
        //Validação dos Campos
        if($scope.paciente.no_pessoa == null || $scope.paciente.no_pessoa == ""){
            M.toast({html: 'Insira o Nome', classes: 'rounded red'})
        } else if($scope.paciente.rg_pessoa == null || $scope.paciente.rg_pessoa == ""){
            M.toast({html: 'Insira o RG', classes: 'rounded red'})
        } else if($scope.paciente.cpf_pessoa == null || $scope.paciente.cpf_pessoa == ""){
            M.toast({html: 'Insira o CPF', classes: 'rounded red'})
        } else if($scope.paciente.dt_nasc_pessoa == null || $scope.paciente.dt_nasc_pessoa == ""){
            M.toast({html: 'Insira a Data de Nascimento', classes: 'rounded red'})
        } else if($scope.paciente.tp_sangui_pessoa == null || $scope.paciente.tp_sangui_pessoa == ""){
            M.toast({html: 'Selecione o Tipo Sanguineo', classes: 'rounded red'})
        } else if($scope.paciente.endereco == null || $scope.paciente.endereco == ""){
            M.toast({html: 'Insira o Endereço', classes: 'rounded red'})
        } else if($scope.paciente.numero == null || $scope.paciente.numero == ""){
            M.toast({html: 'Insira o Numero', classes: 'rounded red'})
        } else if($scope.paciente.cidade == null || $scope.paciente.cidade == ""){
            M.toast({html: 'Insira a Cidade', classes: 'rounded red'})
        }else if($scope.paciente.uf == null || $scope.paciente.uf == ""){
            M.toast({html: 'Insira o UF', classes: 'rounded red'})
        }else if($scope.paciente.bairro == null || $scope.paciente.bairro == ""){
            M.toast({html: 'Insira o Bairro', classes: 'rounded red'})
        }else if($scope.paciente.de_contato == null || $scope.paciente.de_contato == ""){
            M.toast({html: 'Insira o Contato', classes: 'rounded red'})
        }else if($scope.paciente.de_paciente == null || $scope.paciente.de_paciente == ""){
            M.toast({html: 'Insira a Observação', classes: 'rounded red'})
        }else if($scope.paciente.no_usuario == null || $scope.paciente.no_usuario == ""){
            M.toast({html: 'Insira o Usuario', classes: 'rounded red'})
        }else if($scope.paciente.sh_usuario == null || $scope.paciente.sh_usuario == ""){
            M.toast({html: 'Insira a Senha', classes: 'rounded red'})
        }else{
            M.toast({html: 'Cadastrado com Sucesso', classes: 'rounded green'})

            console.log($scope.paciente)

            const n_paciente = $scope.paciente;

            $scope.pacientes.push(n_paciente);
            $scope.paciente = {}
            
            $http.post("http://localhost:8000/api/pacientes", 
                { "paciente": n_paciente }, 
                { headers: {'Content-Type': 'application/json'}})
                .then(function mySuccess(response) {

                    console.warn(response.data.result);

                    $scope.pacienteCadastrado = true;
                }, function myError(response) {
                    $scope.myWelcome = response.statusText;
                });
        }

    }

    // Esta função vai retornar um json e alimentar o $scope.paciente, que será exibido em uma tabela atraves de um Ng-Repeat
    function exibirPaciente(){
        $http({
            method : "GET",
            url : "localhost:8000/paciente"
          }).then(function mySuccess(response) {
            $scope.paciente = response.data;
          }, function myError(response) {
            $scope.paciente = response.statusText;
          });
    }

    exibirPaciente();
    
})