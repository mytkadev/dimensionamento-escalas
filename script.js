// =======================
// ESTRUTURA DE DADOS: Equipes e Setores COM FONTES
// =======================

const equipes = [
  {
    nome: "Serviço Social",
    setores: [
      {
        nome: "Internação",
        desc: "1 a cada 40 leitos",
        fonte: "Resolução CFESS 383/1999",
        regra: (leitos) => Math.ceil(leitos / 40)
      },
      {
        nome: "UTI (adulto, infantil e neonatologia)",
        desc: "1 por equipe (pedido de interconsulta)",
        fonte: "Resolução CFESS 383/1999",
        regra: () => 1
      }
    ]
  },
  {
    nome: "Nutrição",
    setores: [
      {
        nome: "Internação",
        profissionais: [
          {
            nome: "Nutricionista",
            complexidades: [
              {
                nome: "Alta Complexidade",
                desc: "1 para cada 30 leitos",
                fonte: "Resolução CFN nº 600/2018",
                regra: (leitos) => Math.ceil(leitos / 30)
              },
              {
                nome: "Média Complexidade",
                desc: "1 para até 60 leitos",
                fonte: "Resolução CFN nº 600/2018",
                regra: (leitos) => Math.ceil(leitos / 60)
              }
            ]
          },
          {
            nome: "Técnico de Nutrição",
            complexidades: [
              {
                nome: "Alta Complexidade",
                desc: "1 para cada 90 leitos",
                fonte: "Resolução CFN nº 600/2018",
                regra: (leitos) => Math.ceil(leitos / 90)
              },
              {
                nome: "Média Complexidade",
                desc: "1 para cada 180 leitos",
                fonte: "Resolução CFN nº 600/2018",
                regra: (leitos) => Math.ceil(leitos / 180)
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nome: "Farmácia",
    setores: [
      {
        nome: "Internação",
        profissionais: [
          {
            nome: "Farmacêutico",
            complexidades: [
              {
                nome: "Alta Complexidade",
                desc: "1 para cada 30 leitos",
                fonte: "SBRAFH Padrões Mínimos 2017",
                regra: (leitos) => Math.ceil(leitos / 30)
              },
              {
                nome: "Baixa/Média Complexidade",
                desc: "1 para até 40 leitos",
                fonte: "SBRAFH Padrões Mínimos 2017",
                regra: (leitos) => Math.ceil(leitos / 40)
              }
            ]
          },
          {
            nome: "Técnico de Farmácia",
            complexidades: [
              {
                nome: "Dose unitária",
                desc: "1 para cada 25 leitos",
                fonte: "Manual de Parâmetros para dimensionamento de força de trabalho",
                regra: (leitos) => Math.ceil(leitos / 25)
              },
              {
                nome: "Dose convencional",
                desc: "1 para cada 30 leitos",
                fonte: "Manual de Parâmetros para dimensionamento de força de trabalho",
                regra: (leitos) => Math.ceil(leitos / 30)
              },
              {
                nome: "Controle/Atendimento/Distribuição",
                desc: "2 para controle, 2 para atendimento, 1 para distribuição",
                fonte: "Manual de Parâmetros para dimensionamento de força de trabalho",
                regra: () => "Ver regra manual"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nome: "Psicologia",
    setores: [
      {
        nome: "Internação",
        desc: "1 para cada 15 leitos",
        fonte: "Resolução CFP nº 625/2020",
        regra: (leitos) => Math.ceil(leitos / 15)
      },
      {
        nome: "Demanda Parcial",
        desc: "Considerar apenas os setores com demanda de Psicologia ≥25%",
        fonte: "Resolução CFP nº 625/2020",
        regra: () => "Setor sob demanda"
      }
    ]
  },
  {
    nome: "Fisioterapia",
    setores: [
      {
        nome: "Internação",
        profissionais: [
          {
            nome: "Fisioterapeuta",
            complexidades: [
              {
                nome: "Regra padrão",
                desc: "1 para cada 15 leitos",
                fonte: "Resolução COFFITO nº 444/2014",
                regra: (leitos) => Math.ceil(leitos / 15)
              }
            ]
          }
        ]
      },
      {
        nome: "UTI",
        profissionais: [
          {
            nome: "Fisioterapeuta",
            complexidades: [
              {
                nome: "Por período",
                desc: "1 para cada 10 leitos por período de 6 horas",
                fonte: "RDC 7 de 2010 ANVISA",
                regra: () => "Ver RDC 7 para detalhamento"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    nome: "Terapia Ocupacional",
    setores: [
      {
        nome: "Internação",
        desc: "1 para cada 15 leitos (considere apenas setores com demanda ≥25%)",
        fonte: "CREFITO e ABRATO",
        regra: (leitos) => Math.ceil((leitos/0.25) / 15)
      }
    ]
  },
  {
    nome: "Fonoaudiologia",
    setores: [
      {
        nome: "Internação",
        profissionais: [
          {
            nome: "Fonoaudiólogo",
            complexidades: [
              {
                nome: "Consultas hospitalares",
                desc: "Até 8 avaliações por período de trabalho",
                fonte: "Resolução CFFa nº 444/2014",
                regra: () => "Máximo 8 avaliações por período"
              },
              {
                nome: "Terapia ou sessão",
                desc: "Até 7 pacientes por período de trabalho",
                fonte: "Resolução CFFa nº 444/2014",
                regra: () => "Máximo 7 pacientes por período"
              },
              {
                nome: "Demanda mínima",
                desc: "Considerar apenas setores com demanda de Fono ≥25%",
                fonte: "Resolução CFFa nº 444/2014",
                regra: () => "Setor sob demanda"
              }
            ]
          }
        ]
      }
    ]
  }
];

// =======================
// FUNÇÕES DE INTERFACE
// =======================

// Ajusta largura dos selects de profissional e complexidade
function ajustarLarguraSelects() {
  const profDiv = document.getElementById('profissional-container');
  const compDiv = document.getElementById('complexidade-container');

  if (profDiv.style.visibility !== 'hidden' && compDiv.style.visibility !== 'hidden') {
    profDiv.style.width = "50%";
    compDiv.style.width = "50%";
  } else if (profDiv.style.visibility !== 'hidden') {
    profDiv.style.width = "100%";
  } else if (compDiv.style.visibility !== 'hidden') {
    compDiv.style.width = "100%";
  }
}

// Popula Equipes
function popularDropdownEquipe() {
  const equipeSelect = document.getElementById('equipe');
  equipeSelect.innerHTML = '<option value="">Selecione a equipe</option>';
  equipes.forEach((eq, idx) => {
    let opt = document.createElement('option');
    opt.value = idx;
    opt.innerText = eq.nome;
    equipeSelect.appendChild(opt);
  });
}

// Popula Setores ao escolher uma Equipe
function popularDropdownSetor() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorSelect = document.getElementById('setor');
  setorSelect.innerHTML = '<option value="">Selecione o setor</option>';

  if (equipeIdx === "") return;
  const setores = equipes[equipeIdx].setores;
  setores.forEach((setor, idx) => {
    let opt = document.createElement('option');
    opt.value = idx;
    opt.innerText = setor.nome;
    setorSelect.appendChild(opt);
  });
  document.getElementById('infoSetor').innerHTML = "";
}

// Popula Profissionais ao escolher Setor
function popularDropdownProfissional() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalSelect = document.getElementById('profissional');
  const profissionalContainer = document.getElementById('profissional-container');
  profissionalSelect.innerHTML = '';

  if (equipeIdx === "" || setorIdx === "") {
    profissionalContainer.style.visibility = 'hidden';
    ajustarLarguraSelects();
    return;
  }

  const setor = equipes[equipeIdx].setores[setorIdx];

  if (setor.profissionais && setor.profissionais.length > 0) {
    profissionalSelect.innerHTML = '<option value="">Selecione o profissional</option>';
    setor.profissionais.forEach((prof, idx) => {
      let opt = document.createElement('option');
      opt.value = idx;
      opt.innerText = prof.nome;
      profissionalSelect.appendChild(opt);
    });
    profissionalContainer.style.visibility = 'visible';
  } else {
    profissionalContainer.style.visibility = 'hidden';
  }
  // Sempre limpa/esconde complexidade ao mudar profissional
  popularDropdownComplexidade();
  ajustarLarguraSelects();
}

// Popula Complexidades ao escolher Profissional
function popularDropdownComplexidade() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalIdx = document.getElementById('profissional').value;
  const complexidadeSelect = document.getElementById('complexidade');
  const complexidadeContainer = document.getElementById('complexidade-container');
  complexidadeSelect.innerHTML = '';

  if (
    equipeIdx === "" ||
    setorIdx === "" ||
    profissionalIdx === "" ||
    !equipes[equipeIdx].setores[setorIdx].profissionais
  ) {
    complexidadeContainer.style.visibility = 'hidden';
    ajustarLarguraSelects();
    return;
  }

  const profissional = equipes[equipeIdx].setores[setorIdx].profissionais[profissionalIdx];

  if (profissional.complexidades && profissional.complexidades.length > 0) {
    complexidadeSelect.innerHTML = '<option value="">Selecione a complexidade</option>';
    profissional.complexidades.forEach((comp, idx) => {
      let opt = document.createElement('option');
      opt.value = idx;
      opt.innerText = comp.nome;
      complexidadeSelect.appendChild(opt);
    });
    complexidadeContainer.style.visibility = 'visible';
  } else {
    complexidadeContainer.style.visibility = 'hidden';
  }
  ajustarLarguraSelects();
}

// Exibe a descrição da regra e fonte somente quando todos campos necessários estão preenchidos
function mostrarInfoSetor() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalIdx = document.getElementById('profissional').value;
  const complexidadeIdx = document.getElementById('complexidade').value;
  const infoDiv = document.getElementById('infoSetor');

  // Nunca esconde, só zera conteúdo
  infoDiv.innerHTML = "";

  // Cenário: setor com profissionais e complexidade
  const setor = equipeIdx !== "" && setorIdx !== "" ? equipes[equipeIdx].setores[setorIdx] : null;
  if (setor && setor.profissionais && setor.profissionais.length > 0) {
    if (profissionalIdx !== "" && setor.profissionais[profissionalIdx]) {
      const profissional = setor.profissionais[profissionalIdx];
      if (profissional.complexidades && profissional.complexidades.length > 0 && complexidadeIdx !== "") {
        const complexidade = profissional.complexidades[complexidadeIdx];
        if (complexidade.desc) {
          infoDiv.innerHTML = `<b>Regra:</b> ${complexidade.desc}${complexidade.fonte ? `<br><b>Fonte:</b> ${complexidade.fonte}` : ''}`;
        }
      }
    }
    return;
  }

  // Cenário: setor sem profissional (modelo simples)
  if (setor && setor.desc) {
    infoDiv.innerHTML = `<b>Regra:</b> ${setor.desc}${setor.fonte ? `<br><b>Fonte:</b> ${setor.fonte}` : ''}`;
  }
}

// =======================
// CÁLCULO
// =======================

function calcular() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalIdx = document.getElementById('profissional').value;
  const complexidadeIdx = document.getElementById('complexidade').value;
  const leitos = parseInt(document.getElementById('leitos').value || '0');
  const atuaisParceiro = parseInt(document.getElementById('atuais-parceiro').value || '0');
  const atuaisServidor = parseInt(document.getElementById('atuais-servidor').value || '0');
  const resultadoDiv = document.getElementById('resultado');

  if (equipeIdx === "" || setorIdx === "") {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = 'Selecione a equipe e o setor.';
    return;
  }
  if (!leitos || leitos <= 0) {
    resultadoDiv.style.display = 'block';
    resultadoDiv.innerHTML = 'Informe uma quantidade de leitos válida.';
    return;
  }

  const setor = equipes[equipeIdx].setores[setorIdx];
  let necessario = 0;
  let texto = "";

  // Se existe profissionais e está selecionado
  if (setor.profissionais && setor.profissionais.length > 0 && profissionalIdx !== "") {
    const profissional = setor.profissionais[profissionalIdx];
    // Se existe complexidades e está selecionado
    if (profissional.complexidades && profissional.complexidades.length > 0 && complexidadeIdx !== "") {
      const complexidade = profissional.complexidades[complexidadeIdx];
      necessario = typeof complexidade.regra === "function" ? complexidade.regra(leitos) : complexidade.regra;
      texto = `<b>${equipes[equipeIdx].nome} — ${setor.nome}</b><br>
        <b>Profissional:</b> ${profissional.nome}<br>
        <b>Complexidade:</b> ${complexidade.nome} (${complexidade.desc})<br>
        <b>Profissionais necessários:</b> ${necessario} para ${leitos} leitos.`;
    } else {
      necessario = 0;
      texto = `Selecione uma complexidade válida.`;
    }
  } else if (typeof setor.regra === "function") {
    necessario = setor.regra(leitos);
    texto = `<b>${equipes[equipeIdx].nome} — ${setor.nome}</b><br>${setor.desc}<br>
      <b>Profissionais necessários:</b> ${necessario} para ${leitos} leitos.`;
  } else {
    texto = "Selecione todos os campos necessários.";
  }

  const atuais = atuaisParceiro + atuaisServidor;
  if (necessario > 0 && atuais) {
    if (atuais >= necessario) {
      texto += `<br>✅ Sua equipe já está adequada ou acima do mínimo.`;
    } else {
      texto += `<br>⚠️ Faltam <b>${necessario - atuais}</b> profissional(is) para o mínimo recomendado.`;
    }
  }

  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = texto;
}

// =======================
// EVENTOS
// =======================
window.onload = function () {
  popularDropdownEquipe();
  document.getElementById('equipe').addEventListener('change', function () {
    popularDropdownSetor();
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('profissional-container').style.visibility = 'hidden';
    document.getElementById('complexidade-container').style.visibility = 'hidden';
    ajustarLarguraSelects();
    mostrarInfoSetor();
  });
  document.getElementById('setor').addEventListener('change', function () {
    document.getElementById('resultado').style.display = 'none';
    popularDropdownProfissional();
    mostrarInfoSetor();
  });
  document.getElementById('profissional').addEventListener('change', function () {
    popularDropdownComplexidade();
    mostrarInfoSetor();
  });
  document.getElementById('complexidade').addEventListener('change', function () {
    mostrarInfoSetor();
  });
  popularDropdownSetor();
};
