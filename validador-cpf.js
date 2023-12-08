class ValidadorCpf {

    constructor(cpf) {
        Object.defineProperty(this, "cpfLimpo", {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpf.replace(/\D+/g, "")
        });
    }

    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo
    }

    geraNovoCpf(){
        const cpfSemDigito = this.cpfLimpo.slice(0, 9)
        const digito1 = ValidadorCpf.geraDigito(cpfSemDigito)
        const digito2 = ValidadorCpf.geraDigito(cpfSemDigito + digito1)
        this.cpfNovo = cpfSemDigito + digito1 + digito2
        return this.cpfNovo
    }

    static geraDigito(cpfSemDigito) {
        let total = 0
        let reverso = cpfSemDigito.length + 1
        for(let stringNumerica of cpfSemDigito) {
            total += reverso * Number(stringNumerica)
            reverso --
        }
        const digito = 11 - (total % 11)
        return digito <= 9 ? String(digito) : '0'
    }

    valida() {
        
        if (!this.cpfLimpo) return false;
        if (this.cpfLimpo.length < 11) return false
        if (typeof this.cpfLimpo !== 'string') return false
        if (this.isSequencia()) return false
        this.geraNovoCpf()
        
        return this.geraNovoCpf() === this.cpfLimpo
    }
}




