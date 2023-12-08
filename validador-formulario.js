class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }
    eventos() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e)
            const camposValidos = this.camposSaoValidos()
            const senhasSalvas = this.senhasSaoValidas()

            if (camposValidos && senhasSalvas) {
                alert('Formulário enviado.')
                this.formulario.submit()
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    camposSaoValidos() {
        let isValid = true;

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const labelText = campo.previousElementSibling.innerText;

            if (!campo.value) {
                this.criaErro(campo, `Campo "${labelText}" não pode estar em branco.`);
                isValid = false;
            }

            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) isValid = false;
            }

            if (campo.classList.contains('user')) {
                if (!this.validaUsuario(campo)) isValid = false;
            }

        }

        return isValid;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

    validaCPF(campo) {
        const cpf = new ValidadorCpf(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, 'CPF inválido.');
            return false;
        }

        return true;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid = false;
        }

        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
            valid = false;
        }

        return valid;
    }



    senhasSaoValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('.password');
        const repetirSenha = this.formulario.querySelector('.confirm-password');

        if (senha.value !== repetirSenha.value) {
            valid = false;
            this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
            this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
        }

        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
        }

        return valid;
    }
}


const valida = new ValidaFormulario();