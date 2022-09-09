let { matrix, multiply, inv, mod, abs } = require('mathjs')

const mensagem = "SŢÕVŝØOƙóMŢÏEŰá"

// Matriz que representa a chave de criptografia
let matrizDeCriptografia = matrix([
    [1, 0, 0],
    [1, 3, 1],
    [1, 2, 0]
])

// Tamanho da tabela unicode
let size = 255

// Matriz que representa a chave de descriptografia
let chaveDescriptografia = inv(matrizDeCriptografia)

// Converte os valores maiores que a quantidade de caracteres presente no range de letras (Unicode)

let matrixModular = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
] 

chaveDescriptografia.forEach((a, b, c) => {
    var aux = abs(Number(a.toString()))
    if(a > 255) {
        aux = mod(abs(a), size)
    } else if (a < 0) {
        aux = size - mod(abs(a), size)
    }
    
    matrixModular[b[0]][b[1]] = aux
})

chaveDescriptografia = matrix(matrixModular)

// Função que converte o texto em unicode
function convertStringToUnicode(msg) {
    return msg.split('').map(s => s.charCodeAt(0))
}

let agrupamentoDosValoresEmUnicode = []

// Converte o valor da string em unicode
let unicodeArr = convertStringToUnicode(mensagem)

// Agrupa os valores em unicode em uma matriz 3x1 para multiplicação da matriz de descriptografia
for (let index = 0; index < unicodeArr.length; index += 3) {
    const element1 = unicodeArr[index];
    const element2 = unicodeArr[index + 1];
    const element3 = unicodeArr[index + 2];

    agrupamentoDosValoresEmUnicode.push([element1, element2, element3])
}

let results = []

// Multiplica o Agrupamento das matrizes pela matriz de descriptografia
agrupamentoDosValoresEmUnicode.forEach(mat => {
    let matrixTeste = matrix(mat)

    let result = multiply(chaveDescriptografia, matrixTeste)

    results.push(result)
})

let matrizUnicodeResultado = []

// Converte os valores resultantes em um Array
results.forEach(r => {
    r.forEach(v => {
        matrizUnicodeResultado.push(mod(v, size))
    })
})

//Transforma o array de bytes em string novamente
console.log("Resultado: " + matrizUnicodeResultado.map(v => String.fromCharCode(v)).join(' '))


// Resultado: S A L V A D O R T M A R E N A

// FEITO POR:
// Aluno: Leonardo Lima Custódio    RA: 081180020
// Aluno: Matheus Martins de Carvalho    RA: 081180025
// Aluno: Cláudio Rodriguez Monteiro    RA: 081180042
// Aluno: Vitor Martinez de Oliveira    RA: 081180044