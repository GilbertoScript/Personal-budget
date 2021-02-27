class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}

		return true
	}
}

// Criação da classe Bd - Banco de dados - LocalStorage
class Bd {
	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}	

	// Criação da função/método que irá verificar se existe algum id em localStorage
	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	// Criação da função/método que irá armazenar os dados de despesa em local storage
	gravar(d) {
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	// Criação do método que irá recuperar os Registros
	recuperarTodosRegistros() {
		// Array de despesas
		let despesas = []

		let id = localStorage.getItem('id')

		// laço de repetição que irá recuperar todas as despesas contidas dentro do localStorage
		for(let i = 1; i <= id; i++) {

			// Recuperar as despesas, e transformar a notação JSON, em objeto literal
			let despesa = JSON.parse(localStorage.getItem(i))

			// Verificar se existem índices que foram pulados ou removidos
			// Se sim, pular esses índices
			if(despesa == null) {
				continue

			}

			despesas.push(despesa)

		}

		return despesas
	}

	pesquisar() {
		
	}
}

// Instância da class Bd
let bd = new Bd()

// Função ao ser disparada quando o botão para cadastrar despesa for clicado
function cadastrarDespesa() {
	// Atribuição dos elementos html à variáveis
	let ano = document.querySelector('#ano')
	let mes = document.querySelector('#mes')
	let dia = document.querySelector('#dia')
	let tipo = document.querySelector('#tipo')
	let descricao = document.querySelector('#descricao')
	let valor = document.querySelector('#valor')

	// Instância da classe Despesa, a instância é feita dentro da função pois, além da necessidade da classe ser criada quando uma nova despesa for cadastrada, não seria possível recuperar os valores acima, pois as variáveis permanecerão apenas dentro da função.

	let despesa = new Despesa(
		ano.value, 
		mes.value, 
		dia.value, 
		tipo.value, 
		descricao.value, 
		valor.value
	)
	
	// Armazenando os dados de despesa em local storage
	if(despesa.validarDados()) {
		bd.gravar(despesa)

		// Atribuindo elementos ao modal de sucesso
		document.querySelector('.modal-title').innerHTML = 'Registro inserido com sucesso!'
		document.querySelector('.modal-header').className = 'modal-header text-success'
		document.querySelector('.modal-body').innerHTML = 'Despesa foi cadastrada com sucesso.'
		document.querySelector('#btn-modal').innerHTML = 'Voltar'
		document.querySelector('#btn-modal').className = 'btn btn-success'
			
		// Dialog de sucesso
		$('#modalRegistraDespesa').modal('show')

		// Limpar campos
		ano.value = ''
		mes. value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''

	} else {

		// Atribuindo elementos ao modal de erro
		document.querySelector('.modal-title').innerHTML = 'Erro na inclusão do registro!'
		document.querySelector('.modal-header').className = 'modal-header text-danger'
		document.querySelector('.modal-body').innerHTML = 'Erro na gravação, preencha todos os campos.'
		document.querySelector('#btn-modal').innerHTML = 'Voltar e corrigir'
		document.querySelector('#btn-modal').className = 'btn btn-danger'

		// Dialog de erro
		$('#modalRegistraDespesa').modal('show')

	}
	
}

function carregaListaDespesa() {
	// Criando um array
	let despesas = []

	// Este array recebe um array de objetos, que está sendo pego do bd.
	despesas = bd.recuperarTodosRegistros()

	// Selecionando o elemento tbody da tabela
	let listaDespesa = document.querySelector('#listaDespesas')

	// Percorrendo o array dispesas, listando os arrays de forma dinâmica
	despesas.forEach((d) => {

		// Criando a linha(tr), do tbody
		let linha = listaDespesa.insertRow()

		// Criando as colunas(td), do tr
		linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`

		// Ajustar o tipo
		switch(d.tipo) {
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Esporte'
				break
		}

		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
	})
}

function filtrarDespesa() {
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

	console.log(despesa)
}

/*

<tr>
    0 = <td>25/03/2021</td>
    1 = <td>Lazer</td>
    2 = <td>Cinema</td>
    3 = <td>300,00</td>
</tr>

*/