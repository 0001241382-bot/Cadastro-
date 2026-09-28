// --- NOVO: SALVAR OS DADOS EM ARQUIVO DE TEXTO VIA DOWNLOAD ---
const formulario = document.querySelector('form');

if (formulario) {
    formulario.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede a página de recarregar e sumir com os dados

        // 1. Pega os valores digitados nos campos do HTML
        const email = document.getElementById('email')?.value || '';
        const senha = document.getElementById('senha')?.value || '';
        const nome = document.getElementById('nome')?.value || '';
        const endereco = document.getElementById('endereco')?.value || '';
        const CPF = document.getElementById('CPF')?.value || '';
        const nomeImagem = document.getElementById('nome-imagem')?.value || 'Nenhuma imagem selecionada';

        // 2. Estrutura o conteúdo organizado para o Bloco de Notas (.txt)
        const conteudoTexto = `=========================================
NOVO CADASTRO REALIZADO
=========================================
Nome: ${nome}
E-mail: ${email}
Senha: ${senha}
Endereço: ${endereco}
CPF: ${CPF}
Nome da Imagem: ${nomeImagem}
-----------------------------------------
`;

        // 3. Cria o arquivo de texto na memória do navegador
        const blob = new Blob([conteudoTexto], { type: 'text/plain;charset=utf-8' });
        
        // 4. Cria um link invisível na tela para forçar o download automático
        const linkDownload = document.createElement('a');
        linkDownload.href = URL.createObjectURL(blob);
        linkDownload.download = 'cadastro_' + nome.replace(/\s+/g, '_').toLowerCase() + '.txt'; // Nome do arquivo .txt salvo

        // 5. Executa o clique invisível e remove o link temporário
        document.body.appendChild(linkDownload);
        linkDownload.click();
        document.body.removeChild(linkDownload);

        alert('Cadastro com Sucesso! O arquivo de texto foi gerado.');
    });
}

// --- CONTROLE DA IMAGEM E PREVIEW ---
const campoFoto = document.getElementById('foto');
const tagImagem = document.getElementById('preview-imagem');
const campoNomeImagem = document.getElementById('nome-imagem');

campoFoto.addEventListener('change', function() {
    if (campoFoto.files && campoFoto.files[0]) {
        const arquivo = campoFoto.files[0]; 
        
        if (campoNomeImagem) {
            campoNomeImagem.value = arquivo.name;
        }

        const leitor = new FileReader();
        leitor.onload = function(e) {
            tagImagem.src = e.target.result;
            tagImagem.style.display = 'block'; 
        }
        leitor.readAsDataURL(arquivo);
    }
});

// --- CONTROLE DE EXIBIÇÃO DA SENHA (OLHINHO) ---
const campoSenha = document.getElementById('senha');
const btnMostrarSenha = document.getElementById('btn-mostrar-senha');
const iconeOlho = document.getElementById('icone-olho');

const iconeOlhoAberto = "https://cloudflare.com";
const iconeOlhoFechado = "https://cloudflare.com";

if (btnMostrarSenha) {
    btnMostrarSenha.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (campoSenha.type === 'password') {
            campoSenha.type = 'text';
            if (iconeOlho) iconeOlho.src = iconeOlhoFechado;
        } else {
            campoSenha.type = 'password';
            if (iconeOlho) iconeOlho.src = iconeOlhoAberto;
        }
    });
}

// --- FORMATAÇÃO AUTOMÁTICA DO CPF ---
const campoCPF = document.getElementById('CPF');

if (campoCPF) {
    campoCPF.setAttribute('maxlength', '14');
    campoCPF.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, "");
        if (valor.length <= 11) {
            valor = valor.replace(/(\d{3})(\d)/, "\$1.\$2");
            valor = valor.replace(/(\d{3})(\d)/, "\$1.\$2");
            valor = valor.replace(/(\d{3})(\d{1,2})\$/, "\$1-\$2");
        }
        e.target.value = valor;
    });
}
