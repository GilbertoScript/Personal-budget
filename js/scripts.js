class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
}

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
	console.log(despesa)
}