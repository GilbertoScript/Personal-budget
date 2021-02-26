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
	let despesas = []

	despesas = bd.recuperarTodosRegistros()

	console.log(despesas)
}