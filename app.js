/**
 * Cálculo de tempo de viagem
 * @author Gustavo Nunes Bispo
 */
let suporte = false

function calc_tempo(event) {
    // a linha abaixo anula o comportamento padrão de envio
    event.preventDefault()

    let velocidade = document.getElementById('velocidade').value
    let distancia = document.getElementById('distancia').value

    let tempo = distancia / velocidade

    document.getElementById('tempo').value = `Tempo estimado: ${tempo}h`
    document.getElementById('status').value = "Menor de idade"
}

// Ligando lanterna

let stream, track
inicializarLanterna()

// Lanterna
// Inicializa o stream e configura o track apenas uma vez
async function inicializarLanterna() {
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })

        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

async function ligar() {
    if (suporte === false) { 
        if (track) {
            try {
                await track.applyConstraints({ advanced: [{ torch: true }] })
            } catch (error) {
                console.error(`Erro ao ligar a lanterna: ${error}`)
            }
        }
        suporte === true
    } else {
        if (track) {
            try {
                await track.applyConstraints({ advanced: [{ torch: false }] })
            } catch (error) {
                console.error(`Erro ao desligar a lanterna: ${error}`)
            }
        }
        suporte === false
    }
}