# Memoria de trabalho — Laboratorio de Mecanica (LME)

> Criado em 2026-09-11 (briefing PRE-site-lme-oa). Vale para toda sessao nesta disciplina.
> Regras gerais: `G:\JA2026\CLAUDE.md`. Regras da disciplina: `../CLAUDE.md`.

---

## 1. COMO RESPONDER (as mesmas regras do autor na ILB)

1. **Seja conciso.** Entrega = poucas linhas: o que ficou pronto, o que falta, o que so o autor faz.
2. **Nao exibir o raciocinio.** Agir e reportar o resultado.
3. **Toda recomendacao termina com `Modelo: X · Esforco: baixo|medio|alto`.**
4. **Aprovado o briefing, executar ate a IMPLANTACAO.**
5. **Aprovada, a atualizacao vai aos DOIS repositorios** — fonte `Versao_A1.0` (`G:\JA2026`)
   e publicado `lme-oa` (`G:\JA2026\_publicacao\lme-oa`), nessa ordem, arquivo por arquivo.
6. **Nao mudar o alvo em trabalho**; o que aparecer vira alvo novo no Pre-Planejamento.

## 2. ORDEM DE TRABALHO

Pre-Planejamento (skill `entrevista-autor`) → briefing em `_planejamento/_pre/` →
`atualizar_painel.py` → gate "aprovado" → execucao ate a implantacao.

## 3. ESTADO EM 2026-09-14

13 trilhas com pasta criada (T0A-T11). **T0A** = piloto avancada (Camada 2, TT, MD, CD, RB, AP
v1; Pos vazio). **T0B-T11** = so pasta, sem OA. Plano de Ensino ja em v3. Nenhum OA sem Camada 2.

## 4. REGRAS INVIOLAVEIS DE LME

1. **Sem Camada 2 aprovada, nenhum OA e gerado.** Pre-Planejamento obrigatório.
2. **O experimento e OBJETO, nao veiculo.** (Diferente de ILB.) Aqui o modelo de Mecanica I/II 
   é posto a prova contra o dado e a incerteza; nunca tratar como método de medida.
3. **O que vem da ILB se adapta, nunca se copia.** Contexto diferente (objeto vs veículo) = 
   reescrita obrigatória no texto de aba, página e OA.
4. **Estrutura v2 conferida.** Rodar `python _scripts/conferir_estrutura_lme.py` antes de cada commit.

## 5. IDENTIDADE VISUAL — LME

- **Paleta:** verde-quadro `#3E8E5A` (primária) + azul-aco `#7FB2D6` (secundária)
- **Marca:** pendulo simples sobre regua graduada (`_icones/marca-lme.svg`)
- **Icone PWA + manifest:** `_scripts/gerar_icones_lme.py`
- **Distintiva:** diferente de ILB (verde uniforme); pendulo representa mecanica experimental.

## 6. METODO DE ESTUDO — 3 PARADAS (herdadas de ILB)

- **Pre-Lab** (20 min): preparacao, conceitos, hipoteses
- **Lab** (45 min): coleta de dados, medidas, discussao  
- **Pos-Lab** (20 min): analise, C5, conclusoes

**Configuracao:** entrada `'LME': PARADAS_ILB` em `_scripts/metodo_estudo.py` (regra `REGRA_TEXTO_LME`).

## 7. PUBLICACAO — 2 REPOSITORIOS

**Gate:** Pre-Planejamento aprovado no Painel.

**Fluxo:**
1. Commit + push em `Versao_A1.0` (`G:\JA2026\3_Estudio\LFI_04_LME_Laboratorio_de_Mecanica`)
2. `python _scripts/publicar_trilha_lme.py --all` (ou por trilha)
3. Commit + push em `lme-oa` (`G:\JA2026\_publicacao\lme-oa`)

**O que nao vai ao site:** briefing, rascunho, memoria — dispensa 2º repo.

## 8. ILB — MOLDE E BASE PARA LME

- **16 OAs da ILB** sao reutilizados (adaptados, nao copiados) em LME
- **CLAUDE.md ILB:** `../LFI_02_ILB_Introducao_ao_Laboratorio/CLAUDE.md` (ler como molde)
- **Scripts compartilhados:** `metodo_estudo.py`, `publicar_documentos_ilb.py`, `gerar_icones_ilb.py`
- **Mudancas em ILB** (paradas, regras) afetam LME — revisar depois de alterar.
