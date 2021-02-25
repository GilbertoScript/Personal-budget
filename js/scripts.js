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

	// Criação da função que irá verificar se existe algum id em localStorage
	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	// Criação da função que irá armazenar os dados de despesa em local storage
	gravar(d) {
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
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
			
	} else {
		alert('Preencha todos os campos.')
	}
	
}