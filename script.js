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
        fonte: "Resolução CFESS 383/1999 | SES/DF 2015",
        regra: (leitos) => Math.ceil(leitos / 40)
      },
      {
        nome: "UTI (adulto, infantil e neonatologia)",
        desc: "1 por equipe (pedido de interconsulta)",
        fonte: "Resolução CFESS 383/1999 | SES/DF 2015",
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
                fonte: "Portaria CRN-3 nº 340/2018",
                regra: (leitos) => Math.ceil(leitos / 30)
              },
              {
                nome: "Média Complexidade",
                desc: "1 para até 60 leitos",
                fonte: "Portaria CRN-3 nº 340/2018",
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
                fonte: "Portaria CRN-3 nº 340/2018",
                regra: (leitos) => Math.ceil(leitos / 90)
              },
              {
                nome: "Média Complexidade",
                desc: "1 para cada 180 leitos",
                fonte: "Portaria CRN-3 nº 340/2018",
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
                fonte: "SES/DF 2015",
                regra: (leitos) => Math.ceil(leitos / 25)
              },
              {
                nome: "Dose convencional",
                desc: "1 para cada 30 leitos",
                fonte: "SES/DF 2015",
                regra: (leitos) => Math.ceil(leitos / 30)
              },
              {
                nome: "Controle/Atendimento/Distribuição",
                desc: "2 para controle, 2 para atendimento, 1 para distribuição",
                fonte: "SES/DF 2015",
                regra: () => 5
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
        desc: "1 para cada 15 leitos (somente setores com demanda de Psicologia 25%)",
        fonte: "Nota técnica CRP-09 003/2019",
        regra: (leitos) => Math.ceil((leitos/0.25) / 15)
      },

    ]
  },
 {
    nome: "Fisioterapia",
    setores: [
      {
        nome: "Internação",
        desc: "1 para cada 15 leitos",
        fonte: "Resolução COFFITO nº 444/2014",
        regra: (leitos) => Math.ceil(leitos / 15)
      },
      {
        nome: "UTI",
        desc: "1 para cada 10 leitos por período de 6 horas",
        fonte: "RDC 7 de 2010 ANVISA",
        regra: (leitos) => Math.ceil(leitos / 10)
      }
    ]
  },
  {
    nome: "Terapia Ocupacional",
    setores: [
      {
        nome: "Internação",
        desc: "1 para cada 15 leitos (considere apenas setores com demanda ≥25%)",
        fonte: "Resolução COFFITO n°. 418, junho/ 2012",
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
                desc: "Até 8 avaliações por período de trabalho (Considerar apenas setores com demanda de Fono ≥25%)",
                fonte: "Resolução CFFa nº 444/2014",
                regra: () => "Máximo 8 avaliações por período"
              },
              {
                nome: "Terapia ou sessão",
                desc: "Até 7 pacientes por período de trabalho (Considerar apenas setores com demanda de Fono ≥25%)",
                fonte: "Resolução CFFa nº 444/2014",
                regra: () => "Máximo 7 pacientes por período"
              },
            ]
          }
        ]
      }
    ]
  }
];

