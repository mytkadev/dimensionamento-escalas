// =======================
// ESTRUTURA DE DADOS: Equipes e Setores
// =======================

const equipes = [
  {
    nome: "Serviço Social",
    setores: [
      {
        nome: "Internação",
        desc: "1 a cada 40 leitos",
        regra: (leitos) => Math.ceil(leitos / 40)
      },
      {
        nome: "UTI (adulto, infantil e neonatologia)",
        desc: "1 por equipe (pedido de interconsulta)",
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
              regra: (leitos) => Math.ceil(leitos / 30)
            },
            {
              nome: "Média Complexidade",
              desc: "1 para até 60 leitos",
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
              regra: (leitos) => Math.ceil(leitos / 90)
            },
            {
              nome: "Média Complexidade",
              desc: "1 para cada 180 leitos",
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
              regra: (leitos) => Math.ceil(leitos / 30)
            },
            {
              nome: "Baixa/Média Complexidade",
              desc: "1 para até 40 leitos",
              regra: (leitos) => Math.ceil(leitos / 40)
            }
          ]
        },
        {
          nome: "Técnico de Farmácia",
          complexidades: [
            {
              nome: "Dose unitária",
              desc: "1 para cada 25",
              regra: (unidades) => Math.ceil(unidades / 25)
            },
            {
              nome: "Dose convencional",
              desc: "1 para cada 30 leitos",
              regra: (leitos) => Math.ceil(leitos / 30)
            },
            {
              nome: "Controle/Atendimento/Distribuição",
              desc: "2 para controle, 2 para atendimento, 1 para distribuição",
              regra: "// definir regra"
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
        regra: (leitos) => Math.ceil(leitos / 15)
      },
      {
        nome: "nan",
        desc: "Considerado somente os setores com demanda de Psicologia 25%",
        regra: "// definir regra"
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
              regra: "// definir regra"
            }
          ]
        }
      ]
    }
  ]
},
  {
    nome: "Terapia ocupacional",
    setores: [
      {
        nome: "Internação",
        desc: "1 para cada 15 leitos",
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
              regra: "// definir regra"
            },
            {
              nome: "Terapia ou sessão",
              desc: "Até 7 pacientes por período de trabalho",
              regra: "// definir regra"
            },
            {
              nome: "Demanda mínima",
              desc: "Considerar somente os setores com demanda de Fono 25%",
              regra: "// definir regra"
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
        complexidadeContainer.style.display = 'none';
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
        complexidadeContainer.style.display = '';
    } else {
        complexidadeContainer.style.display = 'none';
    }
}

// Popula Profissionais ao escolher Setor
function popularDropdownProfissional() {
    const equipeIdx = document.getElementById('equipe').value;
    const setorIdx = document.getElementById('setor').value;
    const profissionalSelect = document.getElementById('profissional');
    const profissionalContainer = document.getElementById('profissional-container');
    profissionalSelect.innerHTML = '';

    if (equipeIdx === "" || setorIdx === "") {
        profissionalContainer.style.display = 'none';
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
        profissionalContainer.style.display = '';
    } else {
        profissionalContainer.style.display = 'none';
    }
    // Sempre limpa/esconde complexidade ao mudar profissional
    popularDropdownComplexidade();
}
// Exibe as informações do setor escolhido
function mostrarInfoSetor() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const infoDiv = document.getElementById('infoSetor');
  infoDiv.innerHTML = "";

  if (equipeIdx === "" || setorIdx === "") return;

  const setor = equipes[equipeIdx].setores[setorIdx];
  infoDiv.innerHTML = `
    <b>Profissional:</b> ${setor.profissional || "-"}<br>
    <b>Regra:</b> ${setor.desc}
  `;
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
      necessario = typeof complexidade.regra === "function" ? complexidade.regra(leitos) : 0;
      texto = `<b>${equipes[equipeIdx].nome} — ${setor.nome}</b><br>
        <b>Profissional:</b> ${profissional.nome}<br>
        <b>Complexidade:</b> ${complexidade.nome} (${complexidade.desc})<br>
        <b>Profissionais necessários:</b> ${necessario} para ${leitos} leitos.`;
    } else {
      // Se não há complexidade, mas há profissional
      necessario = 0;
      texto = `Selecione uma complexidade válida.`;
    }
  } else if (typeof setor.regra === "function") {
    // Fluxo antigo (sem profissional/complexidade)
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
window.onload = function() {
    popularDropdownEquipe();
    document.getElementById('equipe').addEventListener('change', function() {
        popularDropdownSetor();
        document.getElementById('resultado').style.display = 'none';
        // Limpa dropdowns dependentes
        document.getElementById('profissional-container').style.display = 'none';
        document.getElementById('complexidade-container').style.display = 'none';
    });
    document.getElementById('setor').addEventListener('change', function() {
        mostrarInfoSetor();
        document.getElementById('resultado').style.display = 'none';
        popularDropdownProfissional();
    });
    document.getElementById('profissional').addEventListener('change', function() {
        popularDropdownComplexidade();
    });
    popularDropdownSetor();
};

