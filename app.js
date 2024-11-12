/**
 * Cálculo de tempo de viagem
 * @author Gustavo Nunes Bispo
 */

function calc_tempo(event) {
    // a linha abaixo anula o comportamento padrão de envio
    event.preventDefault()

    let velocidade = document.getElementById('velocidade').value
    let distancia = document.getElementById('distancia').value

    let tempo = distancia / velocidade

    document.getElementById('tempo').value = `Tempo estimado: ${tempo}h`
    document.getElementById('status').value = "Menor de idade"
}