function gerarDoughnut(percent, options = {}) {
  const size = 140, stroke = 13, radius = (size-stroke)/2, center = size/2;
  let mainColor = options.color || "#2FB1AB";
  let bgColor = "#d5e2e5";
  let extra = options.extra || 0;
  let missing = options.missing || 0;
  let extraColor = options.extraColor || "#de5454";
  let missingColor = options.missingColor || "#f7b92b";
  let dasharray = 2 * Math.PI * radius;

  // Fundo
  let circle = `
    <circle
      cx="${center}" cy="${center}" r="${radius}"
      stroke="${bgColor}" stroke-width="${stroke}"
      fill="none"
    />
  `;

  // Vermelho (a mais)
  let extraArc = "";
  if (extra > 0) {
    extraArc = `
      <circle
        cx="${center}" cy="${center}" r="${radius}"
        stroke="${extraColor}"
        stroke-width="${stroke}"
        fill="none"
        stroke-dasharray="${dasharray}"
        stroke-dashoffset="${dasharray * (1 - extra)}"
        stroke-linecap="round"
        style="transition: stroke-dashoffset .4s; opacity:0.92"
      />
    `;
  }

  // Amarelo (a menos)
  let missingArc = "";
  if (missing > 0) {
    missingArc = `
      <circle
        cx="${center}" cy="${center}" r="${radius}"
        stroke="${missingColor}"
        stroke-width="${stroke}"
        fill="none"
        stroke-dasharray="${dasharray}"
        stroke-dashoffset="${dasharray * (1 - missing)}"
        stroke-linecap="round"
        style="transition: stroke-dashoffset .4s; opacity:0.92"
      />
    `;
  }

  // Verde (atua/necessário)
  let progress = `
    <circle
      cx="${center}" cy="${center}" r="${radius}"
      stroke="${mainColor}"
      stroke-width="${stroke}"
      fill="none"
      stroke-dasharray="${dasharray}"
      stroke-dashoffset="${dasharray * (1 - percent)}"
      stroke-linecap="round"
      style="transition: stroke-dashoffset .4s;"
    />
  `;

  // Ordem: fundo > extra > missing > verde na frente
  let svgInner = `
    ${circle}
    ${extraArc}
    ${missingArc}
    ${progress}
  `;

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;margin:auto;">
      ${svgInner}
    </svg>
  `;
}


function animarDoughnut(svgElement, percent, duration = 800) {
  // Verde (necessário ou atuais)
  const green = svgElement.querySelector('circle[stroke="#2db46a"],circle[stroke="#2FB1AB"],circle[stroke="#2fb1aaa2"],circle[stroke="#2FB1AB33"]');
  // Vermelho (extra)
  const red = svgElement.querySelector('circle[stroke="#de5454"]');
  // Amarelo (faltando)
  const yellow = svgElement.querySelector('circle[stroke="#f7b92b"]');

  if (green) {
    const dasharray = parseFloat(green.getAttribute('stroke-dasharray'));
    const from = dasharray;
    const to = dasharray * (1 - percent);
    green.setAttribute('stroke-dashoffset', from);
    const start = performance.now();
    function animateGreen(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentOffset = from + (to - from) * progress;
      green.setAttribute('stroke-dashoffset', currentOffset);
      if (progress < 1) requestAnimationFrame(animateGreen);
    }
    requestAnimationFrame(animateGreen);
  }

  if (red) {
    const dasharray = parseFloat(red.getAttribute('stroke-dasharray'));
    const to = parseFloat(red.getAttribute('stroke-dashoffset'));
    const from = dasharray;
    red.setAttribute('stroke-dashoffset', from);
    const start = performance.now();
    function animateRed(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentOffset = from + (to - from) * progress;
      red.setAttribute('stroke-dashoffset', currentOffset);
      if (progress < 1) requestAnimationFrame(animateRed);
    }
    requestAnimationFrame(animateRed);
  }

  if (yellow) {
    const dasharray = parseFloat(yellow.getAttribute('stroke-dasharray'));
    const to = parseFloat(yellow.getAttribute('stroke-dashoffset'));
    const from = dasharray;
    yellow.setAttribute('stroke-dashoffset', from);
    const start = performance.now();
    function animateYellow(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentOffset = from + (to - from) * progress;
      yellow.setAttribute('stroke-dashoffset', currentOffset);
      if (progress < 1) requestAnimationFrame(animateYellow);
    }
    requestAnimationFrame(animateYellow);
  }
}

// =======================
// FUNÇÃO DE UI PARA RESULTADO
// =======================
function atualizarResultado(params) {
  let svg = params.svg || "";
  let corNumero = params.numeroCor || "#18a8a2"; // Padrão verde/azul
  let html = `
    <div class="resultado-circulo-container">
      ${svg}
      <div class="resultado-circulo-centro">
        <div class="resultado-numero" style="color:${corNumero}">${params.numero}</div>
        <div class="resultado-texto">${params.texto || ""}</div>
      </div>
    </div>
    <div class="resultado-legenda">${params.legenda || ""}</div>
  `;
  if (params.alerta) {
    html += `<div class="resultado-alerta">${params.alerta}</div>`;
  }
  if (params.ok) {
    html += `<div class="resultado-ok">${params.ok}</div>`;
  }
  document.getElementById('resultado').innerHTML = html;

  // Pegue o SVG e anima a rosca
  const svgElement = document.querySelector('.resultado-circulo-container svg');
  if (svgElement) {
    let percent = 1;
    // Detectar o valor do preenchimento (verde)
    const circles = svgElement.querySelectorAll('circle');
    for (let c of circles) {
      const color = c.getAttribute('stroke');
      if (
        color === "#2db46a" ||
        color === "#2FB1AB" ||
        color === "#2fb1aaa2" ||
        color === "#2FB1AB33"
      ) {
        // calcula o percentual pela dashoffset
        const dasharray = parseFloat(c.getAttribute('stroke-dasharray'));
        const dashoffset = parseFloat(c.getAttribute('stroke-dashoffset'));
        percent = 1 - dashoffset / dasharray;
      }
    }
    animarDoughnut(svgElement, percent, 900); // 900ms de animação
  }
}

// =======================
// CÁLCULO E EXIBIÇÃO DO RESULTADO NO CARD COM SVG
// =======================
function calcular() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalIdx = document.getElementById('profissional').value;
  const complexidadeIdx = document.getElementById('complexidade').value;
  const leitos = parseInt(document.getElementById('leitos').value || '0');
  const atuaisParceiro = parseInt(document.getElementById('atuais-parceiro').value || '0');
  const atuaisServidor = parseInt(document.getElementById('atuais-servidor').value || '0');
  const atuais = atuaisParceiro + atuaisServidor;

  // 1. NÃO FEZ AS SELEÇÕES NECESSÁRIAS
  if (equipeIdx === "" || setorIdx === "" || !leitos || leitos <= 0) {
    atualizarResultado({
      svg: gerarDoughnut(1, { color: "#2FB1AB33" }),
      numero: 0,
      texto: "",
      legenda: "Faça as seleções para calcular",
      numeroCor: "#18a8a2"
    });
    return;
  }

  // Recuperar dados para cálculo
  const setor = equipes[equipeIdx].setores[setorIdx];
  let necessario = 0;
  let legenda = "";
  let texto = `para ${leitos} leitos`;

  if (setor.profissionais && setor.profissionais.length > 0 && profissionalIdx !== "") {
    const profissional = setor.profissionais[profissionalIdx];
    if (profissional.complexidades && profissional.complexidades.length > 0 && complexidadeIdx !== "") {
      const complexidade = profissional.complexidades[complexidadeIdx];
      necessario = typeof complexidade.regra === "function" ? complexidade.regra(leitos) : complexidade.regra;
      legenda = `<span>Regra:</span> ${complexidade.desc}`;
    } else {
      atualizarResultado({
        svg: gerarDoughnut(1, { color: "#2FB1AB" }),
        numero: 0,
        texto: "",
        legenda: "Faça as seleções para calcular",
        numeroCor: "#18a8a2"
      });
      return;
    }
  } else if (typeof setor.regra === "function") {
    necessario = setor.regra(leitos);
    legenda = `Regra: ${setor.desc}`;
  } else {
    atualizarResultado({
      svg: gerarDoughnut(1, { color: "#2FB1AB" }),
      numero: 0,
      texto: "",
      legenda: "Faça as seleções para calcular",
      numeroCor: "#18a8a2"
    });
    return;
  }

  // 2. FEZ AS SELEÇÕES MAS NÃO DECLAROU PROFISSIONAIS
  if (necessario > 0 && !atuais) {
    atualizarResultado({
      svg: gerarDoughnut(1, { color: "#2fb1aaa2" }),
      numero: necessario,
      texto: texto,
      legenda: legenda,
      numeroCor: "#18a8a2"
    });
    return;
  }

  // 3. DECLAROU E DEU QUE TEM MAIS PROFISSIONAIS QUE O NECESSÁRIO
  if (atuais > necessario) {
    let percentVerde = necessario / atuais;
    let percentVermelho = (atuais - necessario) / atuais;
    atualizarResultado({
      svg: gerarDoughnut(percentVerde, {
        color: "#2db46a",
        extra: percentVermelho,
        extraColor: "#de5454"
      }),
      numero: `-${atuais - necessario}`,
      texto: texto,
      ok: (atuais - necessario === 1
        ? `Profissional acima do recomendado.</br></br>1 deve ser realocado ou dispensado.`
        : `Profissionais acima do recomendado.</br></br>${atuais - necessario} devem ser realocados ou dispensados.`)
        + `</br></br><b>Recomendado para ${leitos} leitos:</b> ${necessario}`,
      numeroCor: "#de5454" // vermelho!
    });
    return;
  }
  // 4. DECLAROU E TEM MENOS PROFISSIONAIS QUE O NECESSÁRIO
  if (atuais < necessario) {
    let percentVerde = atuais / necessario;
    let percentAmarelo = (necessario - atuais) / necessario;
    atualizarResultado({
      svg: gerarDoughnut(percentVerde, {
        color: "#2db46a",
        missing: percentAmarelo,
        missingColor: "#f7b92b"
      }),
      numero: `+${necessario - atuais}`,
      texto: texto,
      alerta: `Faltam ${necessario - atuais} profissional(is).`,
      numeroCor: "#f7b92b" // amarelo!
    });
    return;
  }

  // 5. DECLAROU E ESTÁ TUDO CERTO
  if (atuais === necessario) {
    atualizarResultado({
      svg: gerarDoughnut(1, { color: "#2db46a" }),
      numero: `0`,
      texto: texto,
      ok: "Equipe adequada com base na legislação.",
      numeroCor: "#18a8a2"
    });
    return;
  }
}

// =======================
// FUNÇÕES DE INTERFACE (populando selects)
// =======================
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
  popularDropdownComplexidade();
  ajustarLarguraSelects();
}

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

function mostrarInfoSetor() {
  const equipeIdx = document.getElementById('equipe').value;
  const setorIdx = document.getElementById('setor').value;
  const profissionalIdx = document.getElementById('profissional').value;
  const complexidadeIdx = document.getElementById('complexidade').value;
  const infoDiv = document.getElementById('infoSetor');
  infoDiv.innerHTML = "";
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
  if (setor && setor.desc) {
    infoDiv.innerHTML = `<b>Regra:</b> ${setor.desc}${setor.fonte ? `<br><b>Fonte:</b> ${setor.fonte}` : ''}`;
  }
}

// =======================
// CÁLCULO E EXIBIÇÃO DO RESULTADO NO CARD COM SVG
// =======================
function calcularEnfermagem() {
  // Pega os valores
  const setor = document.getElementById('enf-setor').value;
  const prof = document.getElementById('enf-profissional').value;
  const leitos = parseInt(document.getElementById('enf-leitos').value || '0');
  const atuaisParceiro = parseInt(document.getElementById('enf-atuais-parceiro').value || '0');
  const atuaisServidor = parseInt(document.getElementById('enf-atuais-servidor').value || '0');
  const atuais = atuaisParceiro + atuaisServidor;

  let necessario = 0;
  let legenda = "";
  let texto = `para ${leitos} leitos`;

  // Validação básica
  if (!setor || !prof || !leitos || leitos <= 0) {
    atualizarResultadoEnfermagem({
      svg: gerarDoughnut(1, { color: "#2FB1AB33" }),
      numero: 0,
      texto: "",
      legenda: "Faça as seleções para calcular",
      numeroCor: "#18a8a2"
    });
    return;
  }

  // Cálculo segundo o profissional
  if (prof === "enfermeiro") {
    necessario = Math.ceil(leitos / 8);
    legenda = `<span>Regra:</span> 1 enfermeiro para cada 8 leitos <br><b>Fonte:</b> RDC 7/2010`;
  } else if (prof === "tecnico") {
    necessario = Math.ceil(leitos / 2);
    legenda = `<span>Regra:</span> 1 técnico para cada 2 leitos <br><b>Fonte:</b> RDC 7/2010`;
  }

  // Não informou funcionários atuais
  if (necessario > 0 && !atuais) {
    atualizarResultadoEnfermagem({
      svg: gerarDoughnut(1, { color: "#2fb1aaa2" }),
      numero: necessario,
      texto: texto,
      legenda: legenda,
      numeroCor: "#18a8a2"
    });
    return;
  }

  // Tem mais funcionários do que precisa
  if (atuais > necessario) {
    let percentVerde = necessario / atuais;
    let percentVermelho = (atuais - necessario) / atuais;
    atualizarResultadoEnfermagem({
      svg: gerarDoughnut(percentVerde, {
        color: "#2db46a",
        extra: percentVermelho,
        extraColor: "#de5454"
      }),
      numero: `-${atuais - necessario}`,
      texto: texto,
      ok: (atuais - necessario === 1
        ? `Profissional acima do recomendado.</br></br>1 deve ser realocado ou dispensado.`
        : `Profissionais acima do recomendado.</br></br>${atuais - necessario} devem ser realocados ou dispensados.`)
        + `</br></br><b>Recomendado para ${leitos} leitos:</b> ${necessario}`,
      numeroCor: "#de5454"
    });
    return;
  }

  // Tem menos do que precisa
  if (atuais < necessario) {
    let percentVerde = atuais / necessario;
    let percentAmarelo = (necessario - atuais) / necessario;
    atualizarResultadoEnfermagem({
      svg: gerarDoughnut(percentVerde, {
        color: "#2db46a",
        missing: percentAmarelo,
        missingColor: "#f7b92b"
      }),
      numero: `+${necessario - atuais}`,
      texto: texto,
      alerta: `Faltam ${necessario - atuais} profissional(is).`,
      numeroCor: "#f7b92b"
    });
    return;
  }

  // Está certinho!
  if (atuais === necessario) {
    atualizarResultadoEnfermagem({
      svg: gerarDoughnut(1, { color: "#2db46a" }),
      numero: `0`,
      texto: texto,
      ok: "Equipe adequada com base na legislação.",
      numeroCor: "#18a8a2"
    });
    return;
  }
}

// UI da Enfermagem (igual a principal, mas para o outro container)
function atualizarResultadoEnfermagem(params) {
  let svg = params.svg || "";
  let corNumero = params.numeroCor || "#18a8a2";
  let html = `
    <div class="resultado-circulo-container">
      ${svg}
      <div class="resultado-circulo-centro">
        <div class="resultado-numero" style="color:${corNumero}">${params.numero}</div>
        <div class="resultado-texto">${params.texto || ""}</div>
      </div>
    </div>
    <div class="resultado-legenda">${params.legenda || ""}</div>
  `;
  if (params.alerta) {
    html += `<div class="resultado-alerta">${params.alerta}</div>`;
  }
  if (params.ok) {
    html += `<div class="resultado-ok">${params.ok}</div>`;
  }
  document.getElementById('resultado-enfermagem').innerHTML = html;

  const svgElement = document.querySelector('#resultado-enfermagem .resultado-circulo-container svg');
  if (svgElement) {
    let percent = 1;
    const circles = svgElement.querySelectorAll('circle');
    for (let c of circles) {
      const color = c.getAttribute('stroke');
      if (
        color === "#2db46a" ||
        color === "#2FB1AB" ||
        color === "#2fb1aaa2" ||
        color === "#2FB1AB33"
      ) {
        const dasharray = parseFloat(c.getAttribute('stroke-dasharray'));
        const dashoffset = parseFloat(c.getAttribute('stroke-dashoffset'));
        percent = 1 - dashoffset / dasharray;
      }
    }
    animarDoughnut(svgElement, percent, 900);
  }
}

// =======================
// EVENTOS (sem alteração)
// =======================
window.onload = function () {
  popularDropdownEquipe();
  document.getElementById('restart-button').addEventListener('click', resetarSelecoes);


  document.getElementById('equipe').addEventListener('change', function () {
    popularDropdownSetor();
    document.getElementById('profissional-container').style.visibility = 'hidden';
    document.getElementById('complexidade-container').style.visibility = 'hidden';
    ajustarLarguraSelects();
    mostrarInfoSetor();
  });

  document.getElementById('setor').addEventListener('change', function () {
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

  // Atualiza ao digitar nos campos de número
  // (adicione listeners se necessário para atualização ao digitar)

  popularDropdownSetor();
  calcular();

  // --- Troca de abas ---
  function alternarAba(aba) {
    // Esconde todas
    document.getElementById('abaConteudoEquipeMulti').style.display = 'none';
    document.getElementById('abaConteudoEnfermagem').style.display = 'none';
    document.getElementById('abaConteudoLegislacao').style.display = 'none';
    
    // Remove classe active
    document.getElementById('abaEquipeMulti').classList.remove('active');
    document.getElementById('abaEnfermagem').classList.remove('active');
    document.getElementById('abaLegislacao').classList.remove('active');
    // Mostra selecionada
    if (aba === 'multi') {
      document.getElementById('abaConteudoEquipeMulti').style.display = 'flex';
      document.getElementById('abaEquipeMulti').classList.add('active');
    } else if (aba === 'enfermagem') {
      document.getElementById('abaConteudoEnfermagem').style.display = 'flex';
      document.getElementById('abaEnfermagem').classList.add('active');
    } else if (aba === 'legislacao') {
      document.getElementById('abaConteudoLegislacao').style.display = 'flex';
      document.getElementById('abaLegislacao').classList.add('active');
    }
  }

  document.getElementById('abaEquipeMulti').addEventListener('click', () => alternarAba('multi'));
  document.getElementById('abaEnfermagem').addEventListener('click', () => alternarAba('enfermagem'));
  document.getElementById('abaLegislacao').addEventListener('click', () => alternarAba('legislacao'));

  // Deixe a aba Equipe Multi como padrão no carregamento
  alternarAba('multi');
};
function resetarSelecoes() {
  // Reseta todos os selects para o valor inicial
  document.getElementById('equipe').value = '';
  popularDropdownSetor();
  document.getElementById('setor').value = '';
  popularDropdownProfissional();
  document.getElementById('profissional').value = '';
  popularDropdownComplexidade();
  document.getElementById('complexidade').value = '';

  // Reseta os campos numéricos
  document.getElementById('leitos').value = '';
  document.getElementById('atuais-parceiro').value = '';
  document.getElementById('atuais-servidor').value = '';

  // Esconde campos que dependem das seleções
  document.getElementById('profissional-container').style.visibility = 'hidden';
  document.getElementById('complexidade-container').style.visibility = 'hidden';

  // Limpa o infoSetor
  document.getElementById('infoSetor').innerHTML = "";

  // Limpa o resultado
  document.getElementById('resultado').innerHTML = "";

  // Traz para o estado inicial (opcional)
  calcular();
}
